<template>
  <canvas
    ref="canvasEl"
    class="digital-rain"
    aria-hidden="true"
  />
</template>

<script>

const DEFAULT_GLYPHS =
  "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$#@*+-=<>[]{}()/:;.,_";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default {
  name: "DigitalCodeRain",
  props: {
    glyphs: {
      type: String,
      default: DEFAULT_GLYPHS
    },
    density: {
      type: Number,
      default: 18
    },
    speed: {
      type: Number,
      default: 0.95
    },
    opacity: {
      type: Number,
      default: 0.38
    }
  },
  data() {
    return {
      rafId: null,
      ctx: null,
      dpr: 1,
      w: 0,
      h: 0,
      drops: [],
      isReducedMotion: false,
      resizeObserver: null
    };
  },
  mounted() {
    this.isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (this.isReducedMotion) return;

    this.initCanvas();
    this.seedDrops();
    this.loop();
  },
  beforeUnmount() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.resizeObserver) this.resizeObserver.disconnect();
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvasEl;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;
      this.ctx = ctx;

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        this.dpr = clamp(window.devicePixelRatio || 1, 1, 2);
        this.w = Math.max(1, Math.floor(rect.width));
        this.h = Math.max(1, Math.floor(rect.height));

        canvas.width = Math.floor(this.w * this.dpr);
        canvas.height = Math.floor(this.h * this.dpr);
        canvas.style.width = `${this.w}px`;
        canvas.style.height = `${this.h}px`;

        ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      };

      resize();

      // Resize theo container (hero) để tránh lỗi khi responsive
      if (typeof ResizeObserver !== "undefined") {
        this.resizeObserver = new ResizeObserver(() => {
          resize();
          this.seedDrops(true);
        });
        this.resizeObserver.observe(canvas);
      } else {
        window.addEventListener("resize", resize, { passive: true });
      }
    },
    seedDrops(keepSome = false) {
      // số cột theo chiều ngang
      const count = clamp(Math.floor(this.w / this.density), 22, 120);
      const next = [];

      if (keepSome && this.drops.length) {
        // giữ lại 1 phần để không “giật” khi resize
        const keep = Math.min(this.drops.length, Math.floor(count * 0.4));
        for (let i = 0; i < keep; i++) next.push(this.drops[i]);
      }

      while (next.length < count) {
        next.push(this.makeDrop());
      }

      this.drops = next;
    },
    makeDrop() {
      const fontSize = 12 + Math.random() * 9; // 12-21px
      // ép x theo “cột” để chữ thẳng hàng dọc
      const col = Math.floor(Math.random() * clamp(Math.floor(this.w / this.density), 1, 9999));
      const x = col * this.density + (Math.random() * 6 - 3); // jitter nhẹ cho organic
      const y = -Math.random() * this.h;
      const baseSpeed = (0.7 + Math.random() * 1.3) * this.speed;
      const alpha = clamp(this.opacity + (Math.random() * 0.25 - 0.12), 0.15, 0.6);
      const length = clamp(Math.floor(14 + Math.random() * 24), 10, 40); // độ dài “đuôi” chữ
      return { x, y, fontSize, speed: baseSpeed, alpha, length };
    },
    drawBackgroundFade() {
      // trail mượt (tạo cảm giác “mưa”)
      this.ctx.fillStyle = "rgba(2, 6, 23, 0.20)"; // slate-950-ish
      this.ctx.fillRect(0, 0, this.w, this.h);
    },
    pickGlyph() {
      const s = this.glyphs || DEFAULT_GLYPHS;
      return s.charAt(Math.floor(Math.random() * s.length));
    },
    drawDrop(drop) {
      const ctx = this.ctx;
      const headY = drop.y;
      if (headY > this.h + 120) return;

      ctx.save();
      ctx.font = `${drop.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
      ctx.textBaseline = "top";

      // vẽ theo chiều dọc: mỗi “drop” là 1 cột ký tự
      const step = drop.fontSize + 2;
      for (let i = 0; i < drop.length; i++) {
        const y = headY - i * step;
        if (y < -60) break;

        const t = i / Math.max(1, drop.length - 1); // 0=head, 1=tail
        const a = clamp(drop.alpha * (1 - t) + 0.06, 0.05, 0.85);

        // tail: neon xanh dịu
        ctx.shadowColor = "rgba(56, 189, 248, 0.75)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = `rgba(94, 234, 212, ${a})`;
        ctx.fillText(this.pickGlyph(), drop.x, y);
      }

      // head: sáng hơn + hơi tím để “nổi”
      ctx.shadowColor = "rgba(167, 139, 250, 0.65)";
      ctx.shadowBlur = 16;
      ctx.fillStyle = `rgba(56, 189, 248, ${clamp(drop.alpha + 0.28, 0.25, 0.95)})`;
      ctx.fillText(this.pickGlyph(), drop.x, headY);

      ctx.restore();
    },
    tick() {
      this.drawBackgroundFade();
      for (let i = 0; i < this.drops.length; i++) {
        const d = this.drops[i];
        this.drawDrop(d);
        d.y += d.speed * 6;

        // reset khi ra khỏi màn hình
        if (d.y > this.h + 140) {
          this.drops[i] = this.makeDrop();
        }
      }
    },
    loop() {
      this.tick();
      this.rafId = requestAnimationFrame(this.loop);
    }
  }
};
</script>

<style scoped>
.digital-rain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
  opacity: 1;
}
</style>

