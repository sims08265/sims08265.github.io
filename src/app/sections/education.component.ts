import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { EDUCATION } from '../core/portfolio.data';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { SectionHeadComponent } from '../shared/section-head.component';

const RING = 2 * Math.PI * 52; // circonférence du cercle de progression (r = 52)

@Component({
  selector: 'app-education',
  imports: [IconComponent, RevealDirective, SectionHeadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './education.component.css',
  template: `
    <section id="parcours">
      <div class="container">
        <app-section-head index="02" [tag]="i18n.t('edu.tag')" [title]="i18n.t('edu.title')"
                          [highlight]="i18n.t('edu.hl')" [sub]="i18n.t('edu.sub')" />
        <div class="layout">
          <div class="steps" role="tablist" appReveal>
            @for (e of education; track e.id) {
              <button class="step" role="tab" [class.active]="e.id === selectedId()" [attr.aria-selected]="e.id === selectedId()"
                      (click)="selectedId.set(e.id)">
                <span class="year">{{ e.year }}</span>
                <span class="info">
                  <b>{{ i18n.l(e.title) }}</b>
                  <small>{{ e.org }}</small>
                </span>
                <app-icon class="arrow" name="arrowUpRight" />
              </button>
            }
          </div>

          @let e = selected();
          <article class="card detail" appReveal="120" aria-live="polite">
            <div class="watermark">{{ e.watermark }}</div>
            <div class="head">
              <span class="icon-tile"><app-icon [name]="e.icon" /></span>
              <span class="chip">{{ e.period }}</span>
            </div>
            <h3>{{ i18n.l(e.title) }}</h3>
            <p class="org">{{ e.org }}</p>
            <ul>
              @for (point of i18n.l(e.points); track point) { <li>{{ point }}</li> }
            </ul>
            <div class="ring-wrap">
              <svg class="ring" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" style="stop-color: var(--accent)" /><stop offset="1" style="stop-color: var(--accent-2)" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="52" class="track" />
                <!-- Formation en cours : arc qui tourne au lieu d'un pourcentage inventé -->
                <circle cx="60" cy="60" r="52" class="bar" [class.ongoing]="e.progress === undefined" stroke="url(#ringGrad)"
                        [attr.stroke-dasharray]="ring" [attr.stroke-dashoffset]="ring * (1 - (e.progress ?? 22) / 100)" />
              </svg>
              <div class="ring-label">
                @if (e.progress === undefined) {
                  <b>{{ e.level }}</b>
                  <small class="mono">{{ i18n.t('ongoing') }}</small>
                } @else {
                  <b>{{ e.progress }}%</b>
                  <small class="mono">{{ e.progress === 100 ? i18n.t('done') : i18n.t('progress') }}</small>
                }
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
})
export class EducationComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly education = EDUCATION;
  protected readonly ring = RING;
  protected readonly selectedId = signal(EDUCATION[0].id);
  protected readonly selected = computed(() => EDUCATION.find(e => e.id === this.selectedId()) ?? EDUCATION[0]);
}
