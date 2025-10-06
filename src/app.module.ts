import { Module } from '@nestjs/common';
import { ConfigDBModule } from './configuration/config-db.module';
import { ConfigEnvModule } from './configuration/config-env.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigDBModule, ConfigEnvModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
