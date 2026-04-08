import { Controller, Get, Body, Patch } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import {ApiTags, ApiOperation, ApiResponse, ApiBody} from '@nestjs/swagger';

@ApiTags('Preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @ApiOperation({
    summary: 'Get user preferences',
    description: 'Retrieves the dietary restrictions, nutrition goals, and allergen information for the currently authenticated user'
  })
  @ApiResponse({
    status: 200,
    description: 'User preferences retrieved successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        dietary: {
          restrictions: ['vegetarian'],
          allergens: ['peanuts', 'shellfish'],
          intolerances: ['lactose']
        },
        nutrition: {
          dailyCalories: 2000,
          macros: {
            protein: 30,
            carbs: 50,
            fats: 20
          }
        },
        measurements: {
          system: 'metric',
          weight: 'kg',
          height: 'cm'
        },
        updatedAt: '2025-07-28T12:00:00Z'
      }
    }
  })
  @Get()
  findOne() {
    return this.preferencesService.findOne();
  }

  @ApiOperation({
    summary: 'Update user preferences',
    description: 'Updates the dietary restrictions, nutrition goals, and allergen information for the currently authenticated user'
  })
  @ApiBody({
    type: UpdatePreferenceDto,
    description: 'User preferences update payload',
    examples: {
      example1: {
        summary: 'Update dietary and nutrition preferences',
        value: {
          dietary: {
            restrictions: ['vegan'],
            allergens: ['tree-nuts', 'soy'],
            intolerances: ['gluten']
          },
          nutrition: {
            dailyCalories: 1800,
            macros: {
              protein: 25,
              carbs: 55,
              fats: 20
            }
          },
          measurements: {
            system: 'imperial',
            weight: 'lb',
            height: 'in'
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Preferences updated successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        dietary: {
          restrictions: ['vegan'],
          allergens: ['tree-nuts', 'soy'],
          intolerances: ['gluten']
        },
        nutrition: {
          dailyCalories: 1800,
          macros: {
            protein: 25,
            carbs: 55,
            fats: 20
          }
        },
        measurements: {
          system: 'imperial',
          weight: 'lb',
          height: 'in'
        },
        updatedAt: '2025-07-28T12:00:00Z'
      }
    }
  })
  @ApiResponse({status: 400, description: 'Invalid input data'})
  @Patch()
  update(@Body() updatePreferenceDto: UpdatePreferenceDto) {
    return this.preferencesService.update(updatePreferenceDto);
  }
}
