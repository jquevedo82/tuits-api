import { Tuit } from 'src/modules/tuits/entities/tuit.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false })
  username: string;
  @Column({ nullable: false })
  password: string;

  @OneToMany((Type) => Tuit, (tuit) => tuit.user)
  tuits: Tuit[];

  @CreateDateColumn()
  createAt: Date;
  // eslint-disable-next-line prettier/prettier
  @CreateDateColumn()
  updateAt: Date
}
