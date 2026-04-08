import { Controller, Delete, Param, Post } from '@nestjs/common';
import { FollowService } from './follow.service';
import {ApiTags, ApiOperation, ApiResponse, ApiParam} from '@nestjs/swagger';

@ApiTags('User Following')
@Controller('user/:id/follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @ApiOperation({
    summary: 'Follow a user',
    description: 'Creates a following relationship between the authenticated user and the target user'
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the user to follow',
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully followed the user',
    schema: {
      example: {
        followerId: '123e4567-e89b-12d3-a456-426614174000',
        followingId: '987fcdeb-a432-56gh-i789-012345678901',
        createdAt: '2025-07-28T12:00:00Z'
      }
    }
  })
  @ApiResponse({status: 400, description: 'Invalid user ID'})
  @ApiResponse({status: 404, description: 'User not found'})
  @Post()
  follow(@Param('id') id: string) {
    return this.followService.follow(+id);
  }

  @ApiOperation({
    summary: 'Unfollow a user',
    description: 'Removes the following relationship between the authenticated user and the target user'
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the user to unfollow',
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully unfollowed the user'
  })
  @ApiResponse({status: 400, description: 'Invalid user ID'})
  @ApiResponse({status: 404, description: 'User not found'})
  @Delete()
  unfollow(@Param('id') id: string) {
    return this.followService.unfollow(+id);
  }
}
