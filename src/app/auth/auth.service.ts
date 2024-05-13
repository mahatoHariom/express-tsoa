import { inject } from 'inversify';
import { UserService } from '../../domain/user/user.sevice';
import { provideSingleton } from '../../ioc/provide-singleton';
import { CreateUserDto } from './dto/login-body.dto';
import { User } from '@prisma/client';


@provideSingleton(AuthService)
export class AuthService {
  constructor(@inject(UserService) private readonly userService: UserService) {}

  async register(data:CreateUserDto){
    const user=await this.userService.create(data)
    return user
  }
}
