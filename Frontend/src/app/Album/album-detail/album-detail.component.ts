import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonList, IonItem, IonAvatar, IonButton, IonIcon, IonicModule } from '@ionic/angular';

import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Canciones } from 'src/app/models/Canciones.models';
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { Album } from 'src/app/models/Album.models';
import { Artista } from '../../models/Artista.models';

@Component({
  selector: 'app-song-list',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FooterComponent, HeaderComponent]
})
export class AlbumDetailComponent implements OnInit {
  private placeholderService = inject(PlaceholderService);
  album: Album | null = null;
  cancionesList: Canciones[] = [];
  public router = inject(Router);
  private routerActivated = inject(ActivatedRoute);

  ngOnInit() {
    let id = this.routerActivated.snapshot.paramMap.get('id') ?? "";
    console.log(id);
    this.placeholderService.getAlbumById<Album>(parseInt(id))
          .subscribe((response: Album) => {
            this.album = response;
            console.log(this.album);
          });

    this.placeholderService.getCancionesByAlbumId<Canciones>(parseInt(id))
      .subscribe(response => {
        this.cancionesList = response;
      });
  }

  getCancionesImageUrl(canciones: Canciones): string {
    return `http://localhost:3000/ImagenesCanciones/${canciones.id}.jpg?ts=${Date.now()}`;
  }

  getAlbumImageUrl(album: Album): string {
    return `http://localhost:3000/ImagenesAlbums/${album.id}.jpg?ts=${Date.now()}`;
  }

  createCancion() {
    if (!this.album) return;
    this.router.navigate(['canciones/create/', this.album.id]);
  }

  editarAlbum() {
    if (!this.album) return;
    this.router.navigate([`albums/update/${this.album.id}/`]);
    console.log(this.album.id);
  }

  eliminarAlbum() {
    if (!this.album) return;
    this.placeholderService.deleteAlbum(this.album.id).subscribe(() => {
      this.router.navigate(['/artistas']);
    }
    );
  }


  detail(canciones: Canciones){
    this.router.navigate([`/canciones/${canciones.id}/canciones-detail`]);
  }
}