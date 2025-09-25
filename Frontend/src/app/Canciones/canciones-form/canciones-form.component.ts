import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { Album } from 'src/app/models/Album.models';
import { Canciones } from 'src/app/models/Canciones.models';

@Component({
  selector: 'app-canciones-form',
  templateUrl: './canciones-form.component.html',
  styleUrls: ['./canciones-form.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, HeaderComponent, FooterComponent]
})
export class CancionesFormComponent implements OnInit {
  

  albumId: number | null = null;
  album: Album | null = null;

  form = new FormGroup({
    nombre: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    idAlbum: new FormControl<number | null>(null, [Validators.required])
  });

  selectedImage: File | null = null;
  selectedAudio: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  errorMsg = '';
  successMsg = '';

  isEditMode = false;
  cancionesId: number | null = null;

  private placeholderService = inject(PlaceholderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  

  

  ngOnInit() {
    const idAlbum = this.route.snapshot.paramMap.get('idAlbum'); 
    if (idAlbum) {
      this.isEditMode = true;
      this.form.get('idAlbum')?.setValue(+idAlbum); 
    } else {
      this.errorMsg = 'No se encontró el Album para asociar la Cancion.';
    }

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.cancionesId = +id;
        this.loadCancionData(this.cancionesId);
      }
    }

    )

  }
  loadCancionData(id: number) {
    this.placeholderService.getCancionesById(id).subscribe({
      next: (res: any) => {

        this.form.patchValue({
          nombre: res.nombre,
          idAlbum: res.idAlbum
        });
        if (res.urlImagen) {
          this.previewUrl = `http://localhost:3000/ImagenesCanciones/${res.urlImagen}`;
        } else if (res.urlCancion) {
          this.previewUrl = `http://localhost:3000/AudioCanciones/${res.urlCancion}.jpg`;
        }
        this.successMsg = '';
        this.errorMsg = '';
      },
      error: (err) => {
        this.errorMsg = err.error?.error || 'Error al cargar datos de la cancion';
        this.successMsg = '';
      }
    });
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      this.selectedImage = null;
      this.previewUrl = null;
    }
  }

  onAudioChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedAudio = input.files?.[0] ?? null;
  }

  getnombre() {
      return this.form.get('nombre') as FormControl;
    }
  getidAlbum() {
      return this.form.get('idAlbum') as FormControl;
    }

  guardarDatos() {
    if (this.form.invalid) {
      this.errorMsg = 'Completa todos los campos correctamente';
      return;
    }

    if (!this.isEditMode && (!this.selectedAudio || !this.selectedImage)) {
      this.errorMsg = 'Imagen y archivo de audio son obligatorios para crear una canción';
      return;
    }

    const fd = new FormData();
    fd.append('nombre', this.form.get('nombre')?.value ?? '');
    fd.append('idAlbum', String(this.form.get('idAlbum')?.value ?? ''));
    if (this.selectedImage) {
      fd.append('urlImagen', this.selectedImage, this.selectedImage.name);
    }
    if (this.selectedAudio) {
      fd.append('urlCancion', this.selectedAudio, this.selectedAudio.name);
    }
    
    if (this.isEditMode && this.cancionesId) {
      this.placeholderService.updateCancion(this.cancionesId, fd).subscribe({
        next: (res) => {
          this.successMsg = `Canción actualizada`;
          this.errorMsg = '';
          this.router.navigate(['/canciones']);
          
        },
        error: (err) => {
          this.errorMsg = err.error?.error || 'Error al actualizar canción';
          this.successMsg = '';
        }
      });
    } else {
      this.placeholderService.createCancion(fd).subscribe({
        next: (res) => {
          this.successMsg = `Canción creada con ID ${res.id}`;
          this.errorMsg = '';
          this.router.navigate(['/canciones']);
        
        },
        error: (err) => {
          this.errorMsg = err.error?.error || 'Error al crear canción';
          this.successMsg = '';
        }
      });
    }
  }
  

  cancelar() {
    this.router.navigate(['/canciones']);
  }

  clearError() {
    this.errorMsg = '';
  }
}