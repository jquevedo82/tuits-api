import { Injectable } from '@nestjs/common';
import { Tuit } from './tuit.entity';

@Injectable()
export class TuitsService {
  private tuits: Tuit[] = [{ id: '1', message: 'Hola mundo desde Nest.js 🥩' }];

  getTuits(): Tuit[] {
    return this.tuits;
  }
  getTuit(id: string): Tuit {
    return this.tuits.find((item) => item.id === id);
  }
  // si enviamos un json completo podemos ...json y lo metemos
  //en el json q se esta creando
  createTuit(message: string) {
    this.tuits.push({
      id: (Math.floor(Math.random() * 2000) + 1).toString(),
      message,
    });
  }
  updateTuit(id: string, message: any) {
    const tuit: Tuit = this.getTuit(id);
    tuit.message = message;
    return tuit;
  }
  removeTuit(id: string) {
    //devuelve el indice del elemento buscado o -1 sino lo encontro
    const index = this.tuits.findIndex((tuit) => tuit.id === id);
    if (index >= 0) {
      //splice elimina 1 elemento apartir del elemento index
      this.tuits.splice(index, 1);
    }
  }
}
