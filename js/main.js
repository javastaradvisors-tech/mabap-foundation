(function () {
  var loader = document.getElementById("page-loader");
  if (!loader) return;

  var SESSION_KEY = "mabap-loader-shown";

  if (sessionStorage.getItem(SESSION_KEY) === "1") {
    loader.classList.add("is-hidden");
    return;
  }

  document.body.classList.add("is-loading");

  var hidden = false;
  function hideLoader() {
    if (hidden) return;
    hidden = true;
    loader.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
    sessionStorage.setItem(SESSION_KEY, "1");
  }

  var MIN_DISPLAY_MS = 3000;

  if (document.readyState === "complete") {
    setTimeout(hideLoader, MIN_DISPLAY_MS);
  } else {
    window.addEventListener("load", function () {
      setTimeout(hideLoader, MIN_DISPLAY_MS);
    });
  }

  setTimeout(hideLoader, MIN_DISPLAY_MS + 3000);
})();

document.addEventListener("DOMContentLoaded", function () {
  var msgEl = document.getElementById("daily-message-text");
  var archiveMsgEl = document.getElementById("archive-today-text");
  if (msgEl || archiveMsgEl) {
    fetch("data/daily-messages.json")
      .then(function (res) { return res.ok ? res.json() : Promise.reject(); })
      .then(function (messages) {
        if (!messages || !messages.length) return Promise.reject();
        var now = new Date();
        var startOfYear = new Date(now.getFullYear(), 0, 0);
        var dayOfYear = Math.floor((now - startOfYear) / 86400000);
        var text = messages[dayOfYear % messages.length];
        if (msgEl) msgEl.textContent = text;
        if (archiveMsgEl) archiveMsgEl.textContent = text;
      })
      .catch(function () {
        var fallback = "Avirat Seva Mahe — Devoted to the Seva of Humanity.";
        if (msgEl) msgEl.textContent = fallback;
        if (archiveMsgEl) archiveMsgEl.textContent = fallback;
      });
  }

  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  var donateForm = document.getElementById("donate-form");
  if (donateForm) {
    var panPattern = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var nameField = document.getElementById("field-name");
    var emailField = document.getElementById("field-email");
    var panField = document.getElementById("field-pan");
    var amountField = document.getElementById("field-amount");
    var nameInput = document.getElementById("donor-name");
    var emailInput = document.getElementById("donor-email");
    var panInput = document.getElementById("donor-pan");
    var amountInput = document.getElementById("donor-amount");
    var frequencyInput = document.getElementById("donor-frequency");
    var submitBtn = donateForm.querySelector(".donate-submit");

    var freqButtons = donateForm.querySelectorAll(".freq-btn");
    freqButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        freqButtons.forEach(function (b) {
          b.classList.remove("is-selected");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-selected");
        btn.setAttribute("aria-pressed", "true");
        frequencyInput.value = btn.dataset.freq;
        submitBtn.textContent = btn.dataset.freq === "monthly" ? "Start Monthly Giving" : "Proceed to Payment";
      });
    });

    var amountTierBtns = donateForm.querySelectorAll(".amount-tier");
    amountTierBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        amountTierBtns.forEach(function (b) { b.classList.remove("is-selected"); });
        btn.classList.add("is-selected");
        if (btn.dataset.amount === "custom") {
          amountInput.value = "";
          amountInput.focus();
        } else {
          amountInput.value = btn.dataset.amount;
        }
      });
    });

    amountInput.addEventListener("input", function () {
      var matched = false;
      amountTierBtns.forEach(function (b) {
        if (b.dataset.amount === amountInput.value) {
          b.classList.add("is-selected");
          matched = true;
        } else {
          b.classList.remove("is-selected");
        }
      });
      if (!matched) {
        amountTierBtns.forEach(function (b) {
          b.classList.toggle("is-selected", b.dataset.amount === "custom" && amountInput.value !== "");
        });
      }
    });

    donateForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      if (!nameInput.value.trim()) {
        nameField.classList.add("has-error");
        valid = false;
      } else {
        nameField.classList.remove("has-error");
      }

      if (!emailPattern.test(emailInput.value.trim())) {
        emailField.classList.add("has-error");
        valid = false;
      } else {
        emailField.classList.remove("has-error");
      }

      if (!panPattern.test(panInput.value.trim())) {
        panField.classList.add("has-error");
        valid = false;
      } else {
        panField.classList.remove("has-error");
      }

      var amountVal = parseFloat(amountInput.value);
      if (!amountVal || amountVal <= 0) {
        amountField.classList.add("has-error");
        valid = false;
      } else {
        amountField.classList.remove("has-error");
      }

      if (!valid) return;

      document.getElementById("confirm-name").textContent = nameInput.value.trim();
      document.getElementById("confirm-amount").textContent = amountVal.toLocaleString("en-IN");
      document.getElementById("confirm-frequency").textContent =
        frequencyInput.value === "monthly" ? "monthly pledge" : "one-time pledge";

      donateForm.classList.add("hide");
      document.getElementById("donate-confirmation").classList.add("show");
    });
  }

  document.querySelectorAll(".timeline-year-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var yearEl = btn.closest(".timeline-year");
      var isOpen = yearEl.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  var revealEls = document.querySelectorAll(
    [
      ".leader-card", ".volunteer-card", ".guru-card", ".pillar-card",
      ".program-row", ".stat-card", ".video-card", ".blog-card",
      ".press-item", ".timeline-year", ".archive-entry",
      ".donate-card", ".sgp-inner", ".story-inner"
    ].join(",")
  );

  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      revealEls.forEach(function (el) { el.classList.add("reveal-init"); });

      var revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var siblings = Array.prototype.filter.call(
            el.parentElement.children,
            function (c) { return c.classList.contains("reveal-init"); }
          );
          var idx = siblings.indexOf(el);
          var delay = Math.max(idx, 0) * 90;
          if (delay > 360) delay = 360;
          el.style.transitionDelay = delay + "ms";
          el.classList.add("is-visible");
          obs.unobserve(el);
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }
});
