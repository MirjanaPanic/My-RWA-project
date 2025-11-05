import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigDBModule } from './core/configuration/config-db.module';
import { ConfigEnvModule } from './core/configuration/config-env.module';
import { UsersModule } from './app/users/user.module';
import { AuthModule } from './core/auth/auth.module';
import { JwtStrategy } from './core/auth/strategies/jwt.strategy';
import { JwtGuard } from './core/auth/guards/jwt.guard';
import { TagsModule } from './app/tags/tags.module';
import { MessagesModule } from './app/messages/messages.module';
import { SessionsModule } from './app/sessions/session.module';

@Module({
  imports: [
    ConfigDBModule,
    ConfigEnvModule,
    UsersModule,
    AuthModule,
    TagsModule,
    MessagesModule,
    SessionsModule,
  ],
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
