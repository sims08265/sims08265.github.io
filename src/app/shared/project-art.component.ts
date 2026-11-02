import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../core/portfolio.data';

/** Générateur pseudo-aléatoire déterministe (le nuage de points est identique à chaque rendu). */
function seeded(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}
const rand = seeded(42);
const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5;
const LEGIT = Array.from({ length: 46 }, () => ({ x: 320 + gauss() * 110, y: 160 + gauss() * 95, r: 2.5 + rand() * 2.5 }));
const FRAUD = [{ x: 96, y: 88 }, { x: 128, y: 214 }, { x: 74, y: 170 }, { x: 150, y: 120 }, { x: 104, y: 252 }];

/** Illustrations vectorielles des projets (s'adaptent au thème via les variables CSS). */
@Component({
  selector: 'app-project-art',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  styleUrl: './project-art.component.css',
  template: `
    <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet">
      @switch (art()) {
        @case ('fraud') {
          <!-- Nuage de points : transactions légitimes vs fraudes, frontière de décision -->
          @for (y of [60, 120, 180, 240]; track y) { <line class="axis" x1="30" [attr.y1]="y" x2="460" [attr.y2]="y" /> }
          <line class="axis strong" x1="30" y1="280" x2="460" y2="280" />
          <line class="axis strong" x1="30" y1="20" x2="30" y2="280" />
          <path class="region" d="M30 20 H196 C150 90 232 170 176 280 H30 Z" />
          <path class="boundary" d="M196 20 C150 90 232 170 176 280" />
          @for (p of legit; track $index) { <circle class="legit" [attr.cx]="p.x" [attr.cy]="p.y" [attr.r]="p.r" /> }
          @for (p of fraud; track $index) {
            <circle class="fraud-ring" [attr.cx]="p.x" [attr.cy]="p.y" r="7" [style.animation-delay]="$index * 0.4 + 's'" />
            <circle class="fraud" [attr.cx]="p.x" [attr.cy]="p.y" r="5" />
          }
          <g class="legend" transform="translate(300 34)">
            <rect width="150" height="50" rx="10" />
            <circle cx="18" cy="17" r="4" class="legit" /><text x="30" y="21">legit</text>
            <circle cx="18" cy="35" r="4" class="fraud" /><text x="30" y="39">fraud</text>
            <text x="86" y="21" class="dim">class 0</text><text x="86" y="39" class="dim">class 1</text>
          </g>
        }
        @case ('stock') {
          <!-- Mobile → API NestJS → PostgreSQL -->
          <path class="wire" d="M262 110 C 310 110, 310 92, 352 92" />
          <path class="wire" d="M262 190 C 320 190, 320 210, 352 210" />
          <path class="wire" d="M410 122 V 178" />
          <g transform="translate(118 18)">
            <rect class="phone" width="144" height="266" rx="24" />
            <rect class="screen" x="8" y="8" width="128" height="250" rx="17" />
            <rect class="notch" x="52" y="14" width="40" height="7" rx="3.5" />
            <text class="h" x="20" y="48">Stock</text>
            <rect class="accent-fill" x="104" y="36" width="20" height="16" rx="5" />
            @for (row of [0, 1, 2, 3]; track row) {
              <g [attr.transform]="'translate(18 ' + (66 + row * 36) + ')'">
                <rect class="item" width="108" height="28" rx="8" />
                <rect class="thumb" x="6" y="6" width="16" height="16" rx="4" />
                <rect class="txt" x="28" y="8" [attr.width]="38 - row * 5" height="4" rx="2" />
                <rect class="txt dim" x="28" y="16" width="26" height="4" rx="2" />
                <rect [class]="row === 2 ? 'pill warn' : 'pill'" x="80" y="8" width="22" height="12" rx="6" />
              </g>
            }
            @for (b of [22, 34, 18, 40, 30, 46]; track $index) {
              <rect class="bar" [attr.x]="22 + $index * 18" [attr.y]="248 - b" width="11" [attr.height]="b" rx="3"
                    [style.animation-delay]="$index * 0.12 + 's'" />
            }
          </g>
          <g transform="translate(352 64)">
            <rect class="node" width="116" height="56" rx="14" />
            <text class="h small" x="16" y="25">API</text><text class="dim" x="16" y="42">NestJS</text>
            <circle class="led" cx="98" cy="18" r="4" />
          </g>
          <g transform="translate(370 178)">
            <ellipse class="db" cx="40" cy="12" rx="40" ry="11" />
            <path class="db" d="M0 12 V58 C0 64 18 70 40 70 C62 70 80 64 80 58 V12" />
            <path class="db-line" d="M0 30 C0 36 18 41 40 41 C62 41 80 36 80 30" />
            <text class="dim" x="2" y="94">PostgreSQL</text>
          </g>
        }
        @case ('crypto') {
          <!-- Chiffrement de bout en bout : le serveur ne voit que du chiffré -->
          <path class="link" d="M108 120 H372" />
          <path class="link flow" d="M108 120 H372" />
          <g class="packet"><rect x="-44" y="-13" width="88" height="26" rx="8" /><text x="0" y="4" text-anchor="middle">7f3a·9c1e</text></g>
          @for (d of devices; track d.label) {
            <g [attr.transform]="'translate(' + d.x + ' 120)'">
              <circle class="halo" r="46" />
              <circle class="device" r="34" />
              <circle class="person" cy="-8" r="9" />
              <path class="person" d="M-15 17 a15 13 0 0 1 30 0" />
              <text class="h" y="70" text-anchor="middle">{{ d.label }}</text>
              <g [attr.transform]="'translate(' + (d.x < 240 ? 24 : -24) + ' -26)'">
                <circle class="key-bg" r="12" />
                <circle class="key" cx="-3" cy="0" r="3.5" /><path class="key" d="M0.5 0 H7 M5 0 V3" />
              </g>
            </g>
          }
          <g transform="translate(240 120)">
            <circle class="lock-bg" r="24" />
            <rect class="lock" x="-8" y="-3" width="16" height="12" rx="3" />
            <path class="lock-shackle" d="M-5 -3 V-7 a5 5 0 0 1 10 0 V-3" />
          </g>
          <path class="wire" d="M240 144 V 206" />
          <g transform="translate(176 206)">
            <rect class="node" width="128" height="58" rx="14" />
            <text class="dim" x="16" y="24">server sees</text>
            <text class="cipher" x="16" y="44">••••••••••</text>
          </g>
          <g class="tag-e2e" transform="translate(196 30)"><rect width="88" height="26" rx="13" /><text x="44" y="17" text-anchor="middle">E2EE</text></g>
        }
      }
    </svg>
  `,
})
export class ProjectArtComponent {
  readonly art = input.required<Project['art']>();
  protected readonly legit = LEGIT;
  protected readonly fraud = FRAUD;
  protected readonly devices = [{ x: 74, label: 'A' }, { x: 406, label: 'B' }];
}
