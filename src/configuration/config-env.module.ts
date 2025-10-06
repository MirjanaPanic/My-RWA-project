import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // dostupan u svim modulima
      envFilePath: '.env', // fajl sa varijablama
    }),
  ],
})
export class ConfigEnvModule {}
