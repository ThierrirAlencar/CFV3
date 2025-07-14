import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { loginUserBody } from 'src/interface/dtos/login-user';
import { EntityDoesNotExistsError } from 'src/errors/entityDoesNotExists.error';
import { validationError } from 'src/errors/validationError.error copy';
import { authService } from 'src/services/auth/auth.service';
import { mailService } from 'src/services/auth/mail.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { userService } from 'src/services/user/user.service';
import { couldNotsendEmailError } from 'src/errors/emailCouldNotBeSent.error';
import z from 'zod';
import { InvalidInformationProvided } from 'src/errors/invalidInformationProvided.error';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: authService,
    private mailService: mailService,
    private userService: userService,
  ) {}

  @Patch('/')
  async signin(@Body() body: loginUserBody) {
    const { email, password } = body;

    try {
      const login = await this.authService.login(email, password);

      return {
        status: HttpStatus.CREATED,
        meta: {
          token: login.access_token,
        },
        body: { email },
        date: new Date(),
      };
    } catch (err) {
      if (err instanceof EntityDoesNotExistsError) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            body: { email, password },
            error: {
              message: err.message,
              name: err.name,
              classtype: 'EntityDoesNotExistsError'.toUpperCase(),
            },
            date: new Date(),
          },
          HttpStatus.NOT_FOUND,
        );
      } else if (err instanceof validationError) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            body: { email, password },
            error: {
              message: err.message,
              name: err.name,
              classtype: 'ValidationError'.toUpperCase(),
            },
            date: new Date(),
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: { email, password },
            error: {
              message: err.message,
              name: err.name,
              classtype: 'INTERNAL_SERVER_ERROR',
              class: String(err),
            },
            date: new Date(),
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @UseGuards(AuthGuard)
  @Post('/email')
  async sendEmail(@Request() req) {
    const userId = req.user.sub;

    try {
      const { email } = await this.userService.profile(userId);

      //enviar email
      const code = await this.mailService.sendRecoveryEmail(email);
      return {
        status: HttpStatus.OK,
        params: {
          email,
        },
        data: {
          codeString: code,
        },
        date: new Date().toISOString(),
      };
    } catch (err) {
      if (err instanceof couldNotsendEmailError) {
        throw new HttpException(
          {
            status: 550,
            Description:
              'Message not taken or rejected. Issue in nodemailer execution likely means that the mailbox is unsafe or unusable',
            error: {
              message: err.message,
              name: err.name,
              class: String(err),
              classType: 'couldNotsendEmailError'.toUpperCase(),
            },
            date: new Date(),
          },
          550,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            bearer: req.user,
            error: {
              message: err.message,
              name: err.name,
              classtype: 'INTERNAL_SERVER_ERROR',
              class: String(err),
            },
            date: new Date(),
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Put('/email')
  async updateUserPassword(@Req() req) {
    const { newPassword, passport, refString } = z
      .object({
        passport: z.string(),
        refString: z.string(),
        newPassword: z.string(),
      })
      .parse(req.body);

    try {
      const response = await this.mailService.updateUserPasswordBasedInPassword(
        refString,
        passport,
        newPassword,
      );

      return {
        status: HttpStatus.OK,
        params: {
          newPassword,
          passport,
          refString,
        },
        data: response,
        date: new Date().toISOString(),
      };
    } catch (err) {
      if (err instanceof EntityDoesNotExistsError) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            body: { refString, passport, newPassword },
            error: {
              message: err.message,
              name: err.name,
              classtype: 'EntityDoesNotExistsError'.toUpperCase(),
            },
            date: new Date(),
          },
          HttpStatus.NOT_FOUND,
        );
      } else if (err instanceof InvalidInformationProvided) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            body: { refString, passport, newPassword },
            error: {
              message: err.message,
              name: err.name,
              classtype: 'InvalidInformationProvided'.toUpperCase(),
            },
            date: new Date(),
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            bearer: req.user,
            error: {
              message: err.message,
              name: err.name,
              classtype: 'INTERNAL_SERVER_ERROR',
              class: String(err),
            },
            date: new Date(),
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
