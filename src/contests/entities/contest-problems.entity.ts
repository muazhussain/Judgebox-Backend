import { ProblemsEntity } from "src/problems/entities/problems.entity";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { ContestsEntity } from "./contests.entity";

@Entity('contest_problems')
export class ContestProblemsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => ContestsEntity, contest => contest.problems)
    @JoinColumn({ name: 'contest', referencedColumnName: 'id' })
    contest: ContestsEntity;

    @ManyToOne(() => ProblemsEntity, problem => problem.contests)
    @JoinColumn({ name: 'problem', referencedColumnName: 'id' })
    problem: ProblemsEntity;

    @Column()
    problemOrder: number;
}