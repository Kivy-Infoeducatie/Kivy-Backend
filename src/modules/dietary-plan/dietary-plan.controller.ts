import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiBody} from '@nestjs/swagger';
import { DietaryPlanService } from './dietary-plan.service';
import { CreateDietaryPlanDto } from './dto/create-dietary-plan.dto';
import { UpdateDietaryPlanDto } from './dto/update-dietary-plan.dto';
import { LogCaloriesDto } from './dto/log-calories.dto';

@ApiTags('Dietary Plan')
@Controller('dietary-plan')
export class DietaryPlanController {
  constructor(private readonly dietaryPlanService: DietaryPlanService) {}

  @ApiOperation({
    summary: 'Get caloric target',
    description: 'Retrieves the user\'s daily caloric target and current progress'
  })
  @ApiResponse({
    status: 200,
    description: 'Target information retrieved successfully',
    schema: {
      example: {
        dailyTarget: 2000,
        currentIntake: 1500,
        remaining: 500
      }
    }
  })
  @Get('target')
  getTarget() {
    return this.dietaryPlanService.getTarget();
  }

  @ApiOperation({
    summary: 'Get calorie logs',
    description: 'Retrieves all caloric intake logs for the current user'
  })
  @ApiResponse({
    status: 200,
    description: 'Calorie logs retrieved successfully',
    schema: {
      example: [{
        id: 1,
        calories: 500,
        description: 'Lunch',
        timestamp: '2025-07-28T12:00:00Z'
      }]
    }
  })
  @Get('log')
  getLogs() {
    return this.dietaryPlanService.getLogs();
  }

  @ApiOperation({
    summary: 'Log calories',
    description: 'Records a new caloric intake entry'
  })
  @ApiBody({
    type: LogCaloriesDto,
    examples: {
      example1: {
        value: {
          calories: 500,
          description: 'Lunch'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Calories logged successfully',
    schema: {
      example: {
        id: 1,
        calories: 500,
        description: 'Lunch',
        timestamp: '2025-07-28T12:00:00Z'
      }
    }
  })
  @Post('log')
  logCalories(@Body() logCaloriesDto: LogCaloriesDto) {
    return this.dietaryPlanService.logCalories(logCaloriesDto);
  }

  @ApiOperation({
    summary: 'Log recipe calories',
    description: 'Records caloric intake from a specific recipe'
  })
  @ApiResponse({
    status: 201,
    description: 'Recipe calories logged successfully',
    schema: {
      example: {
        id: 1,
        recipeId: 123,
        calories: 750,
        timestamp: '2025-07-28T12:00:00Z'
      }
    }
  })
  @Post('log/recipe/:id')
  logRecipe(@Param('id') id: string) {
    return this.dietaryPlanService.logRecipe(+id);
  }

  @ApiOperation({
    summary: 'Create dietary plan',
    description: 'Creates a new dietary plan with specified caloric targets and preferences'
  })
  @ApiBody({
    type: CreateDietaryPlanDto,
    examples: {
      example1: {
        value: {
          dailyTarget: 2000,
          preferences: ['low-carb', 'high-protein']
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Dietary plan created successfully'
  })
  @Post()
  create(@Body() createDietaryPlanDto: CreateDietaryPlanDto) {
    return this.dietaryPlanService.create(createDietaryPlanDto);
  }

  @ApiOperation({
    summary: 'Get all dietary plans',
    description: 'Retrieves all dietary plans for the current user'
  })
  @ApiResponse({
    status: 200,
    description: 'List of dietary plans retrieved successfully'
  })
  @Get()
  findAll() {
    return this.dietaryPlanService.findAll();
  }

  @ApiOperation({
    summary: 'Get specific dietary plan',
    description: 'Retrieves a specific dietary plan by ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Dietary plan retrieved successfully'
  })
  @ApiResponse({status: 404, description: 'Dietary plan not found'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dietaryPlanService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update dietary plan',
    description: 'Updates an existing dietary plan'
  })
  @ApiBody({
    type: UpdateDietaryPlanDto,
    examples: {
      example1: {
        value: {
          dailyTarget: 2200,
          preferences: ['vegetarian']
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Dietary plan updated successfully'
  })
  @ApiResponse({status: 404, description: 'Dietary plan not found'})
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDietaryPlanDto: UpdateDietaryPlanDto
  ) {
    return this.dietaryPlanService.update(+id, updateDietaryPlanDto);
  }

  @ApiOperation({
    summary: 'Delete dietary plan',
    description: 'Removes a dietary plan by ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Dietary plan deleted successfully'
  })
  @ApiResponse({status: 404, description: 'Dietary plan not found'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dietaryPlanService.remove(+id);
  }
}
