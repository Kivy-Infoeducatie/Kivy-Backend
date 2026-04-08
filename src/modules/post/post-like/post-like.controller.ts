import { Controller, Delete, Param, Post } from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import {ApiTags, ApiOperation, ApiResponse, ApiParam} from '@nestjs/swagger';

@ApiTags('Post Likes')
@Controller('post/:id/like')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) {}

  @ApiOperation({
    summary: 'Like a post',
    description: 'Adds a like to the specified post for the currently authenticated user. If the user has already liked the post, the request will be ignored.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the post to like',
    type: 'string',
    example: '123'
  })
  @ApiResponse({
    status: 200,
    description: 'Post liked successfully',
    schema: {
      example: {
        success: true,
        message: 'Post liked successfully',
        postId: '123',
        likesCount: 42
      }
    }
  })
  @ApiResponse({status: 404, description: 'Post not found'})
  @Post()
  like(@Param('id') id: string) {
    return this.postLikeService.like(+id);
  }

  @ApiOperation({
    summary: 'Unlike a post',
    description: 'Removes the like from the specified post for the currently authenticated user. If the user has not liked the post, the request will be ignored.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the post to unlike',
    type: 'string',
    example: '123'
  })
  @ApiResponse({
    status: 200,
    description: 'Post unliked successfully',
    schema: {
      example: {
        success: true,
        message: 'Post unliked successfully',
        postId: '123',
        likesCount: 41
      }
    }
  })
  @ApiResponse({status: 404, description: 'Post not found'})
  @Delete()
  unlike(@Param('id') id: string) {
    return this.postLikeService.unlike(+id);
  }
}
