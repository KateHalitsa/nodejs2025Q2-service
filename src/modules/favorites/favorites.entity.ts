import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
export class Favorites {
  artists: string[] = [];
  albums: string[] = [];
  tracks: string[] = [];
}
@Entity('favorite_artists')
export class FavoriteArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  artistId: string;
}
@Entity('favorite_albums')
export class FavoriteAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  albumId: string;
}
@Entity('favorite_tracks')
export class FavoriteTrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  trackId: string;
}
