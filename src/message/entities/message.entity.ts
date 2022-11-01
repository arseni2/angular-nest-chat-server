import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../auth/entities/auth.entity';

@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    @ManyToOne(() => UserEntity, (user) => user.messages, {eager: true})
    user: UserEntity
}
