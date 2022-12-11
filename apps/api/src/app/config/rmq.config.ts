import {IRMQServiceAsyncOptions} from "nestjs-rmq";
import {ConfigModule, ConfigService} from "@nestjs/config";

export const getRMQConfig = ():IRMQServiceAsyncOptions => ({
  imports:[ConfigModule],
  inject:[ConfigService],
  useFactory: (configService: ConfigService)=>({
    exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
    connections:[
      {
        login: configService.get('AMQP_USERNAME') ?? '',
        password: configService.get('AMQP_PASSWORD') ?? '',
        host: configService.get('AMQP_HOST') ?? '',
      }
    ],
    prefetchCount: 32,
    serviceName: 'user-db-accounts'
  })
})
