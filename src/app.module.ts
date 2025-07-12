import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UserController } from './controllers/user.controller';
import { userRepository } from './repositories/user.repository';
import { prismaUserRepository } from './repositories/prismaRepository/prismaUserRepository';
import { userService } from './services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './controllers/auth.controller';
import { accountModule } from './modules/account/account.module';
import { CategoryModule } from './modules/category/category.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { goalModule } from './modules/goals/goal.module';


@Module({
  imports: [AuthModule,accountModule,TransactionModule,CategoryModule,goalModule],
  controllers: [UserController],
  providers: [PrismaService,userService,
    {
      provide:userRepository,
      useClass:prismaUserRepository
    },
    JwtService,
  ],
})
export class AppModule {}
