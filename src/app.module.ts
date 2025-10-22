import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/auth.model';
import { UsersModule } from './users/users.module';
import { Users } from './users/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
    SequelizeModule.forRoot({
      dialect: "postgres",
      username: "postgres",
      password: "1628",
      host: "localhost",
      database: "test",
      models: [Auth, Users],
      synchronize: true,
      autoLoadModels: true,
      logging: false
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}