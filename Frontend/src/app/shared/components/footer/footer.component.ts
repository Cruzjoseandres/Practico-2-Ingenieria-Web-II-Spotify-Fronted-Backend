import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FooterComponent {
  
  constructor(private router: Router) {}

  getCurrentRoute(): string {
    return this.router.url;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  isActive(route: string): boolean {
    const currentRoute = this.getCurrentRoute();
    if (route === '/home') {
      return currentRoute === '/home' || currentRoute === '/';
    }
    return currentRoute.startsWith(route);
  }
}