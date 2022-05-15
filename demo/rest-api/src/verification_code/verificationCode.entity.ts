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
}