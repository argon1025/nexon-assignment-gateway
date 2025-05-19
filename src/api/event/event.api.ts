import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { lastValueFrom, map, catchError, throwError } from 'rxjs';

import {
  ApproveRewardRequestOptions,
  ApproveRewardRequestResponse,
  CreateEventOptions,
  CreateEventResponse,
  CreateRewardOptions,
  CreateRewardResponse,
  GetAdminRewardRequestsOptions,
  GetAdminRewardRequestsResponse,
  GetEventsOptions,
  GetEventsResponse,
  GetRewardRequestsOptions,
  GetRewardRequestsResponse,
  GetRewardsOptions,
  GetRewardsResponse,
  RequestRewardOptions,
  RequestRewardResponse,
} from './event-api.interface';
import { EventApiException } from './event.exception';

@Injectable()
export class EventApi {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.getOrThrow<string>('EVENT_SERVICE_URL');
  }

  /**
   * 이벤트 목록 조회
   * GET /event/internal/user-event
   */
  async getEvents(options: GetEventsOptions): Promise<GetEventsResponse> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${this.baseUrl}/event/internal/user-event`,
      params: options,
    };

    return lastValueFrom(
      this.httpService.request<GetEventsResponse>(config).pipe(
        map(this.responseHandler),
        catchError((e) => throwError(() => this.errorHandler(e, '이벤트 목록 조회'))),
      ),
    );
  }

  /**
   * 보상 목록 조회
   * GET /event/internal/rewards
   */
  async getRewards(options: GetRewardsOptions): Promise<GetRewardsResponse> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${this.baseUrl}/event/internal/rewards`,
      params: options,
    };

    return lastValueFrom(
      this.httpService.request<GetRewardsResponse>(config).pipe(
        map(this.responseHandler),
        catchError((e) => throwError(() => this.errorHandler(e, '보상 목록 조회'))),
      ),
    );
  }

  /**
   * 보상 요청 내역 조회
   * GET /event/internal/request-reward
   */
  async getRewardRequests(options: GetRewardRequestsOptions): Promise<GetRewardRequestsResponse> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${this.baseUrl}/event/internal/request-reward`,
      params: options,
    };

    return lastValueFrom(
      this.httpService.request<GetRewardRequestsResponse>(config).pipe(
        map(this.responseHandler),
        catchError((e) => throwError(() => this.errorHandler(e, '보상 요청 내역 조회'))),
      ),
    );
  }

  /**
   * 이벤트 보상 지급요청
   * POST /event/internal/request-reward
   */
  async requestReward(options: RequestRewardOptions): Promise<RequestRewardResponse> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${this.baseUrl}/event/internal/request-reward`,
      data: options,
    };

    return lastValueFrom(
      this.httpService.request<RequestRewardResponse>(config).pipe(
        map(this.responseHandler),
        catchError((e) => throwError(() => this.errorHandler(e, '이벤트 보상 지급요청'))),
      ),
    );
  }

  /**
   * [관리자] 이벤트 생성
   * POST /event/admin/user-event
   */
  async createEvent(options: CreateEventOptions): Promise<CreateEventResponse> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${this.baseUrl}/event/admin/user-event`,
      data: options,
    };

    return lastValueFrom(
      this.httpService.request<CreateEventResponse>(config).pipe(
        map(this.responseHandler),
        catchError((e) => throwError(() => this.errorHandler(e, '[관리자] 이벤트 생성'))),
      ),
    );
  }

  /**
   * [관리자] 이벤트 보상 추가
   * POST /event/admin/reward
   */
  async createReward(options: CreateRewardOptions): Promise<CreateRewardResponse> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${this.baseUrl}/event/admin/reward`,
      data: options,
    };

    return lastValueFrom(
      this.httpService.request<CreateRewardResponse>(config).pipe(
        map(this.responseHandler),
        catchError((e) => throwError(() => this.errorHandler(e, '[관리자] 이벤트 보상 추가'))),
      ),
    );
  }

  /**
   * [관리자] 이벤트 보상 요청내역 조회
   * GET /event/admin/reward-request
   */
  async getAdminRewardRequests(options: GetAdminRewardRequestsOptions): Promise<GetAdminRewardRequestsResponse> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${this.baseUrl}/event/admin/reward-request`,
      params: options,
    };

    return lastValueFrom(
      this.httpService.request<GetAdminRewardRequestsResponse>(config).pipe(
        map(this.responseHandler),
        catchError((e) => throwError(() => this.errorHandler(e, '[관리자] 이벤트 보상 요청내역 조회'))),
      ),
    );
  }

  /**
   * [관지라] 보상 승인/거절 처리
   * PATCH /event/admin/reward-request/{id}/approve
   */
  async approveRewardRequest(options: ApproveRewardRequestOptions): Promise<ApproveRewardRequestResponse> {
    const { id, ...data } = options;
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      url: `${this.baseUrl}/event/admin/reward-request/${id}/approve`,
      data,
    };

    return lastValueFrom(
      this.httpService.request<ApproveRewardRequestResponse>(config).pipe(
        map(this.responseHandler),
        catchError((e) => throwError(() => this.errorHandler(e, '[관리자] 보상 승인/거절 처리'))),
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
    if (error instanceof EventApiException) throw error;

    let errorMessage = `${source} 호출 중 오류`;
    let errorCode = 'AUTH_API_ERROR';
    let statusCode = 500;
    let data = null;

    if (error instanceof AxiosError) {
      errorMessage += ` [${error.response?.data?.error?.message}]`;
      errorCode = error.response?.data?.error?.name ?? errorCode;
      statusCode = error.response?.status ?? statusCode;
      data = error.response?.data ?? data;
    } else if (error instanceof Error) {
      errorMessage += ` [${error.message}]`;
    }

    throw new EventApiException(errorMessage, errorCode, statusCode, data);
  }
}
