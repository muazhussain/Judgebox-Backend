import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { UserRoles } from "../enums/user-role.enum";
import { Exclude } from "class-transformer";
import { ContestsEntity } from "src/contests/entities/contests.entity";

@Entity('users')
export class UsersEntity {
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

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({
        default: UserRoles.USER,
        enum: UserRoles,
        type: 'enum',
    })
    role: UserRoles;

    @OneToMany(() => ContestsEntity, (contest) => contest.createdBy)
    contestHost: ContestsEntity[];
}