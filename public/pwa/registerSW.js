if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/pwa/service-worker.js")
      .then((reg) => console.log("SW registrado:", reg))
      .catch((err) => console.error("Error registrando SW:", err));
  });
}
