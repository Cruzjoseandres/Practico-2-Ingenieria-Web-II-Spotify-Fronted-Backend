import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artista } from 'src/app/models/Artista.models';
import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { IonHeader, IonToolbar, IonContent } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { HeaderComponent } from "src/app/shared/components/header/header.component";

@Component({
  selector: 'app-artista-list',
  templateUrl: './artista-list.component.html',
  styleUrls: ['./artista-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FooterComponent, HeaderComponent]
})
export class ArtistaListComponent {

  private router = inject(Router);
  private PlaceholderService = inject(PlaceholderService);
  artistaList: Artista[] | null = null;


  ionViewWillEnter() {
    this.loadArtistas();
  }

  private loadArtistas() {
    this.PlaceholderService.getAllArtistas<Artista>()
      .subscribe(response => {
        this.artistaList = response;
      });
  }

  getArtistaImageUrl(artista: Artista): string {
    return `http://localhost:3000/ImagenesArtista/${artista.id}.jpg`;
  }

  detail(artista: Artista) {
    this.router.navigate([`/artistas/${artista.id}/artista`]);
  }

}
