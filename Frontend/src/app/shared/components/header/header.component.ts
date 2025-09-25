import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class HeaderComponent {
  @Input() title: string = 'Spotify Client';
  @Input() showBackButton: boolean = false;
  @Input() showMenu: boolean = true;
  @Input() backUrl: string = '/home';

  @Output() search = new EventEmitter<string>();

  constructor(private router: Router) { }

  navigateBack() {
    this.router.navigate([this.backUrl]);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}