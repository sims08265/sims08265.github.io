import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BRAND, ICONS, IconName } from '../core/portfolio.data';

/** Icône SVG à trait (ICONS) ou logo de marque rempli (BRAND). */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  styles: `:host { display: inline-flex; } svg { width: 100%; height: 100%; }`,
  template: `
    @if (brand(); as b) {
      <svg viewBox="0 0 24 24" fill="currentColor"><path [attr.d]="brandPath()" /></svg>
    } @else {
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round" [innerHTML]="paths()"></svg>
    }
  `,
})
export class IconComponent {
  readonly name = input<IconName>();
  readonly brand = input<keyof typeof BRAND>();

  private readonly sanitizer = inject(DomSanitizer);
  // Les chemins viennent de constantes locales (portfolio.data.ts), jamais d'une saisie utilisateur.
  protected readonly paths = computed(() => {
    const n = this.name();
    return this.sanitizer.bypassSecurityTrustHtml(n ? ICONS[n] : '');
  });
  protected readonly brandPath = computed(() => {
    const b = this.brand();
    return b ? BRAND[b] : '';
  });
}
