"use client";

import { useEffect, useRef } from "react";

interface Channel {
  id: string;
  label: string;
  metric: string;
  delta: string;
  tone: "up" | "down" | "flat";
  dot: string;
}

const CHANNELS: Channel[] = [
  { id: "meta", label: "Meta Ads", metric: "ROAS 4.2x", delta: "+12.4%", tone: "up", dot: "#1877f2" },
  { id: "google", label: "Google Ads", metric: "CPM $12.40", delta: "-4.1%", tone: "down", dot: "#ea4335" },
  { id: "tiktok", label: "TikTok", metric: "CPA $18.20", delta: "+9.7%", tone: "up", dot: "#010101" },
  { id: "email", label: "Email / Resend", metric: "OR 42.8%", delta: "+1.2%", tone: "up", dot: "#3b5fe0" },
  { id: "slack", label: "Slack Pings", metric: "128 msgs", delta: "LIVE", tone: "flat", dot: "#64748b" },
  { id: "sheets", label: "Sheets Logs", metric: "37 rows", delta: "SYNC", tone: "flat", dot: "#059669" },
  { id: "analytics", label: "Detached Tabs", metric: "9 open", delta: "RAW", tone: "flat", dot: "#7c3aed" },
  { id: "copy", label: "Ad Copy Drafts", metric: "14 drafts", delta: "EDIT", tone: "flat", dot: "#ec4899" },
];

interface AlertDef {
  text: string;
  tone: "up" | "warn" | "flat";
}

const ALERTS: AlertDef[] = [
  { text: "META ROAS 0.4x ⚠️", tone: "warn" },
  { text: "GOOGLE CPM SPIKE", tone: "warn" },
  { text: "TIKTOK CPA OVER BUDGET", tone: "warn" },
  { text: "EMAIL OR 42.8%", tone: "up" },
  { text: "BUDGET NEAR CAP", tone: "warn" },
  { text: "SPEND RECONCILED", tone: "up" },
  { text: "FREQUENCY 2.1x", tone: "flat" },
  { text: "CLICK SHARE +6%", tone: "up" },
];

const MESH_LINK_DIST = 190;
const REPULSE_RADIUS = 96;
const MAX_SPEED = 2.6;
const ALERT_INTERVAL_MIN = 2600;
const ALERT_INTERVAL_MAX = 5200;
const ALERT_LIFETIME = 1600;

const toneDeltaClass: Record<Channel["tone"], string> = {
  up: "text-emerald-600 bg-emerald-50",
  down: "text-red-500 bg-red-50",
  flat: "text-slate-500 bg-slate-100",
};

const toneAlertClass: Record<AlertDef["tone"], string> = {
  up: "text-emerald-600 border-emerald-500/35",
  warn: "text-amber-600 border-amber-500/40",
  flat: "text-[#3B5FE0] border-[#3B5FE0]/35",
};

const toneAlertDot: Record<AlertDef["tone"], string> = {
  up: "bg-emerald-500",
  warn: "bg-amber-500",
  flat: "bg-[#3B5FE0]",
};

