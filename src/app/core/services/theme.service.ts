import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeClass = 'dark-mode'; // Class applied to the body for dark mode

  constructor() {}

  /**
   * Enable dark mode by adding the dark mode class to the body element.
   */
  enableDarkMode(): void {
    document.body.classList.add(this.darkModeClass);
    localStorage.setItem('theme', 'dark'); // Persist the theme in localStorage
  }

  /**
   * Disable dark mode by removing the dark mode class from the body element.
   */
  disableDarkMode(): void {
    document.body.classList.remove(this.darkModeClass);
    localStorage.setItem('theme', 'light'); // Persist the theme in localStorage
  }

  /**
   * Toggle between dark and light mode.
   */
  toggleTheme(): void {
    if (this.isDarkMode()) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  /**
   * Check if dark mode is currently enabled.
   * @returns boolean - True if dark mode is enabled, otherwise false.
   */
  isDarkMode(): boolean {
    return document.body.classList.contains(this.darkModeClass);
  }

  /**
   * Initialize the theme based on user's saved preference or system preference.
   */
  initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }
}
