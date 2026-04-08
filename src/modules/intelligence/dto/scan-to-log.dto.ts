import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class ScanToLogDto {
  @ApiProperty({
    description: 'Base64 encoded string of the food image to be analyzed',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0...',
    required: true,
    type: String,
    format: 'base64'
  })
  @IsString()
  image: string;
}
