import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { Genero } from 'src/app/models/genero.models';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-genero-list',
  templateUrl: './genero-list.component.html',
  styleUrls: ['./genero-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderComponent, FooterComponent]
})
export class GeneroListComponent {

  private router = inject(Router);
  private PlaceholderService = inject(PlaceholderService);
  generoList: Genero[] | null = null;



  ionViewWillEnter() {
      this.loadGeneros();
    }
  
    private loadGeneros() {
      this.PlaceholderService.getAllGeneros<Genero>()
        .subscribe(response => {
          this.generoList = response;
        });
    }

  detail(genero: Genero) {
    this.router.navigate([`/generos/${genero.id}/genero`]);
  }

  addGenero() {
  this.router.navigate(['/generos/create']);
}

}
