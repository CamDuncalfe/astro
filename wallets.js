(function () {
  let allowedWallets = new Set();

  async function loadWalletListFromCSV() {
    try {
      const res = await fetch('https://cdn.jsdelivr.net/gh/CamDuncalfe/astro@main/Wallet_Checker_Final.csv');
      const text = await res.text();
      const lines = text.split('\n').map(l => l.trim().toLowerCase()).filter(Boolean);
      allowedWallets = new Set(lines);
    } catch (err) {
      console.error('Failed to load wallet list from CSV', err);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadWalletListFromCSV();

    const form = document.getElementById("wf-form-Wallet-Checker");
    const input = document.getElementById("wallet-input");
    const successMessage = document.querySelector(".success-message.w-form-done");
    const errorMessage = document.querySelector(".error-message.w-form-fail");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      const wallet = input.value.trim().toLowerCase();
      successMessage.style.display = "none";
      errorMessage.style.display = "none";

      if (allowedWallets.has(wallet)) {
        successMessage.style.display = "block";
      } else {
        errorMessage.style.display = "block";
      }
    });
  });
})();
