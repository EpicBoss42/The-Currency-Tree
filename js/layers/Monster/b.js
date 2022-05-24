addLayer("b", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        ancientoak: new Decimal(0),
        time : new Decimal(0),
    }},
    color: "#2bb818",                       // The color for this layer, which affects many elements.
    resource: "breeders",            // The name of this layer's main prestige resource.
    row: 3,                                 // The row this layer is on (0 is the first row).

    baseResource: "silver points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.si.points },  // A function to return the current amount of baseResource.
    branches: ['c', 'si'],
    requires: new Decimal(50),              // The amount of the base needed to  gain 1 of the prestige currency..
    base: new Decimal(150),
    canBuyMax() {
        return true
    },
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: new Decimal(1.1),                          // "normal" prestige gain is (currency^exponent).
    roundUpCost() {return true},
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)
        
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    hotkeys: [
        {key: "b", description: "B: Reset for Breeders", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.w.rpgKey}},
    ],
    aoGainExp() {
        let value = new Decimal(1)
        return value
    },
    aoGainMult() {
        let value = new Decimal(1)
        let extra = new Decimal(player.b.points)
        extra = extra.pow(0.25).add(1)
        if (hasUpgrade(this.layer, 23)) value = new Decimal(5)
        value = value.mul(extra)
        return value
    },
    aoBase() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        if (hasUpgrade('c', 32) || player[this.layer].unlocked) {return true}
        return "ghost"
    },
    update(diff) {
        player.b.time = player.b.time.add(diff)
        if(hasUpgrade('b', 14)) {
            player.b.ancientoak = player.b.ancientoak.add(tmp.b.aoBase.mul(tmp.b.aoGainMult).pow(tmp.b.aoGainExp).mul(diff))
        }
    },
    doReset(x) {
        if (x !== 'g' && x !== 'b' && x !== 'm' && x !== 'ba' && x !== 'bs') {
            layerDataReset(this.layer)
        }
    },
    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text", function() {
                    return "You have " + player.b.points + " Breeders."
                }],
                "blank",
                ["upgrades", '1'],
            ]
        },
        "Ancient Oak": {
            content: [
                "main-display",
                ["display-text", function() {
                    return "You have " + format(player.b.ancientoak) + " Ancient Oak."
                }],
                "blank",
                ["upgrades", '2'],
            ],
            unlocked() {
                if (hasUpgrade('b', 14)) return true
                return false
            }
        }
    }, 
    upgrades: {
        11: {
            title: "Baby Slime Breeder",
            description: "Automatically attempt to buy Baby Slimes",
            cost: new Decimal(1),
        },
        12: {
            title: "Juvenile Slime Breeder",
            description: "Automatically attempt to buy Juvenile Slimes",
            cost: new Decimal(2),
        },
        13: {
            title: "Adult Slime Breeder",
            description: "Automatically attempt to buy Adult Slimes",
            cost: new Decimal(3),
        },
        14: {
            title: "Roots of the Ancient Oak",
            description: "Begin growing Ancient Oak roots (1/sec)",
            cost: new Decimal(5),
        },
        21: {
            title: "Copper Bark",
            description: "Ancient Oak roots boost Copper Point gain",
            cost: new Decimal(50),
            currencyDisplayName: "Ancient Oak Roots",
            currencyInternalName: "ancientoak",
            currencyLayer: 'b',
            effect() {
                let value = new Decimal(player.b.ancientoak).add(1)
                value = value.log(3).pow(0.5)
                if (hasUpgrade(this.layer, 22)) value = value.mul(3)
                value = value.mul(2).add(1)
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        22: {
            title: "Copper Nodules",
            description: "Copper Bark is more effective",
            cost: new Decimal(100),
            currencyDisplayName: "Ancient Oak Roots",
            currencyInternalName: "ancientoak",
            currencyLayer: 'b',
        },
        23: {
            title: "Larger Seedlings",
            description: "Ancient Oak root gain is quintupled (x5)",
            cost: new Decimal(250),
            currencyDisplayName: "Ancient Oak Roots",
            currencyInternalName: "ancientoak",
            currencyLayer: 'b',
        },
        24: {
            title: "Hypnotic Patterning",
            description: "Slime and Trap copper point gain is more effective",
            cost: new Decimal(750),
            currencyDisplayName: "Ancient Oak Roots",
            currencyInternalName: "ancientoak",
            currencyLayer: 'b',
            effect() {
                let value = new Decimal(player.b.ancientoak).add(1)
                value = value.log(5).pow(0.4).add(1)
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        25: {
            title: "Structural Reinforcement",
            description: "Reinforce the Gate mechanism with Ancient Oak roots, allowing it to hold more weight.",
            cost: new Decimal(1500),
            currencyDisplayName: "Ancient Oak Roots",
            currencyInternalName: "ancientoak",
            currencyLayer: 'b',
            effect() {
                let value = new Decimal(player.b.ancientoak).add(1)
                value = value.log(6).pow(0.35).add(1).floor()
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + " levels" },
            unlocked() {
                if (getBuyableAmount('m', 12) > new Decimal(0)) {return true}
                return false
            },
        },
        26: {
            title: "Better Specialization",
            description: "Baby, Juvenile, and Adult slimes' respective autobuyers also buy red, blue, and yellow slimes.  These slimes don't require Adult Slimes anymore.",
            cost: new Decimal(5000),
            currencyDisplayName: "Ancient Oak Roots",
            currencyInternalName: "ancientoak",
            currencyLayer: 'b',
        },
        27: {
            title: "Slime Nodules",
            description: "Slime purchases don't change Slime Points",
            cost: new Decimal(10000),
            currencyDisplayName: "Ancient Oak Roots",
            currencyInternalName: "ancientoak",
            currencyLayer: 'b',
        },
    },
})
