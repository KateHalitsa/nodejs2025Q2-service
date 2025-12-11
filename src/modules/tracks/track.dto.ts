import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class TrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsUUID()
  @IsOptional()
  artistId?: string;

  @IsUUID()
  @IsOptional()
  albumId?: string;
}
