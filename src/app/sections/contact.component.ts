import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../core/i18n.service';
import { PROFILE } from '../core/portfolio.data';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './contact.component.css',
  template: `
    <section id="contact">
      <div class="glow"></div>
      <div class="container">
        <div class="kicker mono" appReveal><b>06</b><i></i>{{ i18n.t('contact.tag') }}</div>
        <h2 appReveal="80">{{ i18n.t('contact.big1') }}<br><span class="grad">{{ i18n.t('contact.big2') }}</span></h2>
        <p class="sub" appReveal="140">{{ i18n.t('contact.sub') }}</p>

        <div class="grid">
          <div class="left" appReveal="180">
            <div class="mail-row">
              <a class="mail" [href]="'mailto:' + profile.email">{{ profile.email }}<app-icon name="arrowUpRight" /></a>
              <button class="copy" (click)="copy()" [attr.aria-label]="i18n.t('contact.copy')">
                <app-icon [name]="copied() ? 'check' : 'copy'" />
                <span>{{ copied() ? i18n.t('contact.copied') : i18n.t('contact.copy') }}</span>
              </button>
            </div>
            <div class="links">
              <a class="card link" [href]="profile.github" target="_blank" rel="noopener">
                <span class="icon-tile"><app-icon brand="github" /></span>
                <span><small class="mono">GitHub</small>{{ profile.githubHandle }}</span>
              </a>
              <a class="card link" [href]="profile.linkedin" target="_blank" rel="noopener">
                <span class="icon-tile"><app-icon brand="linkedin" /></span>
                <span><small class="mono">LinkedIn</small>Gills SIMO</span>
              </a>
              <div class="card link">
                <span class="icon-tile"><app-icon name="pin" /></span>
                <span><small class="mono">{{ i18n.t('contact.loc') }}</small>{{ profile.location }}</span>
              </div>
            </div>
          </div>

          <form class="card form" appReveal="240" #f="ngForm" (ngSubmit)="send()">
            <h3>{{ i18n.t('form.title') }}</h3>
            <div class="row2">
              <label class="field"><span>{{ i18n.t('form.name') }}</span>
                <input name="name" [(ngModel)]="model.name" required maxlength="80" autocomplete="name"></label>
              <label class="field"><span>Email</span>
                <input name="email" type="email" [(ngModel)]="model.email" required email maxlength="120" autocomplete="email"></label>
            </div>
            <label class="field"><span>{{ i18n.t('form.subject') }}</span>
              <input name="subject" [(ngModel)]="model.subject" required maxlength="120"></label>
            <label class="field"><span>Message</span>
              <textarea name="message" [(ngModel)]="model.message" required maxlength="2000" rows="5"></textarea></label>
            <button class="btn btn-primary" type="submit" [disabled]="f.invalid">
              {{ i18n.t('form.send') }} <app-icon class="slide" name="send" />
            </button>
            @if (sent()) { <p class="msg" aria-live="polite"><app-icon name="check" />{{ i18n.t('form.ok') }}</p> }
          </form>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly profile = PROFILE;
  protected readonly sent = signal(false);
  protected readonly copied = signal(false);
  protected model = { name: '', email: '', subject: '', message: '' };
  private copyTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.copyTimer));
  }

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      this.copied.set(true);
      clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => this.copied.set(false), 2000);
    } catch { /* presse-papiers indisponible : le lien mailto reste utilisable */ }
  }

  /** Pas de backend : ouvre le client mail avec le message pré-rempli. */
  protected send(): void {
    const { name, email, subject, message } = this.model;
    const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`;
    location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`;
    this.sent.set(true);
  }
}
