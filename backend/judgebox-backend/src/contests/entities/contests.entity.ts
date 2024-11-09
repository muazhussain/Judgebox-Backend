import { UsersEntity } from "src/users/entities/users.entity";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

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

    @ManyToOne(() => UsersEntity, user => user.contestHost)
    createdBy: UsersEntity;
}