"use client";

import { useEffect, useRef } from "react";

/**
 * A faint dot grid with three small rule-based "agents" moving across it.
 *  - pink:   Aggressive. Chases the collector.
 *  - violet: Resource Collector. Heads for the nearest resource.
 *  - white:  Defensive. Keeps its distance from the aggressor.
 * No randomness in the decisions, only in where resources appear.
 */

const CELL = 32;
const STEP_MS = 520;

type Vec = { x: number; y: number };
type Agent = { pos: Vec; prev: Vec; color: string; trail: Vec[] };

export function AgentGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let raf = 0;
    let lastStep = performance.now();
    let visible = true;

    const agents: Agent[] = [];
    let resources: Vec[] = [];

    const rand = (n: number) => Math.floor(Math.random() * n);
    const dist = (a: Vec, b: Vec) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    const clamp = (v: Vec): Vec => ({
      x: Math.max(1, Math.min(cols - 2, v.x)),
      y: Math.max(1, Math.min(rows - 2, v.y)),
    });

    function stepToward(from: Vec, to: Vec, away = false): Vec {
      const dx = Math.sign(to.x - from.x) * (away ? -1 : 1);
      const dy = Math.sign(to.y - from.y) * (away ? -1 : 1);
      // move along the longer axis first, like a simple rule-based agent would
      const horizontal = Math.abs(to.x - from.x) >= Math.abs(to.y - from.y);
      return clamp(horizontal && dx !== 0 ? { x: from.x + dx, y: from.y } : { x: from.x, y: from.y + (dy || dx) });
    }

    function spawnResource() {
      resources.push({ x: 2 + rand(Math.max(1, cols - 4)), y: 2 + rand(Math.max(1, rows - 4)) });
    }

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      cols = Math.max(6, Math.floor(rect.width / CELL));
      rows = Math.max(6, Math.floor(rect.height / CELL));

      if (agents.length === 0) {
        const colors = ["242,167,200", "183,166,247", "243,241,236"];
        const starts = [
          { x: Math.floor(cols * 0.45), y: Math.floor(rows * 0.25) },
          { x: Math.floor(cols * 0.82), y: Math.floor(rows * 0.7) },
          { x: Math.floor(cols * 0.55), y: Math.floor(rows * 0.55) },
        ];
        starts.forEach((s, i) => {
          const pos = clamp(s);
          agents.push({ pos, prev: pos, color: colors[i], trail: [] });
        });
        resources = [];
        for (let i = 0; i < 4; i++) spawnResource();
      } else {
        agents.forEach((a) => {
          a.pos = clamp(a.pos);
          a.prev = a.pos;
          a.trail = [];
        });
        resources = resources.map(clamp);
      }
    }

    function tick() {
      const [aggressor, collector, defender] = agents;

      // Collector: nearest resource
      if (resources.length) {
        const target = resources.reduce((best, r) => (dist(r, collector.pos) < dist(best, collector.pos) ? r : best));
        move(collector, stepToward(collector.pos, target));
        resources = resources.filter((r) => !(r.x === collector.pos.x && r.y === collector.pos.y));
        while (resources.length < 4) spawnResource();
      }
      // Aggressor: chase the collector, but hold off once adjacent
      if (dist(aggressor.pos, collector.pos) > 2) move(aggressor, stepToward(aggressor.pos, collector.pos));
      else move(aggressor, aggressor.pos);
      // Defender: keep distance from the aggressor, otherwise drift toward center
      if (dist(defender.pos, aggressor.pos) < 6) move(defender, stepToward(defender.pos, aggressor.pos, true));
      else move(defender, stepToward(defender.pos, { x: Math.floor(cols * 0.5), y: Math.floor(rows / 2) }));
    }

    function move(a: Agent, next: Vec) {
      a.trail.push(a.pos);
      if (a.trail.length > 7) a.trail.shift();
      a.prev = a.pos;
      a.pos = next;
    }

    function draw(t: number) {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const c = (v: number) => v * CELL + CELL / 2;

      // grid dots
      ctx.fillStyle = "rgba(255,255,255,0.09)";
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          ctx.fillRect(c(x) - 0.75, c(y) - 0.75, 1.5, 1.5);
        }
      }

      // resources
      resources.forEach((r) => {
        ctx.strokeStyle = "rgba(183,166,247,0.35)";
        ctx.lineWidth = 1;
        ctx.strokeRect(c(r.x) - 3.5, c(r.y) - 3.5, 7, 7);
      });

      const progress = reduce ? 1 : Math.min(1, (t - lastStep) / STEP_MS);
      const ease = 1 - Math.pow(1 - progress, 3);

      agents.forEach((a) => {
        a.trail.forEach((p, i) => {
          const alpha = ((i + 1) / a.trail.length) * 0.14;
          ctx.fillStyle = `rgba(${a.color},${alpha})`;
          ctx.fillRect(c(p.x) - 2, c(p.y) - 2, 4, 4);
        });
        const x = c(a.prev.x + (a.pos.x - a.prev.x) * ease);
        const y = c(a.prev.y + (a.pos.y - a.prev.y) * ease);
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 18);
        glow.addColorStop(0, `rgba(${a.color},0.22)`);
        glow.addColorStop(1, `rgba(${a.color},0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(x - 18, y - 18, 36, 36);
        ctx.fillStyle = `rgba(${a.color},0.9)`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function loop(t: number) {
      if (visible && t - lastStep >= STEP_MS) {
        tick();
        lastStep = t;
      }
      draw(t);
      raf = requestAnimationFrame(loop);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    if (reduce) {
      for (let i = 0; i < 6; i++) tick();
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60 md:opacity-100 [mask-image:radial-gradient(ellipse_85%_80%_at_55%_45%,black_35%,transparent_85%)]"
    />
  );
}
