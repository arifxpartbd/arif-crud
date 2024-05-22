import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (conigService: ConfigService) => ({
        type: 'postgres',
        host: conigService.get('DATABASE_HOST'),
        port: +conigService.get('DATABASE_PORT'),
        username: conigService.get('DATABASE_USER'),
        password: conigService.get('DATABASE_PASSWORD'),
        database: conigService.get('DATABASE_NAME'),    
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        //do not use synchronize : true in real project
        synchronize: true,
      }),
    }),
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
