import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ type: 'datetime', nullable: true })
  refreshTokenExp: Date;

  //   @Column()
  //   firstName: string;

  //   @Column()
  //   lastName: string;

  //   @Column({ default: true })
  //   isActive: boolean;
  // }
}
