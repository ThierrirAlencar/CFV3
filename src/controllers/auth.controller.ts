import { Body, Controller, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { loginUserBody } from 'src/dtos/login-user';
import { EntityDoesNotExistsError } from 'src/errors/entityDoesNotExists.error';
import { validationError } from 'src/errors/validationError.error copy';
import { authService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: authService) {}

  @Patch('/')
  async signin(@Body() body: loginUserBody) {
    const { email, password } = body;

    try {
      const login = await this.authService.login(email, password);

      return {
        status: HttpStatus.CREATED,
        meta: {
          token:login.access_token
        },
        body: { email },
        date: new Date(),
      };
    } catch (err) {
        if(err instanceof EntityDoesNotExistsError) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                body: { email, password },
                error: {
                    message: err.message,
                    name: err.name,
                    classtype: "EntityDoesNotExistsError".toUpperCase()
                },
                date: new Date()
            }, HttpStatus.NOT_FOUND);
        }else if(err instanceof validationError) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                body: { email, password },
                error: {
                    message: err.message,
                    name: err.name,
                    classtype: "ValidationError".toUpperCase()
                },
                date: new Date()
            }, HttpStatus.BAD_REQUEST);
        }else{
            throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: { email, password },
            error: {
            message: err.message,
            name: err.name,
            classtype: 'INTERNAL_SERVER_ERROR',
            class: String(err),
            },
            date: new Date(),
        }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
  }

}
