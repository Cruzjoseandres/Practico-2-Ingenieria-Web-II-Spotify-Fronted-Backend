import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { Router } from '@angular/router';
import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { Album } from 'src/app/models/Album.models';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, IonicModule],
})
export class AlbumListComponent {
  private router = inject(Router);
  private placeholderService = inject(PlaceholderService);
  albumList: Album[] | null = null;


  ionViewWillEnter() {
    this.loadAlbums();
  }

  private loadAlbums() {
    
    this.placeholderService.getAllAlbums<Album>()
      .subscribe(response => {
        console.log('albumes', response);
        this.albumList = response;
      });
  }

  getAlbumImageUrl(album: Album): string {
    return `http://localhost:3000/ImagenesAlbums/${album.id}.jpg?ts=${Date.now()}`;
  }

  detail(album: Album) {
    this.router.navigate([`/albums/${album.id}/album-detail`]);
  }

}
