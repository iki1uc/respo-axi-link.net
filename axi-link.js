const AXI = {
    config: null,

    init() {
        fetch("axi-config.json")
            .then(r => r.json())
            .then(cfg => {
                this.config = cfg;
                console.log("AXI initialisiert:", cfg);
            });
    },

    check() {
        console.log("AXI-Link geprüft.");
        console.log("Master aktiv:", this.config?.master);
        console.log("Protokoll:", this.config?.protocol);
    },

    write(addr, data) {
        console.log(`AXI WRITE → Addr: ${addr}, Data: ${data}`);
    },

    read(addr) {
        console.log(`AXI READ → Addr: ${addr}`);
        return 0;
    }
};

