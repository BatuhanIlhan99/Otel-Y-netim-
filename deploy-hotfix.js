(function () {
  const localBackendUrl = "http://127.0.0.1:8787";

  function backendMessage() {
    if (location.protocol === "file:") {
      return `Backend bağlantısı yok. Önce START_BACKEND.cmd dosyasını çalıştır veya siteyi ${localBackendUrl}/ adresinden aç.`;
    }
    return "Backend bağlantısı yok. Mail metni panoya kopyalandı; backend açıldığında tekrar gönder.";
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function previewText(button) {
    const panel = button.closest(".panel");
    const preview = panel?.querySelector(".mail-preview");
    return preview?.innerText?.trim() || "";
  }

  async function backendFetch(path, options = {}) {
    const base = location.protocol === "file:" ? localBackendUrl : "";
    const response = await fetch(`${base}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  async function handleMailAction(button, kind) {
    const text = previewText(button);
    const path =
      kind === "report"
        ? `/api/mail/send-report?date=${encodeURIComponent(document.querySelector('[data-action="report-date"]')?.value || new Date().toISOString().slice(0, 10))}`
        : "/api/mail/send-reminder";

    try {
      const result = await backendFetch(path, { method: "POST" });
      window.alert(result?.message || (kind === "report" ? "Yönetici raporu işlendi." : "Hatırlatma maili işlendi."));
    } catch (error) {
      if (text) {
        await copyText(text);
      }
      window.alert(`${backendMessage()}${text ? " Mail içeriği panoya kopyalandı." : ""}`);
    }
  }

  document.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;

      if (button.dataset.action === "send-reminder-mail") {
        event.preventDefault();
        event.stopImmediatePropagation();
        handleMailAction(button, "reminder");
      }

      if (button.dataset.action === "send-report-mail") {
        event.preventDefault();
        event.stopImmediatePropagation();
        handleMailAction(button, "report");
      }
    },
    true
  );

  document.addEventListener(
    "input",
    (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.dataset.action !== "search") return;

      const start = input.selectionStart;
      const end = input.selectionEnd;
      window.requestAnimationFrame(() => {
        const nextInput = document.querySelector('input[data-action="search"]');
        if (!(nextInput instanceof HTMLInputElement)) return;
        nextInput.focus({ preventScroll: true });
        if (start !== null && end !== null) {
          nextInput.setSelectionRange(start, end);
        }
      });
    },
    true
  );
})();
