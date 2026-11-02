import { Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark';

/** Thème sombre par défaut ; le choix du visiteur est mémorisé. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly root = document.documentElement;
  readonly isDark = signal(this.root.getAttribute('data-theme') !== 'light');

  toggle(): void {
    const next: Theme = this.isDark() ? 'light' : 'dark';
    this.root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    this.isDark.set(next === 'dark');
  }
}
