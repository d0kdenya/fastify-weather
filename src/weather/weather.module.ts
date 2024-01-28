import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './entities/weather.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherService } from './weather.service';
import { WeatherWorker } from './weather.worker';
import { WeatherController } from './weather.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Weather]), ScheduleModule],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherWorker],
  exports: [WeatherService, WeatherWorker],
})
export class WeatherModule {}
