addLayer("p_s_mb", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            unlockOrder: new Decimal(1),
            total: new Decimal(0)
        }
    },
    color: "#5BCAE5",
    resource: "mega batteries",
    row: 3,
    symbol: "MB",
    baseResource: "soul batteries",
    baseAmount() { return player.p_s_sb.points },
    requires() {
        let value = new Decimal(2500)
        value = value.mul(new Decimal(10).pow(player[this.layer].unlockOrder))
        return value
    },
    increaseUnlockOrder: ["p_s_sc"],
    type: "custom",
    base: new Decimal(2500),
    exponent: 1,
    getResetGain() {return new Decimal(1)},
    getNextAt() {
        let base = new Decimal(2500)
        base = base.mul(new Decimal(10).pow(player[this.layer].unlockOrder))
        base = base.pow(player[this.layer].points.add(1).pow(new Decimal(0.25)))
        return base
    },
    canReset() {return player.p_s_sb.points.gte(tmp.p_s_mb.getNextAt)},
    prestigeButtonText() {
        return `Reset for +1 mega battery<br><br>
        Req: ` + format(tmp.p_s_mb.getNextAt) + " soul batteries"
    },
    doReset(x) {
        if (x === this.layer) {
            player.ygg.p_s_points = new Decimal(0)
        } else if (x == "p_s") {
            layerDataReset(this.layer)
            player[this.layer].unlocked = false
        }
    },
    gainMult() {
        let value = new Decimal(1)
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        return hasMilestone("p_s_sb", 2) || player[this.layer].unlocked
    }, 
    effect() {
        let base = new Decimal(player[this.layer].points)
        if (hasUpgrade(this.layer, 12)) base = new Decimal(player[this.layer].total)
        base = base.add(1).pow(0.5)
        return base.max(1)
    },
    effectDescription() {
        return "raising Soul Battery gain to ^" + format(tmp.p_s_mb.effect)
    },
    upgrades: {
        11: {
            title: "Megacharging",
            description: "Mega Batteries increase Soul Battery upgrade effects.",
            cost: new Decimal(1)
        },
        12: {
            title: "Phantom Batteries",
            description: "The Mega Battery effect is based on total Mega Batteries.",
            cost: new Decimal(2)
        }
    },
})