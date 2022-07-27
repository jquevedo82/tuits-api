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
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateTuitDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';

@ApiTags('tuits')
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
  @ApiOkResponse({ description: 'Devuelve todos los elementos' })
  @ApiForbiddenResponse({ description: 'Llamada no autorizada' })
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
  @ApiOkResponse({ description: 'El registro fue devuelto con exito' })
  @ApiForbiddenResponse({ description: 'No tiene acceso' })
  @ApiNotFoundResponse({ description: 'Registro no encontrado1' })
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
  @ApiCreatedResponse({ description: 'Se ha Creado' })
  @ApiUnprocessableEntityResponse({ description: 'Error en la Llamada' })
  @ApiForbiddenResponse({ description: 'No tiene Autorizacion' })
  //@HttpCode(HttpStatus.NO_CONTENT) //cambia el codigo de status de la peticion
  /*createTuit(@Body('message') message): void {
    //createTuit(@Body('message') message): string {
    return this.tuitService.createTuit(message);
    //return `Tu tuits es ${message}`;
  }*/
  createTuit(@Body() message: CreateTuitDto): void {
    //createTuit(@Body('message') message): string {
    //verifica si message es un tipo createtuitdto
    console.log(message instanceof CreateTuitDto);
    return this.tuitService.createTuit(message);
    //return `Tu tuits es ${message}`;
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'El registro se ha modificado con exito!!!' })
  @ApiNotFoundResponse({ description: 'Registro no encontrado' })
  @ApiForbiddenResponse({ description: 'Sin autorizacion' })
  @ApiUnprocessableEntityResponse({ description: 'Error en la llamada' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  /*updateTuit(@Param('id') id: string, @Body('message') _tuit): Tuit {
    //updateTuit(@Param('id') id: string, @Body() _tuit): string {
    //return `El Tuit ${id} se actualizo`;
    return this.tuitService.updateTuit(id, _tuit);
  }*/
  updateTuit(@Param('id') id: string, @Body() _tuit: UpdateTuitDto): Tuit {
    //updateTuit(@Param('id') id: string, @Body() _tuit): string {
    //return `El Tuit ${id} se actualizo`;

    return this.tuitService.updateTuit(id, _tuit);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'El registro fue eliminado con exito!!' })
  @ApiForbiddenResponse({ description: 'No tiene autorizacion' })
  @ApiNotFoundResponse({ description: 'Registro no encontrado' })
  removeTuit(@Param('id') id: string): void {
    //removeTuit(@Param('id') id: string): string {
    return this.tuitService.removeTuit(id);
    //return `El Tuit ${id} se elimino`;
  }
}
