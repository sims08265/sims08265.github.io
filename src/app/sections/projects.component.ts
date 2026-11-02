import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { PROJECTS } from '../core/portfolio.data';
import { ProjectArtComponent } from '../shared/project-art.component';
import { RevealDirective } from '../shared/reveal.directive';
import { SectionHeadComponent } from '../shared/section-head.component';

@Component({
  selector: 'app-projects',
  imports: [ProjectArtComponent, RevealDirective, SectionHeadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './projects.component.css',
  template: `
    <section id="projets">
      <div class="container">
        <app-section-head index="04" [tag]="i18n.t('proj.tag')" [title]="i18n.t('proj.title')"
                          [highlight]="i18n.t('proj.hl')" [sub]="i18n.t('proj.sub')" />
        <div class="grid">
          @for (p of projects; track p.art; let i = $index) {
            <article class="card project" [class.featured]="i === 0" [appReveal]="i * 120">
              <div class="art" [class]="'art--' + p.art">
                <app-project-art [art]="p.art" />
              </div>
              <div class="body">
                <div class="meta">
                  <span class="num">0{{ i + 1 }}</span>
                  <span class="chip">{{ i18n.l(p.category) }}</span>
                </div>
                <h3>{{ i18n.l(p.title) }}</h3>
                <p>{{ i18n.l(p.description) }}</p>
                <ul class="tags">
                  @for (tag of p.tags; track tag) { <li>{{ tag }}</li> }
                </ul>
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
