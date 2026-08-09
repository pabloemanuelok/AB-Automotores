import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '../generated/prisma/client';

const name = process.env.ADMIN_NAME;
const password = process.env.ADMIN_PASSWORD;

if (!name || !password) {
  console.error(
    'Faltan ADMIN_NAME y/o ADMIN_PASSWORD. Ejecutalo así:\n' +
      '  ADMIN_NAME=usuario ADMIN_PASSWORD=clave npm run seed:admin',
  );
  process.exit(1);
}

async function main() {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
  });

  const passwordHash = await bcrypt.hash(password!, 12);
  const admin = await prisma.admin.upsert({
    where: { name: name! },
    create: { name: name!, passwordHash },
    update: { passwordHash },
  });

  console.log(`Admin "${admin.name}" listo (id ${admin.id}).`);
  await prisma.$disconnect();
}

void main();
