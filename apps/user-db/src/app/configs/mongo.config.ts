import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModuleAsyncOptions} from "@nestjs/mongoose";

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService)=>({
      uri: getMongoString(configService),
      ...getMongoOptions()
    }),
    inject:[ConfigService],
    imports: [ConfigModule]
  }
}

const getMongoString = (configService: ConfigService) =>
  `mongodb+srv://${configService.get('MONGO_LOGIN')}:${configService.get('MONGO_PASSWORD')}@${configService.get('MONGO_HOST')}/${configService.get('MONGO_DATABASE')}`

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
