import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { EXPERIENCES, Experience, INTERESTS, IconName } from '../core/portfolio.data';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { SectionHeadComponent } from '../shared/section-head.component';

@Component({
  selector: 'app-experience',
  imports: [IconComponent, RevealDirective, SectionHeadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './experience.component.css',
  template: `
    <section id="experiences">
      <div class="container">
        <app-section-head index="05" [tag]="i18n.t('exp.tag')" [title]="i18n.t('exp.title')" [highlight]="i18n.t('exp.hl')" />

        <ol class="timeline">
          @for (e of experiences; track e.date + e.kind; let i = $index) {
            @let dates = e.date.split(' – ');
            <li class="entry" [appReveal]="i * 100">
              <div class="when mono">
                <span>{{ dates[0] }}</span>
                @if (dates[1]) { <i></i><span>{{ dates[1] }}</span> }
              </div>
              <div class="node" [class.pro]="e.kind === 'pro'" [class.hack]="e.kind === 'hackathon'">
                <app-icon [name]="icons[e.kind]" />
              </div>
              <article class="card what">
                <div class="top">
                  <h3>{{ i18n.l(e.title) }}</h3>
                  <span class="kind" [class.pro]="e.kind === 'pro'" [class.hack]="e.kind === 'hackathon'">{{ i18n.t(e.kind) }}</span>
                </div>
                <p class="org">{{ i18n.l(e.org) }}</p>
                @if (e.summary) { <p class="summary">{{ i18n.l(e.summary) }}</p> }
                @if (e.details) {
                  <ul class="details">@for (d of i18n.l(e.details); track $index) { <li [innerHTML]="d"></li> }</ul>
                }
                @if (e.points) {
                  <ul class="chips">@for (pt of i18n.l(e.points); track pt) { <li>{{ pt }}</li> }</ul>
                }
              </article>
            </li>
          }
        </ol>

        <div class="beyond" appReveal>
          <h3 class="mono">{{ i18n.t('int.title') }}</h3>
          <div class="interests">
            @for (it of interests; track it.icon) {
              <span class="interest"><app-icon [name]="it.icon" />{{ i18n.l(it.label) }}</span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly experiences = EXPERIENCES;
  protected readonly interests = INTERESTS;
  protected readonly icons: Record<Experience['kind'], IconName> = { pro: 'briefcase', perso: 'user', hackathon: 'zap' };
}
