import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import {getMongoConfig} from "./configs/mongo.config";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: 'envs/.user-db.env'}),
    MongooseModule.forRootAsync(getMongoConfig()),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}

