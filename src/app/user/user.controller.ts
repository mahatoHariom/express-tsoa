/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from 'inversify';
import { Body, Controller, Middlewares, Path, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { UserCreateRequestDto } from './dto/user-create.request.dto';
import { validateRequestBody } from '../../middlewares/validate-request-body';
import { UserService } from '../../domain/user/user.sevice';
import { provideSingleton } from '../../ioc/provide-singleton';
import { ErrorResponsePayload } from '../../common/responses/error-response-payload';

@Tags('/user')
@Route('/{teamId}/user')
@provideSingleton(UserController)
export class UserController extends Controller {
  constructor(@inject(UserService) private readonly userService: UserService) {
    super();
  }

  /**
   * @summary 회원가입
   */
  @Post('/')
  @SuccessResponse(201, 'Created')
  @Response<ErrorResponsePayload>('400', 'BadRequest')
  @Response<ErrorResponsePayload>('409', 'ConflictException')
  @Middlewares(validateRequestBody(UserCreateRequestDto))
  async create(@Path('teamId') teamId: string, @Body() body: UserCreateRequestDto) {
    const user = await this.userService.create({  ...body });
    return user;
  }
}
