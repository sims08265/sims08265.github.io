import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, output } from '@angular/core';

/** Ajoute la classe `in` quand l'élément entre dans le viewport. `appReveal="150"` = délai en ms. */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal', '[style.--delay]': 'delay() + "ms"' },
})
export class RevealDirective {
  readonly delay = input(0, { alias: 'appReveal', transform: (v: unknown) => Number(v) || 0 });
  readonly revealed = output<void>();

  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const io = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.classList.add('in');
          this.revealed.emit();
          io.disconnect();
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      io.observe(el);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
