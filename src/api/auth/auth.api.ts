import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, lastValueFrom, map, throwError } from 'rxjs';

import {
  CreateUserOptions,
  CreateUserResponse,
  GetUserInfoOptions,
  GetUserInfoResponse,
  LoginOptions,
  LoginResponse,
  UpdateUserInfoOptions,
  UpdateUserInfoResponse,
} from './auth-api.interface';
import { AuthApiException } from './auth.exception';

@Injectable()
export class AuthApi {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.getOrThrow<string>('AUTH_SERVICE_URL');
  }

  /**
   * 사용자 생성
   * POST /auth/internal/user
   */
  async createUser(options: CreateUserOptions): Promise<CreateUserResponse> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${this.baseUrl}/auth/internal/user`,
      data: options,
    };
    return lastValueFrom(
      this.httpService.request<CreateUserResponse>(config).pipe(
        map(this.responseHandler),
        catchError((e) => throwError(() => this.errorHandler(e, '사용자 생성'))),
      ),
    );
  }

  /**
   * 사용자 로그인
   * POST /auth/internal/user/login
   */
  async login(options: LoginOptions): Promise<LoginResponse> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${this.baseUrl}/auth/internal/user/login`,
      data: options,
    };
    return lastValueFrom(
      this.httpService.request<LoginResponse>(config).pipe(
        map(this.responseHandler),
        catchError((e) => throwError(() => this.errorHandler(e, '사용자 로그인'))),
      ),
    );
  }

  /**
   * 사용자 정보 조회
   * /auth/internal/user/{id}
   */
  async getUserInfo(options: GetUserInfoOptions): Promise<GetUserInfoResponse> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${this.baseUrl}/auth/internal/user/${options.id}`,
    };
    return lastValueFrom(
      this.httpService.request<GetUserInfoResponse>(config).pipe(
        map(this.responseHandler),
        catchError((e) => throwError(() => this.errorHandler(e, '사용자 정보 조회'))),
      ),
    );
  }

  /**
   * [관리자] 사용자 정보 수정
   * /auth/admin/user/{id}
   */
  async updateUserInfo(options: UpdateUserInfoOptions): Promise<UpdateUserInfoResponse> {
    const { id, ...data } = options;
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      url: `${this.baseUrl}/auth/admin/user/${id}`,
      data,
    };
    return lastValueFrom(
      this.httpService.request<UpdateUserInfoResponse>(config).pipe(
        map(this.responseHandler),
        catchError((e) => throwError(() => this.errorHandler(e, '[관리자] 사용자 정보 수정'))),
      ),
    );
  }

  private responseHandler<T>(response: AxiosResponse<T>) {
    return response.data;
  }

  /**
   * 공통 에러처리 유틸
   * @param error 에러 객체
   * @param source 에러 발생 소스
   */
  private errorHandler(error: unknown, source: string) {
    if (error instanceof AuthApiException) throw error;

    let errorMessage = `${source} 호출 중 오류`;
    let errorCode = 'AUTH_API_ERROR';
    let statusCode = 500;
    let data = null;

    if (error instanceof AxiosError) {
      errorCode = error.response?.data?.error?.name ?? errorCode;
      statusCode = error.response?.status ?? statusCode;
      errorMessage += ` [${statusCode}][${error.response?.data?.error?.message || 'N/A'}]`;
      data = error.response?.data ?? data;
    } else if (error instanceof Error) {
      errorMessage += ` [${error.message}]`;
    }

    throw new AuthApiException(errorMessage, errorCode, statusCode, data);
  }
}
