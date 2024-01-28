import { Injectable, Logger } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WeatherWorker {
  private readonly logger = new Logger(WeatherWorker.name);

  constructor(private readonly weatherService: WeatherService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleWeatherUpdates() {
    try {
      const cities = ['Nizhny Novgorod', 'Moscow', 'New York'];
      for (const city of cities) {
        const temperature = await this.weatherService.getWeather(city);
        await this.weatherService.saveTemperature({ city, temperature });
        this.logger.log(`Weather for ${city} updated success!`);
      }
    } catch (error) {
      this.logger.error(`Failed to update weather: ${error.message}`);
    }
  }
}
