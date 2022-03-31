addLayer("c", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},
    branches: ['s'],
    color: "#616161",                       // The color for this layer, which affects many elements.
    resource: "caves",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "copper points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(100),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.4,                          // "normal" prestige gain is (currency^exponent).
    hotkeys: [
        {key : "c", description: "C: Reset for Caves", onPress(){if (canReset(this.layer)) doReset(this.layer)}}
    ],
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let value = new Decimal(1)
        if (hasUpgrade('t', 12)) value = value.add(0.25)
        return value               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {
        if(player.s.points >= 5 || player[this.layer].unlocked) {return true}
        return "ghost"
    },          // Returns a bool for if this layer's node should be visible in the tree.
    doReset(x) {
        if (x !== 'c' && x !== 'bs' && x !== 'ba' && x !== 'si') {
            let keptUpgrades = []
            if (player.m.unlocked) keptUpgrades.push('31')
            if (player.b.unlocked) keptUpgrades.push('32')
            layerDataReset(this.layer)
            player[this.layer].upgrades = keptUpgrades
        }
    },
    upgrades: {
        11: {
            title: "More Living Space",
            description: "More caves allows your slimes to have a larger area to live in, increasing slime point production",
            cost: new Decimal(1),
            effect() {
                let value = player[this.layer].total
                value = value.add(0.9).log(3)
                return value.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"},
        },
        12: {
            title: "Small Dropshafts",
            description: "Add small holes in the ceiling that Baby and Juvenile slimes can wait in to drop on adventurers, increasing copper point gain by 45%.",
            cost: new Decimal(5),
            effect() {
                let value = new Decimal(1.45)
                return value
            }
        },
        13: {
            title: "Motivated Slimes",
            description: "Your current slime points boost your slimes' effectiveness",
            cost: new Decimal(10),
            effect() {
                let value = new Decimal(player.s.points)
                value = value.div(10).add(1).pow(0.15)
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        14: {
            title: "Dirt Road",
            description: "Use some copper points to maintain a dirt path to your dungeon, generating more copper points per second",
            cost: new Decimal(25),
            effect() {
                let value = player.points
                value = value.div(100).add(1).pow(0.1)
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        21: {
            title: "Monster Advertisements",
            description: "Advertise the benefits of living in your dungeon to attract twice as many slimes!",
            cost: new Decimal(100),
            effect() {
                let value = new Decimal(2)
                return value
            }
        },
        22: {
            title: "The Young Teaching The Young",
            description: "Baby and Juvenile Slimes teach each other effective hunting tactics, each one buffing the others by 10%",
            cost: new Decimal(250),
            effect() {
                let value = new Decimal(0)
                let base = new Decimal(0.1)
                value = value.add(getBuyableAmount('s', 11))
                value = value.add(getBuyableAmount('s', 12))
                base = base.mul(value)
                return new Decimal(1).add(base)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        31: {
            title: "Cave of the Mechanic",
            description: "Unlock a new 'Mechanic' layer, which can create traps to generate more copper points per second",
            cost: new Decimal(1000),
            unlocked() {
                if (hasMilestone('si', 3) || hasUpgrade(this.layer, this.id)) {return true}
                return false
            }
        },
        32: {
            title: "Cave of the Breeder",
            description: "Unlock a new 'Breeder' layer, which can automate gathering Slimes",
            cost: new Decimal(2500),
            unlocked() {
                if (hasMilestone('si', 3) || hasUpgrade(this.layer, this.id)) {return true}
                return false
            }
        },
    },
})

