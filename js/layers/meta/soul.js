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
        Reset for <b>+1</b> Soul Tree Resets<br><br>
        
        Req: ${player.points.round(0)} / 1.00 Omnipoints`
    },
    prestigeNotify() {
        return tmp.p_s.canReset
    },
    doReset(x) {
        if (x == this.layer) {
            // player[this.layer].points = new Decimal(0)
            player.ygg.p_s_points = new Decimal(0)
        }
    },
    clickables: {
        11: {
            title: "Reset Soul Tree Resets",
            display() {
                "Reset the Soul Tree Resets layer"
            },
            canClick: true,
            onClick() {
                player[this.layer].points = new Decimal(0)
                player[this.layer].upgrades = []
                player[this.layer].achievements = []
            }
        }
    },
    achievements: {
        11: {
            name: "Why?",
            done() {return player[this.layer].points.gte(10) && player.p_c.points.gte(10) && player.p_g.points.gte(10)},
            tooltip: "Have 10 of each reset<br> Why would you do this",
            unlocked() {return player[this.layer].points.gte(10) && player.p_c.points.gte(10) && player.p_g.points.gte(10)},
        }
    }
})