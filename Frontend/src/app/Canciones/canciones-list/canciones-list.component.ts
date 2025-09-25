import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { Router } from '@angular/router';
import { Canciones } from 'src/app/models/Canciones.models';
import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-canciones-list',
  templateUrl: './canciones-list.component.html',
  styleUrls: ['./canciones-list.component.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, IonicModule],
})
export class CancionesListComponent  {
  private router = inject(Router);
  private placeholderService = inject(PlaceholderService);
  cancionesList: Canciones[] | null = null;


  ionViewWillEnter() {
    this.loadCanciones();
  }

  private loadCanciones() {
    
    this.placeholderService.getAllCanciones<Canciones>()
      .subscribe(response => {
        console.log('albumes', response);
        this.cancionesList = response;
      });
  }

  getCancionImageUrl(canciones: Canciones): string {
    return `http://localhost:3000/ImagenesCanciones/${canciones.id}.jpg`;
  }

  detail(canciones: Canciones) {
    this.router.navigate([`/canciones/${canciones.id}/canciones-detail`]);
  }

}
