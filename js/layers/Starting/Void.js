addLayer("v", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#2C2C2C",
    resource: "Void Essence",
    row: 2,
    baseResource: "Elemental Essence",
    baseAmount() { return player.e.points },
    requires: new Decimal(100),
    type: "normal",
    exponent: 0.25,
    gainMult() {
        let value = new Decimal(1)
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        if (player.e.points >= 100) return true
        return true
    },    
    doReset(x) {
        if (x === this.layer) {
            player.w.tpoints = new Decimal(0)
        }
    },
    effect() {
        let value = new Decimal(1)
        value = value.mul(player[this.layer].points.add(1))
        return value
    },
    effectDescription() {
        return "which are multiplying point generation by " + format(tmp.v.effect) + "x."
    },
    upgrades: {
        
    },
})
