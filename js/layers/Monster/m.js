addLayer("m", {
    startData() { return { 
        unlocked: false,
        points: new Decimal(0),
        total: new Decimal(0)
    }},

    color: "#8c8c8c",
    resource: "Mechanics",
    row: 3,
    branches: ['c', 'si'],

    baseResource: "silver points",
    baseAmount() { return player.si.points },

    requires: new Decimal(50),
    canBuyMax() {
        return true
    },
    type: "static",
    exponent: new Decimal(1.05),
    base: new Decimal(1000),
    roundUpCost() {return true},
    gainMult() {
        return new Decimal(1)
    },
    hotkeys: [
        {key: "m", description: "M: Reset for Mechanics", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.w.rpgKey}},
    ],
    gainExp() {
        return new Decimal(1)
    },
    doReset(x) {
        if (x !== 'g' && x !== 'b' && x !== 'm' && x !== 'ba' && x !== 'bs') {
            layerDataReset(this.layer)
        }
        if (x === this.layer) {
            player.w.copper = new Decimal(10)
        }
    },
    layerShown() {
        if (hasUpgrade('c', 31) || player[this.layer].unlocked) {return true}
        return "ghost"
    },
    milestones: {
        0: {
            requirementDescription: "1 Total Mechanic",
            effectDescription: "Keep the first two Silver milestones on resets",
            done() { return player[this.layer].total.gte(1) },
        },
        1: {
            requirementDescription: "2 Total Mechanics",
            effectDescription: "Keep the first four Silver milestones on resets",
            done() { return player[this.layer].total.gte(2) },
        },
        2: {
            requirementDescription: "5 Total Mechanics",
            effectDescription: "Gain 10% of your Slime Point gain on reset each second",
            done() { return player[this.layer].total.gte(5) },
        }
    },
    buyables: {
        11: {
            title: "Generic Spikes",
            cost(x) {
                let value = new Decimal(x)
                value = value.add(1).pow(3)
                return value
            },
            effect(x) {
                let value = new Decimal(x)
                value = value.add(1).log(5).add(1)
                if (hasUpgrade('b', 24)) value = value.mul(upgradeEffect('b', 24))
                if (hasUpgrade('m', 11)) value = value.mul(upgradeEffect('m', 11))
                return value
            },
            display() {
                return "Install spikes in your dungeon to slay unwary adventurers, increasing copper point gain by " + format(buyableEffect(this.layer, this.id)) + "x<br>The next one costs " + this.cost().round() + " mechanics." 
            },
            canAfford() {
                let cost = new Decimal(this.cost())
                return player[this.layer].points.gte(cost)
            },
            buy() {
                let cost = new Decimal(this.cost())
                let gain = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            }

        },
        12: {
            title: "Gate Mechanism",
            cost(x) {
                let value = new Decimal(x)
                value = value.pow(3).mul(2)
                return value
            },
            effect(x) {
                let value = new Decimal(x)
                return value
            },
            display() {
                return "Construct a gate mechanism to hold the Core.  The next one costs " + format(this.cost()) + " mechanics.<br>You have " + getBuyableAmount(this.layer, this.id) + "."
            },
            canAfford() {
                let cost = new Decimal(this.cost())
                return player[this.layer].points.gte(cost)
            },
            buy() {
                let cost = new Decimal(this.cost())
                let gain = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            }
        },
        13: {
            title: "False Floor",
            cost(x) {
                let cost = new Decimal(x).add(1)
                cost = cost.pow(5).mul(10)
                return cost
            },
            effect(x) {
                let value = new Decimal(x)
                value = value.pow(0.15).add(1)
                return value
            },
            display() {
                return "A false floor to injure some adventurers.  The next one costs " + format(this.cost()) + " metal.<br>These increase copper point gain by " + format(buyableEffect(this.layer, this.id)) + "x.<br>You have " + getBuyableAmount(this.layer, this.id) + "."
            },
            canAfford() {
                let cost = new Decimal(this.cost())
                return player.bs.metal.gte(cost)
            },
            buy() {
                let cost = new Decimal(this.cost())
                let gain = new Decimal(1)
                player.bs.metal = player.bs.metal.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            },
            unlocked() {
                if(hasUpgrade('m', 11)) return true
                return false
            },
        },
    },
    upgrades: {
        11: {
            canAfford() {
                if (hasUpgrade('a', 11) && hasUpgrade('bs', 11) && player[this.layer].points.gte(2) && player.bs.metal.gte(250)) return true
                return false
            },
            pay() {
                player[this.layer].points = player[this.layer].points.sub(2)
                player.bs.metal = player.bs.metal.sub(250)
            },
            fullDisplay() {
                return `
<h3>Advanced Traps</h3><br>
Use metal from your Blacksmiths to double your trap's effect, and unlock new traps.<br><br>
Cost: 2 Mechanics, 250 Metal`
            },
            effect() {
                let value = new Decimal(2)
                return value
            },
            unlocked() {
                if (hasUpgrade('a', 11)) return true
                return false
            },
        },
        12: {
            title: "Project Pit",
            description: "Begin digging a massive pit to serve as a base",
            cost: new Decimal(5),
            unlocked() {
                if (hasUpgrade('a', 11)) return true
                return false
            },
        },
    },
})
