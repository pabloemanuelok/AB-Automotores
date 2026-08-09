import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  nombre: string;

  @IsString()
  @MinLength(1)
  @MaxLength(40)
  telefono: string;

  @IsEmail()
  @MaxLength(200)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  mensaje?: string;

  /**
   * Anti-spam trap: the form keeps this hidden and empty for real people.
   * Accepted so validation doesn't reject the request, never persisted.
   */
  @IsOptional()
  @IsString()
  _honeyPot?: string;
}
