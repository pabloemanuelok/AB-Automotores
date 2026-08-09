import { Transform } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

/**
 * `keepImageIds` arrives inside multipart form data, so it is either a JSON
 * array string, a repeated field (parsed as string[]), or a single string.
 */
const toStringArray = ({ value }: { value: unknown }): string[] => {
  if (value === undefined || value === null || value === '') return [];
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.startsWith('[')) {
      const parsed: unknown = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    }
    return [trimmed];
  }
  return [];
};

export class UpdateImagesDto {
  @Transform(toStringArray)
  @IsArray()
  @IsString({ each: true })
  keepImageIds: string[] = [];
}
