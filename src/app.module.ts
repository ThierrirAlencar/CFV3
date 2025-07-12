import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UserController } from './controllers/user.controller';
import { userService } from './services/user.service';
import { userRepository } from './repositories/user.repository';
import { prismaUserRepository } from './repositories/prismaRepository/prismaUserRepository';


@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService,userService,
    {
      provide:userRepository,
      useClass:prismaUserRepository
    }
  ],
})
export class AppModule {}
