(function () {
  var SESSION_KEY = "nobleBrandQuizAutoShown";
  var AUTO_DELAY_MS = 700;

  var QUESTIONS = [
    {
      key: "stage",
      eyebrow: "Where you stand",
      title: "Which best describes your brand today?",
      weight: 1.5,
      opts: [
        { label: "Just getting started", sub: "The business is new, or the name is still settling in.", score: 0, note: "You are at the foundation stage, where clarity matters more than volume." },
        { label: "A logo, and not much else", sub: "Something exists, but it was made quickly or on a budget.", score: 1, note: "You have a starting point that deserves a stronger system behind it." },
        { label: "Outgrown what I have", sub: "The business has changed. The brand has not kept up.", score: 2, note: "Your business has moved past its current look, so a fuller identity will close the gap." },
        { label: "Ready for a full rebrand", sub: "I know it needs to be rebuilt properly, start to finish.", score: 3, note: "You are ready to rebuild the brand as a complete, deliberate system." }
      ]
    },
    {
      key: "personality",
      eyebrow: "Your voice",
      title: "How clearly can you describe your brand personality?",
      weight: 1,
      opts: [
        { label: "Still figuring it out", sub: "I would love help finding the words.", score: 3, note: "Finding your voice is part of the work, and a story overview gives it somewhere to live." },
        { label: "A few words come to mind", sub: "I have instincts, but nothing written down.", score: 2, note: "Your instincts are a real asset that can be shaped into a visual language." },
        { label: "Fairly clear", sub: "I know the feeling I want, I need it expressed.", score: 1, note: "You know the feeling you want, so the work is translating it well." },
        { label: "Very clear", sub: "I can describe it, and I just need it designed.", score: 0, note: "With your direction already clear, design can move quickly and stay focused." }
      ]
    },
    {
      key: "consistency",
      eyebrow: "Day to day",
      title: "How consistent does your brand look across everything?",
      weight: 1,
      opts: [
        { label: "Pretty consistent", sub: "Most things match, with a few gaps.", score: 0, note: "Your materials are mostly aligned, so a tidy guide will lock it in." },
        { label: "It depends on the day", sub: "Colors and fonts shift between platforms.", score: 1, note: "Guidelines will end the guesswork about colors, type, and usage." },
        { label: "Scattered", sub: "Nothing quite looks like it belongs together.", score: 2, note: "Scattered materials call for a connected system, not another one-off graphic." },
        { label: "No system at all", sub: "Every piece gets made from scratch.", score: 3, note: "Without a system every piece starts from zero, so a comprehensive guide will save you time." }
      ]
    },
    {
      key: "assets",
      eyebrow: "What you need",
      title: "Which set of assets would serve you best?",
      weight: 1.5,
      opts: [
        { label: "The essentials", sub: "Logo, colors, fonts, and social profiles.", score: 0, note: "The essentials are what you asked for, and they are enough to show up well." },
        { label: "A full visual identity", sub: "Secondary marks, patterns, and stationery.", score: 1.6, note: "You want a visual identity with range, including supporting marks and print pieces." },
        { label: "Identity plus extras", sub: "Email signature, supporting visuals, and templates.", score: 2.3, note: "Your list reaches into the details that make a brand feel finished." },
        { label: "The whole system", sub: "Strategy, photography direction, and a launch plan.", score: 3, note: "You want the whole picture, from positioning to launch, and that is what Elite is built for." }
      ]
    },
    {
      key: "momentum",
      eyebrow: "Where you are headed",
      title: "What does the next year look like for your business?",
      weight: 1,
      opts: [
        { label: "Steady and stable", sub: "I am protecting what is working.", score: 0, note: "Steady growth deserves a brand that is stable, polished, and easy to maintain." },
        { label: "Growing at a good pace", sub: "More customers, more visibility, more to manage.", score: 1.5, note: "Growth is putting more eyes on your brand, which is a good time to strengthen it." },
        { label: "About to expand", sub: "A new location, offer, or audience is coming.", score: 2.5, note: "An expansion calls for a brand that can carry a new chapter with confidence." },
        { label: "Launching or relaunching", sub: "A public moment is on the calendar.", score: 3, note: "A launch needs a plan alongside the design, so the brand lands with intention." }
      ]
    }
  ];

  var PACKAGES = {
    basic: {
      name: "Basic Branding",
      tag: "A solid foundation, done properly.",
      blurb: "Foundational identity for a business that needs to show up with clarity and consistency.",
      items: ["Logo suite", "Core color palette and typography", "Concise brand guidelines", "Social profile and header artwork"]
    },
    premier: {
      name: "Premier Branding",
      tag: "A full visual identity, built to be used.",
      blurb: "A complete visual identity with the range to look cohesive on a website, in print, and across social.",
      items: ["Expanded logo system", "Primary and secondary color palettes", "Typography hierarchy", "Supporting visuals", "Full brand guidelines", "Stationery concepts", "Social media artwork"]
    },
    elite: {
      name: "Elite Branding",
      tag: "The complete system, story to launch.",
      blurb: "The most thorough engagement: identity, story, and a plan for putting the brand into the world.",
      items: ["Complete logo system and extended visual library", "Comprehensive brand guidelines", "Stationery suite", "Short positioning and story overview", "Social media artwork", "Email signature", "Photography direction", "Launch and marketing planning"]
    }
  };

  function normalizedPath() {
    var path = location.pathname || "/";
    try {
      path = decodeURIComponent(path);
    } catch (err) {
      path = location.pathname || "/";
    }
    path = path.replace(/\/index\.html$/i, "").replace(/\/+$/, "");
    return path || "/";
  }

  var brandingPage = normalizedPath().endsWith("/services/branding");
  var portfolioPage = /\/portfolio$/.test(normalizedPath());
  if (!brandingPage && !portfolioPage) return;

  var step = -1;
  var answers = [];
  var isOpen = false;
  var opener = null;
  var scrollY = 0;
  var autoTimer = 0;
  var inerted = [];

  var root = document.createElement("div");
  root.className = "brand-quiz";
  root.hidden = true;
  root.innerHTML =
    '<div class="brand-quiz__backdrop" data-brand-quiz-backdrop></div>' +
    '<div class="brand-quiz__dialog" role="dialog" aria-modal="true" aria-labelledby="brand-quiz-title" data-brand-quiz-dialog>' +
      '<div class="brand-quiz__bar">' +
        '<div class="brand-quiz__bar-row">' +
          '<img class="brand-quiz__logo" src="/Logos/noble-logo.png" alt="Noble Marketing and Design" />' +
          '<div class="brand-quiz__bar-end">' +
            '<span class="brand-quiz__progress-label" data-brand-quiz-count hidden></span>' +
            '<button type="button" class="brand-quiz__close" data-brand-quiz-close aria-label="Close quiz">' +
              '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
            "</button>" +
          "</div>" +
        "</div>" +
        '<div class="brand-quiz__meter" role="progressbar" aria-valuemin="0" aria-valuemax="5" aria-valuenow="0" aria-label="Quiz progress">' +
          '<div class="brand-quiz__meter-fill" data-brand-quiz-meter></div>' +
        "</div>" +
      "</div>" +
      '<div data-brand-quiz-body></div>' +
    "</div>";
  document.body.appendChild(root);

  var dialog = root.querySelector("[data-brand-quiz-dialog]");
  var body = root.querySelector("[data-brand-quiz-body]");
  var countEl = root.querySelector("[data-brand-quiz-count]");
  var meter = root.querySelector("[data-brand-quiz-meter]");
  var meterBar = root.querySelector('[role="progressbar"]');

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function iconArrow() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  }

  function iconArrowLeft() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';
  }

  function iconCheck(size) {
    var s = size || 12;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  }

  function iconRetry() {
    return '<svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>';
  }

  function scoreQuiz(picks) {
    var total = 0;
    var max = 0;
    QUESTIONS.forEach(function (question, index) {
      total += question.opts[picks[index]].score * question.weight;
      max += 3 * question.weight;
    });
    var pct = total / max;
    return {
      id: pct < 0.36 ? "basic" : pct < 0.64 ? "premier" : "elite",
      pct: pct
    };
  }

  function focusTitle() {
    var title = document.getElementById("brand-quiz-title");
    if (title) title.focus({ preventScroll: true });
    if (dialog) dialog.scrollTo({ top: 0 });
  }

  function render(moveFocus) {
    var question = step >= 0 && step < QUESTIONS.length ? QUESTIONS[step] : null;
    var progress = step < 0 ? 0 : Math.min(step + 1, QUESTIONS.length);
    meter.style.width = (progress / QUESTIONS.length) * 100 + "%";
    meterBar.setAttribute("aria-valuenow", String(progress));
    if (question) {
      countEl.hidden = false;
      countEl.textContent = step + 1 + " of " + QUESTIONS.length;
    } else {
      countEl.hidden = true;
      countEl.textContent = "";
    }

    if (step < 0) {
      body.innerHTML =
        '<div class="brand-quiz__intro">' +
          '<div class="brand-quiz__intro-copy">' +
            '<p class="brand-quiz__kicker">Brand discovery - 5 questions - 2 minutes</p>' +
            '<h2 class="brand-quiz__title brand-quiz__title--intro" id="brand-quiz-title" tabindex="-1">Find out which branding package is <em>right</em> for you.</h2>' +
            '<p class="brand-quiz__lede">Answer five short questions to discover the package that fits.</p>' +
            '<button type="button" class="brand-quiz__btn" data-brand-quiz-start>Begin the quiz ' + iconArrow() + "</button>" +
            '<p class="brand-quiz__fine">Packages start at $850 per month. No email required.</p>' +
          "</div>" +
          '<div class="brand-quiz__photo">' +
            '<img src="/Photos/brand-quiz/brand-studio.jpg" alt="A designer arranging printed brand boards and mood boards on a studio floor" />' +
          "</div>" +
        "</div>";
    } else if (question) {
      var options = question.opts.map(function (opt, index) {
        var selected = answers[step] === index;
        return (
          '<label class="brand-quiz__option' + (selected ? " is-selected" : "") + '">' +
            '<input class="brand-quiz__radio" type="radio" name="brand-quiz-' + esc(question.key) + '" value="' + index + '"' + (selected ? " checked" : "") + " />" +
            '<span class="brand-quiz__option-row">' +
              '<span class="brand-quiz__mark">' + (selected ? iconCheck(12) : "") + "</span>" +
              "<span>" +
                '<span class="brand-quiz__option-label">' + esc(opt.label) + "</span>" +
                '<span class="brand-quiz__option-sub">' + esc(opt.sub) + "</span>" +
              "</span>" +
            "</span>" +
          "</label>"
        );
      }).join("");
      var nextLabel = step === QUESTIONS.length - 1 ? "See my result" : "Next";
      body.innerHTML =
        '<div class="brand-quiz__question">' +
          '<p class="brand-quiz__kicker">' + esc(String(step + 1).padStart(2, "0") + " - " + question.eyebrow) + "</p>" +
          '<h2 class="brand-quiz__title brand-quiz__title--question" id="brand-quiz-title" tabindex="-1">' + esc(question.title) + "</h2>" +
          '<div class="brand-quiz__options" role="radiogroup" aria-labelledby="brand-quiz-title">' + options + "</div>" +
          '<div class="brand-quiz__nav">' +
            '<button type="button" class="brand-quiz__text-btn" data-brand-quiz-back>' + iconArrowLeft() + " Back</button>" +
            '<button type="button" class="brand-quiz__btn" data-brand-quiz-next' + (answers[step] === undefined ? " disabled" : "") + ">" + nextLabel + " " + iconArrow() + "</button>" +
          "</div>" +
        "</div>";
    } else {
      var result = scoreQuiz(answers);
      var pack = PACKAGES[result.id];
      var reasons = QUESTIONS.map(function (item, index) {
        return "<li>" + esc(item.opts[answers[index]].note) + "</li>";
      }).join("");
      var included = pack.items.map(function (item) {
        return "<li>" + iconCheck(16) + "<span>" + esc(item) + "</span></li>";
      }).join("");
      body.innerHTML =
        '<div class="brand-quiz__result">' +
          '<div class="brand-quiz__result-hero">' +
            '<img class="brand-quiz__watermark" src="/Logos/noble-icon.png" alt="" aria-hidden="true" />' +
            '<p class="brand-quiz__result-kicker">Your recommendation</p>' +
            '<h2 class="brand-quiz__result-name" id="brand-quiz-title" tabindex="-1">' + esc(pack.name) + "</h2>" +
            '<p class="brand-quiz__result-tag">' + esc(pack.tag) + "</p>" +
            '<p class="brand-quiz__result-blurb">' + esc(pack.blurb) + " Packages start at $850 per month.</p>" +
          "</div>" +
          '<div class="brand-quiz__result-grid">' +
            "<div>" +
              '<h3 class="brand-quiz__result-heading">Why this fits</h3>' +
              '<ul class="brand-quiz__reasons">' + reasons + "</ul>" +
            "</div>" +
            "<div>" +
              '<h3 class="brand-quiz__result-heading">What is included</h3>' +
              '<ul class="brand-quiz__included">' + included + "</ul>" +
            "</div>" +
          "</div>" +
          '<div class="brand-quiz__result-actions">' +
            '<a class="brand-quiz__btn" href="/contact/">Book a discovery call ' + iconArrow() + "</a>" +
            '<button type="button" class="brand-quiz__text-btn" data-brand-quiz-retake>' + iconRetry() + " Retake the quiz</button>" +
          "</div>" +
          '<p class="brand-quiz__disclaimer">This is a starting point, not a verdict. On the call we shape the scope around your business.</p>' +
        "</div>";
    }

    if (moveFocus) focusTitle();
  }

  function focusable() {
    return Array.prototype.slice.call(dialog.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex='-1'])")).filter(function (el) {
      return !el.hidden && el.getAttribute("aria-hidden") !== "true";
    });
  }

  function lockPage() {
    scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    var gap = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.classList.add("brand-quiz-open");
    document.body.style.position = "fixed";
    document.body.style.top = "-" + scrollY + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    if (gap > 0) document.body.style.paddingRight = gap + "px";
    inerted = [];
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el === root || el.hasAttribute("inert")) return;
      el.setAttribute("inert", "");
      el.setAttribute("data-brand-quiz-inert", "");
      inerted.push(el);
    });
  }

  function unlockPage() {
    document.documentElement.classList.remove("brand-quiz-open");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.paddingRight = "";
    inerted.forEach(function (el) {
      if (el.getAttribute("data-brand-quiz-inert") === "") {
        el.removeAttribute("inert");
        el.removeAttribute("data-brand-quiz-inert");
      }
    });
    inerted = [];
    window.scrollTo(0, scrollY);
  }

  function rememberAuto() {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch (err) {
      /* Private browsing can block storage; the quiz still works. */
    }
  }

  function openQuiz(trigger) {
    if (portfolioPage && !brandingFilterActive()) return;
    if (autoTimer) {
      window.clearTimeout(autoTimer);
      autoTimer = 0;
    }
    rememberAuto();
    opener = trigger || document.activeElement;
    if (isOpen) return;
    isOpen = true;
    root.hidden = false;
    lockPage();
    render(true);
  }

  function closeQuiz() {
    if (!isOpen) return;
    isOpen = false;
    root.hidden = true;
    unlockPage();
    if (opener && typeof opener.focus === "function" && document.contains(opener)) {
      opener.focus();
    }
  }

  function goTo(next) {
    step = next;
    render(true);
  }

  function brandingFilterActive() {
    var filter = document.getElementById("portfolio-filter-branding");
    return !!(filter && filter.getAttribute("aria-pressed") === "true");
  }

  function syncPortfolioButton() {
    var slot = document.querySelector("[data-portfolio-brand-quiz]");
    if (!slot) return;
    var active = brandingFilterActive();
    slot.hidden = !active;
    if (!active && isOpen) closeQuiz();
  }

  root.addEventListener("click", function (event) {
    if (event.target.closest("[data-brand-quiz-close], [data-brand-quiz-backdrop]")) {
      closeQuiz();
      return;
    }
    if (event.target.closest("[data-brand-quiz-start]")) {
      goTo(0);
      return;
    }
    if (event.target.closest("[data-brand-quiz-back]")) {
      goTo(step - 1);
      return;
    }
    if (event.target.closest("[data-brand-quiz-next]")) {
      if (answers[step] === undefined) return;
      goTo(step + 1);
      return;
    }
    if (event.target.closest("[data-brand-quiz-retake]")) {
      answers = [];
      goTo(-1);
    }
  });

  root.addEventListener("change", function (event) {
    var input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== "radio") return;
    var index = Number(input.value);
    if (!Number.isInteger(index)) return;
    answers[step] = index;
    render(false);
    var replacement = body.querySelector('input[value="' + index + '"]');
    if (replacement) replacement.focus();
  });

  document.addEventListener("keydown", function (event) {
    if (!isOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeQuiz();
      return;
    }
    if (event.key !== "Tab") return;
    var nodes = focusable();
    if (nodes.length === 0) {
      event.preventDefault();
      focusTitle();
      return;
    }
    var first = nodes[0];
    var last = nodes[nodes.length - 1];
    var active = document.activeElement;
    if (event.shiftKey && (active === first || !dialog.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-open-brand-quiz]");
    if (!trigger) return;
    event.preventDefault();
    openQuiz(trigger);
  });

  if (portfolioPage) {
    var magazine = document.querySelector("[data-portfolio-magazine]");
    if (magazine) {
      magazine.addEventListener("click", function (event) {
        if (!event.target.closest("[data-mag-filter]")) return;
        window.setTimeout(syncPortfolioButton, 0);
      });
    }
    window.addEventListener("hashchange", function () {
      window.setTimeout(syncPortfolioButton, 0);
    });
    syncPortfolioButton();
  }

  if (!brandingPage) return;

  var fab = document.createElement("button");
  fab.type = "button";
  fab.className = "brand-quiz-fab";
  fab.setAttribute("data-open-brand-quiz", "");
  fab.textContent = "Take the Quiz";
  var backToTop = document.getElementById("noble-back-to-top");
  if (backToTop) document.body.insertBefore(fab, backToTop);
  else document.body.appendChild(fab);

  var params = new URLSearchParams(location.search);
  if (params.get("openBrandQuiz") === "1") {
    params.delete("openBrandQuiz");
    var next = params.toString();
    history.replaceState(null, "", location.pathname + (next ? "?" + next : "") + location.hash);
    openQuiz(fab);
    return;
  }

  var seen = false;
  try {
    seen = sessionStorage.getItem(SESSION_KEY) === "1";
  } catch (err) {
    seen = false;
  }
  if (seen) return;

  autoTimer = window.setTimeout(function () {
    autoTimer = 0;
    if (!brandingPage || isOpen) return;
    openQuiz(fab);
  }, AUTO_DELAY_MS);
})();
