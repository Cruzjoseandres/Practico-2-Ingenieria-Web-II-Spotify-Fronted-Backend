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
  imagenAlbum: string | null = null;
  albumId: number | null = null;
  form = new FormGroup({
    nombre: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    idArtista: new FormControl<number | null>(null, [Validators.required])
  });

  selectedImage: File | null = null;
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

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.albumId = +id;
        this.loadAlbumData(this.albumId);
      }
    }
    )
  }

  loadAlbumData(id: number) {
    this.placeholderService.getAlbumById(id).subscribe({
      next: (res: any) => {

        this.form.patchValue({
          nombre: res.nombre,
          idArtista: res.idArtista
        });
        this.imagenAlbum = `http://localhost:3000/ImagenesAlbums/${id}.jpg?ts=${Date.now()}`;
        this.successMsg = '';
        this.errorMsg = '';
      },
      error: (err) => {
        this.errorMsg = err.error?.error || 'Error al cargar datos del Album';
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


  getnombre() {
    return this.form.get('nombre') as FormControl;
  }
  getidArtista() {
    return this.form.get('idArtista') as FormControl;
  }

  guardarDatos() {
    if (this.form.invalid) {
      this.errorMsg = 'Completa todos los campos correctamente';
      return;
    }

    if (!this.isEditMode && !this.selectedImage) {
      this.errorMsg = 'Imagen es obligatorio para crear un Album';
      return;
    }


    this.errorMsg = '';
    this.successMsg = '';

    const fd = new FormData();
    fd.append('nombre', this.form.get('nombre')?.value ?? '');
    fd.append('idArtista', String(this.form.get('idArtista')?.value ?? ''));
    if (this.selectedImage) {
      fd.append('imagenAlbum', this.selectedImage, this.selectedImage.name);
    }
    if (this.isEditMode && this.albumId) {
      this.placeholderService.updateAlbum(this.albumId, fd).subscribe({
        next: (res) => {
          this.successMsg = 'Álbum actualizado correctamente';
          this.errorMsg = '';
          this.router.navigate(['/albums']);
          console.log("redireccionando")
        },
        error: (err) => {
          this.errorMsg = err.error?.error || 'Error al actualizar álbum';
          this.successMsg = '';
        }
      });
    } else {
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
  }

  cancelar() {
    this.router.navigate(['/albums']);
  }

  clearError() {
    this.errorMsg = '';
  }
}