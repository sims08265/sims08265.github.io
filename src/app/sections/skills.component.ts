import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { SKILLS } from '../core/portfolio.data';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { SectionHeadComponent } from '../shared/section-head.component';

interface Planet { name: string; angle: number; radius: number; outer: boolean; }

@Component({
  selector: 'app-skills',
  imports: [IconComponent, RevealDirective, SectionHeadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './skills.component.css',
  template: `
    <section id="stack">
      <div class="container">
        <app-section-head index="03" [tag]="i18n.t('skills.tag')" [title]="i18n.t('skills.title')"
                          [highlight]="i18n.t('skills.hl')" [sub]="i18n.t('skills.sub')" />

        <div class="tabs" role="tablist" appReveal>
          @for (c of categories; track c.key) {
            <button class="tab" role="tab" [class.active]="c.key === category().key" [attr.aria-selected]="c.key === category().key"
                    (click)="selectedKey.set(c.key)">
              <app-icon [name]="c.icon" />
              <span>{{ i18n.l(c.label) }}</span>
              <small class="mono">{{ c.items.length }}</small>
            </button>
          }
        </div>

        <div class="layout">
          <div class="card orbit-card" appReveal="80">
            <div class="orbit">
              <div class="ring r1"></div>
              <div class="ring r2"></div>
              <div class="ring r3"></div>
              <div class="core">
                <span class="core-glow"></span>
                <app-icon [name]="category().icon" />
                <b>{{ i18n.l(category().label) }}</b>
              </div>
              @for (p of planets(); track category().key + $index) {
                <!-- Le "track" tourne, chaque bulle est contre-tournée pour rester lisible -->
                <div class="track" [class.outer]="p.outer">
                  <div class="arm" [style.transform]="'rotate(' + p.angle + 'deg)'">
                    <div class="planet-pos" [style.left]="'calc(50% + ' + p.radius + '%)'"
                         [style.transform]="'translate(-50%, -50%) rotate(' + -p.angle + 'deg)'">
                      <span class="planet"><i></i>{{ p.name }}</span>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="card list" appReveal="160">
            <div class="list-head mono"><span>{{ i18n.l(category().label) }}</span><span>{{ category().items.length }}</span></div>
            <ul>
              @for (s of category().items; track category().key + $index; let i = $index) {
                <li class="row" [style.--i]="i">
                  <span class="idx mono">{{ i < 9 ? '0' : '' }}{{ i + 1 }}</span>
                  <span class="name">{{ i18n.l(s) }}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly categories = SKILLS;
  protected readonly selectedKey = signal(SKILLS[0].key);
  protected readonly category = computed(() => SKILLS.find(c => c.key === this.selectedKey()) ?? SKILLS[0]);

  /** Répartit les compétences sur deux orbites ; l'extérieure, plus longue, en reçoit davantage. */
  protected readonly planets = computed<Planet[]>(() => {
    const names = this.category().items.map(i => this.i18n.l(i));
    const inner = Math.floor(names.length * 0.4);
    const place = (list: string[], radius: number, outer: boolean, offset: number) =>
      list.map((name, i) => ({ name, radius, outer, angle: offset + (360 / list.length) * i }));
    // Décalages choisis pour qu'aucune bulle ne se chevauche en position initiale (et sans animation).
    return [...place(names.slice(0, inner), 27, false, -45), ...place(names.slice(inner), 44, true, -65)];
  });
}
