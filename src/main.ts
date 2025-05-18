import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClsService } from 'nestjs-cls';

import { AppModule } from './app.module';
import { CustomLogger } from './common/logger/custom-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // ConfigService
  const configService = app.get(ConfigService);
  const SERVICE_NAME = configService.getOrThrow<string>('SERVICE_NAME');
  const PORT = configService.getOrThrow<string>('PORT');
  const ENV = configService.getOrThrow<string>('NODE_ENV');

  // Logger
  const cls = app.get(ClsService);
  app.useLogger(new CustomLogger(cls, configService));

  // Swagger
  if (ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle(SERVICE_NAME)
      .setDescription(`${SERVICE_NAME} Service API Docs`)
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Access token issued by Auth Service',
          in: 'header',
        },
        'access-token',
      )
      .addTag('사용자', '가입, 로그인, 정보 조회')
      .addTag('이벤트', '이벤트 조회, 리워드 요청')
      .addTag('[관리] 사용자', '사용자 정보 수정')
      .addTag('[관리] 이벤트', '이벤트 생성, 보상 추가, 보상 요청 관리')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api', app, document, {
      customSiteTitle: `${SERVICE_NAME} Service API Docs`,
    });
  }

  await app.listen(PORT);
  Logger.log(`${SERVICE_NAME} is running on port ${PORT} in ${ENV}`, 'Bootstrap');
  Logger.log(`API Docs: http://localhost:${PORT}/api`);
}
bootstrap();
