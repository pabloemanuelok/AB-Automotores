import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

const isDecimal = (value: unknown): value is { toNumber: () => number } =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as { toNumber?: unknown }).toNumber === 'function';

const convert = (value: unknown): unknown => {
  if (isDecimal(value)) return value.toNumber();
  if (Array.isArray(value)) return value.map(convert);
  if (value instanceof Date) return value;
  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, convert(item)]),
    );
  }
  return value;
};

/** Prisma serializes Decimal columns as strings; the API exposes them as numbers. */
@Injectable()
export class DecimalInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map(convert));
  }
}
