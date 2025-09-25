import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { Artista } from 'src/app/models/Artista.models';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderComponent, FooterComponent, ReactiveFormsModule]
})
export class AlbumFormComponent implements OnInit {
  artista: Artista | null = null;
  artistaId: number | null = null;
  form = new FormGroup({
    nombre: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    idArtista: new FormControl<number | null>(null, [Validators.required])
  });

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isEditMode = false;
  errorMsg = '';
  successMsg = '';

  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private placeholderService = inject(PlaceholderService);

  ngOnInit() {
    const idArtista = this.route.snapshot.paramMap.get('idArtista'); 
    if (idArtista) {
      this.form.get('idArtista')?.setValue(+idArtista); 
    } else {
      this.errorMsg = 'No se encontró el artista para asociar el álbum.';
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.previewUrl = null;
    }
  }

  getnombre() {
    return this.form.get('nombre') as FormControl;
  }

  guardarDatos() {
    if (this.form.invalid) {
      this.errorMsg = 'Completa todos los campos correctamente';
      return;
    }

    const fd = new FormData();
    fd.append('nombre', this.form.get('nombre')?.value ?? '');
    fd.append('idArtista', String(this.form.get('idArtista')?.value ?? ''));
    if (this.selectedFile) {
      fd.append('imagenAlbum', this.selectedFile, this.selectedFile.name);
    }
    console.log('FormData:', fd.get('idArtista'));
    this.placeholderService.createAlbum(fd).subscribe({
      next: (res) => {
        this.successMsg = `Álbum creado con ID ${res.id}`;
        this.errorMsg = '';
        this.router.navigate(['/albums']);
      },
      error: (err) => {
        this.errorMsg = err.error?.error || 'Error al crear álbum';
        this.successMsg = '';
      }
    });
  }

  cancelar() {
    this.router.navigate(['/albums']);
  }

  clearError() {
    this.errorMsg = '';
  }
}