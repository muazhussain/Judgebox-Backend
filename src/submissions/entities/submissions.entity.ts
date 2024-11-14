import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { SubmissionResult } from '../enums/submission-result.enum';
import { SubmissionStatus } from '../enums/submission-status.enum';
import { UsersEntity } from 'src/users/entities/users.entity';
import { ProblemsEntity } from 'src/problems/entities/problems.entity';
import { ContestsEntity } from 'src/contests/entities/contests.entity';

@Entity('submissions')
export class SubmissionsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
    deletedAt?: Date;

    @Column()
    language: string;

    @Column('text')
    sourceCode: string;

    @Column({
        type: 'enum',
        enum: SubmissionStatus,
        default: SubmissionStatus.PENDING
    })
    status: SubmissionStatus;

    @Column({
        type: 'enum',
        enum: SubmissionResult,
        nullable: true
    })
    result?: SubmissionResult;

    @Column('jsonb', { nullable: true })
    testResults?: {
        testCaseId: string;
        status: SubmissionResult;
        executionTime: number;
        memoryUsed: number;
    }[];

    @Column('int', { nullable: true })
    executionTime?: number;

    @Column('int', { nullable: true })
    memoryUsed?: number;

    @ManyToOne(() => UsersEntity, (user) => user.submissions)
    @JoinColumn({ name: 'user', referencedColumnName: 'id' })
    participant: UsersEntity;

    @ManyToOne(() => ProblemsEntity, (problem) => problem.submissions)
    @JoinColumn({ name: 'problem', referencedColumnName: 'id' })
    problem: ProblemsEntity;

    @ManyToOne(() => ContestsEntity, (contest) => contest.submissions)
    @JoinColumn({ name: 'contest', referencedColumnName: 'id' })
    contest: ContestsEntity;
}
