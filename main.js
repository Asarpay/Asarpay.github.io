(() => {
  const D = window.CV;
  const $ = (s) => document.querySelector(s);
  const esc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // "View certificate" button for timeline / section entries that have a file
  const viewBtn = (o, label = "View certificate") =>
    o.file
      ? `<button class="view-doc" data-file="${esc(o.file)}" data-title="${esc(o.title)}" data-meta="${esc([o.date, o.place || o.subtitle].filter(Boolean).join(" · "))}">📄 ${label}</button>`
      : "";
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".view-doc");
    if (!b) return;
    openDoc({ file: b.dataset.file, title: b.dataset.title, type: "", issuer: b.dataset.meta, date: "" });
  });
  document.head.insertAdjacentHTML("beforeend", `<style>
    .view-doc { margin-top: 12px; font: inherit; font-size: .8rem; padding: 5px 13px; border-radius: 999px;
      border: 1px solid var(--line); background: transparent; color: var(--accent); cursor: pointer; transition: all .2s; }
    .view-doc:hover { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, transparent); }
    .timeline li[data-kind="leadership"]::before { border-color: #f472b6; }
    .timeline li[data-kind="training"]::before { border-color: #60a5fa; }
  </style>`);

  /* ---------- theme ---------- */
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
  $("#themeBtn").onclick = () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  };

  /* ---------- color palettes ---------- */
  const PALETTES = [
    { id: "lattice", name: "Lattice", note: "teal & violet", sw: ["#5eead4", "#a78bfa"] },
    { id: "andes", name: "Andes", note: "terracotta & gold", sw: ["#fb923c", "#facc15"] },
    { id: "aurora", name: "Aurora", note: "green & sky blue", sw: ["#4ade80", "#38bdf8"] },
    { id: "plasma", name: "Plasma", note: "magenta & orange", sw: ["#f472b6", "#fb923c"] },
    { id: "paper", name: "Paper", note: "academic, ink & cream", sw: ["#e8b04b", "#e06c5a"] },
  ];
  let pal = D.palette || "lattice";
  if (D.showPalettePicker !== false) { try { pal = localStorage.getItem("palette") || pal; } catch (e) {} }
  root.dataset.palette = pal;
  if (D.showPalettePicker === false) {
    $("#palWrap").remove();
  } else {
    const menu = $("#palMenu");
    const drawMenu = () =>
      (menu.innerHTML = PALETTES.map(
        (p) => `<button data-p="${p.id}" class="${p.id === root.dataset.palette ? "on" : ""}">
          <span class="sw" style="background:linear-gradient(135deg,${p.sw[0]} 50%,${p.sw[1]} 50%)"></span>
          <span>${p.name}<small>${p.note}</small></span></button>`
      ).join(""));
    drawMenu();
    $("#palBtn").onclick = (e) => { e.stopPropagation(); menu.classList.toggle("open"); };
    menu.onclick = (e) => {
      const b = e.target.closest("button[data-p]");
      if (!b) return;
      root.dataset.palette = b.dataset.p;
      try { localStorage.setItem("palette", b.dataset.p); } catch (err) {}
      drawMenu();
    };
    document.addEventListener("click", (e) => { if (!$("#palWrap").contains(e.target)) menu.classList.remove("open"); });
  }

  $("#navToggle").onclick = () => $("#navLinks").classList.toggle("open");
  document.querySelectorAll("#navLinks a").forEach((a) => (a.onclick = () => $("#navLinks").classList.remove("open")));

  /* ---------- hero ---------- */
  const initials = D.shortName.split(" ").map((w) => w[0]).join("");
  const [first, ...rest] = D.shortName.split(" ");
  $("#brand").innerHTML = `${esc(first)}<b>.</b>${esc(rest.join(" "))}`;
  $("#avatar").innerHTML = D.photo ? `<img src="${esc(D.photo)}" alt="${esc(D.name)}">` : `<span>${initials}</span>`;
  $("#kicker").textContent = `// ${D.location}`;
  $("#heroName").textContent = D.name;
  $("#heroRole").textContent = D.role;

  const L = D.links;
  const linkBtns = (primaryCv) => [
    primaryCv && D.cvPdf ? `<a class="btn primary" href="${esc(D.cvPdf)}" download>⬇ Download CV</a>` : "",
    L.email ? `<a class="btn" href="mailto:${esc(L.email)}">✉ Email</a>` : "",
    L.github ? `<a class="btn" href="${esc(L.github)}" target="_blank" rel="noopener">⌥ GitHub</a>` : "",
    L.linkedin ? `<a class="btn" href="${esc(L.linkedin)}" target="_blank" rel="noopener">in LinkedIn</a>` : "",
    L.orcid ? `<a class="btn" href="${esc(L.orcid)}" target="_blank" rel="noopener">iD ORCID</a>` : "",
    L.scholar ? `<a class="btn" href="${esc(L.scholar)}" target="_blank" rel="noopener">🎓 Scholar</a>` : "",
  ].join("");
  $("#heroActions").innerHTML = linkBtns(true) + `<a class="btn" href="#documents">📂 Documents</a>`;
  $("#footerLinks").innerHTML = linkBtns(true);
  $("#footNote").textContent = `© ${new Date().getFullYear()} ${D.name} · built with plain HTML/CSS/JS on GitHub Pages`;

  // typewriter
  const typed = $("#typed");
  let i = 0;
  (function type() {
    typed.textContent = D.tagline.slice(0, ++i);
    if (i < D.tagline.length) setTimeout(type, 22 + Math.random() * 30);
  })();

  /* ---------- about ---------- */
  $("#aboutText").innerHTML = D.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#stats").innerHTML = D.stats
    .map((s) => `<div class="card stat"><div class="v" data-to="${esc(s.value)}">0</div><div class="l">${esc(s.label)}</div></div>`)
    .join("");

  /* ---------- affiliations ---------- */
  if ((D.affiliations || []).length) {
    $("#affiliations").innerHTML = `<p class="aff-label mono">// affiliations</p><div class="aff-grid">${D.affiliations
      .map((a) => {
        const logo = a.logo
          ? `<img class="aff-logo logo-light" src="${esc(encodeURI(a.logo))}" alt="${esc(a.name)} logo">
             <img class="aff-logo logo-dark" src="${esc(encodeURI(a.logoDark || a.logo))}" alt="${esc(a.name)} logo">`
          : `<span class="aff-mark mono">${esc(a.mark || a.name.split(" ").map((w) => w[0]).join("").slice(0, 3))}</span>`;
        const tag = a.url ? "a" : "div";
        return `<${tag} class="card aff" ${a.url ? `href="${esc(a.url)}" target="_blank" rel="noopener"` : ""}>
          <div class="aff-media">${logo}</div>
          <div class="aff-text">
            <h3>${esc(a.name)}</h3>
            <div class="aff-role">${esc(a.role)}</div>
            <div class="aff-meta">${esc([a.place, a.lead].filter(Boolean).join(" · "))}</div>
          </div>
        </${tag}>`;
      })
      .join("")}</div>`;
  }
  document.head.insertAdjacentHTML("beforeend", `<style>
    #affiliations { margin-top: 40px; }
    .aff-label { color: var(--accent); font-size: .8rem; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 14px; }
    .aff-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
    .aff { display: flex; gap: 18px; align-items: center; padding: 18px 20px; color: var(--text); }
    .aff-media { flex: none; width: 76px; height: 84px; display: grid; place-items: center; }
    .aff-logo { max-width: 100%; max-height: 100%; object-fit: contain; }
    .aff-mark { width: 64px; height: 64px; border-radius: 16px; display: grid; place-items: center; font-weight: 600; font-size: 1.05rem;
      color: var(--accent); border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
      background: color-mix(in srgb, var(--accent) 10%, transparent); }
    .aff h3 { font-size: 1rem; line-height: 1.3; margin-bottom: 3px; }
    .aff-role { font-size: .85rem; color: var(--accent2); }
    .aff-meta { font-size: .8rem; color: var(--muted); margin-top: 2px; }
    .logo-light { display: none; }
    :root[data-theme="light"] .logo-light { display: block; }
    :root[data-theme="light"] .logo-dark { display: none; }
  </style>`);

  /* ---------- research ---------- */
  $("#researchCards").innerHTML = D.research
    .map(
      (r) => `<article class="card">
        <h3>${esc(r.title)}</h3>
        <div class="where">${esc(r.where)}</div>
        <p>${esc(r.text)}</p>
        <div class="tags">${r.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </article>`
    )
    .join("");

  /* ---------- timeline ---------- */
  const kinds = ["all", ...new Set(D.timeline.map((t) => t.kind))];
  $("#timelineList").innerHTML = D.timeline
    .map(
      (t) => `<li data-kind="${esc(t.kind)}"><div class="card">
        <div class="date">${esc(t.date)} · ${esc(t.kind)}</div>
        <h3>${esc(t.title)}</h3>
        <div class="place">${esc(t.place)}</div>
        ${t.text ? `<p>${esc(t.text)}</p>` : ""}
        ${viewBtn(t)}
      </div></li>`
    )
    .join("");
  makeChips("#timelineFilters", kinds, (k) => {
    document.querySelectorAll("#timelineList li").forEach((li) => li.classList.toggle("hide", k !== "all" && li.dataset.kind !== k));
  });

  /* ---------- publications ---------- */
  $("#pubList").innerHTML = D.publications
    .map(
      (p) => `<article class="card pub">
        <div class="yr">${esc(p.year)}</div>
        <div>
          <h3>${esc(p.title)}</h3>
          <div class="authors">${p.authors}</div>
          <div class="venue">${esc(p.venue)}</div>
          <div class="links">
            ${p.doi ? `<a href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">DOI ↗</a>` : ""}
            ${p.pdf ? `<a href="${esc(p.pdf)}" target="_blank" rel="noopener">PDF</a>` : ""}
            ${p.doi ? `<a href="#" data-cite="${esc(p.doi)}">Copy citation</a>` : ""}
          </div>
        </div>
      </article>`
    )
    .join("");
  document.querySelectorAll("[data-cite]").forEach((a) => {
    a.onclick = (e) => {
      e.preventDefault();
      const p = D.publications.find((x) => x.doi === a.dataset.cite);
      const txt = `${p.authors.replace(/<[^>]+>/g, "")}, "${p.title}", ${p.venue} (${p.year}). doi:${p.doi}`;
      navigator.clipboard?.writeText(txt).then(() => { a.textContent = "Copied ✓"; setTimeout(() => (a.textContent = "Copy citation"), 1500); });
    };
  });

  /* ---------- documents ---------- */
  const TYPES = {
    certificate: { ico: "🏅", c: "#fbbf24" },
    paper: { ico: "📄", c: "#a78bfa" },
    poster: { ico: "🖼️", c: "#5eead4" },
    report: { ico: "📊", c: "#60a5fa" },
    language: { ico: "🗣️", c: "#34d399" },
    leadership: { ico: "🤝", c: "#f472b6" },
    other: { ico: "📁", c: "#94a3b8" },
  };
  const isImg = (f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f || "");
  const isPdf = (f) => /\.pdf$/i.test(f || "");
  const fileUrl = (f) => encodeURI(f); // handles spaces and accents in file names
  let docFilter = "all", docQuery = "";

  /* PDF.js renders PDFs ourselves, so previews work on phones and every browser
     (the built-in browser PDF viewer often shows a blank box inside a page). */
  const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
  let pdfLibP = null;
  function loadPdfJs() {
    if (!pdfLibP)
      pdfLibP = new Promise((res, rej) => {
        const s = document.createElement("script");
        s.src = PDFJS + "pdf.min.js";
        s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + "pdf.worker.min.js"; res(window.pdfjsLib); };
        s.onerror = () => { pdfLibP = null; rej(new Error("pdf.js failed to load")); };
        document.head.appendChild(s);
      });
    return pdfLibP;
  }
  const pdfCache = new Map();
  const getPdf = (f) => {
    if (!pdfCache.has(f)) pdfCache.set(f, loadPdfJs().then((lib) => lib.getDocument(fileUrl(f)).promise));
    return pdfCache.get(f);
  };
  async function pageToCanvas(pdf, n, cssWidth) {
    const page = await pdf.getPage(n);
    const scale = (cssWidth * (window.devicePixelRatio || 1)) / page.getViewport({ scale: 1 }).width;
    const vp = page.getViewport({ scale });
    const c = document.createElement("canvas");
    c.width = Math.floor(vp.width); c.height = Math.floor(vp.height);
    const ctx2 = c.getContext("2d");
    ctx2.fillStyle = "#fff"; ctx2.fillRect(0, 0, c.width, c.height);
    await page.render({ canvasContext: ctx2, viewport: vp }).promise;
    return c;
  }

  // automatic thumbnails: first page of each PDF, rendered when the card scrolls into view
  const thumbCache = new Map();
  const thumbIo = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    thumbIo.unobserve(en.target);
    makeThumb(en.target);
  }), { rootMargin: "200px" });
  async function makeThumb(card) {
    const d = D.documents[card.dataset.i];
    try {
      if (!thumbCache.has(d.file)) {
        const pdf = await getPdf(d.file);
        thumbCache.set(d.file, (await pageToCanvas(pdf, 1, 300)).toDataURL("image/jpeg", 0.82));
      }
      const box = card.querySelector(".thumb");
      box.querySelector(".ico")?.remove();
      if (!box.querySelector("img")) box.insertAdjacentHTML("beforeend", `<img class="pdf-thumb" src="${thumbCache.get(d.file)}" alt="">`);
    } catch (e) { /* keep the emoji icon */ }
  }
  document.head.insertAdjacentHTML("beforeend", `<style>
    .doc .badge { z-index: 2; }
    .doc .thumb img.pdf-thumb { object-fit: cover; object-position: top; transition: transform .4s; }
    .doc:hover .thumb img.pdf-thumb { transform: scale(1.06); }
    .modal-body.pdf-view { display: block; padding: 18px; overflow: auto; }
    .pdf-view canvas { display: block; width: 100%; max-width: 900px; height: auto; margin: 0 auto 18px; border-radius: 6px; box-shadow: 0 6px 24px rgba(0,0,0,.4); }
    .modal-actions a { white-space: nowrap; }
    .pdf-status { color: #9aa4b2; text-align: center; padding: 40px 20px; font-family: "JetBrains Mono", monospace; font-size: .85rem; }
  </style>`);

  function renderDocs() {
    const list = D.documents.filter(
      (d) =>
        (docFilter === "all" || d.type === docFilter) &&
        (`${d.title} ${d.issuer} ${d.date}`.toLowerCase().includes(docQuery))
    );
    $("#docGrid").innerHTML = list.length
      ? list
          .map((d) => {
            const T = TYPES[d.type] || TYPES.other;
            const idx = D.documents.indexOf(d);
            const has = d.file || d.link;
            const thumb = d.thumb || (isImg(d.file) ? d.file : "");
            return `<article class="card doc ${has ? "" : "pending"}" style="--c:${T.c}" data-i="${idx}" tabindex="0">
              <div class="thumb">
                <span class="badge">${esc(d.type)}</span>
                ${thumb ? `<img src="${esc(fileUrl(thumb))}" alt="" loading="lazy">` : `<span class="ico">${T.ico}</span>`}
              </div>
              <div class="info">
                <h3>${esc(d.title)}</h3>
                <div class="meta">${esc(d.issuer || "")}${d.date ? " · " + esc(d.date) : ""}${has ? "" : " · <i>coming soon</i>"}</div>
              </div>
            </article>`;
          })
          .join("")
      : `<p class="empty">No documents match.</p>`;
    document.querySelectorAll(".doc:not(.pending)").forEach((el) => {
      const open = () => openDoc(D.documents[el.dataset.i]);
      el.onclick = open;
      el.onkeydown = (e) => e.key === "Enter" && open();
      const d = D.documents[el.dataset.i];
      if (isPdf(d.file) && !d.thumb) thumbIo.observe(el);
    });
  }
  const docTypes = ["all", ...new Set(D.documents.map((d) => d.type))];
  makeChips("#docFilters", docTypes, (k) => { docFilter = k; renderDocs(); });
  $("#docSearch").oninput = (e) => { docQuery = e.target.value.toLowerCase(); renderDocs(); };
  renderDocs();

  /* ---------- modal ---------- */
  const modal = $("#modal");
  let openToken = 0;
  function openDoc(d) {
    const src = d.file || d.link;
    const href = d.file ? fileUrl(d.file) : d.link;
    const body = $("#modalBody");
    const token = ++openToken;
    $("#modalTitle").textContent = d.title;
    $("#modalMeta").textContent = [d.type, d.issuer, d.date].filter(Boolean).join(" · ");
    $("#modalOpen").href = href;
    body.classList.remove("pdf-view");
    if (d.file && isImg(d.file)) {
      body.innerHTML = `<img src="${esc(href)}" alt="${esc(d.title)}">`;
    } else if (d.file && isPdf(d.file)) {
      body.classList.add("pdf-view");
      body.innerHTML = `<p class="pdf-status">Loading document…</p>`;
      (async () => {
        try {
          const pdf = await getPdf(d.file);
          const width = Math.min(body.clientWidth - 36, 900);
          for (let n = 1; n <= pdf.numPages; n++) {
            const c = await pageToCanvas(pdf, n, width);
            if (token !== openToken) return; // modal was closed or another doc opened
            if (n === 1) body.innerHTML = "";
            body.appendChild(c);
          }
        } catch (e) {
          if (token !== openToken) return;
          body.classList.remove("pdf-view");
          body.innerHTML = `<p class="pdf-status">Couldn't preview this file here.<br><br><a class="btn primary" href="${esc(href)}" target="_blank" rel="noopener">Open PDF ↗</a></p>`;
        }
      })();
    } else if (d.file) {
      body.innerHTML = `<iframe src="${esc(href)}" title="${esc(d.title)}"></iframe>`;
    } else {
      body.innerHTML = `<p class="muted" style="padding:30px;text-align:center">This document is hosted externally.<br><br><a class="btn primary" href="${esc(href)}" target="_blank" rel="noopener">Open ↗</a></p>`;
    }
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
  const close = () => { openToken++; modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); setTimeout(() => ($("#modalBody").innerHTML = ""), 250); };
  $("#modalClose").onclick = close;
  modal.onclick = (e) => e.target === modal && close();
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());

  /* ---------- extra sections (from content.js) ---------- */
  (D.extraSections || []).forEach((s) => {
    const sec = document.createElement("section");
    sec.id = s.id;
    sec.className = "reveal";
    sec.innerHTML = `<h2><span class="mono num"></span> ${esc(s.title)}</h2>
      <div class="cards">${(s.items || [])
        .map(
          (it) => `<article class="card">
            ${it.date ? `<div class="where" style="color:var(--accent)">${esc(it.date)}</div>` : ""}
            <h3>${esc(it.title)}</h3>
            ${it.subtitle ? `<div class="where">${esc(it.subtitle)}</div>` : ""}
            ${it.text ? `<p>${esc(it.text)}</p>` : ""}
            ${it.tags && it.tags.length ? `<div class="tags">${it.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
            ${it.link ? `<p style="margin-top:12px"><a href="${esc(it.link)}" target="_blank" rel="noopener">Open ↗</a></p>` : ""}
            ${viewBtn(it)}
          </article>`
        )
        .join("")}</div>`;
    $("#extraSections").before(sec);
    const li = document.createElement("li");
    li.innerHTML = `<a href="#${esc(s.id)}">${esc(s.menu || s.title)}</a>`;
    li.firstChild.onclick = () => $("#navLinks").classList.remove("open");
    $("#navLinks a[href='#skills']").parentElement.before(li);
  });
  // number all sections 01, 02, … in page order
  document.querySelectorAll("main section h2 .num").forEach((n, k) => (n.textContent = String(k + 1).padStart(2, "0")));

  /* ---------- skills ---------- */
  $("#skillList").innerHTML = D.skills
    .map((g) => `<div class="card"><h3>${esc(g.group)}</h3><div class="tags">${g.items.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div></div>`)
    .join("");

  /* ---------- helpers ---------- */
  function makeChips(sel, keys, onPick) {
    const box = $(sel);
    box.innerHTML = keys.map((k, j) => `<button class="chip ${j ? "" : "on"}" data-k="${esc(k)}">${esc(k)}</button>`).join("");
    box.querySelectorAll(".chip").forEach((b) => {
      b.onclick = () => {
        box.querySelectorAll(".chip").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        onPick(b.dataset.k);
      };
    });
  }

  /* ---------- scroll reveal + counters + active nav ---------- */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("visible");
        en.target.querySelectorAll(".stat .v").forEach(countUp);
        io.unobserve(en.target);
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((s) => io.observe(s));
  function countUp(el) {
    const to = parseFloat(el.dataset.to);
    if (isNaN(to)) return (el.textContent = el.dataset.to);
    const t0 = performance.now();
    (function step(t) {
      const k = Math.min(1, (t - t0) / 1200);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  const navIo = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        document.querySelectorAll("#navLinks a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("section").forEach((s) => navIo.observe(s));

  /* ---------- interactive NbS₂ honeycomb background ----------
     Top view of a 2H-NbS₂ monolayer: Nb (violet) and S (teal) on a honeycomb.
     Atoms get pushed by the cursor and relax back — a little "defect" you drag around. */
  const cv = $("#lattice"), ctx = cv.getContext("2d");
  let W, H, atoms = [], bonds = [], mouse = { x: -999, y: -999 };
  const A = 46; // lattice constant in px
  function build() {
    W = cv.width = innerWidth * devicePixelRatio;
    H = cv.height = innerHeight * devicePixelRatio;
    const a = A * devicePixelRatio;
    atoms = [];
    const rows = Math.ceil(H / (a * 0.866)) + 4, cols = Math.ceil(W / a) + 2;
    const idx = {};
    for (let j = -1; j < rows; j++)
      for (let i = -1; i < cols; i++) {
        const x0 = i * a + (j * a) / 2 - Math.floor(j / 2) * a, y0 = j * a * 0.866;
        [[0, 0, "Nb"], [a / 2, a / (2 * Math.sqrt(3)), "S"]].forEach(([dx, dy, el], b) => {
          idx[`${i},${j},${b}`] = atoms.length;
          atoms.push({ x0: x0 + dx, y0: y0 + dy, x: x0 + dx, y: y0 + dy, vx: 0, vy: 0, el });
        });
      }
    // nearest-neighbour bonds via distance
    bonds = [];
    const r = a / Math.sqrt(3) * 1.05;
    for (let p = 0; p < atoms.length; p++)
      for (let q = p + 1; q < Math.min(atoms.length, p + cols * 2 + 6); q++) {
        const dx = atoms[p].x0 - atoms[q].x0, dy = atoms[p].y0 - atoms[q].y0;
        if (dx * dx + dy * dy < r * r) bonds.push([p, q]);
      }
  }
  addEventListener("resize", build);
  addEventListener("mousemove", (e) => { mouse.x = e.clientX * devicePixelRatio; mouse.y = e.clientY * devicePixelRatio; });
  addEventListener("mouseleave", () => (mouse.x = mouse.y = -999));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let tick = 0;
  function frame() {
    tick += 0.01;
    const cs = getComputedStyle(root);
    const c1 = cs.getPropertyValue("--accent").trim(), c2 = cs.getPropertyValue("--accent2").trim(), ln = cs.getPropertyValue("--line").trim();
    const R = 140 * devicePixelRatio, sy = (scrollY * 0.15 * devicePixelRatio) % (A * devicePixelRatio * Math.sqrt(3));
    ctx.clearRect(0, 0, W, H);
    for (const at of atoms) {
      const dx = at.x - mouse.x, dy = at.y - sy - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < R * R && d2 > 1) { const f = (1 - Math.sqrt(d2) / R) * 1.6; at.vx += (dx / Math.sqrt(d2)) * f; at.vy += (dy / Math.sqrt(d2)) * f; }
      // thermal wiggle + spring back
      at.vx += (at.x0 + Math.sin(tick + at.y0) * 1.5 - at.x) * 0.04;
      at.vy += (at.y0 + Math.cos(tick + at.x0) * 1.5 - at.y) * 0.04;
      at.vx *= 0.82; at.vy *= 0.82;
      at.x += at.vx; at.y += at.vy;
    }
    ctx.lineWidth = devicePixelRatio;
    ctx.strokeStyle = ln;
    ctx.beginPath();
    for (const [p, q] of bonds) { ctx.moveTo(atoms[p].x, atoms[p].y - sy); ctx.lineTo(atoms[q].x, atoms[q].y - sy); }
    ctx.stroke();
    for (const at of atoms) {
      const y = at.y - sy;
      if (y < -20 || y > H + 20) continue;
      const disp = Math.min(1, Math.hypot(at.x - at.x0, at.y - at.y0) / 25);
      ctx.globalAlpha = 0.35 + disp * 0.65;
      ctx.fillStyle = at.el === "Nb" ? c2 : c1;
      ctx.beginPath();
      ctx.arc(at.x, y, (at.el === "Nb" ? 3.2 : 2.4) * devicePixelRatio * (1 + disp * 0.6), 0, 7);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!reduce) requestAnimationFrame(frame);
  }
  build();
  frame();
  if (reduce) addEventListener("scroll", frame);
})();
