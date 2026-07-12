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
   4) ACHSEN-ROUTING
------------------------------------------------------------ */
async function axiRoute(axis) {
    const config = await loadConfig();
    const lage   = await loadLage();
    const weiser = await loadWeiser();

    if (!axis || !weiser[axis]) {
        console.warn("AXI-ATOR: Achse nicht gefunden:", axis);
        return {
            error: true,
            message: "Achse unbekannt",
            axis: axis
        };
    }

    const axisInfo = {
        axis: axis,
        slot: lage[axis]?.slot || null,
        depth: lage[axis]?.depth || null,
        group: lage[axis]?.group || null,
        route: weiser[axis]?.route || null,
        mode: config.mode || "RAW",
        system: config.system || "AXI-ATOR"
    };

    console.log("AXI-ATOR Routing:", axisInfo);
    return axisInfo;
}

/* ------------------------------------------------------------
   5) URL-PARSER (index.html → router-hook.js)
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
   6) ROUTING-AUSFÜHRUNG
------------------------------------------------------------ */
async function runRouting() {
    const p = parseURL();

    if (!p.axis) {
        console.log("AXI-ATOR: Keine Achse übergeben.");
        return;
    }

    const result = await axiRoute(p.axis);

    const output = document.getElementById("axi-output");
    if (output) {
        output.innerHTML = `
            <h2>AXI‑ATOR Routing</h2>
            <p><strong>Achse:</strong> ${result.axis}</p>
            <p><strong>Slot:</strong> ${result.slot}</p>
            <p><strong>Depth:</strong> ${result.depth}</p>
            <p><strong>Gruppe:</strong> ${result.group}</p>
            <p><strong>Route:</strong> ${result.route}</p>
            <p><strong>Modus:</strong> ${result.mode}</p>
            <p><strong>System:</strong> ${result.system}</p>
        `;
    }
}

/* ------------------------------------------------------------
   7) AUTO-START
------------------------------------------------------------ */
window.addEventListener("DOMContentLoaded", runRouting);
