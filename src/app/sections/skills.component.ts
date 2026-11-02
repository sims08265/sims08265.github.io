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
              @for (p of planets(); track category().key + p.name) {
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
            <div class="list-head mono"><span>{{ i18n.l(category().label) }}</span><span>lvl</span></div>
            @for (s of category().items; track category().key + s.name; let i = $index) {
              <div class="row" [style.--i]="i">
                <span class="name">{{ s.name }}</span>
                <span class="cells" [attr.aria-label]="s.level + '%'">
                  @for (n of cells; track n) { <i [class.on]="n * 10 <= s.level"></i> }
                </span>
                <span class="pct mono">{{ s.level }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly categories = SKILLS;
  protected readonly cells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  protected readonly selectedKey = signal(SKILLS[0].key);
  protected readonly category = computed(() => SKILLS.find(c => c.key === this.selectedKey()) ?? SKILLS[0]);

  /** Répartit les compétences sur deux orbites (intérieure / extérieure). */
  protected readonly planets = computed<Planet[]>(() => {
    const names = this.category().items.map(i => i.name);
    const half = Math.ceil(names.length / 2);
    const place = (list: string[], radius: number, outer: boolean, offset: number) =>
      list.map((name, i) => ({ name, radius, outer, angle: offset + (360 / list.length) * i }));
    return [...place(names.slice(0, half), 27, false, -90), ...place(names.slice(half), 44, true, -50)];
  });
}
