export async function routerMatrix(axis) {
    const config = await fetch("axi-config.json").then(r => r.json());
    const lage   = await fetch("axi-lage.json").then(r => r.json());
    const weiser = await fetch("axi-weiser.json").then(r => r.json());

    const result = {
        axis: axis,
        slot: lage[axis]?.slot,
        depth: lage[axis]?.depth,
        group: lage[axis]?.group,
        route: weiser[axis]?.route,
        mode: config.mode
    };

    result.valid =
        result.axis &&
        result.slot &&
        result.depth !== undefined &&
        result.group &&
        result.route &&
        result.mode;

    console.log("6D‑Matrix:", result);
    return result;
}
