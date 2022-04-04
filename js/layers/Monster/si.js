
addLayer("si", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.

    }},
    hotkeys: [
        {key: "S", description: "Shift + S: Reset for Silver Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    color: "#909090",                       // The color for this layer, which affects many elements.
    resource: "silver points",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "copper points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.w.copper },  // A function to return the current amount of baseResource.

    requires: new Decimal(100),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.4,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {           
        let mult = new Decimal(1)
        if (hasUpgrade(this.layer, 22)) mult = mult.mul(upgradeEffect(this.layer, 22))
        return mult           // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {
        if(player.s.points >= 5 || player[this.layer].unlocked) {return true}
        return "ghost"
    },          // Returns a bool for if this layer's node should be visible in the tree.
    branches: ['s'],
    doReset(x) {
            if (x !== 'si' && x !== 'ba' && x !== 'bs' && x !== 'c') {
                let keptUpgrades = []
                let keptMilestones = []
                if (hasMilestone('m', 0)) {
                    keptMilestones.push('0')
                    keptMilestones.push('1')
                    keptUpgrades.push('12')
                }
                if (hasMilestone('m', 1)) {
                    keptMilestones.push('2')
                    keptMilestones.push('3')
                    keptUpgrades.push('24')
                }
                if (player.g.unlocked) keptMilestones.push('5')
                layerDataReset(this.layer)
                player[this.layer].upgrades = keptUpgrades
                player[this.layer].milestones = keptMilestones
            }
    },
    milestones: {
        0: {
            requirementDescription: "1000 Silver Points",
            effectDescription: "Retain the first three Slime Upgrades on Reset",
            done() { return player[this.layer].points.gte(1000) },
            unlocked() { return hasUpgrade('s', 41) },
        },
        1: {
            requirementDescription: "2500 Silver Points",
            effectDescription: "Retain the first six Slime Upgrades on Reset",
            done() { return player[this.layer].points.gte(2500) },
            unlocked() { return hasUpgrade('s', 41) },
        },
        2: {
            requirementDescription: "5000 Silver Points",
            effectDescription: "Retain the first nine Slime Upgrades on Reset",
            done() { return player[this.layer].points.gte(5000) },
            unlocked() { return hasUpgrade('s', 41) },
        },
        3: {
            requirementDescription: "10000 Silver Points",
            effectDescription: "Unlock new Cave Upgrades",
            done() { return player[this.layer].points.gte(10000) },
            unlocked() { return hasUpgrade('s', 41)}
        },
        4: {
            requirementDescription: "25000 Silver Points",
            effectDescription: "Unlock Gold Points",
            done() { return player[this.layer].points.gte(25000) },
            unlocked() { return hasUpgrade('c', 31) && hasUpgrade('c', 32)}
        }
    },
    upgrades: {
        11: {
            title: "Baby Slime Upgrade",
            description: "Upgrade your Baby Slimes to make them twice as effective at generating money!",
            cost: new Decimal(1),
            effect() {
                let value = new Decimal(2)
                return value
            }
        },
        12: {
            title: "Colored Slimes",
            description: "Unlock Red, Blue, and Yellow Slimes",
            cost: new Decimal(5),
        },
        13: {
            title: "Posters",
            description: "Attract more adventurers by purchasing advertising posters, increasing copper point gain based on silver points.",
            cost: new Decimal(10),
            effect() {
                let value = new Decimal(player[this.layer].points)
                if (value < 2) { value = value.div(2).add(1)}
                return value.log(2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"},
        },
        14: {
            title: "Slime Food",
            description: "Using your money, you purchase a device that helps you gain Slime Points 25% faster",
            cost: new Decimal(25),
            effect() {
                let value = new Decimal(1.25)
                return value
            }
        },
        21: {
            title: "Triangular Slimes",
            description: "By having your slimes take on the appearance of pyramids, they square their copper point gain",
            cost: new Decimal(125),
            effect() {
                let value = new Decimal(2)
                return value
            }
        },
        22: {
            title: "Better Exchange Rates",
            description: "Better exchange rates allow you to gain 15% more Silver Points",
            cost: new Decimal(150),
            effect() {
                let value = new Decimal(1.15)
                return value
            }
        },
        23: {
            title: "Elderly Slime Mentor Program",
            description: "Your Adult Slimes boost your Baby Slime production.",
            cost: new Decimal(250),
            effect() {
                let value = getBuyableAmount('s', 13).add(1).pow(0.5)
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        24: {
            title: "Slime Biology",
            description: "Utilize your knowledge of slimes to unlock a third row of Slime upgrades",
            cost: new Decimal(500),
        }
    },
})

