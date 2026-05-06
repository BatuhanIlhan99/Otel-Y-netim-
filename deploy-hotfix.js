(function () {
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
