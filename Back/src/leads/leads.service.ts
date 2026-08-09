import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  }

  create({ _honeyPot, ...data }: CreateLeadDto) {
    // A filled honeypot means a bot that ignored the hidden field. Pretend it
    // worked so the bot doesn't learn it was detected, but store nothing.
    if (_honeyPot) {
      return { id: 'discarded', ...data, createdAt: new Date() };
    }

    return this.prisma.lead.create({ data });
  }

  async remove(id: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      throw new NotFoundException(`No existe la consulta ${id}`);
    }

    await this.prisma.lead.delete({ where: { id } });
  }
}
