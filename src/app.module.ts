import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TuitsModule } from './modules/tuits/tuits.module';
import { UsersModule } from './modules/users/users.module';

import { DatabaseModule } from './database/database.module';

@Module({
  //typeorm para configura nuestra bd
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // para q sea global sino deberiamos incluir en todos los modulos
    TuitsModule,
    /*
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'jq14808265',
      database: 'tuitter-api',
      autoLoadEntities: true,
      synchronize: true, // solo en proceso de produccion
    }),*/
    UsersModule,

    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;

  constructor(private readonly configServer: ConfigService) {
    AppModule.port = +this.configServer.get('PORT');
  }
}
