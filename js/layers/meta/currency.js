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
        Reset for <b>+1</b> Currency Tree Resets<br><br>
        
        Req: ${player.points.round(0)} / 1.00 Omnipoints`
    },
    prestigeNotify() {
        return tmp.p_s.canReset
    },
    doReset(x) {
        if (x == this.layer) {
            // player[this.layer].points = new Decimal(0)
            player.ygg.p_c_points = new Decimal(0)
        }
    },
    clickables: {
        11: {
            title: "Reset Currency Tree Resets",
            display() {
                "Reset the Currency Tree Resets layer"
            },
            canClick: true,
            onClick() {
                player[this.layer].points = new Decimal(0)
                player[this.layer].upgrades = []
            }
        }
    }
})
