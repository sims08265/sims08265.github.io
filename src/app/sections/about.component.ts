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
            <div class="badge-top mono"><span>IUSJ · ACCESS</span><span class="live"><span class="live-dot"></span>ONLINE</span></div>
            <div class="photo">
              <span>{{ profile.initials }}</span>
              <i class="scan"></i>
              <b class="corner tl"></b><b class="corner tr"></b><b class="corner bl"></b><b class="corner br"></b>
            </div>
            <h3>{{ profile.lastName }}<br><span>{{ profile.firstNames }}</span></h3>
            <p class="role">{{ i18n.t('badge.role') }}</p>
            <dl class="mono">
              <div><dt>{{ i18n.t('badge.level') }}</dt><dd>ING-4 / 5</dd></div>
              <div><dt>{{ i18n.t('badge.loc') }}</dt><dd>{{ profile.location }}</dd></div>
              <div><dt>{{ i18n.t('badge.status') }}</dt><dd class="ok">{{ i18n.t('badge.open') }}</dd></div>
            </dl>
            <div class="barcode"></div>
          </article>

          <!-- Bio -->
          <article class="card bio" appReveal="100">
            <span class="quote">“</span>
            <p [innerHTML]="i18n.t('about.p1')"></p>
            <p [innerHTML]="i18n.t('about.p2')"></p>
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
            @for (lang of profile.languages; track lang.level) {
              <div class="lang">
                <div class="lang-top"><b>{{ i18n.l(lang.name) }}</b><small class="mono">{{ i18n.l(lang.note) }}</small></div>
                <div class="meter" [attr.aria-label]="lang.level + '/5'">
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
  protected readonly counts = signal(PROFILE.stats.map(() => 0));
  private interval?: ReturnType<typeof setInterval>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.interval));
  }

  protected countUp(): void {
    const targets = PROFILE.stats.map(s => s.value);
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const next = this.counts().map((v, i) => Math.min(v + 1, targets[i]));
      this.counts.set(next);
      if (next.every((v, i) => v === targets[i])) clearInterval(this.interval);
    }, 140);
  }
}
