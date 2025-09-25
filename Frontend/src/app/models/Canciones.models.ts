import { Album } from "./Album.models";

export interface Canciones {
    id : number;
    nombre : string;
    idAlbum : number;
    album?: Album;
}