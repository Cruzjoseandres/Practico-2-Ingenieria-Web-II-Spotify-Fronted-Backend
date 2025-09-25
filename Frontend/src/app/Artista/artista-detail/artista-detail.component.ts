import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artista } from 'src/app/models/Artista.models';
import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { IonContent, IonButton, IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { Album } from 'src/app/models/Album.models';
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { FooterComponent } from "src/app/shared/components/footer/footer.component";

@Component({
  selector: 'app-artista-detail',
  templateUrl: './artista-detail.component.html',
  styleUrls: ['./artista-detail.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonContent, CommonModule, HeaderComponent, FooterComponent],
})
export class ArtistaDetailComponent implements OnInit {
  private routerActivated = inject(ActivatedRoute);
  public router = inject(Router);
  private PlaceholderService = inject(PlaceholderService);
  artista: Artista | null = null;
  albumList: Album[] | null = null;

  ngOnInit() {
    let id = this.routerActivated.snapshot.paramMap.get('id') ?? "";

    console.log(id);
    this.PlaceholderService.getArtistaById<Artista>(parseInt(id))
      .subscribe((response: Artista) => {
        this.artista = response;
        console.log(this.artista);
      });

    this.PlaceholderService.getAlbumsByArtistaId<Album>(parseInt(id))
      .subscribe(response => {
        this.albumList = response;
      });
  }

  getArtistaImageUrl(artista: Artista): string {
    return `http://localhost:3000/ImagenesArtista/${artista.id}.jpg?ts=${Date.now()}`;
  }

  getAlbumImageUrl(album: Album): string {
    return `http://localhost:3000/ImagenesAlbums/${album.id}.jpg?ts=${Date.now()}`;
  }

  createAlbum() {
    if (!this.artista) return;
    this.router.navigate(['albums/create/', this.artista.id]);
  }

  editarArtista() {
    if (!this.artista) return;
    this.router.navigate([`/artistas/update/${this.artista.id}/`]);
  }

  eliminarArtista() {
    if (!this.artista) return;
    this.PlaceholderService.deleteArtista(this.artista.id).subscribe(() => {
      this.router.navigate(['/artistas']);
    }
    );
  }


  detail(album: Album){
    this.router.navigate([`/albums/${album.id}/album-detail`]);
  }



}
