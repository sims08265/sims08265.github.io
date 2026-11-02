import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

interface Node { x: number; y: number; vx: number; vy: number; r: number; }

/**
 * Réseau de nœuds animé (évoque données + réseau) dessiné sur un canvas.
 * Les nœuds proches se relient ; le curseur attire les liaisons. Pause hors écran.
 */
@Component({
  selector: 'app-network-bg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  styles: `
    :host { position: absolute; inset: 0; display: block; overflow: hidden; pointer-events: none; }
    canvas { width: 100%; height: 100%; display: block;
      mask-image: radial-gradient(ellipse 80% 75% at 60% 45%, #000 30%, transparent 85%);
      -webkit-mask-image: radial-gradient(ellipse 80% 75% at 60% 45%, #000 30%, transparent 85%); }
  `,
  template: `<canvas #c></canvas>`,
})
export class NetworkBgComponent {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('c');

  constructor() {
    const destroyRef = inject(DestroyRef);
    const host = inject(ElementRef<HTMLElement>).nativeElement;

    afterNextRender(() => {
      const canvas = this.canvasRef().nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      let w = 0, h = 0, nodes: Node[] = [], raf = 0, visible = true, frame = 0;
      let rgb = '74, 222, 128', rgb2 = '34, 211, 238';
      const mouse = { x: -9999, y: -9999 };
      const LINK = 140;

      const readColors = () => {
        const cs = getComputedStyle(document.documentElement);
        rgb = cs.getPropertyValue('--accent-rgb').trim() || rgb;
        rgb2 = cs.getPropertyValue('--accent-2-rgb').trim() || rgb2;
      };

      const resize = () => {
        w = host.clientWidth; h = host.clientHeight;
        canvas.width = w * dpr; canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.min(90, Math.floor((w * h) / 15000));
        nodes = Array.from({ length: count }, () => ({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
          r: Math.random() * 1.6 + .6,
        }));
      };

      const draw = () => {
        if (frame++ % 60 === 0) readColors();
        ctx.clearRect(0, 0, w, h);
        for (const n of nodes) {
          if (!reduce) {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;
          }
        }
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < LINK) {
              ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / LINK) * .22})`;
              ctx.lineWidth = .7;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
          const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (dm < LINK * 1.4) {
            ctx.strokeStyle = `rgba(${rgb2}, ${(1 - dm / (LINK * 1.4)) * .5})`;
            ctx.lineWidth = .9;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
          ctx.fillStyle = `rgba(${rgb}, .75)`;
          ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
        }
        if (!reduce && visible) raf = requestAnimationFrame(draw);
      };

      const onMove = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
      };
      const onLeave = () => { mouse.x = mouse.y = -9999; };

      const io = new IntersectionObserver(([entry]) => {
        const was = visible;
        visible = entry.isIntersecting;
        if (visible && !was && !reduce) raf = requestAnimationFrame(draw);
      });

      const onResize = () => { resize(); if (reduce) draw(); };
      // Démarré quand le navigateur est libre, pour ne pas alourdir le démarrage de la page.
      const start = () => {
        readColors(); resize(); draw();
        io.observe(host);
        addEventListener('resize', onResize);
        addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerleave', onLeave);
      };
      const idle = 'requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 1200);

      destroyRef.onDestroy(() => {
        if ('cancelIdleCallback' in window) cancelIdleCallback(idle as number); else clearTimeout(idle);
        cancelAnimationFrame(raf); io.disconnect();
        removeEventListener('resize', onResize);
        removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerleave', onLeave);
      });
    });
  }
}
