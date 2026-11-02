import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { ThemeService } from '../core/theme.service';
import { PROFILE, UiKey } from '../core/portfolio.data';
import { IconComponent } from '../shared/icon.component';

@Component({
  selector: 'app-navbar',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './navbar.component.css',
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <div class="progress" [style.transform]="'scaleX(' + progress() + ')'"></div>
    <header [class.scrolled]="scrolled()">
      <nav class="pill">
        <a href="#accueil" class="logo">
          <span class="mark">{{ profile.initials }}</span>
          <span class="word">{{ logo[0] }}<b>.</b>{{ logo[1] }}</span>
        </a>
        <ul class="links" [class.open]="menuOpen()">
          @for (link of links; track link.id; let i = $index) {
            <li>
              <a [href]="'#' + link.id" [class.active]="active() === link.id" (click)="menuOpen.set(false)">
                <span class="num">0{{ i + 1 }}</span>{{ i18n.t(link.key) }}
              </a>
            </li>
          }
        </ul>
        <div class="actions">
          <button class="ibtn lang" (click)="i18n.toggle()" [attr.aria-label]="i18n.t('aria.lang')">
            <span [class.on]="i18n.lang() === 'fr'">FR</span><span [class.on]="i18n.lang() === 'en'">EN</span>
          </button>
          <button class="ibtn" (click)="theme.toggle()" [attr.aria-label]="i18n.t('aria.theme')">
            <app-icon [name]="theme.isDark() ? 'sun' : 'moon'" />
          </button>
          <a class="cv" [href]="profile.cv" download>{{ i18n.t('nav.cv') }} <app-icon name="download" /></a>
          <button class="ibtn burger" (click)="menuOpen.update(o => !o)"
                  [attr.aria-expanded]="menuOpen()">
            <app-icon [name]="menuOpen() ? 'close' : 'menu'" /><span class="sr-only">{{ i18n.t('aria.menu') }}</span>
          </button>
        </div>
      </nav>
    </header>
    <button class="to-top" [class.show]="scrolled()" (click)="scrollTop()">
      <app-icon name="up" /><span class="sr-only">{{ i18n.t('aria.top') }}</span>
    </button>
  `,
})
export class NavbarComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly theme = inject(ThemeService);
  protected readonly profile = PROFILE;
  protected readonly logo = [PROFILE.displayFirst, PROFILE.displayLast].map(s => s.toLowerCase());

  protected readonly links: { id: string; key: UiKey }[] = [
    { id: 'apropos', key: 'nav.about' },
    { id: 'parcours', key: 'nav.edu' },
    { id: 'stack', key: 'nav.skills' },
    { id: 'projets', key: 'nav.projects' },
    { id: 'experiences', key: 'nav.exp' },
    { id: 'contact', key: 'nav.contact' },
  ];
  protected readonly menuOpen = signal(false);
  protected readonly active = signal('');
  protected readonly scrolled = signal(false);
  protected readonly progress = signal(0);

  protected onScroll(): void {
    const max = document.documentElement.scrollHeight - innerHeight;
    this.progress.set(max > 0 ? scrollY / max : 0);
    this.scrolled.set(scrollY > 80);
    let current = '';
    for (const { id } of this.links) {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop - innerHeight / 3) current = id;
    }
    this.active.set(current);
  }

  protected scrollTop(): void {
    scrollTo({ top: 0, behavior: 'smooth' });
  }
}
