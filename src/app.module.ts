import { Module } from '@nestjs/common';
import { ConfigDBModule } from './configuration/config-db.module';
import { ConfigEnvModule } from './configuration/config-env.module';
import { UsersModule } from './users/user.module';

@Module({
  imports: [ConfigDBModule, ConfigEnvModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
