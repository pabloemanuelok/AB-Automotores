import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { QueryVehiclesDto } from './dto/query-vehicles.dto';
import { SetFeaturedDto } from './dto/set-featured.dto';
import { UpdateImagesDto } from './dto/update-images.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesService } from './vehicles.service';

const MAX_IMAGES = 20;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

const uploadOptions = {
  limits: { fileSize: MAX_IMAGE_BYTES },
  fileFilter: (
    _req: unknown,
    file: Express.Multer.File,
    cb: (error: Error | null, accept: boolean) => void,
  ) => cb(null, file.mimetype.startsWith('image/')),
};

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehicles: VehiclesService) {}

  @Get()
  findAll(@Query() query: QueryVehiclesDto) {
    return this.vehicles.findAll(query);
  }

  @Patch('featured')
  @UseGuards(JwtAuthGuard)
  setFeatured(@Body() dto: SetFeaturedDto) {
    return this.vehicles.setFeatured(dto.ids);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicles.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files', MAX_IMAGES, uploadOptions))
  create(
    @Body() dto: CreateVehicleDto,
    @UploadedFiles() files: Express.Multer.File[] = [],
  ) {
    return this.vehicles.create(dto, files);
  }

  @Patch(':id/images')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files', MAX_IMAGES, uploadOptions))
  updateImages(
    @Param('id') id: string,
    @Body() dto: UpdateImagesDto,
    @UploadedFiles() files: Express.Multer.File[] = [],
  ) {
    return this.vehicles.updateImages(id, dto.keepImageIds, files);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    return this.vehicles.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.vehicles.remove(id);
  }
}
