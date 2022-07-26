import {
  Body,
  Controller,
  Delete,
  Get,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  HttpCode,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';

@Controller('tuits')
export class TuitsController {
  //private para q sea usada solo en esta clase
  //readonly no es necesario pero nos indica que el contenido
  //de la dependencia no va ser modificado
  //creamos una instancia de TuitsService para utilizarla en TuistController
  constructor(private readonly tuitService: TuitsService) {}
  /*@Get()
  getTuits(): string {
    return 'Hola tuitero';
    }*/
  //agregar un parametro tipo query
  @Get()
  getTuits(@Query() filterQuery): Tuit[] {
    //getTuits(@Query() filterQuery): string {
    //destructuramos el parametro
    //indicando que valores quiero sacarle
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { datoBuscar, orderId } = filterQuery;
    //return `Todos los tuits ${datoBuscar} odenados por ${orderId}`;
    return this.tuitService.getTuits();
  }

  @Get(':id') //tuits/1
  getTuit(@Param('id') id: string): Tuit {
    //getTuit(@Param('id') id: string): string {
    return this.tuitService.getTuit(id);
    // return `Tu tuit es id ${id}`;
  }
  /*
  getTuit(@Param() params){
    return `Tu tuit es id ${params.id}`;
  }*/

  /*@Post()
  createTuit(@Body() body){
    return body;
  }*/
  @Post()
  //@HttpCode(HttpStatus.NO_CONTENT) //cambia el codigo de status de la peticion
  createTuit(@Body('message') message): void {
    //createTuit(@Body('message') message): string {
    return this.tuitService.createTuit(message);
    //return `Tu tuits es ${message}`;
  }

  @Patch(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateTuit(@Param('id') id: string, @Body('message') _tuit): Tuit {
    //updateTuit(@Param('id') id: string, @Body() _tuit): string {
    //return `El Tuit ${id} se actualizo`;
    return this.tuitService.updateTuit(id, _tuit);
  }

  @Delete(':id')
  removeTuit(@Param('id') id: string): void {
    //removeTuit(@Param('id') id: string): string {
    return this.tuitService.removeTuit(id);
    //return `El Tuit ${id} se elimino`;
  }
}
