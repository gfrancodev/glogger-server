import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, IsIP, IsNotEmpty, Min, Max, IsJSON } from 'class-validator';
import { LogType } from '../enums/log-type.enum';

export class CreateLogDTO {
    @IsNumber()
    @Min(0)
    @Max(100)
    @IsNotEmpty()
    @ApiProperty()
    priority: number;
  
    @IsEnum(LogType)
    @IsNotEmpty()
    @ApiProperty()
    type: Log.Type;
  
    @IsIP()
    @IsNotEmpty()
    @ApiProperty()
    ip: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    hostname: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    program: string;
  
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    pid?: number | null;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    message: string;
  
    @IsOptional()
    @IsJSON()
    @ApiProperty()
    data?: Record<string, any> | null;
  }