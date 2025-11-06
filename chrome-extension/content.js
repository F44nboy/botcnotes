(() => {
  function extractPlayerNames() {
    // Alle sichtbaren Spielernamen (ohne Storyteller)
    const nameplates = document.querySelectorAll(".nameplate .name span");
    const allPlayers = Array.from(nameplates)
      .map(el => el.textContent.trim())
      .filter(Boolean);

    // Storyteller erkennen
    const storytellers = Array.from(
      document.querySelectorAll("#left .storyteller .nameplate .name span")
    ).map(el => el.textContent.trim());

    // Storyteller herausfiltern
    const players = allPlayers.filter(n => !storytellers.includes(n));

    if (players.length === 0) {
      alert("Keine Spieler gefunden oder Spiel nicht gestartet.");
      return;
    }

    // === Overlay erzeugen ===
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(4px)",
      zIndex: "9999",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    });

    const box = document.createElement("div");
    Object.assign(box.style, {
      background: "#1e1e1e",
      color: "#fff",
      padding: "20px 30px",
      borderRadius: "12px",
      boxShadow: "0 0 20px rgba(0,0,0,0.4)",
      maxWidth: "400px",
      fontFamily: "sans-serif",
    });

    const title = document.createElement("h2");
    title.textContent = "🧑‍🤝‍🧑 Spielerreihenfolge";
    Object.assign(title.style, {
      marginTop: "0",
      marginBottom: "12px",
      textAlign: "center",
      fontSize: "1.3rem",
      borderBottom: "2px solid #555",
      paddingBottom: "8px",
    });
    box.appendChild(title);

    // Spieler nummerieren
    const numberedList = players.map((name, i) => `${i + 1}. ${name}`);

    const textarea = document.createElement("textarea");
    textarea.value = numberedList.join("\n");
    Object.assign(textarea.style, {
      width: "100%",
      resize: "none",
      background: "#2b2b2b",
      color: "#fff",
      border: "1px solid #444",
      borderRadius: "6px",
      padding: "6px",
      fontSize: "0.95rem",
      lineHeight: "1.4",
    });
    textarea.rows = players.length;
    box.appendChild(textarea);

    const close = document.createElement("button");
    close.textContent = "Schließen";
    Object.assign(close.style, {
      marginTop: "12px",
      width: "100%",
      padding: "8px",
      background: "#444",
      border: "none",
      color: "#fff",
      borderRadius: "6px",
      cursor: "pointer",
    });
    close.addEventListener("click", () => overlay.remove());
    box.appendChild(close);

    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  extractPlayerNames();
})();
