import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DroneModule } from './modules/drone/drone.module';
import 'dotenv/config';
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   entities: [
    //     path.join(`${__dirname}`, `../modules/**/entities/**.entity{.ts,.js}`),
    //   ],
    //   migrations: [path.resolve(`${__dirname}/../db/migrations/*{.ts,.js}`)],
    //   migrationsTableName: 'migrations',
    //   logging: false,
    //   synchronize: false,
    // }),
    UserModule,
    DroneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
