addLayer("g", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#fccf03",                       // The color for this layer, which affects many elements.
    resource: "gold points",            // The name of this layer's main prestige resource.
    row: 3,                                 // The row this layer is on (0 is the first row).

    baseResource: "silver points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.si.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(100),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.25,                          // "normal" prestige gain is (currency^exponent).
    branches: ['c', 'si'],
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    hotkeys: [
        {key: "g", description: "G: Reset for Gold Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.w.rpgKey}},
    ],

    layerShown() { 
        if(hasMilestone('si', 4) || player[this.layer].unlocked == true) {return true}
        return "ghost"
     },          // Returns a bool for if this layer's node should be visible in the tree.
    doReset(x) {
        if (x !== 'g' && x !== 'b' && x !== 'm' && x !== 'ba' && x !== 'bs') {
            layerDataReset(this.layer)
        }
        if (x === this.layer) {
            player.w.copper = new Decimal(10)
        }
    },
    buyables: {
        11: {
            title: "The Core",
            cost(x) {
                let value = new Decimal(x).add(2)
                value = value.pow(4)
                return value
            },
            buy() {
                let value = new Decimal(1)
                let cost = new Decimal(this.cost)
                player[this.layer].points = player[this.layer].points.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(value))
            },
            canAfford() {
                let requirement = new Decimal(getBuyableAmount('m', 12))
                if (hasUpgrade('b', 25)) requirement = requirement.add(upgradeEffect('b', 25))
                if (getBuyableAmount(this.layer, this.id) >= requirement) {return false}
                let cost = new Decimal(this.cost())
                return player[this.layer].points.gte(cost)
            },
            display() {
                return "Construct the Core, a massive golden centerpiece in the Gate.  The next size up costs " + this.cost() + " gold points.<br> You have " + getBuyableAmount(this.layer, this.id) + "."
            },
            effect(x) {
                let value = new Decimal(x).add(1)
                return value
            },
        }
            
    },
    upgrades: {
        11: {
            title: "Unlock The Core",
            description: function () {
                let desc = "square"
                if (hasUpgrade('a', 11)) desc = "double"
                return "Unlock the Core buyable, then " + desc + " copper point gain."
            },
            cost: new Decimal(1),
            effect() {
                let value = new Decimal(2)
                return value
            },
            unlocked() {
                if (getBuyableAmount('m', 12) > new Decimal(0)) {return true}
                return false
            },
        }
    },
})
