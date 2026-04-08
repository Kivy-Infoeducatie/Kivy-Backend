import { Body, Controller, Param, Post } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiBody} from '@nestjs/swagger';
import { IntelligenceService } from './intelligence.service';
import { ScanToCreateDto } from './dto/scan-to-create.dto';
import { ScanToLogDto } from './dto/scan-to-log.dto';
import { ModifyRecipeDto } from './dto/modify-recipe.dto';

@ApiTags('Intelligence')
@Controller('intelligence')
export class IntelligenceController {
  constructor(private readonly intelligenceService: IntelligenceService) {}

  @ApiOperation({
    summary: 'Generate recipe from food image',
    description: 'Analyzes a food image and generates a complete recipe including ingredients, instructions, and nutritional information'
  })
  @ApiBody({
    type: ScanToCreateDto,
    description: 'Image data for recipe generation',
    examples: {
      example1: {
        summary: 'Image scan request',
        value: {
          image: 'base64_encoded_image_data',
          preferences: ['vegetarian', 'low-carb']
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Recipe generated successfully',
    schema: {
      example: {
        id: 123,
        name: 'Grilled Vegetable Salad',
        ingredients: ['zucchini', 'bell peppers', 'olive oil'],
        instructions: ['Slice vegetables', 'Grill until tender'],
        nutritionalInfo: {calories: 250, protein: 5, carbs: 15}
      }
    }
  })
  @Post('scan-to-create')
  scanToCreateRecipe(@Body() scanToCreateDto: ScanToCreateDto) {
    return this.intelligenceService.scanToCreateRecipe(scanToCreateDto);
  }

  @ApiOperation({
    summary: 'Log meal from food image',
    description: 'Analyzes a food image to estimate nutritional content and logs it as a meal'
  })
  @ApiBody({
    type: ScanToLogDto,
    description: 'Image data for meal logging',
    examples: {
      example1: {
        summary: 'Meal scan request',
        value: {
          image: 'base64_encoded_image_data',
          mealType: 'lunch'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Meal logged successfully',
    schema: {
      example: {
        id: 456,
        mealType: 'lunch',
        calories: 650,
        nutrients: {
          protein: 25,
          carbs: 65,
          fat: 22
        },
        timestamp: '2025-07-28T12:00:00Z'
      }
    }
  })
  @Post('scan-to-log')
  scanToLogMeal(@Body() scanToLogDto: ScanToLogDto) {
    return this.intelligenceService.scanToLogMeal(scanToLogDto);
  }

  @ApiOperation({
    summary: 'Modify existing recipe',
    description: 'Modifies an existing recipe based on dietary preferences, restrictions, or portion size'
  })
  @ApiBody({
    type: ModifyRecipeDto,
    description: 'Recipe modification parameters',
    examples: {
      example1: {
        summary: 'Recipe modification request',
        value: {
          modifications: ['gluten-free', 'dairy-free'],
          servings: 4
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Recipe modified successfully',
    schema: {
      example: {
        id: 789,
        originalId: 123,
        modifications: ['gluten-free', 'dairy-free'],
        ingredients: ['gluten-free flour', 'almond milk'],
        instructions: ['Mix dry ingredients', 'Add wet ingredients'],
        nutritionalInfo: {calories: 300, protein: 8, carbs: 45}
      }
    }
  })
  @ApiResponse({status: 404, description: 'Recipe not found'})
  @Post('modify-recipe/:id')
  modifyRecipe(
    @Param('id') id: string,
    @Body() modifyRecipeDto: ModifyRecipeDto
  ) {
    return this.intelligenceService.modifyRecipe(+id, modifyRecipeDto);
  }
}
