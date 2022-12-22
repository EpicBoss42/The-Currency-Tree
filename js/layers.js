addLayer("ygg", {})
addLayer("p_s_sg", {})
addLayer("p_s_sb", {})
addLayer("p_s_sc", {})
addLayer("p_s_mb", {})
addLayer("p_c_cc", {})
addLayer("p_c_sp", {})
addLayer("p_c_ba", {})
addLayer("p_g_hl", {})

addLayer("p_s", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    symbol: "PSR",
    name: "Soul Tree Resets",
    color: "#AAAAAA",
    row: 10,
    resource: "Soul Tree Resets",
    type: "static",
    baseResource: "Omnipoints",
    baseAmount() {return player.points},
    requires: new Decimal(1),
    exponent: 1,
    base: new Decimal(2),
    doReset(x) {
        if (x == this.layer) {
            player[this.layer].points = new Decimal(0)
            player.ygg.p_s_points = new Decimal(0)
        }
    }
})

addLayer("p_c", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    symbol: "PCR",
    name: "Currency Tree Resets",
    color: "#AAAAAA",
    row: 10,
    resource: "Currency Tree Resets",
    type: "static",
    baseResource: "Omnipoints",
    baseAmount() {return player.points},
    requires: new Decimal(1),
    exponent: 1,
    base: new Decimal(2),
    doReset(x) {
        if (x == this.layer) {
            player[this.layer].points = new Decimal(0)
            player.ygg.p_c_points = new Decimal(0)
        }
    }
})

addLayer("p_g", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    symbol: "PGR",
    name: "GPTree Resets",
    color: "#AAAAAA",
    row: 10,
    resource: "GPTree Resets",
    type: "static",
    baseResource: "Omnipoints",
    baseAmount() {return player.points},
    requires: new Decimal(1),
    exponent: 1,
    base: new Decimal(2),
    doReset(x) {
        if (x == this.layer) {
            player[this.layer].points = new Decimal(0)
            player.ygg.p_g_points = new Decimal(0)
        }
    }
})