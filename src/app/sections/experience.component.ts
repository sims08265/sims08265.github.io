import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { EXPERIENCES, INTERESTS } from '../core/portfolio.data';
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
          @for (e of experiences; track e.date; let i = $index) {
            <li class="entry" [appReveal]="i * 100">
              <div class="when mono">
                <span>{{ e.date.split(' – ')[0] }}</span>
                <i></i>
                <span>{{ e.date.split(' – ')[1] }}</span>
              </div>
              <div class="node" [class.pro]="e.kind === 'pro'">
                <app-icon [name]="e.kind === 'pro' ? 'briefcase' : 'user'" />
              </div>
              <article class="card what">
                <div class="top">
                  <h3>{{ i18n.l(e.title) }}</h3>
                  <span class="kind" [class.pro]="e.kind === 'pro'">{{ i18n.t(e.kind) }}</span>
                </div>
                <p class="org">{{ e.org }}</p>
                @if (e.points) {
                  <ul>@for (pt of i18n.l(e.points); track pt) { <li>{{ pt }}</li> }</ul>
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
}
