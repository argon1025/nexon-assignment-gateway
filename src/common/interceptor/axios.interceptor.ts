import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AxiosInterceptor implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly clsService: ClsService,
  ) {}

  onModuleInit() {
    const axios = this.httpService.axiosRef;

    if (axios) {
      axios.interceptors.request.use(
        (config) => {
          // Axios 요청 시마다 x-request-id를 설정
          config.headers.set('x-request-id', this.clsService.getId());
          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
      );
    }
  }
}
