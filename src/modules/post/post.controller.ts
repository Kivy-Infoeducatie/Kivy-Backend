import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  Query
} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiBody} from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: 'Create a new post',
    description: 'Creates a new post with the provided content and associates it with a recipe'
  })
  @ApiBody({
    type: CreatePostDto,
    description: 'Post creation payload',
    examples: {
      example1: {
        summary: 'Basic post',
        value: {
          content: 'This recipe was amazing! Will definitely make it again.',
          rating: 5,
          recipeId: 123
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
    schema: {
      example: {
        id: 1,
        content: 'This recipe was amazing! Will definitely make it again.',
        rating: 5,
        recipeId: 123,
        createdAt: '2025-07-28T12:00:00Z'
      }
    }
  })
  @ApiResponse({status: 400, description: 'Invalid input data'})
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({
    summary: 'Get multiple posts',
    description: 'Retrieves a paginated list of posts using cursor-based pagination'
  })
  @ApiResponse({
    status: 200,
    description: 'Posts retrieved successfully',
    schema: {
      example: {
        items: [
          {
            id: 1,
            content: 'This recipe was amazing!',
            rating: 5,
            recipeId: 123,
            createdAt: '2025-07-28T12:00:00Z'
          }
        ],
        nextCursor: '2'
      }
    }
  })
  @Get()
  findMany(@Query() cursor?: string) {
    return this.postService.findMany(+(cursor ?? 0));
  }

  @ApiOperation({
    summary: 'Update a post',
    description: 'Updates an existing post with the provided content'
  })
  @ApiBody({
    type: UpdatePostDto,
    description: 'Post update payload',
    examples: {
      example1: {
        summary: 'Update post content',
        value: {
          content: 'Updated: This recipe was good but needed more seasoning.',
          rating: 4
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Post updated successfully',
    schema: {
      example: {
        id: 1,
        content: 'Updated: This recipe was good but needed more seasoning.',
        rating: 4,
        updatedAt: '2025-07-28T12:00:00Z'
      }
    }
  })
  @ApiResponse({status: 404, description: 'Post not found'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiOperation({
    summary: 'Delete a post',
    description: 'Removes a post by its ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Post deleted successfully'
  })
  @ApiResponse({status: 404, description: 'Post not found'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
