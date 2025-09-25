import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceholderService } from 'src/app/Services/place-holder-service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { Canciones } from 'src/app/models/Canciones.models';

@Component({
  selector: 'app-canciones-detail',
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderComponent, FooterComponent],
  templateUrl: './canciones-detail.component.html',
  styleUrls: ['./canciones-detail.component.scss']
})
export class CancionesDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  router = inject(Router);
  private placeholderService = inject(PlaceholderService);

  cancion: any = null;
  audioSrc = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.loadCancion(+id);
  }

  loadCancion(id: number) {
    this.placeholderService.getCancionesById(id).subscribe({
      next: (res: any) => {
        this.cancion = res;
        this.audioSrc = `http://localhost:3000/AudioCanciones/${res.url ?? (res.id + '.mp3')}?ts=${Date.now()}`;
      },
      error: (err) => {
        console.error('Error cargando canción', err);
      }
    });
  }

  formatDuration(sec?: number) {
    if (!sec && sec !== 0) return '--:--';
    const s = Math.floor(sec);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, '0')}`;
  }

  volverAlbum() {
    const albumId = this.cancion?.idAlbum ?? this.cancion?.AlbumId;
    if (albumId) this.router.navigate(['/albums', albumId]);
    else this.router.navigate(['/canciones']);
  }
  editarCancion(cancion : Canciones){
    console.log("entrando a editar");
    this.router.navigate([`/canciones/update/${cancion.id}/`]);
  }
  

  eliminarCancion() {
    if (!this.cancion || !this.cancion.id) return;
    if (!confirm(`¿Eliminar la canción "${this.cancion.nombre}"?`)) return; 
    this.placeholderService.deleteCancion(this.cancion.id).subscribe({
      next: () => {
        alert('Canción eliminada');
        this.router.navigate(['/canciones']);
      },
      error: (err) => {
        console.error('Error eliminando canción', err);
        alert('Error eliminando canción');
      }
    });
  }

  getCancionImageUrl(cancion: Canciones): string {
    return `http://localhost:3000/ImagenesCanciones/${cancion.id}.jpg?ts=${Date.now()}`;
  }

}