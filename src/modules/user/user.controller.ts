import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import {ApiTags, ApiOperation, ApiResponse, ApiParam} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieves detailed user information based on the provided user ID. This endpoint returns user details including profile information and account status.'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user',
    example: '123'
  })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
    schema: {
      example: {
        id: 123,
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        createdAt: '2025-07-28T12:00:00Z'
      }
    }
  })
  @ApiResponse({status: 404, description: 'User not found'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
