/* ============================================================
   AXI-ATOR · RESPO-AXI-LINK.NET
   router-hook.js · Routing-Hook für Achsen, Lage, Weiser, Config
   ============================================================ */

console.log("AXI-ATOR Router-Hook geladen.");

/* ------------------------------------------------------------
   1) CONFIG LADEN
------------------------------------------------------------ */
async function loadConfig() {
    const res = await fetch("axi-config.json");
    return await res.json();
}

/* ------------------------------------------------------------
   2) LAGE LADEN (Positionen, Depth, Slots)
------------------------------------------------------------ */
async function loadLage() {
    const res = await fetch("axi-lage.json");
    return await res.json();
}

/* ------------------------------------------------------------
   3) WEISER LADEN (Routing-Wege)
------------------------------------------------------------ */
async function loadWeiser() {
    const res = await fetch("axi-weiser.json");
    return await res.json();
}

/* ------------------------------------------------------------
   4) 6D ROUTER-MATRIX IMPORTIEREN
------------------------------------------------------------ */
import { routerMatrix } from "./router-matrix.js";

/* ------------------------------------------------------------
   5) URL-PARSER
------------------------------------------------------------ */
function parseURL() {
    const params = new URLSearchParams(window.location.search);
    return {
        axis: params.get("axis"),
        id: params.get("id"),
        group: params.get("group"),
        depth: params.get("depth"),
        mode: params.get("mode")
    };
}

/* ------------------------------------------------------------
   6) ROUTING-AUSFÜHRUNG (6D-Matrix)
------------------------------------------------------------ */
async function runRouting() {
    const p = parseURL();

    if (!p.axis) {
        console.log("AXI-ATOR: Keine Achse übergeben.");
        return;
    }

    const result = await routerMatrix(p.axis);

    const output = document.getElementById("axi-output");
    if (output) {
        output.innerHTML = `
            <h2>6D‑Router‑Matrix</h2>
            <p><strong>Achse:</strong> ${result.axis}</p>
            <p><strong>Slot:</strong> ${result.slot}</p>
            <p><strong>Depth:</strong> ${result.depth}</p>
            <p><strong>Gruppe:</strong> ${result.group}</p>
            <p><strong>Route:</strong> ${result.route}</p>
            <p><strong>Modus:</strong> ${result.mode}</p>
            <p><strong>Status:</strong> ${result.valid ? "✔ erfüllt" : "❌ Fehler"}</p>
        `;
    }
}

/* ------------------------------------------------------------
   7) AUTO-START
------------------------------------------------------------ */
window.addEventListener("DOMContentLoaded", runRouting);
