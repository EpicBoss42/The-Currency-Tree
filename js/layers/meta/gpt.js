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
    type: "custom",
    baseResource: "Omnipoints",
    baseAmount() {return player.points},
    requires: new Decimal(1),
    exponent: 1,
    getResetGain() {
        return new Decimal(1)
    },
    getNextAt() {
        return new Decimal(1)
    },
    canReset() {
        return player.points.gte(tmp.p_s.getNextAt)
    },
    prestigeButtonText() {
        return `
        Reset for <b>+1</b> GPTree Resets<br><br>
        
        Req: ${player.points.round(0)} / 1.00 Omnipoints`
    },
    prestigeNotify() {
        return tmp.p_s.canReset
    },
    doReset(x) {
        if (x == this.layer) {
            // player[this.layer].points = new Decimal(0)
            player.ygg.p_g_points = new Decimal(0)
        }
    },
    clickables: {
        11: {
            title: "Reset GPTree Resets",
            display() {
                "Reset the GPTree Resets layer"
            },
            canClick: true,
            onClick() {
                player[this.layer].points = new Decimal(0)
                player[this.layer].upgrades = []
            }
        }
    }
})