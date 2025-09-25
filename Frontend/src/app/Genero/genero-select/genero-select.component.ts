import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { Artista } from 'src/app/models/Artista.models';

@Component({
  selector: 'app-genero-select',
  templateUrl: './genero-select.component.html',
  styleUrls: ['./genero-select.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderComponent, FooterComponent, ReactiveFormsModule]
})
export class GeneroSelectComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private placeholderService = inject(PlaceholderService);
  private fb = inject(FormBuilder);

  generoId!: number;
  artistasList: Artista [] = [];
  selectedIds: number[] = [];
  form: FormGroup;
  private routerActivated = inject(ActivatedRoute);

  constructor() {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    let id = this.routerActivated.snapshot.paramMap.get('id') ?? "";
    console.log(id);
    this.generoId = parseInt(id, 10)
    this.placeholderService.getArtistasNotInGenero<Artista>(this.generoId)
      .subscribe(response => {
        console.log(response);
        this.artistasList = response;
      });
  }

  getArtistaImageUrl(artista: Artista): string {
    return `http://localhost:3000/ImagenesArtista/${artista.id}.jpg?ts=${Date.now()}`;
  }

  isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }

  toggleSeleccion(id: number) {
    if (this.isSelected(id)) {
      this.selectedIds = this.selectedIds.filter(i => i !== id);
    } else {
      this.selectedIds.push(id);
    }
  }

  addArtistas() {
    if (this.selectedIds.length === 0) return;
    this.placeholderService.addArtistasToGenero(this.generoId, this.selectedIds).subscribe({
      next: () => this.router.navigate([`/generos/${this.generoId}/genero`]),
      error: err => alert('Error al añadir artistas: ' + (err.error?.error || ''))
    });
  }
}
