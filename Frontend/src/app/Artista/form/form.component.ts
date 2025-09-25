import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
export class FormComponent implements OnInit {
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private placeholderService = inject(PlaceholderService);
  isEditMode = false;
  artistaId: number | null = null;

  errorMsg = '';
  successMsg = '';

  form = new FormGroup({
    nombre: new FormControl<string>("", [Validators.required, Validators.minLength(2)])
  });

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.artistaId = +id;
        this.loadArtistaData(this.artistaId);
      }
    }
    )
  }

  loadArtistaData(id: number) {
    this.placeholderService.getArtistaById(id).subscribe({
      next: (res: any) => {

        this.form.patchValue({
          nombre: res.nombre
        });
        this.successMsg = '';
        this.errorMsg = '';
      },
      error: (err) => {
        this.errorMsg = err.error?.error || 'Error al cargar datos del Artista';
        this.successMsg = '';
      }
    });
  }


  get nombre() {
    return this.form.get('nombre') as FormControl;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result; // Base64
    };
    reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
    }
  }

  guardarDatos() {
    if (this.form.invalid) {
      this.errorMsg = "Los datos no han sido llenados correctamente";
      return;
    }

    this.errorMsg = '';
    this.successMsg = '';

    const fd = new FormData();
    fd.append('nombre', this.form.get('nombre')?.value ?? '');
    if (this.selectedFile) {
      fd.append('imagenArtista', this.selectedFile, this.selectedFile.name);
    }

    this.placeholderService.createArtista(fd).subscribe({
      next: (res) => {
        this.successMsg = `Artista creado con ID ${res.id}`;
        this.errorMsg = '';
        this.router.navigate(['/artistas']);
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = err.error?.error || 'Error inesperado al crear el Artista';
        this.successMsg = '';
      }
    });
  }

  cancelar() {
    this.router.navigate(['/artistas']);
  }

  clearError() {
    this.errorMsg = '';
  }
}