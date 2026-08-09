import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SiteConfigService {
  constructor(private readonly prisma: PrismaService) {}

  async get(key: string) {
    const entry = await this.prisma.siteConfig.findUnique({ where: { key } });
    return { key, value: entry?.value ?? null };
  }

  set(key: string, value: string) {
    return this.prisma.siteConfig.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }
}
