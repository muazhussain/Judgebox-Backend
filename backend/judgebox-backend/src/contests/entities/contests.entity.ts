import { UsersEntity } from "src/users/entities/users.entity";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { ContestRegistrationsEntity } from "./contest-registrations.entity";
import { ContestProblemsEntity } from "./contest-problems.entity";

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

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    startTime: Date;

    @Column({ type: 'timestamp with time zone' })
    endTime: Date;

    @ManyToOne(() => UsersEntity, user => user.hostedContests)
    createdBy: UsersEntity;

    @OneToMany(() => ContestRegistrationsEntity, registration => registration.contest)
    participants: ContestRegistrationsEntity[];

    @OneToMany(() => ContestProblemsEntity, problem => problem.contest)
    problems: ContestProblemsEntity[];
}