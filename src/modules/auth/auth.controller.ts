import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiOperation({
    description: 'Authenticates user credentials and returns a JWT token upon successful login. The token should be included in subsequent requests as a Bearer token in the Authorization header.',
    summary: 'User Authentication'
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'user@example.com',
        username: 'john_doe',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  })
  @ApiResponse({status: 401, description: 'Invalid credentials'})
  async organizationLogin(@Request() req: any) {
    return req.user;
  }

  @Post('register')
  @Public()
  @ApiOperation({
    description: 'Creates a new user account after validating email and username uniqueness. The password must meet strong password requirements, and the username must follow specific constraints.',
    summary: 'User Registration'
  })
  @ApiBody({
    type: RegisterDto,
    description: 'User registration details',
    examples: {
      example1: {
        summary: 'Standard Registration',
        value: {
          email: 'john.doe@example.com',
          username: 'john_doe',
          firstName: 'John',
          lastName: 'Doe',
          password: 'StrongP@ssw0rd!'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Registration successful',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'john.doe@example.com',
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe'
      }
    }
  })
  @ApiResponse({status: 400, description: 'Invalid input or duplicate email/username'})
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
