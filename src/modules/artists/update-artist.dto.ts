import { IsBoolean, IsString } from 'class-validator';

import { Expose } from 'class-transformer';

export class ArtistResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  grammy: boolean;
}
export class ArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
