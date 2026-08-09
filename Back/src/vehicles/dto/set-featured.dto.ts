import { IsArray, IsString } from 'class-validator';

export class SetFeaturedDto {
  /** Vehicle ids to feature, in the order they should be displayed. */
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
