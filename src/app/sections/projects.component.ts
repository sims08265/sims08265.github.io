import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { PROJECTS } from '../core/portfolio.data';
import { IconComponent } from '../shared/icon.component';
import { ProjectArtComponent } from '../shared/project-art.component';
import { RevealDirective } from '../shared/reveal.directive';
import { SectionHeadComponent } from '../shared/section-head.component';

@Component({
  selector: 'app-projects',
  imports: [IconComponent, ProjectArtComponent, RevealDirective, SectionHeadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './projects.component.css',
  template: `
    <section id="projets">
      <div class="container">
        <app-section-head index="04" [tag]="i18n.t('proj.tag')" [title]="i18n.t('proj.title')"
                          [highlight]="i18n.t('proj.hl')" [sub]="i18n.t('proj.sub')" />
        <div class="grid">
          @for (p of projects; track p.art; let i = $index) {
            <article class="card project" [class.featured]="p.size === 'featured'" [class.small]="p.size === 'small'" [appReveal]="i * 120">
              <div class="art" [class]="'art--' + p.art">
                <app-project-art [art]="p.art" />
              </div>
              <div class="body">
                <div class="meta">
                  <span class="num">0{{ i + 1 }}</span>
                  <span class="chip">{{ i18n.l(p.category) }}</span>
                </div>
                <h3>{{ i18n.l(p.title) }}</h3>
                @if (p.subtitle) { <p class="subtitle">{{ i18n.l(p.subtitle) }}</p> }
                <p class="context mono">@if (p.period) { <b>{{ p.period }}</b> · }{{ i18n.l(p.context) }}</p>
                @if (p.description) { <p class="desc">{{ i18n.l(p.description) }}</p> }
                @if (p.highlights) {
                  <ul class="highlights">@for (h of i18n.l(p.highlights); track $index) { <li>{{ h }}</li> }</ul>
                }
                <ul class="tags">
                  @for (tag of p.tags; track tag) { <li>{{ tag }}</li> }
                </ul>
                <p class="private mono"><app-icon name="lock" />{{ i18n.t('proj.private') }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly projects = PROJECTS;
}
