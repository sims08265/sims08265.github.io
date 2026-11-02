import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { HERO_FLOATS, MARQUEE, PROFILE, TERMINAL } from '../core/portfolio.data';
import { IconComponent } from '../shared/icon.component';
import { NetworkBgComponent } from '../shared/network-bg.component';

/** Script du terminal (portfolio.data.ts) : chaque commande est tapée, puis sa sortie s'affiche. */
const SCRIPT = TERMINAL.script;
type Line = { kind: 'cmd' | 'out'; html: string };

@Component({
  selector: 'app-hero',
  imports: [IconComponent, NetworkBgComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './hero.component.css',
  template: `
    <section class="hero" id="accueil">
      <app-network-bg />
      <div class="aurora a1"></div><div class="aurora a2"></div>
      <div class="grid-bg"></div>

      <div class="container hero-grid">
        <div class="intro">
          <div class="chip status rise" style="--i:0"><span class="live-dot"></span>{{ i18n.t('hero.status') }}</div>
          <p class="hello mono rise" style="--i:1">{{ i18n.t('hero.hello') }}</p>
          <h1 class="rise" style="--i:2">
            <span class="l1">{{ profile.displayFirst }}</span>
            <span class="l2"><span class="grad">{{ profile.displayLast }}</span><span class="dot">.</span></span>
          </h1>
          <p class="fullname mono rise" style="--i:3">{{ profile.firstNames }} {{ profile.lastName }}</p>
          <p class="build rise" style="--i:4">
            {{ i18n.t('hero.build') }}<br>
            <span class="typed">{{ typed() }}</span><span class="caret"></span>
          </p>
          <p class="lead rise" style="--i:5">{{ i18n.t('hero.lead') }}</p>
          <div class="cta rise" style="--i:6">
            <a class="btn btn-primary" href="#projets">{{ i18n.t('hero.cta1') }} <app-icon class="slide" name="arrow" /></a>
            <a class="btn btn-ghost" [href]="profile.cv" download><app-icon name="download" /> {{ i18n.t('hero.cta2') }}</a>
            <div class="socials">
              <a [href]="profile.github" target="_blank" rel="noopener" aria-label="GitHub"><app-icon brand="github" /></a>
              <a [href]="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon brand="linkedin" /></a>
              <a [href]="'mailto:' + profile.email" aria-label="Email"><app-icon brand="mail" /></a>
            </div>
          </div>
        </div>

        <div class="visual rise" style="--i:3" aria-hidden="true">
          <div class="term">
            <div class="term-bar">
              <span class="mac r"></span><span class="mac y"></span><span class="mac g"></span>
              <span class="term-title">{{ terminalTitle }}</span>
            </div>
            <div class="term-body">
              @for (line of lines(); track $index) {
                @if (line.kind === 'cmd') {
                  <div class="ln"><span class="p">❯</span> {{ line.html }}</div>
                } @else {
                  <div class="ln out" [innerHTML]="line.html"></div>
                }
              }
              <div class="ln"><span class="p">❯</span> {{ typing() }}<span class="cursor"></span></div>
            </div>
          </div>
          @for (f of floats; track f.icon; let i = $index) {
            <div class="float" [class]="'f' + (i + 1)"><span class="icon-tile"><app-icon [name]="f.icon" /></span><span><b>{{ i18n.l(f.title) }}</b><small>{{ f.text }}</small></span></div>
          }
        </div>
      </div>

      <a href="#apropos" class="scroll-hint mono" aria-label="Défiler"><span class="mouse"><i></i></span>{{ i18n.t('hero.scroll') }}</a>

      <div class="marquee" aria-hidden="true">
        <div class="track">
          @for (rep of [0, 1]; track rep) {
            @for (tech of marquee; track tech) { <span>{{ tech }}</span><i>✦</i> }
          }
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly profile = PROFILE;
  protected readonly marquee = MARQUEE;
  protected readonly floats = HERO_FLOATS;
  protected readonly terminalTitle = TERMINAL.title;
  protected readonly typed = signal('');
  protected readonly lines = signal<Line[]>([]);
  protected readonly typing = signal('');

  private typeTimer?: ReturnType<typeof setTimeout>;
  private termTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => this.startTyping(this.i18n.l(PROFILE.typed)));
    this.runTerminal();
    inject(DestroyRef).onDestroy(() => { clearTimeout(this.typeTimer); clearTimeout(this.termTimer); });
  }

  /** Mot qui s'écrit / s'efface en boucle. */
  private startTyping(words: string[]): void {
    clearTimeout(this.typeTimer);
    let w = 0, c = 0, deleting = false;
    const step = () => {
      const word = words[w];
      this.typed.set(word.slice(0, c));
      if (!deleting && c < word.length) { c++; this.typeTimer = setTimeout(step, 70); }
      else if (!deleting) { deleting = true; this.typeTimer = setTimeout(step, 1700); }
      else if (c > 0) { c--; this.typeTimer = setTimeout(step, 35); }
      else { deleting = false; w = (w + 1) % words.length; this.typeTimer = setTimeout(step, 250); }
    };
    step();
  }

  /** Tape chaque commande caractère par caractère puis affiche sa sortie. */
  private runTerminal(): void {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      this.lines.set(SCRIPT.flatMap(s => [{ kind: 'cmd' as const, html: s.cmd }, ...s.out.map(o => ({ kind: 'out' as const, html: o }))]));
      return;
    }
    let block = 0, char = 0;
    const tick = () => {
      if (block >= SCRIPT.length) return;
      const { cmd, out } = SCRIPT[block];
      if (char < cmd.length) {
        this.typing.set(cmd.slice(0, ++char));
        this.termTimer = setTimeout(tick, 45 + Math.random() * 50);
        return;
      }
      this.typing.set('');
      this.lines.update(l => [...l, { kind: 'cmd', html: cmd }, ...out.map(o => ({ kind: 'out' as const, html: o }))]);
      block++; char = 0;
      this.termTimer = setTimeout(tick, 650);
    };
    this.termTimer = setTimeout(tick, 900);
  }
}
