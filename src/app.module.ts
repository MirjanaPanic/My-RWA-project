import { Module } from '@nestjs/common';
import { ConfigDBModule } from './configuration/config-db.module';
import { ConfigEnvModule } from './configuration/config-env.module';

@Module({
  imports: [ConfigDBModule, ConfigEnvModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
