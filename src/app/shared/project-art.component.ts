import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../core/portfolio.data';

/** Courbe de Bézier horizontale entre deux points (arêtes du graphe de matching). */
const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
};
const TALENTS = [70, 120, 170, 220];
const SKILLS = [{ y: 60, label: 'python' }, { y: 100, label: 'sql' }, { y: 140, label: 'nlp' }, { y: 180, label: 'react' }, { y: 220, label: 'docker' }];
const JOBS = [80, 140, 200];
// [talent, compétence, offre ?] ; m = appariement retenu (mis en évidence)
const EDGES = [
  ...[[0, 0, 1], [0, 2, 0], [1, 1, 0], [1, 3, 0], [2, 2, 1], [2, 4, 0], [3, 3, 1], [3, 1, 0]]
    .map(([t, s, m]) => ({ d: curve(75, TALENTS[t], 202, SKILLS[s].y), m: !!m })),
  ...[[0, 0, 1], [1, 0, 0], [2, 1, 1], [3, 2, 1], [4, 1, 0], [4, 2, 0]]
    .map(([s, j, m]) => ({ d: curve(278, SKILLS[s].y, 392, JOBS[j]), m: !!m })),
];

/** Illustrations vectorielles des projets (s'adaptent au thème via les variables CSS). */
@Component({
  selector: 'app-project-art',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  styleUrl: './project-art.component.css',
  template: `
    <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet">
      @switch (art()) {
        @case ('trusty') {
          <!-- Ledger d'événements append-only → Trust Score explicable (0–100, 6 sous-indices) -->
          <text class="dim" x="300" y="32">append-only ledger</text>
          @for (b of [0, 1, 2, 3]; track b) {
            <g [attr.transform]="'translate(300 ' + (44 + b * 44) + ')'">
              <g [class.append]="b === 3">
                <rect class="item" width="150" height="32" rx="9" />
                <circle class="dot" cx="16" cy="16" r="4" />
                <rect class="txt" x="28" y="10" [attr.width]="56 - b * 6" height="4" rx="2" />
                <rect class="txt dim" x="28" y="18" width="38" height="4" rx="2" />
                <text class="dim" x="138" y="20" text-anchor="end">evt</text>
              </g>
            </g>
            @if (b < 3) { <path class="chain" [attr.d]="'M375 ' + (76 + b * 44) + ' V ' + (88 + b * 44)" /> }
          }
          <path class="wire" d="M300 148 C 276 148, 270 166, 252 166" />
          <g transform="translate(140 166)">
            <path class="gauge-track" d="M-100 0 A100 100 0 0 1 100 0" />
            <path class="gauge-fill" d="M-100 0 A100 100 0 0 1 100 0" pathLength="100" />
            <text class="h" y="-30" text-anchor="middle">Trust Score</text>
            <text class="dim" y="-12" text-anchor="middle">explainable · 0–100</text>
            <text class="dim" x="-100" y="22" text-anchor="middle">0</text>
            <text class="dim" x="100" y="22" text-anchor="middle">100</text>
            @for (h of [26, 38, 20, 44, 32, 36]; track $index) {
              <rect class="bar" [attr.x]="-63 + $index * 22" [attr.y]="84 - h" width="14" [attr.height]="h" rx="3"
                    [style.animation-delay]="$index * 0.15 + 's'" />
            }
            <text class="dim" y="104" text-anchor="middle">6 sub-indices</text>
          </g>
          <g class="tag" transform="translate(300 236)"><rect width="150" height="28" rx="14" /><text x="75" y="18" text-anchor="middle">SQLCipher · offline</text></g>
        }
        @case ('matching') {
          <!-- Graphe de compétences : talents → compétences → offres, appariement stable (Gale–Shapley) -->
          <text class="dim" x="60" y="34" text-anchor="middle">talents</text>
          <text class="dim" x="240" y="34" text-anchor="middle">skills graph</text>
          <text class="dim" x="420" y="34" text-anchor="middle">jobs</text>
          @for (e of edges; track $index) { <path class="edge" [class.match]="e.m" [attr.d]="e.d" /> }
          @for (y of talents; track y) {
            <g [attr.transform]="'translate(60 ' + y + ')'">
              <circle class="device" r="15" />
              <circle class="person" cy="-4" r="4" />
              <path class="person" d="M-7 9 a7 6 0 0 1 14 0" />
            </g>
          }
          @for (s of skills; track s.label) {
            <g [attr.transform]="'translate(240 ' + s.y + ')'">
              <rect class="skill" x="-38" y="-11" width="76" height="22" rx="11" />
              <text y="4" text-anchor="middle">{{ s.label }}</text>
            </g>
          }
          @for (y of jobs; track y) {
            <g [attr.transform]="'translate(420 ' + y + ')'">
              <rect class="node" x="-28" y="-15" width="56" height="30" rx="8" />
              <rect class="txt" x="-18" y="-5" width="36" height="4" rx="2" />
              <rect class="txt dim" x="-18" y="3" width="24" height="4" rx="2" />
            </g>
          }
          <g class="tag" transform="translate(165 256)"><rect width="150" height="28" rx="14" /><text x="75" y="18" text-anchor="middle">Gale–Shapley</text></g>
        }
        @case ('vault') {
          <!-- Coffre-fort Zero-Trust : WAF en entrée, réseau isolé, monitoring + détection d'anomalies -->
          <path class="link" d="M18 150 H 96" />
          <path class="link flow" d="M18 150 H 96" />
          <g class="waf" transform="translate(118 150)">
            <path d="M0 -26 L21 -17 V0 C21 14 11 23 0 27 C-11 23 -21 14 -21 0 V-17 Z" />
            <text y="4" text-anchor="middle">WAF</text>
          </g>
          <path class="wire" d="M140 150 H 176" />
          <rect class="zone" x="172" y="58" width="156" height="184" rx="18" />
          <text class="dim" x="250" y="48" text-anchor="middle">isolated network</text>
          <g transform="translate(250 146)">
            <rect class="vault" x="-54" y="-54" width="108" height="108" rx="16" />
            <rect class="hinge" x="-60" y="-34" width="8" height="18" rx="3" />
            <rect class="hinge" x="-60" y="16" width="8" height="18" rx="3" />
            <circle class="dial-ring" r="32" />
            <g class="dial">
              @for (a of [0, 45, 90, 135, 180, 225, 270, 315]; track a) {
                <line class="tick" x1="0" y1="-22" x2="0" y2="-27" [attr.transform]="'rotate(' + a + ')'" />
              }
            </g>
            <circle class="hub" r="7" />
          </g>
          <text class="dim" x="250" y="228" text-anchor="middle">rootless docker</text>
          <path class="wire" d="M328 110 H 344" />
          <g transform="translate(344 52)">
            <rect class="node" width="128" height="112" rx="12" />
            <text class="dim" x="12" y="22">metrics</text>
            <polyline class="series" points="12,86 26,78 40,82 54,70 68,76 82,42 96,74 106,68" />
            <circle class="anomaly-ring" cx="82" cy="42" r="6" />
            <circle class="anomaly" cx="82" cy="42" r="4" />
            <text class="dim" x="12" y="102">isolation forest</text>
          </g>
          <path class="wire" d="M408 164 V 184" />
          <g class="alert" transform="translate(344 184)">
            <rect width="128" height="32" rx="10" />
            <rect class="env" x="12" y="10" width="17" height="12" rx="2" /><path class="env" d="M12 11 l8.5 6 8.5 -6" />
            <text x="38" y="20">e-mail alert</text>
          </g>
          <g class="tag" transform="translate(36 230)"><rect width="88" height="28" rx="14" /><text x="44" y="18" text-anchor="middle">HTTPS</text></g>
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
      }
    </svg>
  `,
})
export class ProjectArtComponent {
  readonly art = input.required<Project['art']>();
  protected readonly talents = TALENTS;
  protected readonly skills = SKILLS;
  protected readonly jobs = JOBS;
  protected readonly edges = EDGES;
}
