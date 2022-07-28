import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities';

import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from './dto';
import { Tuit } from './entities/tuit.entity';

@Injectable()
export class TuitsService {
  //  private tuits: Tuit[] = [{ id: 1, message: 'Hola mundo desde Nest.js 🥩' }];

  constructor(
    @InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>,
    @InjectRepository(Tuit) private readonly userRepository: Repository<User>,
  ) {}

  /*getTuits(): Tuit[] {
    return this.tuits;
  }*/
  async getTuits({ limit, offset }: PaginationQueryDto): Promise<Tuit[]> {
    return await this.tuitRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    });
  }

  /* getTuit(id: number): Tuit {
    const tuit = this.tuits.find((item) => item.id === id);
    if (!tuit) {
      throw new NotFoundException('Registro no Encontrado2');
    }
    return tuit;
  }
  */

  async getTuit(id: number): Promise<Tuit> {
    const tuit: Tuit = await this.tuitRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!tuit) {
      throw new NotFoundException('Registro no Encontrado2');
    }
    return tuit;
  }

  // si enviamos un json completo podemos ...json y lo metemos
  //en el json q se esta creando
  //createTuit({ message }: CreateTuitDto /*string*/) {
  /*this.tuits.push({
      id: Math.floor(Math.random() * 2000) + 1,
      message,
    });
  }*/
  async createTuit({ message, user }: CreateTuitDto /*string*/) {
    const tuit: Tuit = this.tuitRepository.create({ message, user });
    return this.tuitRepository.save(tuit);
  }

  /*updateTuit(id: number, { message }: UpdateTuitDto) {
    const tuit: Tuit = this.getTuit(id);
    tuit.message = message;
    return tuit;
  }*/

  async updateTuit(id: number, { message }: UpdateTuitDto) {
    const tuit: Tuit = await this.tuitRepository.preload({ id, message });
    if (!tuit) {
      throw new NotFoundException('No Existe!!!');
    }
    this.tuitRepository.save(tuit);
    return tuit;
  }

  /*
  removeTuit(id: number) {
    //devuelve el indice del elemento buscado o -1 sino lo encontro
    const index = this.tuits.findIndex((tuit) => tuit.id === id);
    if (index >= 0) {
      //splice elimina 1 elemento apartir del elemento index
      this.tuits.splice(index, 1);
    }
  }*/
  async removeTuit(id: number): Promise<void> {
    //devuelve el indice del elemento buscado o -1 sino lo encontro
    const tuit: Tuit = await this.tuitRepository.findOne({ where: { id } });
    if (!tuit) {
      throw new NotFoundException('No Existe!!!');
    }
    this.tuitRepository.remove(tuit);
  }
}
