import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject } from '@angular/core';
import { I18nService } from './core/i18n.service';
import { SeoService } from './core/seo.service';
import { PROFILE } from './core/portfolio.data';
import { NavbarComponent } from './sections/navbar.component';
import { HeroComponent } from './sections/hero.component';
import { AboutComponent } from './sections/about.component';
import { EducationComponent } from './sections/education.component';
import { SkillsComponent } from './sections/skills.component';
import { ProjectsComponent } from './sections/projects.component';
import { ExperienceComponent } from './sections/experience.component';
import { ContactComponent } from './sections/contact.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent, HeroComponent, AboutComponent, EducationComponent,
    SkillsComponent, ProjectsComponent, ExperienceComponent, ContactComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    footer { position: relative; overflow: hidden; border-top: 1px solid var(--border); padding: 60px 0 28px; }
    footer .container { container-type: inline-size; }
    /* Taille calculée sur la largeur du conteneur et le nombre de caractères (~0,5 em/lettre + marge) : jamais coupé. */
    .giant {
      font: 800 min(15rem, calc(100cqi / (var(--chars) * .54)))/.8 var(--font-display); letter-spacing: -.035em; text-align: center; white-space: nowrap;
      color: transparent; -webkit-text-stroke: 1px var(--border-strong); user-select: none;
      mask-image: linear-gradient(180deg, #000 30%, transparent 95%); -webkit-mask-image: linear-gradient(180deg, #000 30%, transparent 95%);
    }
    .row { margin-top: 34px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; font-size: .82rem; color: var(--muted); }
    .row .mono b { color: var(--accent); font-weight: 500; }
  `,
  template: `
    <a href="#main" class="skip-link">{{ i18n.t('skip') }}</a>
    <!-- Navigation et hero : activés dès que le navigateur est libre (les clics avant cela sont rejoués). -->
    @defer (hydrate on idle; hydrate when hydrateAll()) { <app-navbar /> }
    <main id="main">
      @defer (hydrate on idle; hydrate when hydrateAll()) { <app-hero /> }
      <!-- HTML pré-rendu affiché tout de suite. Le code de chaque section est téléchargé au repos et activé
           quand elle arrive à l'écran, ou immédiatement si la langue affichée n'est pas celle du pré-rendu (FR). -->
      @defer (hydrate on viewport; hydrate when hydrateAll(); prefetch on idle) { <app-about /> }
      @defer (hydrate on viewport; hydrate when hydrateAll(); prefetch on idle) { <app-education /> }
      @defer (hydrate on viewport; hydrate when hydrateAll(); prefetch on idle) { <app-skills /> }
      @defer (hydrate on viewport; hydrate when hydrateAll(); prefetch on idle) { <app-projects /> }
      @defer (hydrate on viewport; hydrate when hydrateAll(); prefetch on idle) { <app-experience /> }
      @defer (hydrate on viewport; hydrate when hydrateAll(); prefetch on idle) { <app-contact /> }
    </main>
    <footer>
      <div class="container">
        <div class="giant" aria-hidden="true" [style.--chars]="giant.length">{{ giant }}</div>
        <div class="row">
          <span>© {{ year }} {{ name }}</span>
          <span class="mono"><b>&lt;/&gt;</b> {{ i18n.t('footer.made') }}</span>
        </div>
      </div>
    </footer>
  `,
})
export class App {
  protected readonly i18n = inject(I18nService);
  protected readonly year = new Date().getFullYear();
  protected readonly hydrateAll = computed(() => this.i18n.lang() !== 'fr');
  protected readonly name = `${PROFILE.firstNames} ${PROFILE.lastName}`;
  protected readonly giant = `${PROFILE.displayFirst} ${PROFILE.displayLast}`.toUpperCase();

  constructor() {
    inject(SeoService);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      // Signale au script de secours d'index.html que l'app a démarré (voir .js .reveal).
      document.documentElement.classList.add('app-ready');
      // Reflet lumineux : position du curseur relative à la carte survolée (--mx / --my).
      const onMove = (e: PointerEvent) => {
        const card = (e.target as Element | null)?.closest?.('.card') as HTMLElement | null;
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      };
      document.addEventListener('pointermove', onMove, { passive: true });
      destroyRef.onDestroy(() => document.removeEventListener('pointermove', onMove));
    });
  }
}
