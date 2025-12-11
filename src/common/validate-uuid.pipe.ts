import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ValidateUuidPipe implements PipeTransform {
  transform(value: any) {
    if (!isUUID(value)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return value;
  }
}
