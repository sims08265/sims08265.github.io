import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BRAND, ICONS, IconName } from '../core/portfolio.data';

/** Forme SVG élémentaire (path, circle, rect, ellipse) et ses attributs. */
interface Shape { tag: string; attrs: Record<string, string>; }

/** Découpe une chaîne d'ICONS en formes, rendues comme de vrais éléments (pas d'innerHTML, compatible pré-rendu). */
const parse = (markup: string): Shape[] =>
  [...markup.matchAll(/<(\w+)\s([^>]*?)\/>/g)].map(([, tag, attrs]) => ({
    tag,
    attrs: Object.fromEntries([...attrs.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, k, v]) => [k, v])),
  }));
const SHAPES = Object.fromEntries(Object.entries(ICONS).map(([name, markup]) => [name, parse(markup)])) as Record<IconName, Shape[]>;

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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        @for (s of shapes(); track $index) {
          @switch (s.tag) {
            @case ('path') { <svg:path [attr.d]="s.attrs['d']" /> }
            @case ('circle') { <svg:circle [attr.cx]="s.attrs['cx']" [attr.cy]="s.attrs['cy']" [attr.r]="s.attrs['r']" /> }
            @case ('ellipse') { <svg:ellipse [attr.cx]="s.attrs['cx']" [attr.cy]="s.attrs['cy']" [attr.rx]="s.attrs['rx']" [attr.ry]="s.attrs['ry']" /> }
            @case ('rect') {
              <svg:rect [attr.x]="s.attrs['x']" [attr.y]="s.attrs['y']" [attr.width]="s.attrs['width']"
                        [attr.height]="s.attrs['height']" [attr.rx]="s.attrs['rx']" />
            }
          }
        }
      </svg>
    }
  `,
})
export class IconComponent {
  readonly name = input<IconName>();
  readonly brand = input<keyof typeof BRAND>();

  protected readonly shapes = computed(() => {
    const n = this.name();
    return n ? SHAPES[n] : [];
  });
  protected readonly brandPath = computed(() => {
    const b = this.brand();
    return b ? BRAND[b] : '';
  });
}
