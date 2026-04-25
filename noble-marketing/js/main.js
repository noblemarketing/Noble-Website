const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function setYear() {
  $$("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

function setupNav() {
  const nav = $("[data-nav]");
  if (!nav) return;

  const btn = $(".nav-toggle", nav);
  const drawer = $("#nav-drawer", nav);

  const setOpen = (open) => {
    if (!btn || !drawer) return;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.hidden = !open;
  };

  if (btn && drawer) {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    drawer.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest("a")) setOpen(false);
    });

    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const open = btn.getAttribute("aria-expanded") === "true";
      if (!open) return;
      if (nav.contains(t)) return;
      setOpen(false);
    });
  }

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setActiveNavLink() {
  const filename = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  $$("[data-nav-link]").forEach((a) => {
    const match = (a.getAttribute("data-nav-link") || "").toLowerCase() === filename;
    if (match) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

async function injectPartials() {
  const slots = $$("[data-include]");
  if (slots.length === 0) return;

  await Promise.all(
    slots.map(async (slot) => {
      const path = slot.getAttribute("data-include");
      if (!path) return;
      const res = await fetch(path);
      if (!res.ok) return;
      slot.innerHTML = await res.text();
    }),
  );

  setActiveNavLink();
  setupNav();
  setYear();
}

injectPartials();