interface Node {
  el: HTMLDivElement;
  metricEl: HTMLSpanElement;
  baseMetric: string;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

interface AlertLife {
  el: HTMLDivElement;
  x: number;
  y: number;
  vy: number;
  age: number;
  maxAge: number;
}

function buildBubble(channel: Channel): Node {
  const el = document.createElement("div");
  el.setAttribute("aria-hidden", "true");
  el.className =
    "absolute z-[1] flex items-center gap-2 rounded-[10px] border border-slate-200 bg-white/95 py-2 pl-1.5 pr-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] select-none whitespace-nowrap will-change-transform";

  const dot = document.createElement("span");
  dot.className = "size-2 shrink-0 rounded-full";
  dot.style.backgroundColor = channel.dot;

  const body = document.createElement("span");
  body.className = "flex min-w-0 flex-col gap-px";

  const title = document.createElement("span");
  title.className = "text-[8px] font-bold uppercase leading-[1.1] tracking-[0.08em] text-slate-500";
  title.textContent = channel.label;

  const metric = document.createElement("span");
  metric.className =
    "flex items-baseline gap-1.5 text-[11px] font-extrabold leading-[1.2] tracking-[-0.01em] text-slate-900";
  metric.appendChild(document.createTextNode(channel.metric + " "));

  const delta = document.createElement("span");
  delta.className = `rounded-full px-1.5 py-px text-[8px] font-bold tracking-[0.03em] ${toneDeltaClass[channel.tone]}`;
  delta.textContent = channel.delta;

  metric.appendChild(delta);
  body.appendChild(title);
  body.appendChild(metric);
  el.appendChild(dot);
  el.appendChild(body);

  return {
    el,
    metricEl: metric,
    baseMetric: channel.metric,
    vx: (Math.random() - 0.5) * 1.6,
    vy: (Math.random() - 0.5) * 1.6,
    x: 0,
    y: 0,
  };
}

function buildAlert(alert: AlertDef): HTMLDivElement {
  const el = document.createElement("div");
  el.className = `pointer-events-none absolute z-[2] inline-flex items-center gap-1.5 rounded-full border bg-white/95 px-2 py-1 text-[9px] font-extrabold tracking-[0.05em] select-none whitespace-nowrap will-change-transform shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] ${toneAlertClass[alert.tone]}`;

  const flash = document.createElement("span");
  flash.className = `size-1.5 rounded-full ${toneAlertDot[alert.tone]}`;
  flash.style.animation = "alertBlink 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite";

  const text = document.createElement("span");
  text.textContent = alert.text;

  el.appendChild(flash);
  el.appendChild(text);
  return el;
}

export function ChaosBox() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let nodes: Node[] = [];
    let alerts: AlertLife[] = [];
    const mouse = { x: -9999, y: -9999 };
    let stageWidth = 0;
    let stageHeight = 0;
    let alertTimer = 0;
    let rafId = 0;

    const buildNodes = () => {
      CHANNELS.forEach((channel, index) => {
        const node = buildBubble(channel);
        node.el.style.left = 6 + Math.random() * 62 + "%";
        node.el.style.top = 8 + index * 11 + "%";
        stage.appendChild(node.el);
        nodes.push(node);
      });
    }

    const sizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      stageWidth = Math.max(1, stage.clientWidth);
      stageHeight = Math.max(1, stage.clientHeight);
      canvas.width = Math.round(stageWidth * dpr);
      canvas.height = Math.round(stageHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes.forEach((node) => {
        node.x = Math.min(Math.max(node.x, 0), Math.max(stageWidth - node.el.offsetWidth, 0));
        node.y = Math.min(Math.max(node.y, 0), Math.max(stageHeight - node.el.offsetHeight, 0));
      });
    }

    const initPhysics = () => {
      nodes.forEach((node) => {
        const w = node.el.offsetWidth || 100;
        const h = node.el.offsetHeight || 40;
        node.x = parseFloat(node.el.style.left) / 100 * (stageWidth - w) || 40;
        node.y = parseFloat(node.el.style.top) / 100 * (stageHeight - h) || 40;
        node.el.style.left = "0px";
        node.el.style.top = "0px";
        node.el.style.transform = `translate3d(${node.x}px,${node.y}px,0)`;
      });
    }

