import { randomUUID } from 'crypto';

import { HttpModule } from '@nestjs/axios';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { Request } from 'express';
import { ClsModule } from 'nestjs-cls';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { RolesGuard } from './auth/guard/roles.guard';
import { AllExceptionsFilter } from './common/exception/all-exception.filter';
import { ERROR_CODE } from './common/exception/error-code';
import { AxiosInterceptor } from './common/interceptor/axios.interceptor';
import { RequestLoggingMiddleware } from './common/middleware/request-logging.middleware';
import { EventModule } from './event/event.module';
import { HealthController } from './health/health.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV ?? 'local'}`],
      isGlobal: true,
      cache: true,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => {
          // asyncLocalStorage, 헤더에 x-request-id 추가
          const headerValue = req.headers['x-request-id'];
          const requestId = (Array.isArray(headerValue) ? headerValue[0] : headerValue) ?? randomUUID().split('-')[0];
          req.res?.setHeader('x-request-id', requestId);
          return requestId;
        },
      },
    }),
    HttpModule,
    AuthModule,
    UserModule,
    EventModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      /** 직렬화 인터셉터 */
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      /** 전역 exception filter */
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      /** JWT 인증 가드 전역 설정 */
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      /** 권한 가드 전역 설정 */
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidUnknownValues: true,
        exceptionFactory: () => {
          return new BadRequestException(ERROR_CODE.PARAMETER_INVALID);
        },
      }),
    },
    AxiosInterceptor,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
