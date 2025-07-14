import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { seedData } from './seed-data';

async function runSeed() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  try {
    console.log('🌱 Iniciando población de datos...');
    await seedData(dataSource);
    console.log('✅ Población de datos completada exitosamente');
  } catch (error) {
    console.error('❌ Error durante la población de datos:', error);
  } finally {
    await app.close();
  }
}

runSeed(); 