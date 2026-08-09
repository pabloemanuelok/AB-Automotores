import { Injectable, NotFoundException } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { QueryVehiclesDto } from './dto/query-vehicles.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

const IMAGE_FOLDER = 'ab-automotores/vehicles';

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

@Injectable()
export class VehiclesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  private readonly include = {
    images: { orderBy: { position: 'asc' } },
  } as const;

  findAll({ status, featured, brand }: QueryVehiclesDto) {
    return this.prisma.vehicle.findMany({
      where: {
        status,
        featured,
        brand: brand ? { equals: brand, mode: 'insensitive' } : undefined,
      },
      include: this.include,
      orderBy: featured
        ? [{ featuredRank: 'asc' }, { createdAt: 'desc' }]
        : { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: this.include,
    });

    if (!vehicle) {
      throw new NotFoundException(`No existe el vehículo ${id}`);
    }

    return vehicle;
  }

  async create(dto: CreateVehicleDto, files: Express.Multer.File[]) {
    const uploaded = await Promise.all(
      files.map((file) =>
        this.cloudinary.uploadBuffer(file.buffer, IMAGE_FOLDER),
      ),
    );

    return this.prisma.vehicle.create({
      data: {
        ...dto,
        slug: `${slugify(`${dto.brand}-${dto.model}-${dto.year}`)}-${createId().slice(0, 6)}`,
        images: {
          create: uploaded.map((image, position) => ({ ...image, position })),
        },
      },
      include: this.include,
    });
  }

  async update(id: string, dto: UpdateVehicleDto) {
    await this.findOne(id);

    return this.prisma.vehicle.update({
      where: { id },
      data: dto,
      include: this.include,
    });
  }

  async updateImages(
    id: string,
    keepImageIds: string[],
    files: Express.Multer.File[],
  ) {
    const vehicle = await this.findOne(id);

    const keep = new Set(keepImageIds);
    const kept = vehicle.images.filter((image) => keep.has(image.id));
    const removed = vehicle.images.filter((image) => !keep.has(image.id));

    const uploaded = await Promise.all(
      files.map((file) =>
        this.cloudinary.uploadBuffer(file.buffer, IMAGE_FOLDER),
      ),
    );

    await this.prisma.$transaction([
      this.prisma.vehicleImage.deleteMany({
        where: { id: { in: removed.map((image) => image.id) } },
      }),
      ...kept.map((image, position) =>
        this.prisma.vehicleImage.update({
          where: { id: image.id },
          data: { position },
        }),
      ),
      ...uploaded.map((image, index) =>
        this.prisma.vehicleImage.create({
          data: { ...image, vehicleId: id, position: kept.length + index },
        }),
      ),
    ]);

    await Promise.all(
      removed.map((image) => this.cloudinary.destroy(image.publicId)),
    );

    return this.findOne(id);
  }

  async setFeatured(ids: string[]) {
    await this.prisma.$transaction([
      this.prisma.vehicle.updateMany({
        where: { id: { notIn: ids } },
        data: { featured: false, featuredRank: null },
      }),
      ...ids.map((id, featuredRank) =>
        this.prisma.vehicle.updateMany({
          where: { id },
          data: { featured: true, featuredRank },
        }),
      ),
    ]);

    return this.findAll({ featured: true });
  }

  async remove(id: string) {
    const vehicle = await this.findOne(id);

    await this.prisma.vehicle.delete({ where: { id } });
    await Promise.all(
      vehicle.images.map((image) => this.cloudinary.destroy(image.publicId)),
    );
  }
}
