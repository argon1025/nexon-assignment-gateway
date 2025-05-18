import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { UpdateUserAdminReq, UpdateUserAdminRes } from './dto/update-user.dto';
import { UserAdminService } from './user.service';
import { Roles } from '../../common/decorator/role.decorator';
import { ErrorResponse } from '../../common/dto/error-response.dto';
import { UserRole } from '../../common/enum/common.enum';

@ApiTags('[관리] 사용자')
@Controller('gateway/admin/user')
@ApiBearerAuth('access-token')
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) {}

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: '사용자 정보 수정',
    description: '[관리자] 사용자 정보를 수정합니다.',
  })
  @ApiBadRequestResponse({ description: '[PARAMETER_INVALID] 유효하지 않은 파라미터', type: ErrorResponse })
  @ApiUnauthorizedResponse({
    description: `
    - [INVALID_TOKEN] 토큰정보 유효하지 않음
    - [FORBIDDEN] 접근 권한이 없음
    `,
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({ description: '[GATEWAY_100005] 존재하지 않는 사용자', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[INTERNAL_SERVER_ERROR] 서버 오류', type: ErrorResponse })
  async updateUser(@Body() body: UpdateUserAdminReq, @Param('id') id: string) {
    return plainToInstance(UpdateUserAdminRes, await this.userAdminService.updateUser({ ...body, id }));
  }
}
