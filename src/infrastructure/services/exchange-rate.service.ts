import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { IExchangeRateService } from '../../domain/services/exchange-rate.interface';

export interface ExchangeRateResponse {
  amount: number;
  base: string;
  date: string;
  rates: {
    USD: number;
    EUR: number;
  };
}

@Injectable()
export class ExchangeRateService implements IExchangeRateService {
  private readonly apiUrl = 'https://api.frankfurter.app/latest';

  async getExchangeRates(): Promise<ExchangeRateResponse> {
    try {
      const response = await axios.get(`${this.apiUrl}?to=USD,EUR`);
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error al obtener las tasas de cambio',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async convertUSDToEUR(usdAmount: number): Promise<number> {
    try {
      const rates = await this.getExchangeRates();
      return usdAmount * rates.rates.EUR;
    } catch (error) {
      throw new HttpException(
        'Error al convertir USD a EUR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCurrentExchangeRate(): Promise<number> {
    try {
      const rates = await this.getExchangeRates();
      return rates.rates.EUR;
    } catch (error) {
      throw new HttpException(
        'Error al obtener la tasa de cambio actual',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 