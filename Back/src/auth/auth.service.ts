import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

const DUMMY_HASH =
  '$2b$12$Im7ZZQP4s29pMMUuXMfiIOLMV80JjUFdq/gDrkgwFQSCUDHWn2r6.';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login({ name, password }: LoginDto) {
    const admin = await this.prisma.admin.findUnique({ where: { name } });

    // Compare against a real dummy hash when the admin doesn't exist so the
    // response time doesn't reveal whether the username is valid.
    const hash = admin?.passwordHash ?? DUMMY_HASH;
    const matches = await bcrypt.compare(password, hash);

    if (!admin || !matches) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return {
      access_token: await this.jwt.signAsync({
        sub: admin.id,
        name: admin.name,
      }),
    };
  }
}
