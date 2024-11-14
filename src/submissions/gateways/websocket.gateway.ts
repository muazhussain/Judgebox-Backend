import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";
import { SubmissionStatus } from "../enums/submission-status.enum";

@WebSocketGateway({ namespace: 'submissions' })
export class SubmissionGateway {
  @WebSocketServer() server: Server;

  notifySubmissionUpdate(
    submissionId: string,
    status: SubmissionStatus,
    data?: any
  ) {
    this.server.emit(`submission.${submissionId}`, { status, data });
  }
}