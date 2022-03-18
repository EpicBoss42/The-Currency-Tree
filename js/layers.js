addLayer("s", {
    name: "slimepoints", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#B36D22",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "slime points", // Name of prestige currency
    baseResource: "copper points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Slime Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Baby Slime Unlock",
            description: "Unlock the Baby Slime monster for purchase!",
            cost: new Decimal(0),
        },
        12: {
            title: "Juvenile Slime Unlock",
            description: "Unlock the Juvenile Slime monster for purchase!",
            cost: new Decimal(5),
        },
        13: {
            title: "Adult Slime Unlock",
            description: "Unlock the Adult Slime monster for purchase!",
            cost: new Decimal(15),
        },
        21: {
            title: "Red Slime Unlock",
            description: "Unlock the ability to specialize Adult Slimes into Red Slimes",
            cost: new Decimal(25),
            unlocked() {
                if (hasUpgrade('si', 12)) {return true}
                return false
            },
        },
        22: {
            title: "Blue Slime Unlock",
            description: "Unlock the ability to specialize Adult Slimes into Blue Slimes",
            cost: new Decimal(50),
            unlocked() {
                if (hasUpgrade('si', 12)) {return true}
                return false
            },
        },
        23: {
            title: "Yellow Slime Unlock",
            description: "Unlock the ability to specialize Adult Slimes into Yellow Slimes",
            cost: new Decimal(75),
            unlocked() {
                if (hasUpgrade('si', 12)) {return true}
                return false
            },
        },
    },
    buyables: {
        11: {
            title: "Baby Slime",
            cost(x) { return new Decimal(x).add(1).pow(2).floor() },
            effect(x) {
                let value = new Decimal(x)
                if (hasUpgrade('si', 11)) value = value.mul(2)
                if (hasUpgrade('s', 21)) value = value.mul(buyableEffect('s', 21))
                return value
            },
            display() { 
            return `A Baby Slime to slay an adventurer and generate ` + buyableEffect(this.layer, this.id).div(getBuyableAmount(this.layer, this.id)) + ` copper point per second.<br>
            You own ` + getBuyableAmount(this.layer, this.id) + ` Baby Slimes! <br>
            The next one costs ` + this.cost() + ` slime points.<br>
            Overall, your Baby Slimes are generating ` + buyableEffect(this.layer, this.id) + " copper points per second."
            },
            unlocked() {
                if (hasUpgrade('s', 11)) {return true}
                return false
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            
        },
        12: {
            title: "Juvenile Slime",
            cost(x) { return new Decimal(x).add(1).pow(2.1).mul(5).floor() },
            effect(x) {
                let value = new Decimal(x)
                value = value.mul(5)
                if (hasUpgrade('s', 22)) value = value.mul(buyableEffect('s', 22))
                return value
            },
            display() {
                return `A Juvenile Slime to slay more adventurers and generate ` + buyableEffect(this.layer, this.id).div(getBuyableAmount(this.layer, this.id)) + ` copper points per second.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Juvenile Slimes! <br>
                The next one costs ` + this.cost() + ` slime points.<br>
                Overall, your Juvenile Slimes are generating ` + buyableEffect(this.layer, this.id) + " copper points per second."                
            },
            unlocked() {
                if (hasUpgrade('s', 12)) {return true}
                return false
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            }
        },
        13: {
            title: "Adult Slime",
            cost(x) { return new Decimal(x).add(1).pow(2.5).mul(10).floor() },
            effect(x) {
                let value = new Decimal(x)
                value = value.mul(25)
                if (hasUpgrade('s', 23)) value = value.mul(buyableEffect('s', 23))
                return value
            },
            display() {
                return `An Adult Slime to slay adventurers quickly, generating ` + buyableEffect(this.layer, this.id).div(getBuyableAmount(this.layer, this.id)) + ` copper points per second.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Adult Slimes!<br>
                The next one costs ` + this.cost() + ` slime points.<br>
                Overall, your Adult Slimes are generating ` + buyableEffect(this.layer, this.id) + " copper points per second."
            },
            unlocked() {
                if (hasUpgrade('s', 13)) {return true}
                return false
            },
            canAfford() {return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        21: {
            title: "Red Slime",
            cost(x) { return new Decimal(x).add(2).pow(3.1).mul(5).floor() },
            effect(x) {
                return new Decimal(x).add(1).pow(0.5)
            },
            display() {
                return `A Red Slime to increase the effect of your Baby Slimes.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Red Slimes!<br>
                The next one costs ` + this.cost() + ` slime points and one Adult Slime.<br>
                Your Red Slimes are providing a ` + buyableEffect(this.layer, this.id) + "x boost to the Baby Slime's production"
            },
            unlocked() {
                if (hasUpgrade('s', 21)) {return true}
                return false
            },
            canAfford() {return player[this.layer].points.gte(this.cost()) && getBuyableAmount('s', 13).gte(1) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, '13', getBuyableAmount(this.layer, '13').sub(1))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            }
        },
        22: {
            title: "Blue Slime",
            cost(x) { return new Decimal(x).add(2).pow(3.1).mul(6).floor() },
            effect(x) {
                return new Decimal(x).add(1).pow(0.4)
            },
            display() {
                return `A Blue Slime to increase the effect of your Juvenile Slimes.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Blue Slimes!<br>
                The next one costs ` + this.cost() + ` slime points and one Adult Slime.<br>
                Your Blue Slimes are providing a ` + buyableEffect(this.layer, this.id) + "x boost to the Juvenile Slime's production"
            },
            unlocked() {
                if (hasUpgrade('s', 22)) {return true}
                return false
            },
            canAfford() {return player[this.layer].points.gte(this.cost()) && getBuyableAmount('s', 13).gte(1) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, '13', getBuyableAmount(this.layer, '13').sub(1))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            }
        },
        23: {
            title: "Yellow Slime",
            cost(x) { return new Decimal(x).add(2).pow(3.1).mul(7).floor() },
            effect(x) {
                return new Decimal(x).add(1).pow(0.25)
            },
            display() {
                return `A Red Slime to increase the effect of your Adult Slimes.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Yellow Slimes!<br>
                The next one costs ` + this.cost() + ` slime points and one Adult Slime.<br>
                Your Yellow Slimes are providing a ` + buyableEffect(this.layer, this.id) + "x boost to the Adult Slime's production"
            },
            unlocked() {
                if (hasUpgrade('s', 23)) {return true}
                return false
            },
            canAfford() {return player[this.layer].points.gte(this.cost()) && getBuyableAmount('s', 13).gte(1) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, '13', getBuyableAmount(this.layer, '13').sub(1))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            }
        },
    }
})

addLayer("si", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        total: new Decimal(0.1),

    }},

    color: "#909090",                       // The color for this layer, which affects many elements.
    resource: "silver points",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "copper points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(100),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.4,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {
        if(player.s.points > 9 || player.si.best > 0) {return true}
        return "ghost"
    },          // Returns a bool for if this layer's node should be visible in the tree.
    branches: ['s'],
    upgrades: {
        11: {
            title: "Baby Slime Upgrade",
            description: "Upgrade your Baby Slimes to make them twice as effective at generating money!",
            cost: new Decimal(1),
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
                return player[this.layer].points.add(1).log(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"},
        },
    },
})
