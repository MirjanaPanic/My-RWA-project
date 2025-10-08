import { Module } from '@nestjs/common';
import { ConfigDBModule } from './configuration/config-db.module';
import { ConfigEnvModule } from './configuration/config-env.module';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { JwtGuard } from './auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigDBModule, ConfigEnvModule, UsersModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
