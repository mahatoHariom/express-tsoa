import { inject } from 'inversify';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from './user.repository';
import { provideSingleton } from '../../ioc/provide-singleton';
import { createHashedPassword } from '../../utils/create-hashed-password';
import { UserEntity, UserServiceResponseDto } from './dto/user-service-response.dto';
import { ConflictException } from '../../common/exceptions/conflict-exception';
import { NotFoundUserException } from './exceptions/not-found-user-exception';
import { BadRequestException } from '../../common/exceptions/bad-request-exception';
import { plainToClass } from 'class-transformer';

@provideSingleton(UserService)
export class UserService {
  constructor(@inject(UserRepository) private readonly userRepository: UserRepository) {}

  async create(data: Prisma.UserCreateInput) {
    const user = await this.getByEmail({ email: data.email }).catch((e: NotFoundUserException) => {
      if (e instanceof NotFoundUserException) return null;
      throw e;
    });

    if (user) {
      throw new ConflictException('User with email already exist');
    }

    const hashedPassword = createHashedPassword(data.password);
    const newUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    return newUser
   
  }

  async validate({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundUserException();
    }

    const hashedPassword = createHashedPassword(password);
    if (user.password !== hashedPassword) {
      throw new BadRequestException('비밀번호가 올바르지 않습니다.');
    }

    return new UserServiceResponseDto(user);
  }

  async getByEmail({ email }: { email: string }) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundUserException();
    }

    return new UserServiceResponseDto(user);
  }

  async getById({ id, teamId }: { id: number; teamId: string }) {
    const user = await this.userRepository.getById({ id, teamId });

    if (!user) {
      throw new NotFoundUserException();
    }

    return new UserServiceResponseDto(user);
  }


}
