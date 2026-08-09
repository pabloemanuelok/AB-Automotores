import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { IsString, MaxLength } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SiteConfigService } from './site-config.service';

class SetValueDto {
  @IsString()
  @MaxLength(200)
  value: string;
}

@Controller('site-config')
export class SiteConfigController {
  constructor(private readonly siteConfig: SiteConfigService) {}

  @Get(':key')
  get(@Param('key') key: string) {
    return this.siteConfig.get(key);
  }

  @Put(':key')
  @UseGuards(JwtAuthGuard)
  set(@Param('key') key: string, @Body() dto: SetValueDto) {
    return this.siteConfig.set(key, dto.value);
  }
}