    const onMouseMove = (event: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    const drawMesh = () => {
      ctx.clearRect(0, 0, stageWidth, stageHeight);
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        const ax = nodeA.x + nodeA.el.offsetWidth / 2;
        const ay = nodeA.y + nodeA.el.offsetHeight / 2;
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const bx = nodeB.x + nodeB.el.offsetWidth / 2;
          const by = nodeB.y + nodeB.el.offsetHeight / 2;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MESH_LINK_DIST) {
            const alpha = (1 - dist / MESH_LINK_DIST) * 0.5;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(59, 95, 224, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    const spawnAlert = () => {
      const source = nodes[Math.floor(Math.random() * nodes.length)];
      const pick = ALERTS[Math.floor(Math.random() * ALERTS.length)];
      const alertEl = buildAlert(pick);
      stage.appendChild(alertEl);

      const rect = source.el.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const life: AlertLife = {
        el: alertEl,
        x: rect.left - stageRect.left + (source.el.offsetWidth - alertEl.offsetWidth) / 2,
        y: rect.top - stageRect.top - 8,
        vy: -0.7 - Math.random() * 0.5,
        age: 0,
        maxAge: ALERT_LIFETIME,
      };
      life.x = Math.min(Math.max(life.x, 4), Math.max(stageWidth - alertEl.offsetWidth - 4, 4));
      alerts.push(life);
    }

    const updateAlerts = (dtScale: number) => {
      for (let i = alerts.length - 1; i >= 0; i--) {
        const alert = alerts[i];
        alert.age += 16.7;
        alert.y += alert.vy * dtScale;
        const fade = 1 - Math.max(0, alert.age / alert.maxAge);
        alert.el.style.opacity = String(Math.max(0, fade));
        alert.el.style.transform = `translate3d(${alert.x}px,${alert.y}px,0)`;
        if (fade <= 0) {
          alert.el.remove();
          alerts.splice(i, 1);
        }
      }
    }

    const jitterMetrics = () => {
      nodes.forEach((node) => {
        if (Math.random() > 0.02) return;
        const v = parseFloat(node.baseMetric.replace(/[^\d.]/g, "")) || 0;
        const delta = (Math.random() - 0.5) * 0.4;
        const updated = Math.max(0, v + delta);
        node.metricEl.firstChild!.textContent = node.baseMetric.replace(/[\d.]+/, updated.toFixed(2)) + " ";
      });
    }

    const tick = () => {
      stageWidth = stage.clientWidth;
      stageHeight = stage.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      const dtScale = Math.min(Math.max(dpr, 1), 1.5);

      nodes.forEach((node) => {
        const sizeW = node.el.offsetWidth;
        const sizeH = node.el.offsetHeight;

        const cx = node.x + sizeW / 2;
        const cy = node.y + sizeH / 2;
        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSE_RADIUS && dist > 0.001) {
          const force = ((REPULSE_RADIUS - dist) / REPULSE_RADIUS) * 2.4 * dtScale;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        node.vx *= 0.985;
        node.vy *= 0.985;

        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > MAX_SPEED) {
          node.vx = (node.vx / speed) * MAX_SPEED;
          node.vy = (node.vy / speed) * MAX_SPEED;
        }

        let x = node.x + node.vx * dtScale;
        let y = node.y + node.vy * dtScale;

        if (x <= 0) {
          x = 0;
          node.vx = Math.abs(node.vx);
        }
        if (x >= stageWidth - sizeW) {
          x = Math.max(stageWidth - sizeW, 0);
          node.vx = -Math.abs(node.vx);
        }
        if (y <= 0) {
          y = 0;
          node.vy = Math.abs(node.vy);
        }
        if (y >= stageHeight - sizeH) {
          y = Math.max(stageHeight - sizeH, 0);
          node.vy = -Math.abs(node.vy);
        }

        if (Math.random() < 0.004) {
          node.vx += (Math.random() - 0.5) * 0.8;
          node.vy += (Math.random() - 0.5) * 0.8;
        }

        node.x = x;
        node.y = y;
        node.el.style.transform = `translate3d(${x}px,${y}px,0)`;
      });

      drawMesh();
      jitterMetrics();
      updateAlerts(dtScale);

      alertTimer += 16.7;
      if (alertTimer > ALERT_INTERVAL_MIN + Math.random() * (ALERT_INTERVAL_MAX - ALERT_INTERVAL_MIN)) {
        spawnAlert();
        alertTimer = 0;
      }

      rafId = requestAnimationFrame(tick);
    }

    buildNodes();
    sizeCanvas();
    initPhysics();

    stage.addEventListener("mousemove", onMouseMove, { passive: true });
    stage.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", sizeCanvas);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", sizeCanvas);
      stage.removeEventListener("mousemove", onMouseMove);
      stage.removeEventListener("mouseleave", onMouseLeave);
      alerts.forEach((alert) => alert.el.remove());
      nodes.forEach((node) => node.el.remove());
      nodes = [];
      alerts = [];
    };
  }, []);

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label="Eight disconnected advertising channels linked by a live data mesh"
      className="relative h-[300px] overflow-hidden rounded-xl border border-dashed border-slate-200 bg-gradient-to-b from-[#fbfdff] to-[#f6f9fd]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
      />
    </div>
  );
}
