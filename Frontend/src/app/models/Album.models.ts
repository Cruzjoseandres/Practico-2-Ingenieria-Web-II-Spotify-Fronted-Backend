import { Artista } from "./Artista.models";

export interface Album {
    id : number;
    nombre : string;
    idArtista : number ;
    artista?: Artista;
}