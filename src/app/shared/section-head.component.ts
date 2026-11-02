import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from './reveal.directive';

/** En-tête de section : « 01 / tag », titre avec partie en dégradé, sous-titre. */
@Component({
  selector: 'app-section-head',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host { display: block; margin-bottom: 64px; }
    .kicker { display: flex; align-items: center; gap: 14px; font: 500 .8rem var(--font-mono); color: var(--muted); text-transform: uppercase; letter-spacing: .14em; margin-bottom: 18px; }
    .kicker b { color: var(--accent); font-weight: 600; }
    .kicker i { flex: 0 0 48px; height: 1px; background: linear-gradient(90deg, var(--accent), transparent); }
    h2 { font: 700 clamp(2.4rem, 6vw, 4.4rem)/1 var(--font-display); color: var(--heading); letter-spacing: -.022em; }
    p { margin-top: 18px; max-width: 560px; font-size: 1.05rem; color: var(--muted); }
  `,
  template: `
    <div appReveal class="kicker"><b>{{ index() }}</b><i></i>{{ tag() }}</div>
    <h2 appReveal="80">{{ title() }} <span class="grad">{{ highlight() }}</span></h2>
    @if (sub()) { <p appReveal="160">{{ sub() }}</p> }
  `,
})
export class SectionHeadComponent {
  readonly index = input.required<string>();
  readonly tag = input.required<string>();
  readonly title = input.required<string>();
  readonly highlight = input('');
  readonly sub = input('');
}
