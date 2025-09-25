import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Artista } from 'src/app/models/Artista.models';
import { Genero } from 'src/app/models/genero.models';
import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-genero-detail',
  templateUrl: './genero-detail.component.html',
  styleUrls: ['./genero-detail.component.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule, HeaderComponent, FooterComponent]
})
export class GeneroDetailComponent implements OnInit {
  private placeholderService = inject(PlaceholderService);
  genero: Genero | null = null;
  artistasList: Artista[] = [];
  public router = inject(Router);
  private routerActivated = inject(ActivatedRoute);





  ngOnInit(){
    let id = this.routerActivated.snapshot.paramMap.get('id') ?? "";
        this.placeholderService.getGeneroById<Genero>(parseInt(id))
              .subscribe((response: Genero) => {
                this.genero = response;
                console.log(this.genero);
              });
        
    
    
        this.placeholderService.getArtistasByGeneroId<Artista>(parseInt(id))
          .subscribe(response => {
            this.artistasList = response;
            console.log(response);
          });
  }

  getArtistasImageUrl(artista: Artista): string {
      return `http://localhost:3000/ImagenesArtista/${artista.id}.jpg?ts=${Date.now()}`;
    }  
  
    selectedArtist() {
      if (!this.genero) return;
      this.router.navigate(['generos/selected/', this.genero.id]);
    }
  
    editarGenero() {
      if (!this.genero) return;
      this.router.navigate(['/artista-form', this.genero.id]);
    }
  
    eliminarGenero() {
      if (!this.genero) return;
      this.placeholderService.deleteGenero(this.genero.id).subscribe(() => {
        this.router.navigate(['/generos']);
      }
      );
    }
  
  
    detail(artista: Artista){
      this.router.navigate([`/artistas/${artista.id}/artista`]);
    }
  

}
