addLayer("ae", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
        }
    },
    color: "#26A444",
    resource: "Aether Essence",
    row: 2,
    baseResource: "Elemental Essence",
    baseAmount() { return player.e.points },
    requires: new Decimal(100),
    type: "normal",
    exponent: 0.25,
    hotkeys: [
        {key: "a", description: "A: Reset for Aether Essence", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.w.realKey}},
    ],
    gainMult() {
        let value = new Decimal(1)
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        if (hasUpgrade('m', 12)) return true
        return true
    },    
    doReset(x) {
        if (x === this.layer) {
            player.w.tpoints = new Decimal(0)
        }
    },
    upgrades: {
        11: {
            title: "Stronger Seperation",
            description: "Best Aether Essence boosts each elemental essence's base gain",
            cost: new Decimal(1),
            effect() {
                let value = new Decimal(player[this.layer].best)
                value = value.add(1).log(5)
                return value
            },
            effectDisplay() {
                return "+" + format(upgradeEffect(this.layer, this.id))
            }
        },
        12: {
            title: "STRONGER Seperation",
            description: "The previous upgrade also boosts each elemental essence's base exponent",
            cost: new Decimal(5),
        }
    },
})
