/* ============================================================
   AXI-LINK · RESPO-AXI-LINK.NET
   Verbindet Achsen, Lage, Weiser und Router-Hook
   ============================================================ */

async function axiLink(axis) {
    const config = await fetch("axi-config.json").then(r => r.json());
    const lage   = await fetch("axi-lage.json").then(r => r.json());
    const weiser = await fetch("axi-weiser.json").then(r => r.json());

    const info = {
        axis: axis,
        slot: lage[axis]?.slot,
        depth: lage[axis]?.depth,
        group: lage[axis]?.group,
        route: weiser[axis]?.route || weiser.fallback,
        mode: config.mode
    };

    console.log("AXI-LINK:", info);
    return info;
}

export { axiLink };
