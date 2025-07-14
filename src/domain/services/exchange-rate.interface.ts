export interface IExchangeRateService {
  getCurrentExchangeRate(): Promise<number>;
} 