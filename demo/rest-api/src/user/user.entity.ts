import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
    /**
     * 自增主键
     */
    @PrimaryGeneratedColumn({
        comment: '自增ID'
    })
    id: number;

    /**
     * 昵称
     */
    @Column({
        comment: '昵称'
    })
    nickname: string;

    /* 
     * 邮箱
     */
    @Column({
        comment: '邮箱'
    })
    email: string;

    /*
     * 密码
     */
    @Column({
        comment: '密码'
    })
    password: string;
}