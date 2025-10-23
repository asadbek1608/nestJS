import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "./auth/auth.module";
import { Auth } from "./auth/auth.model";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/user.model";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./validation/validation.pipe";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { RolesGuard } from "./auth/roles.guard";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      username: "postgres",
      password: "1628",
      host: "localhost",
      database: "test",
      models: [Auth, Users],
      synchronize: true,
      autoLoadModels: true,
      logging: false,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  ],
})
export class AppModule {}
