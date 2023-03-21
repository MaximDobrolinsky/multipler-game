import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class LoginBodyRequest {
  @ApiProperty()
  @IsString()
  name: string;
}

export class StartGameRoundBodyRequest {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  points: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  multipler: number;
}
