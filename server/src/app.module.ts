import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { LoggerModule } from 'nestjs-pino';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import pino = require('pino');

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        logger: pino({
          level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
          prettyPrint: process.env.NODE_ENV !== 'production',
        }),
      },
    }),
    TerminusModule,
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI,
      {
        useFindAndModify: false,
      },
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/images',
      serveStaticOptions: {
        index: false,
        redirect: false,
      },
    }),
    ProductModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
