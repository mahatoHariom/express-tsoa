import { inject } from 'inversify';
import {
  Body,
  Controller,
  Middlewares,
  Post,
  Route,
  Tags,
} from 'tsoa';
import { provideSingleton } from '../../ioc/provide-singleton';
import { CreateUserDto, LoginBodyDto } from './dto/login-body.dto';
import { AuthService } from './auth.service';
import { UserEntity, UserServiceResponseDto } from '../../domain/user/dto/user-service-response.dto';
import { validateRequestBody } from '../../middlewares/validate-request-body';
import { plainToClass } from 'class-transformer';
import { sendResponse } from '../../common/responses/responseWrapper';



@Tags('Auth')
@Route('/auth')
@provideSingleton(AuthController)
export class AuthController extends Controller {
  constructor(@inject(AuthService) private readonly authService: AuthService) {
    super();
  }


  @Post("/register")
  @Middlewares(validateRequestBody(CreateUserDto))
  async createUser(@Body() body:CreateUserDto):Promise<UserEntity>{
    const user= await this.authService.register(body)
    return sendResponse<UserEntity>(user,UserEntity)
  }
}
