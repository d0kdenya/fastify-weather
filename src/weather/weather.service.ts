import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from './entities/weather.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import {
  CreateWeatherDtoSchema,
  CreateWeatherDtoType,
} from './dto/create.weather.dto';
import { GetWeathersParamsDtoType } from './dto/get.weathers.params.dto';

@Injectable()
export class WeatherService {
  private readonly KELVIN = 273.15;

  constructor(
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
  ) {}

  async getWeatherById(id: number): Promise<Weather> {
    return this.weatherRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getAllWeathers(query: GetWeathersParamsDtoType): Promise<Weather[]> {
    const weatherQuery = this.weatherRepository.createQueryBuilder('w');

    if (query.limit) {
      weatherQuery.take(query.limit).skip(query.offset);
    }
    if (query.city) {
      weatherQuery.andWhere('w.city ILIKE :city', { city: `%${query.city}%` });
    }
    return await weatherQuery.getMany();
  }

  async getWeather(city: string): Promise<number> {
    const formattedCity = encodeURIComponent(city.toLowerCase());
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&appid=${process.env.APP_ID}`,
    );
    return Math.round(response.data.main.temp - this.KELVIN);
  }

  async saveTemperature(dto: CreateWeatherDtoType): Promise<Weather> {
    try {
      CreateWeatherDtoSchema.parse(dto);

      const weather = await this.weatherRepository.create(dto);
      return this.weatherRepository.save(weather);
    } catch (error) {
      throw new BadRequestException('Validation failed!', error.message);
    }
  }
}
