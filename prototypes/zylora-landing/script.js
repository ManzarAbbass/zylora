/* ═══════════════════════════════════════════════════════════
   Zylora — Chaos to Order: live vector data-mesh engine
   Pure vanilla JS, requestAnimationFrame, zero dependencies.
   60-FPS floating metric nodes + dynamic mesh links + repulsion.
   ═══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Raw data metric channels ── */

  var CHANNELS = [
    { id: "meta", label: "Meta Ads", metric: "ROAS 4.2x", delta: "+12.4%", tone: "up" },
    { id: "google", label: "Google Ads", metric: "CPM $12.40", delta: "-4.1%", tone: "down" },
    { id: "tiktok", label: "TikTok", metric: "CPA $18.20", delta: "+9.7%", tone: "up" },
    { id: "email", label: "Email / Resend", metric: "OR 42.8%", delta: "+1.2%", tone: "up" },
    { id: "slack", label: "Slack Pings", metric: "128 msgs", delta: "LIVE", tone: "flat" },
    { id: "sheets", label: "Sheets Logs", metric: "37 rows", delta: "SYNC", tone: "flat" },
    { id: "analytics", label: "Detached Tabs", metric: "9 open", delta: "RAW", tone: "flat" },
    { id: "copy", label: "Ad Copy Drafts", metric: "14 drafts", delta: "EDIT", tone: "flat" }
  ];

  var ALERTS = [
    { text: "META ROAS +12.4%", tone: "up" },
    { text: "GOOGLE CPM SPIKE", tone: "warn" },
    { text: "TIKTOK CPA OVER BUDGET", tone: "warn" },
    { text: "EMAIL OR 42.8%", tone: "up" },
    { text: "BUDGET NEAR CAP", tone: "warn" },
    { text: "SPEND RECONCILED", tone: "up" },
    { text: "FREQUENCY 2.1x", tone: "flat" },
    { text: "CLICK SHARE +6%", tone: "up" }
  ];

  var MESH_LINK_DIST = 190;
  var REPULSE_RADIUS = 96;
  var MAX_SPEED = 2.6;
  var ALERT_INTERVAL_MIN = 2600;
  var ALERT_INTERVAL_MAX = 5200;
  var ALERT_LIFETIME = 1600;

  var stage = document.getElementById("chaos-stage");
  var canvas = document.getElementById("chaos-canvas");
  var ctx = canvas && canvas.getContext("2d");
  var nodes = [];
  var alerts = [];
  var mouse = { x: -9999, y: -9999 };
  var stageWidth = 0;
  var stageHeight = 0;
  var alertTimer = 0;

  if (!stage || !canvas || !ctx) return;

  /* ── Build the 8 chaos metric nodes ── */

  CHANNELS.forEach(function (channel, index) {
    var el = document.createElement("div");
    el.className = "chaos-bubble";
    el.dataset.channel = channel.id;
    el.setAttribute("aria-hidden", "true");

    var dot = document.createElement("span");
    dot.className = "bubble-dot";

    var body = document.createElement("span");
    body.className = "bubble-body";

    var title = document.createElement("span");
    title.className = "bubble-title";
    title.textContent = channel.label;

    var metric = document.createElement("span");
    metric.className = "bubble-metric";
    metric.textContent = channel.metric;

    var delta = document.createElement("span");
    delta.className = "bubble-delta " + channel.tone;
    delta.textContent = channel.delta;

    metric.appendChild(delta);
    body.appendChild(title);
    body.appendChild(metric);
    el.appendChild(dot);
    el.appendChild(body);
    stage.appendChild(el);

    var node = {
      el: el,
      metricEl: metric,
      deltaEl: delta,
      baseMetric: channel.metric,
      vx: (Math.random() - 0.5) * 1.6,
      vy: (Math.random() - 0.5) * 1.6,
      x: 0,
      y: 0
    };
    node.el.style.left = 6 + Math.random() * 62 + "%";
    node.el.style.top = 8 + (index * 11) + "%";
    nodes.push(node);
  });

  /* ── Mouse repulsion physics hook ── */

  function onMouseMove(event) {
    var rect = stage.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  }

  function onMouseLeave() {
    mouse.x = -9999;
    mouse.y = -9999;
  }

  /* ── Canvas sizing (DPR-aware) ── */

  function sizeCanvas() {
    var dpr = window.devicePixelRatio || 1;
    stageWidth = stage.clientWidth;
    stageHeight = stage.clientHeight;
    canvas.width = Math.max(1, Math.round(stageWidth * dpr));
    canvas.height = Math.max(1, Math.round(stageHeight * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes.forEach(function (node) {
      node.x = Math.min(Math.max(node.x, 0), Math.max(stageWidth - node.el.offsetWidth, 0));
      node.y = Math.min(Math.max(node.y, 0), Math.max(stageHeight - node.el.offsetHeight, 0));
    });
  }

  function onResize() {
    sizeCanvas();
  }

  /* ── Mesh networking line links ── */

  function drawMesh() {
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    var i, j, nodeA, nodeB, dx, dy, dist, alpha;
    var ax, ay, bx, by;

    for (i = 0; i < nodes.length; i++) {
      nodeA = nodes[i];
      ax = nodeA.x + nodeA.el.offsetWidth / 2;
      ay = nodeA.y + nodeA.el.offsetHeight / 2;

      for (j = i + 1; j < nodes.length; j++) {
        nodeB = nodes[j];
        bx = nodeB.x + nodeB.el.offsetWidth / 2;
        by = nodeB.y + nodeB.el.offsetHeight / 2;
        dx = ax - bx;
        dy = ay - by;
        dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MESH_LINK_DIST) {
          alpha = (1 - dist / MESH_LINK_DIST) * 0.5;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = "rgba(37, 99, 235, " + alpha.toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  /* ── Floating raw-data alert log spawner ── */

  function spawnAlert() {
    var source = nodes[Math.floor(Math.random() * nodes.length)];
    var pick = ALERTS[Math.floor(Math.random() * ALERTS.length)];
    var alert = document.createElement("div");
    alert.className = "chaos-alert";
    alert.dataset.tone = pick.tone;

    var flash = document.createElement("span");
    flash.className = "alert-flash";
    var text = document.createElement("span");
    text.textContent = pick.text;

    alert.appendChild(flash);
    alert.appendChild(text);
    stage.appendChild(alert);

    var rect = source.el.getBoundingClientRect();
    var stageRect = stage.getBoundingClientRect();

    var life = {
      el: alert,
      x: rect.left - stageRect.left + (source.el.offsetWidth - alert.offsetWidth) / 2,
      y: rect.top - stageRect.top - 8,
      vy: -0.7 - Math.random() * 0.5,
      age: 0,
      maxAge: ALERT_LIFETIME
    };

    life.x = Math.min(Math.max(life.x, 4), Math.max(stageWidth - alert.offsetWidth - 4, 4));
    alerts.push(life);
  }

  function updateAlerts(dtScale) {
    var i;
    for (i = alerts.length - 1; i >= 0; i--) {
      var alert = alerts[i];
      alert.age += 16.7;
      alert.y += alert.vy * dtScale;
      var fade = 1 - Math.max(0, alert.age / alert.maxAge);
      alert.el.style.opacity = String(Math.max(0, fade));
      alert.el.style.transform = "translate3d(" + alert.x + "px," + alert.y + "px,0)";
      if (fade <= 0) {
        alert.el.remove();
        alerts.splice(i, 1);
      }
    }
  }

  /* ── Metric value jitter for live-data feel ── */

  function jitterMetrics() {
    nodes.forEach(function (node) {
      if (Math.random() > 0.02) return;
      var v = parseFloat(node.baseMetric.replace(/[^\d.]/g, "")) || 0;
      var delta = (Math.random() - 0.5) * 0.4;
      var updated = Math.max(0, v + delta);
      node.metricEl.firstChild.textContent =
        node.baseMetric.replace(/[\d.]+/, updated.toFixed(2)) + " ";
    });
  }

  /* ── Physics tick (60 FPS loop) ── */

  function tick() {
    stageWidth = stage.clientWidth;
    stageHeight = stage.clientHeight;
    var dpr = window.devicePixelRatio || 1;
    var dtScale = Math.min(Math.max(dpr, 1), 1.5);

    nodes.forEach(function (node) {
      var sizeW = node.el.offsetWidth;
      var sizeH = node.el.offsetHeight;

      var cx = node.x + sizeW / 2;
      var cy = node.y + sizeH / 2;
      var dx = cx - mouse.x;
      var dy = cy - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < REPULSE_RADIUS && dist > 0.001) {
        var force = ((REPULSE_RADIUS - dist) / REPULSE_RADIUS) * 2.4 * dtScale;
        node.vx += (dx / dist) * force;
        node.vy += (dy / dist) * force;
      }

      node.vx *= 0.985;
      node.vy *= 0.985;

      var speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed > MAX_SPEED) {
        node.vx = (node.vx / speed) * MAX_SPEED;
        node.vy = (node.vy / speed) * MAX_SPEED;
      }

      var x = node.x + node.vx * dtScale;
      var y = node.y + node.vy * dtScale;

      if (x <= 0) { x = 0; node.vx = Math.abs(node.vx); }
      if (x >= stageWidth - sizeW) { x = Math.max(stageWidth - sizeW, 0); node.vx = -Math.abs(node.vx); }
      if (y <= 0) { y = 0; node.vy = Math.abs(node.vy); }
      if (y >= stageHeight - sizeH) { y = Math.max(stageHeight - sizeH, 0); node.vy = -Math.abs(node.vy); }

      if (Math.random() < 0.004) {
        node.vx += (Math.random() - 0.5) * 0.8;
        node.vy += (Math.random() - 0.5) * 0.8;
      }

      node.x = x;
      node.y = y;
      node.el.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    });

    drawMesh();
    jitterMetrics();
    updateAlerts(dtScale);

    alertTimer += 16.7;
    if (alertTimer > ALERT_INTERVAL_MIN + Math.random() * (ALERT_INTERVAL_MAX - ALERT_INTERVAL_MIN)) {
      spawnAlert();
      alertTimer = 0;
    }

    requestAnimationFrame(tick);
  }

  /* ── Initialise node coordinates ── */

  function initPhysics() {
    nodes.forEach(function (node) {
      var w = node.el.offsetWidth || 100;
      var h = node.el.offsetHeight || 40;
      node.x = parseFloat(node.el.style.left) / 100 * (stageWidth - w) || 40;
      node.y = parseFloat(node.el.style.top) / 100 * (stageHeight - h) || 40;
      node.el.style.left = "0px";
      node.el.style.top = "0px";
      node.el.style.transform = "translate3d(" + node.x + "px," + node.y + "px,0)";
    });
  }

  /* ── Dynamic scroll fade-in trigger ── */

  function initReveal() {
    var targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ── Mobile navigation toggle ── */

  function initMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("mobile-nav");
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      if (open) {
        menu.hidden = false;
      } else {
        menu.hidden = true;
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) setOpen(false);
    });
  }

  /* ── Enterprise billing switch toggle ── */

  function initBilling() {
    var switcher = document.getElementById("billing-switch");
    var price = document.getElementById("price-value");
    var period = document.getElementById("price-period");
    var monthLabel = document.getElementById("label-monthly");
    var yearLabel = document.getElementById("label-annual");
    var annual = false;

    if (!switcher || !price || !period) return;

    switcher.addEventListener("click", function () {
      annual = !annual;
      switcher.setAttribute("aria-checked", String(annual));
      monthLabel.classList.toggle("is-active", !annual);
      yearLabel.classList.toggle("is-active", annual);
      price.textContent = annual ? "$60" : "$89";
      period.textContent = annual ? "/month · billed $720/yr" : "/month";
    });
  }

  /* ── Boot ── */

  function boot() {
    sizeCanvas();
    initPhysics();

    stage.addEventListener("mousemove", onMouseMove, { passive: true });
    stage.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    initReveal();
    initBilling();
    initMobileNav();

    requestAnimationFrame(tick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
