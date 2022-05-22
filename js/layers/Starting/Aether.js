addLayer("ae", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
        }
    },
    color: "#FFFFFF",
    resource: "Aether Essence",
    row: 2,
    branches: ['e'],
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
            description: "Aether Essence boosts each elemental essence's base gain",
            cost: new Decimal(1),
            effect() {
                let value = new Decimal(player[this.layer].points)
                if (value > 0) {
                value = value.log(5)
                if (inChallenge('v', 12)) return new Decimal(0)
                return value
                }
            },
            effectDisplay() {
                return "+" + format(upgradeEffect(this.layer, this.id))
            }
        },
        21: {
            title: "STRONGER Seperation",
            description: "The first upgrade also boosts each elemental essence's base exponent",
            cost: new Decimal(50),
        },
        12: {
            title: "Aetheric Resonance",
            description: "Aether Essence increases base point gain",
            cost: new Decimal(5),
            effect() {
                let value = new Decimal(player[this.layer].points)
                value = value.add(1).log(6).div(2)
                if (inChallenge('v', 12)) return new Decimal(0)
                return value.add(1)
            },
            effectDisplay() {
                return "+" + format(upgradeEffect(this.layer, this.id))
            }
        }
    },
})
