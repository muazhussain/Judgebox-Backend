import { UsersEntity } from "src/users/entities/users.entity";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { ContestRegistrationsEntity } from "./contest-registrations.entity";
import { ContestProblemsEntity } from "./contest-problems.entity";
import { SubmissionsEntity } from "src/submissions/entities/submissions.entity";

@Entity('contests')
export class ContestsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
    deletedAt?: Date;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @ManyToOne(() => UsersEntity, user => user.hostedContests)
    @JoinColumn({ name: 'createdBy', referencedColumnName: 'id' })
    createdBy: UsersEntity;

    @OneToMany(() => ContestRegistrationsEntity, registration => registration.contest)
    participants: ContestRegistrationsEntity[];

    @OneToMany(() => ContestProblemsEntity, problem => problem.contest)
    problems: ContestProblemsEntity[];

    @OneToMany(() => SubmissionsEntity, submission => submission.contest)
    submissions: SubmissionsEntity[];
}