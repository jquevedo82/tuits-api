// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity() //{}recibe un objeto json q da las opciones de como se llame la tabla en bd
export class Tuit {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  message: string;
  //@Column()
  //test?: boolean; //? indica que es opcional

  /*@ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  opcional: string;*/

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => User, (user) => user.tuits, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
