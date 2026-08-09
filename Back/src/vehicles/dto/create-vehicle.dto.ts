import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import {
  FuelType,
  VehicleCondition,
  VehicleStatus,
} from 'generated/prisma/enums';

const toNumber = ({ value }: { value: unknown }) =>
  value === '' || value === undefined || value === null ? undefined : Number(value);

export class CreateVehicleDto {
  @IsString()
  @MinLength(1)
  brand: string;

  @IsString()
  @MinLength(1)
  model: string;

  @IsOptional()
  @IsString()
  version?: string;

  @Transform(toNumber)
  @IsInt()
  @Min(1900)
  @Max(2100)
  year: number;

  @Transform(toNumber)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsOptional()
  @Transform(toNumber)
  @IsInt()
  @Min(0)
  km?: number;

  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @IsOptional()
  @IsString()
  transmission?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsEnum(VehicleCondition)
  condition?: VehicleCondition;

  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;

  @IsString()
  @MinLength(1)
  description: string;

  @IsOptional() @IsString() motor?: string;
  @IsOptional() @IsString() potencia?: string;
  @IsOptional() @IsString() traccion?: string;
  @IsOptional() @IsString() autonomia?: string;
  @IsOptional() @IsString() velocidadMax?: string;
  @IsOptional() @IsString() largo?: string;
  @IsOptional() @IsString() ancho?: string;
  @IsOptional() @IsString() alto?: string;
  @IsOptional() @IsString() tanque?: string;
  @IsOptional() @IsString() baul?: string;
}
