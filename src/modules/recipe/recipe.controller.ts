import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode
} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery} from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { SearchRecipeDto } from './dto/search-recipe.dto';

@ApiTags('Recipes')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @ApiOperation({
    summary: 'Create a new recipe',
    description: 'Creates a new recipe with the provided details including ingredients, instructions, and nutritional information'
  })
  @ApiBody({
    type: CreateRecipeDto,
    description: 'Recipe creation payload',
    examples: {
      example1: {
        summary: 'Basic Recipe',
        value: {
          title: 'Chocolate Chip Cookies',
          description: 'Classic homemade cookies',
          ingredients: ['flour', 'sugar', 'chocolate chips'],
          instructions: ['Mix ingredients', 'Bake at 350°F'],
          preparationTime: 30,
          servings: 12
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Recipe created successfully'
  })
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @ApiOperation({
    summary: 'Search recipes',
    description: 'Search recipes using various criteria with cursor-based pagination'
  })
  @ApiBody({type: SearchRecipeDto})
  @ApiQuery({
    name: 'cursor',
    required: false,
    type: String,
    description: 'Pagination cursor'
  })
  @ApiResponse({
    status: 200,
    description: 'Search results retrieved successfully'
  })
  @Post('search')
  @HttpCode(200)
  search(
    @Body() searchRecipeDto: SearchRecipeDto,
    @Query('cursor') cursor?: string
  ) {
    return this.recipeService.search(searchRecipeDto, +(cursor ?? 0));
  }

  @ApiOperation({
    summary: 'Get all recipes',
    description: 'Retrieves a list of all available recipes'
  })
  @ApiResponse({
    status: 200,
    description: 'List of recipes retrieved successfully'
  })
  @Get()
  findMany() {
    return this.recipeService.findMany();
  }

  @ApiOperation({
    summary: 'Get recommended recipes',
    description: 'Retrieves personalized recipe recommendations based on user preferences and history'
  })
  @ApiResponse({
    status: 200,
    description: 'Recommended recipes retrieved successfully'
  })
  @Get('recommend')
  recommend() {
    return this.recipeService.recommend();
  }

  @ApiOperation({
    summary: 'Get liked recipes',
    description: 'Retrieves all recipes liked by the current user with pagination'
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    type: String,
    description: 'Pagination cursor'
  })
  @ApiResponse({
    status: 200,
    description: 'Liked recipes retrieved successfully'
  })
  @Get('liked')
  getLikedRecipes(@Query() cursor?: string) {
    return this.recipeService.getLikedRecipes(+(cursor ?? 0));
  }

  @ApiOperation({
    summary: 'Get featured recipes',
    description: 'Retrieves a curated list of featured recipes'
  })
  @ApiResponse({
    status: 200,
    description: 'Featured recipes retrieved successfully'
  })
  @Get('featured')
  getFeaturedRecipes() {
    return this.recipeService.getFeaturedRecipes();
  }

  @ApiOperation({
    summary: 'Get recipe by ID',
    description: 'Retrieves detailed information about a specific recipe'
  })
  @ApiParam({
    name: 'id',
    description: 'Recipe ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Recipe retrieved successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not found'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update recipe',
    description: 'Updates an existing recipe with new information'
  })
  @ApiParam({
    name: 'id',
    description: 'Recipe ID'
  })
  @ApiBody({type: UpdateRecipeDto})
  @ApiResponse({
    status: 200,
    description: 'Recipe updated successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not found'
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @ApiOperation({
    summary: 'Delete recipe',
    description: 'Removes a recipe from the system'
  })
  @ApiParam({
    name: 'id',
    description: 'Recipe ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Recipe deleted successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not found'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
