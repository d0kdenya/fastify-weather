import { WeatherService } from './weather.service';
import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { Weather } from './entities/weather.entity';
import { GetWeathersParamsDtoType } from './dto/get.weathers.params.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiOperation({ summary: 'Получить погоду по ID!' })
  @HttpCode(200)
  @Get(':id')
  async getWeatherById(@Param('id') id: number): Promise<Weather> {
    return this.weatherService.getWeatherById(id);
  }

  @ApiOperation({ summary: 'Получить коллекцию погоды по параметрам!' })
  @HttpCode(200)
  @Get()
  async getAllWeathers(
    @Query() query: GetWeathersParamsDtoType,
  ): Promise<Weather[]> {
    return this.weatherService.getAllWeathers(query);
  }
}
