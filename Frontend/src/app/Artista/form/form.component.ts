import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-artista-create',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, HeaderComponent, FooterComponent]
})
export class FormComponent {
  private fb = inject(FormBuilder);
  public router = inject(Router);
  private placeholderService = inject(PlaceholderService);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]]
  });

  selectedFile: File | null = null;
  uploading = false;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  errorMessage = '';

  onSubmit() {
    if (this.form.invalid) return;
    
    this.errorMessage = '';
    const fd = new FormData();
    
    const nombre = this.form.get('nombre')?.value;
    if (nombre) {
      fd.append('nombre', nombre);
    }
    
    if (this.selectedFile) {
      fd.append('imagenArtista', this.selectedFile, this.selectedFile.name);
    }

    this.uploading = true;
    this.placeholderService.createArtista(fd).subscribe({
      next: (res) => {
        this.uploading = false;
        this.router.navigate(['/artistas']);
      },
      error: (err) => {
        console.error('Error creando artista', err);
        this.uploading = false;
        
        // Manejo de errores específicos de la API
        if (err.status === 400) {
          this.errorMessage = 'Datos inválidos. Por favor, verifique la información ingresada.';
        } else if (err.status === 409) {
          this.errorMessage = 'Ya existe un artista con ese nombre.';
        } else if (err.status === 413) {
          this.errorMessage = 'La imagen es demasiado grande. Por favor, seleccione una imagen más pequeña.';
        } else if (err.status === 500) {
          this.errorMessage = 'Error interno del servidor. Por favor, intente más tarde.';
        } else {
          this.errorMessage = 'Error al crear el artista. Por favor, intente nuevamente.';
        }
      }
    });
  }

  clearError() {
    this.errorMessage = '';
  }
  
  // O alternativamente, puedes crear un método para navegar
  cancelar() {
    this.router.navigate(['/artistas']);
  }
}