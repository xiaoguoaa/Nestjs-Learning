/*
 * @Descripttion: 
 * @version: 
 * @Author: guowh
 * @Date: 2022-05-24 09:41:01
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('verification_code')
export class VerificationCode {
    /**
     * 自增主键
     */
    @PrimaryGeneratedColumn({
        comment: '自增ID'
    })
    id: number;

    @Column({
        comment: '邮箱'
    })
    email: string;

    @Column({
        comment: '验证码'
    })
    code: string;

    @Column({
        name: 'email_code',
        comment: '邮箱验证码',
        nullable: true
    })
    emailCode: string;

    @Column({
        name: 'create_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createTime: Date;

    @Column({
        name: 'update_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updateTime: Date;
}