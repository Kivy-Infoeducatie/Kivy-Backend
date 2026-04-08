import { Controller, Delete, Param, Post } from '@nestjs/common';
import { RecipeLikeService } from './recipe-like.service';
import {ApiTags, ApiOperation, ApiResponse, ApiParam} from '@nestjs/swagger';

@ApiTags('Recipe Likes')
@Controller('recipe/:id/like')
export class RecipeLikeController {
  constructor(private readonly recipeLikeService: RecipeLikeService) {}

  @Post()
  @ApiOperation({
    summary: 'Like a recipe',
    description: 'Adds the current user to the list of users who liked the specified recipe'
  })
  @ApiParam({
    name: 'id',
    description: 'Recipe ID',
    example: '123'
  })
  @ApiResponse({
    status: 200,
    description: 'Recipe liked successfully',
    schema: {
      example: {
        recipeId: 123,
        liked: true,
        likesCount: 42
      }
    }
  })
  @ApiResponse({status: 404, description: 'Recipe not found'})
  like(@Param('id') id: string) {
    return this.recipeLikeService.like(+id);
  }

  @Delete()
  @ApiOperation({
    summary: 'Unlike a recipe',
    description: 'Removes the current user from the list of users who liked the specified recipe'
  })
  @ApiParam({
    name: 'id',
    description: 'Recipe ID',
    example: '123'
  })
  @ApiResponse({
    status: 200,
    description: 'Recipe unliked successfully',
    schema: {
      example: {
        recipeId: 123,
        liked: false,
        likesCount: 41
      }
    }
  })
  @ApiResponse({status: 404, description: 'Recipe not found'})
  unlike(@Param('id') id: string) {
    return this.recipeLikeService.unlike(+id);
  }
}
