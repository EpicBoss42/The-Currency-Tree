addLayer("p_s_mb", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            unlockOrder: new Decimal(1)
        }
    },
    color: "#5BCAE5",
    resource: "mega batteries",
    row: 2,
    symbol: "MB",
    baseResource: "soul batteries",
    baseAmount() { return player.p_s_sb.points },
    requires() {
        let value = new Decimal(2500)
        value = value.mul(new Decimal(10).pow(player[this.layer].unlockOrder))
        return value
    },
    increaseUnlockOrder: ["p_s_sc"],
    type: "static",
    base: new Decimal(2500),
    exponent: 2,
    doReset(x) {
        if (x === this.layer) {
            player.ygg.p_s_points = new Decimal(0)
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
        base = base.add(1).pow(0.5)
        return base.max(1)
    },
    effectDescription() {
        return "raising Soul Battery gain to ^" + format(tmp.p_s_mb.effect)
    },
    upgrades: {
        
    },
})