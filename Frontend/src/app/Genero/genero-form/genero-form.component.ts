import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from "src/app/shared/components/footer/footer.component";

@Component({
  selector: 'app-genero-form',
  templateUrl: './genero-form.component.html',
  standalone: true,
  styleUrls: ['./genero-form.component.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, HeaderComponent, FooterComponent]
})
export class GeneroFormComponent implements OnInit {
  public router = inject(Router);
  errorMsg = '';
  successMsg = '';

  form = new FormGroup({
    nombre: new FormControl<string>("", Validators.required)
  });

  private route = inject(ActivatedRoute);
  private placeholderService = inject(PlaceholderService);


  isEditMode = false;
  generoId: number | null = null;


  get nombre() {
    return this.form.get('nombre') as FormControl;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.generoId = +id;
        this.loadGeneroData(this.generoId);
      }
    }

    )
  }

  loadGeneroData(id: number) {
    this.placeholderService.getGeneroById(id).subscribe({
      next: (res: any) => {

        this.form.patchValue({
          nombre: res.nombre
        });
        this.successMsg = '';
        this.errorMsg = '';
      },
      error: (err) => {
        this.errorMsg = err.error?.error || 'Error al cargar datos del género';
        this.successMsg = '';
      }
    });
  }

  guardarDatos() {
    if (this.form.invalid) {
      this.errorMsg = "Los datos no han sido llenados correctamente";
      return;
    }

    const formValues = this.form.getRawValue();
    if (formValues.nombre === null) {
      this.errorMsg = "El nombre no puede estar vacío";
      return;
    }
    const generoData = { nombre: formValues.nombre ?? '' };



    if (this.isEditMode && this.generoId) {
      this.placeholderService.updateGenero(this.generoId, generoData).subscribe({
        next: (res) => {
          this.successMsg = `Genero actualizado con ID ${res.id}`;
          this.errorMsg = '';
          this.router.navigate(['/generos']);
        },
        error: (err) => {
          this.errorMsg = err.error?.error || 'Error inesperado al actualizar genero';
          this.successMsg = '';
        }
      });
    } else {
      this.placeholderService.createGenero(generoData).subscribe({
        next: (res) => {
          this.successMsg = `Genero creado con ID ${res.id}`;
          this.errorMsg = '';
          this.router.navigate(['/generos']);
        },
        error: (err) => {
          this.errorMsg = err.error?.error || 'Error inesperado al crear genero';
          this.successMsg = '';
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/generos']);
  }

  clearError() {
    this.errorMsg = '';
  }
}
