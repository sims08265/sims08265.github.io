import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { PROFILE } from '../core/portfolio.data';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { SectionHeadComponent } from '../shared/section-head.component';

@Component({
  selector: 'app-about',
  imports: [IconComponent, RevealDirective, SectionHeadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './about.component.css',
  template: `
    <section id="apropos">
      <div class="container">
        <app-section-head index="01" [tag]="i18n.t('about.tag')" [title]="i18n.t('about.title')" [highlight]="i18n.t('about.hl')" />

        <div class="bento">
          <!-- Badge d'accès -->
          <article class="card badge" appReveal>
            <div class="lanyard"></div>
            <div class="badge-top mono"><span>{{ profile.badgeTop }}</span><span class="live"><span class="live-dot"></span>{{ i18n.t('badge.online') }}</span></div>
            <div class="photo">
              <span>{{ profile.initials }}</span>
              <i class="scan"></i>
              <b class="corner tl"></b><b class="corner tr"></b><b class="corner bl"></b><b class="corner br"></b>
            </div>
            <h3>{{ profile.lastName }}<br><span>{{ profile.firstNames }}</span></h3>
            <p class="role">{{ i18n.t('badge.role') }}</p>
            <dl class="mono">
              <div><dt>{{ i18n.t('badge.level') }}</dt><dd>{{ profile.level }}</dd></div>
              <div><dt>{{ i18n.t('badge.loc') }}</dt><dd>{{ i18n.l(profile.location) }}</dd></div>
              <div><dt>{{ i18n.t('badge.status') }}</dt><dd class="ok">{{ i18n.t('badge.open') }}</dd></div>
            </dl>
            <div class="barcode"></div>
          </article>

          <!-- Bio -->
          <article class="card bio" appReveal="100">
            <span class="quote">“</span>
            <p [innerHTML]="i18n.t('about.p1')"></p>
            <p [innerHTML]="i18n.t('about.p2')"></p>
            <p [innerHTML]="i18n.t('about.p3')"></p>
          </article>

          <!-- Chiffres -->
          <article class="card stats" appReveal="160" (revealed)="countUp()">
            @for (stat of profile.stats; track stat.key; let i = $index) {
              <div class="stat">
                <b class="grad">{{ counts()[i] }}</b>
                <span>{{ i18n.t(stat.key) }}</span>
              </div>
            }
          </article>

          <!-- Domaines -->
          <article class="card focus" appReveal="120">
            <h4 class="mono">{{ i18n.t('about.focus') }}</h4>
            <div class="focus-list">
              @for (f of profile.focus; track f.icon) {
                <div class="focus-item">
                  <span class="icon-tile"><app-icon [name]="f.icon" /></span>
                  <div><b>{{ i18n.l(f.title) }}</b><small>{{ i18n.l(f.text) }}</small></div>
                </div>
              }
            </div>
          </article>

          <!-- Langues -->
          <article class="card langs" appReveal="200">
            <h4 class="mono">{{ i18n.t('about.langs') }}</h4>
            @for (lang of profile.languages; track $index) {
              <div class="lang">
                <div class="lang-top"><b>{{ i18n.l(lang.name) }}</b><small class="mono">{{ i18n.l(lang.note) }}</small></div>
                <div class="meter" aria-hidden="true">
                  @for (n of [1, 2, 3, 4, 5]; track n) { <i [class.on]="n <= lang.level"></i> }
                </div>
              </div>
            }
          </article>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly profile = PROFILE;
  // Valeurs finales par défaut : le HTML pré-rendu et la page sans JS affichent les vrais chiffres.
  protected readonly counts = signal(PROFILE.stats.map(s => s.value));
  private frame = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }

  /** Compte de 0 à la valeur finale en ~1,4 s (durée indépendante de la valeur). */
  protected countUp(): void {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = PROFILE.stats.map(s => s.value);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1400, 1);
      const eased = 1 - (1 - t) ** 3;
      this.counts.set(targets.map(v => Math.round(v * eased)));
      if (t < 1) this.frame = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(tick);
  }
}
