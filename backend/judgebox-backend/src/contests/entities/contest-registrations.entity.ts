import { UsersEntity } from "src/users/entities/users.entity";
import {
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { ContestsEntity } from "./contests.entity";

@Entity('contest_registrations')
export class ContestRegistrationsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => UsersEntity, (user) => user.participatedContests)
    participant: UsersEntity;

    @ManyToOne(() => ContestsEntity, (contest) => contest.participants)
    contest: ContestsEntity;
}