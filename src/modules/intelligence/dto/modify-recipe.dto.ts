import { IsString, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ModifyRecipeDto {
  @ApiProperty({
    description: 'Message describing the desired recipe modifications',
    example: 'Make this recipe vegetarian and reduce the calories',
    minLength: 1
  })
  @Validate((value: string) => value.trim() !== '', {
    message: 'message should not be empty after trimming'
  })
  @IsString()
  message: string;
}
