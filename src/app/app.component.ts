import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(SidenavComponent) sidenavComponent!: SidenavComponent;

  isDarkMode: boolean = false;

  toggleSidebar(): void {
    this.sidenavComponent.toggleSidenav();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}
