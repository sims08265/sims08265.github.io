import { Injectable, effect, signal } from '@angular/core';
import { Lang, Localized, UI_TEXT, UiKey } from './portfolio.data';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(this.restore());

  constructor() {
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      try { localStorage.setItem('lang', lang); } catch { /* storage unavailable */ }
    });
  }

  toggle(): void {
    this.lang.update(l => (l === 'fr' ? 'en' : 'fr'));
  }

  /** UI string by key, for the current language. */
  t(key: UiKey): string {
    return UI_TEXT[this.lang()][key];
  }

  /** Pick the current-language value of a `{ fr, en }` object. */
  l<T>(value: Localized<T>): T {
    return value[this.lang()];
  }

  private restore(): Lang {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'fr' || saved === 'en') return saved;
    } catch { /* storage unavailable */ }
    return 'fr';
  }
}
