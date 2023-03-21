import { NestFactory } from '@nestjs/core';
import { CreateUserDto, UserRole, UserService } from '../@core/modules/user';
import { AppModule } from '../modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userService = await app.get(UserService);

  await userService.clearCollection();

  const users: CreateUserDto[] = [
    {
      name: 'Admin',
      role: UserRole.USER,
    },
    {
      name: 'CPU 1',
      role: UserRole.BOT,
    },
    {
      name: 'CPU 2',
      role: UserRole.BOT,
    },
    {
      name: 'CPU 3',
      role: UserRole.BOT,
    },
    {
      name: 'CPU 4',
      role: UserRole.BOT,
    },
    {
      name: 'CPU 5',
      role: UserRole.BOT,
    },
    {
      name: 'CPU 6',
      role: UserRole.BOT,
    },
  ];

  await userService.createMany(users);

  app.close();
}
bootstrap();
