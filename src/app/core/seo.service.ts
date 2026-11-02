import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { I18nService } from './i18n.service';
import { PROFILE, SITE } from './portfolio.data';

/** Title, description, Open Graph et canonical tirés de portfolio.data.ts (écrits dans le HTML pré-rendu). */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly i18n = inject(I18nService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const title = this.i18n.l(SITE.title);
      const description = this.i18n.l(SITE.description);
      this.title.setTitle(title);
      const tags: { key: 'name' | 'property'; id: string; content: string }[] = [
        { key: 'name', id: 'description', content: description },
        { key: 'name', id: 'author', content: `${PROFILE.firstNames} ${PROFILE.lastName}` },
        { key: 'property', id: 'og:type', content: 'profile' },
        { key: 'property', id: 'og:url', content: SITE.url },
        { key: 'property', id: 'og:title', content: title },
        { key: 'property', id: 'og:description', content: description },
        { key: 'property', id: 'og:image', content: SITE.image },
        { key: 'property', id: 'og:image:width', content: '1200' },
        { key: 'property', id: 'og:image:height', content: '630' },
        { key: 'property', id: 'og:image:alt', content: title },
        { key: 'property', id: 'og:locale', content: this.i18n.lang() === 'fr' ? 'fr_FR' : 'en_US' },
        { key: 'name', id: 'twitter:card', content: 'summary_large_image' },
        { key: 'name', id: 'twitter:title', content: title },
        { key: 'name', id: 'twitter:description', content: description },
        { key: 'name', id: 'twitter:image', content: SITE.image },
      ];
      for (const { key, id, content } of tags) this.meta.updateTag({ [key]: id, content }, `${key}="${id}"`);
    });
    this.setCanonical(SITE.url);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }
}
