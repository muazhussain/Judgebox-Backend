import {
  Processor,
  Process
} from "@nestjs/bull";
import { Job } from "bull";
import { SubmissionStatus } from "../enums/submission-status.enum";
import { SubmissionsService } from "../services/submissions.service";
import { HttpService } from "@nestjs/axios";

@Processor('judge-queue')
export class JudgeProcessor {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly httpService: HttpService
  ) { }

  @Process('judge-submission')
  async processSubmission(job: Job<any>) {
    const { submissionId, problemId, language, sourceCode } = job.data;
    try {
      // Update status to compiling
      await this.submissionsService.updateSubmissionStatus(
        submissionId,
        SubmissionStatus.COMPILING,
        {}
      );

      // Send to Flask judge service
      const response = await this.httpService.post('http://127.0.0.1:5000/api/judge', {
        submissionId,
        problemId,
        language,
        sourceCode
      }).toPromise();

      // Handle response from judge service
      await this.submissionsService.updateSubmissionStatus(
        submissionId,
        SubmissionStatus.COMPLETED,
        response.data
      );
    } catch (error) {
      await this.submissionsService.updateSubmissionStatus(
        submissionId,
        SubmissionStatus.ERROR,
        { error: error.message }
      );
    }
  }
}