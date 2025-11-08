(() => {
  function extractPlayerNames() {
    // Alle sichtbaren Spielernamen (inkl. Storyteller)
    const nameplates = document.querySelectorAll(".nameplate .name span");
    const allPlayers = Array.from(nameplates)
      .map(el => el.textContent?.trim())
      .filter(Boolean);

    // Storyteller ermitteln
    const storytellers = Array.from(
      document.querySelectorAll("#left .storyteller .nameplate .name span")
    ).map(el => el.textContent?.trim());

    // Nur echte Spieler behalten
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
      maxWidth: "500px",
      fontFamily: "sans-serif",
      textAlign: "center",
    });

    const title = document.createElement("h2");
    title.textContent = "🧑‍🤝‍🧑 Spieler (komma-separiert)";
    Object.assign(title.style, {
      marginTop: "0",
      marginBottom: "12px",
      textAlign: "center",
      fontSize: "1.2rem",
      borderBottom: "2px solid #555",
      paddingBottom: "8px",
    });
    box.appendChild(title);

    // Spieler kommasepariert darstellen
    const playerString = players.join(", ");

    const textarea = document.createElement("textarea");
    textarea.value = playerString;
    Object.assign(textarea.style, {
      width: "100%",
      resize: "none",
      background: "#2b2b2b",
      color: "#fff",
      border: "1px solid #444",
      borderRadius: "6px",
      padding: "8px",
      fontSize: "0.95rem",
      lineHeight: "1.4",
    });
    textarea.rows = 3;
    box.appendChild(textarea);

    const copyButton = document.createElement("button");
    copyButton.textContent = "📋 Kopieren";
    Object.assign(copyButton.style, {
      marginTop: "10px",
      width: "100%",
      padding: "8px",
      background: "#5a4aa1",
      border: "none",
      color: "#fff",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "1rem",
    });
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(playerString);
      copyButton.textContent = "✅ Kopiert!";
      setTimeout(() => (copyButton.textContent = "📋 Kopieren"), 1500);
    });
    box.appendChild(copyButton);

    const close = document.createElement("button");
    close.textContent = "Schließen";
    Object.assign(close.style, {
      marginTop: "8px",
      width: "100%",
      padding: "8px",
      background: "#444",
      border: "none",
      color: "#fff",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.9rem",
    });
    close.addEventListener("click", () => overlay.remove());
    box.appendChild(close);

    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  extractPlayerNames();
})();
