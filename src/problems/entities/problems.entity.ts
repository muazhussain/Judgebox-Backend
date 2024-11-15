import { ContestProblemsEntity } from "src/contests/entities/contest-problems.entity";
import { SubmissionsEntity } from "src/submissions/entities/submissions.entity";
import { UsersEntity } from "src/users/entities/users.entity";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('problems')
export class ProblemsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
    deletedAt?: Date;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column('text')
    inputFormat: string;

    @Column('text')
    outputFormat: string;

    @Column('text')
    constraints: string;

    @Column('jsonb')
    sampleTestCases: {
        input: string;
        output: string;
        explanation?: string;
    }[];

    @Column({ type: 'int' })
    timeLimit: number; // in milliseconds

    @Column({ type: 'int' })
    memoryLimit: number; // in megabytes

    @ManyToOne(() => UsersEntity, (user) => user.createdProblems)
    @JoinColumn({ name: 'createdBy', referencedColumnName: 'id' })
    createdBy: UsersEntity;

    @OneToMany(() => ContestProblemsEntity, (contestProblem) => contestProblem.problem)
    contests: ContestProblemsEntity[];

    @OneToMany(() => SubmissionsEntity, (submission) => submission.problem)
    submissions: SubmissionsEntity[];
}