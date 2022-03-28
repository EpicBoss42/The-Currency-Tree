addLayer("s", {
    name: "slimepoints", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
        if (hasUpgrade('si', 14)) mult = mult.mul(upgradeEffect('si', 14))
        if (hasUpgrade('c', 11)) mult = mult.mul(upgradeEffect('c', 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        if (hasMilestone('m', 2)) { return new Decimal(0.1) }
        return new Decimal(0)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Slime Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    doReset(x) {
        if (x === 'si' || x === 'c' || x === 'm' || x === 'g' || x === 'b') {
            let keptUpgrades = []
            if (hasMilestone('si', 0)) {
                keptUpgrades.push('11')
                keptUpgrades.push('12')
                keptUpgrades.push('13')
            } 
            if (hasMilestone('si', 1)) {
                keptUpgrades.push('21')
                keptUpgrades.push('22')
                keptUpgrades.push('23')
            }
            if (hasMilestone('si', 2)) {
                keptUpgrades.push('31')
                keptUpgrades.push('32')
                keptUpgrades.push('33')
            }
            if (hasUpgrade('s', 41)) { keptUpgrades.push('41')}
            layerDataReset("s")
            player[this.layer].upgrades = keptUpgrades
        }
    },
    automate() {
        if (hasUpgrade('b', 11) && hasUpgrade(this.layer, 11)) {
            let cost = new Decimal(getBuyableAmount(this.layer, 11))
            let amount = new Decimal(1)
            if (hasUpgrade('c', 21)) { amount = amount.mul(2) }
            if (hasUpgrade('c', 21)) { cost = cost.div(2) }
            cost = cost.add(1).pow(2).floor()
            if (player[this.layer].points.gte(cost)) {
                setBuyableAmount(this.layer, 11, getBuyableAmount(this.layer, 11).add(amount))
                player[this.layer].points = player[this.layer].points.sub(cost)
            }
        }
        if (hasUpgrade('b', 12) && hasUpgrade(this.layer, 12)) {
            let cost = new Decimal(getBuyableAmount(this.layer, 12))
            let amount = new Decimal(1)
            if (hasUpgrade('c', 21)) { amount = amount.mul(2) }
            if (hasUpgrade('c', 21)) { cost = cost.div(2) }
            cost = cost.add(1).pow(2.1).mul(5).floor()
            if (player[this.layer].points.gte(cost)) {
                setBuyableAmount(this.layer, 12, getBuyableAmount(this.layer, 12).add(amount))
                player[this.layer].points = player[this.layer].points.sub(cost)
            }
        }
        if (hasUpgrade('b', 13) && hasUpgrade(this.layer, 13)) {
            let cost = new Decimal(getBuyableAmount(this.layer, 13))
            let amount = new Decimal(1)
            if (hasUpgrade('c', 21)) { amount = amount.mul(2) }
            if (hasUpgrade('c', 21)) { cost = cost.div(2) }
            cost = cost.add(1).pow(2.5).mul(10).floor()
            if (player[this.layer].points.gte(cost)) {
                setBuyableAmount(this.layer, 13, getBuyableAmount(this.layer, 13).add(amount))
                player[this.layer].points = player[this.layer].points.sub(cost)
            }
        }
    },
    globalSlimeMult() {
        let value = new Decimal(1)
        if (hasUpgrade('b', 24)) value = value.mul(upgradeEffect('b', 24))
        return value
    },
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
        31: {
            title: "Baby Horde",
            description: "Teach your Baby Slimes how to attack all at once, increasing Baby Slime effectiveness based on how many Baby Slimes you own",
            cost: new Decimal(5000),
            unlocked() {
                if (hasUpgrade('si', 24) && hasUpgrade('s', 11)) {return true}
                return false
            },
            effect() {
                let value = new Decimal(getBuyableAmount(this.layer, 11)).add(1).log(4).add(1)
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        32: {
            title: "Juvenile Delinquency",
            description: "Encourage your Juvenile Slimes to become more aggressive, allowing them to earn 125% more copper points per second",
            cost: new Decimal(10000),
            unlocked() {
                if (hasUpgrade('si', 24) && hasUpgrade('s', 12)) {return true}
                return false
            },
            effect() {
                let value = new Decimal(2.25)
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        33: {
            title: "Adult Support",
            description: "Your adult slimes help your Red, Blue, and Yellow slimes, increasing their buff by 25% for each Adult Slime",
            cost: new Decimal(25000),
            unlocked() {
                if (hasUpgrade('si', 24) && hasUpgrade('s', 13)) {return true}
                return false
            },
            effect() {
                let value = new Decimal(1)
                let value2 = new Decimal(0.25).mul(getBuyableAmount('s', 13))
                value = value.add(value2)
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        41: {
            title: "Join the League of Silver",
            description: "By purchasng a membership for the League of Silver, you can unlock milestones for Silver Points.",
            cost: new Decimal(100000),
            unlocked() {
                if (hasUpgrade('s', 31) && hasUpgrade('s', 32) && hasUpgrade('s', 33)) {return true}
                return false
            },
        }
    },
    buyables: {
        11: {
            title: "Baby Slime",
            cost(x) { 
                let amount = new Decimal(x)
                if (hasUpgrade('c', 21)) amount = amount.div(2)
                return amount.add(1).pow(2).floor() 
            },
            effect(x) {
                let individualValue = new Decimal(1)
                if (hasUpgrade('si', 11)) individualValue = individualValue.mul(upgradeEffect('si', 11))
                if (hasUpgrade('s', 21)) individualValue = individualValue.mul(buyableEffect('s', 21))
                if (hasUpgrade('si', 21)) individualValue = individualValue.pow(upgradeEffect('si', 21))
                if (hasUpgrade('c', 12)) individualValue = individualValue.mul(upgradeEffect('c', 12))
                if (hasUpgrade('c', 13)) individualValue = individualValue.mul(upgradeEffect('c', 13))
                if (hasUpgrade('s', 31)) individualValue = individualValue.mul(upgradeEffect('s', 31))
                if (hasUpgrade('c', 22)) individualValue = individualValue.mul(upgradeEffect('c', 21))
                individualValue = individualValue.mul(tmp.s.globalSlimeMult)
                let value = individualValue.mul(x)
                return value
            },
            display() { 
            return `A Baby Slime to slay an adventurer and generate ` + buyableEffect(this.layer, this.id).div(getBuyableAmount(this.layer, this.id)).round() + ` copper points per second.<br>
            You own ` + getBuyableAmount(this.layer, this.id) + ` Baby Slimes! <br>
            The next one costs ` + this.cost() + ` slime points.<br>
            Overall, your Baby Slimes are generating ` + buyableEffect(this.layer, this.id).round() + " copper points per second."
            },
            unlocked() {
                if (hasUpgrade('s', 11)) {return true}
                return false
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                let gain = new Decimal(1)
                if (hasUpgrade('c', 21)) gain = gain.mul(upgradeEffect('c', 21))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            },
            
        },
        12: {
            title: "Juvenile Slime",
            cost(x) { 
                let amount = new Decimal(x)
                if (hasUpgrade('c', 21)) amount = amount.div(2)
                return amount.add(1).pow(2.1).mul(5).floor() 
            },
            effect(x) {
                let individualValue = new Decimal(5)
                if (hasUpgrade('s', 22)) individualValue = individualValue.mul(buyableEffect('s', 22))
                if (hasUpgrade('si', 21)) individualValue = individualValue.pow(upgradeEffect('si', 21))
                if (hasUpgrade('c', 12)) individualValue = individualValue.mul(upgradeEffect('c', 12))
                if (hasUpgrade('c', 13)) individualValue = individualValue.mul(upgradeEffect('c', 13))
                if (hasUpgrade('s', 32)) individualValue = individualValue.mul(upgradeEffect('s', 32))
                if (hasUpgrade('c', 22)) individualValue = individualValue.mul(upgradeEffect('c', 21))
                individualValue = individualValue.mul(tmp.s.globalSlimeMult)
                let value = individualValue.mul(x)
                return value
            },
            display() {
                return `A Juvenile Slime to slay more adventurers and generate ` + buyableEffect(this.layer, this.id).div(getBuyableAmount(this.layer, this.id)).round() + ` copper points per second.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Juvenile Slimes! <br>
                The next one costs ` + this.cost() + ` slime points.<br>
                Overall, your Juvenile Slimes are generating ` + buyableEffect(this.layer, this.id).round() + " copper points per second."                
            },
            unlocked() {
                if (hasUpgrade('s', 12)) {return true}
                return false
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                let gain = new Decimal(1)
                if (hasUpgrade('c', 21)) gain = gain.mul(upgradeEffect('c', 21))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            }
        },
        13: {
            title: "Adult Slime",
            cost(x) { 
                let amount = new Decimal(x)
                if (hasUpgrade('c', 21)) amount = amount.div(2)
                return amount.add(1).pow(2.5).mul(10).floor() 
            },
            effect(x) {
                let individualValue = new Decimal(25)
                if (hasUpgrade('s', 23)) individualValue = individualValue.mul(buyableEffect('s', 23))
                if (hasUpgrade('si', 21)) individualValue = individualValue.pow(upgradeEffect('si', 21))
                if (hasUpgrade('c', 13)) individualValue = individualValue.mul(upgradeEffect('c', 13))
                individualValue = individualValue.mul(tmp.s.globalSlimeMult)
                let value = individualValue.mul(x)
                return value
            },
            display() {
                return `An Adult Slime to slay adventurers quickly, generating ` + buyableEffect(this.layer, this.id).div(getBuyableAmount(this.layer, this.id)).round() + ` copper points per second.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Adult Slimes!<br>
                The next one costs ` + this.cost() + ` slime points.<br>
                Overall, your Adult Slimes are generating ` + buyableEffect(this.layer, this.id).round() + " copper points per second."
            },
            unlocked() {
                if (hasUpgrade('s', 13)) {return true}
                return false
            },
            canAfford() {return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                let gain = new Decimal(1)
                if (hasUpgrade('c', 21)) gain = gain.mul(upgradeEffect('c', 21))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            },
        },
        21: {
            title: "Red Slime",
            cost(x) { 
                let amount = new Decimal(x)
                if (hasUpgrade('c', 21)) amount = amount.div(2)
                return amount.add(2).pow(3.1).mul(5).floor() 
            },
            effect(x) {
                let value = new Decimal(x).add(1).pow(0.5)
                if (hasUpgrade(this.layer, 33)) value = value.mul(upgradeEffect(this.layer, 33))
                return value
            },
            display() {
                return `A Red Slime to increase the effect of your Baby Slimes.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Red Slimes!<br>
                The next one costs ` + this.cost() + ` slime points and one Adult Slime.<br>
                Your Red Slimes are providing a ` + format(buyableEffect(this.layer, this.id)) + "x boost to the Baby Slime's production"
            },
            unlocked() {
                if (hasUpgrade('s', 21)) {return true}
                return false
            },
            canAfford() {return player[this.layer].points.gte(this.cost()) && getBuyableAmount('s', 13).gte(1) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                let gain = new Decimal(1)
                if (hasUpgrade('c', 21)) gain = gain.mul(upgradeEffect('c', 21))
                setBuyableAmount(this.layer, '13', getBuyableAmount(this.layer, '13').sub(gain))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            }
        },
        22: {
            title: "Blue Slime",
            cost(x) { 
                let amount = new Decimal(x)
                if (hasUpgrade('c', 21)) amount = amount.div(2)
                return amount.add(2).pow(3.1).mul(6).floor() 
            },
            effect(x) {
                let value = new Decimal(x).add(1).pow(0.4)
                if (hasUpgrade(this.layer, 33)) value = value.mul(upgradeEffect(this.layer, 33))
                return value
            },
            display() {
                return `A Blue Slime to increase the effect of your Juvenile Slimes.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Blue Slimes!<br>
                The next one costs ` + this.cost() + ` slime points and one Adult Slime.<br>
                Your Blue Slimes are providing a ` + format(buyableEffect(this.layer, this.id)) + "x boost to the Juvenile Slime's production"
            },
            unlocked() {
                if (hasUpgrade('s', 22)) {return true}
                return false
            },
            canAfford() {return player[this.layer].points.gte(this.cost()) && getBuyableAmount('s', 13).gte(1) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                let gain = new Decimal(1)
                if (hasUpgrade('c', 21)) gain = gain.mul(upgradeEffect('c', 21))
                setBuyableAmount(this.layer, '13', getBuyableAmount(this.layer, '13').sub(gain))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            }
        },
        23: {
            title: "Yellow Slime",
            cost(x) { 
                let amount = new Decimal(x)
                if (hasUpgrade('c', 21)) amount = amount.div(2)
                return amount.add(2).pow(3.1).mul(7).floor() 
            },
            effect(x) {
                let value = new Decimal(x).add(1).pow(0.25)
                if (hasUpgrade(this.layer, 33)) value = value.mul(upgradeEffect(this.layer, 33))
                return value
            },
            display() {
                return `A Red Slime to increase the effect of your Adult Slimes.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Yellow Slimes!<br>
                The next one costs ` + this.cost() + ` slime points and one Adult Slime.<br>
                Your Yellow Slimes are providing a ` + format(buyableEffect(this.layer, this.id)) + "x boost to the Adult Slime's production"
            },
            unlocked() {
                if (hasUpgrade('s', 23)) {return true}
                return false
            },
            canAfford() {return player[this.layer].points.gte(this.cost()) && getBuyableAmount('s', 13).gte(1) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                let gain = new Decimal(1)
                if (hasUpgrade('c', 21)) gain = gain.mul(upgradeEffect('c', 21))
                setBuyableAmount(this.layer, '13', getBuyableAmount(this.layer, '13').sub(gain))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
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
    hotkeys: [
        {key: "S", description: "Shift + S: Reset for Silver Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    color: "#909090",                       // The color for this layer, which affects many elements.
    resource: "silver points",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "copper points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

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
        if (x === 'm' || x === 'g' || x === 'b') {
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
            
            if (hasUpgrade('a', 11)) {layerDataReset(this.layer, ["upgrades", "total", "milestones"])} else {
                layerDataReset(this.layer)
                player[this.layer].upgrades = keptUpgrades
                player[this.layer].milestones = keptMilestones
            }
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

addLayer("c", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        total: new Decimal(0.1),
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
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {
        if(player.s.points >= 5 || player[this.layer].unlocked) {return true}
        return "ghost"
    },          // Returns a bool for if this layer's node should be visible in the tree.
    doReset(x) {
        if (x === 'm' || x === 'g' || x === 'b') {
            let keptUpgrades = []
            if (player.m.unlocked) keptUpgrades.push('31')
            if (player.b.unlocked) keptUpgrades.push('32')
            if (hasUpgrade('a', 11)) {layerDataReset(this.layer, ["upgrades", "total"])} else {
            layerDataReset(this.layer)
            player[this.layer].upgrades = keptUpgrades
            }
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
                if (hasMilestone('si', 3)) {return true}
                return false
            }
        },
        32: {
            title: "Cave of the Breeder",
            description: "Unlock a new 'Breeder' layer, which can automate gathering Slimes",
            cost: new Decimal(2500),
            unlocked() {
                if (hasMilestone('si', 3)) {return true}
                return false
            }
        },
    },
})

addLayer("g", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#fccf03",                       // The color for this layer, which affects many elements.
    resource: "gold points",            // The name of this layer's main prestige resource.
    row: 4,                                 // The row this layer is on (0 is the first row).

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
        {key: "g", description: "G: Reset for Gold Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown() { 
        if(hasMilestone('si', 4) || player[this.layer].unlocked == true) {return true}
        return "ghost"
     },          // Returns a bool for if this layer's node should be visible in the tree.

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
                let value = new Decimal(x)
                return value
            },
        }
            
    },
    upgrades: {
        11: {
            title: "Unlock The Core",
            description: "Unlock the Core buyable, then square copper point gain",
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

addLayer("m", {
    startData() { return { 
        unlocked: false,
        points: new Decimal(0),
        total: new Decimal(0)
    }},

    color: "#8c8c8c",
    resource: "Mechanics",
    row: 4,
    branches: ['c', 'si'],

    baseResource: "silver points",
    baseAmount() { return player.si.points },

    requires: new Decimal(50),

    type: "static",
    exponent: new Decimal(1.05),
    base: new Decimal(1000),
    roundUpCost() {return true},
    gainMult() {
        return new Decimal(1)
    },
    hotkeys: [
        {key: "m", description: "M: Reset for Mechanics", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    gainExp() {
        return new Decimal(1)
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
                return "Construct a gate mechanism to hold the Core.  The next one costs " + this.cost() + " mechanics.<br>You have " + getBuyableAmount(this.layer, this.id) + "."
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
        }
    },
    upgrades: {
        
    },
})

addLayer("b", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        ancientoak: new Decimal(0),
        time : new Decimal(0),
    }},
    color: "#2bb818",                       // The color for this layer, which affects many elements.
    resource: "breeders",            // The name of this layer's main prestige resource.
    row: 4,                                 // The row this layer is on (0 is the first row).

    baseResource: "silver points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.si.points },  // A function to return the current amount of baseResource.
    branches: ['c', 'si'],
    requires: new Decimal(50),              // The amount of the base needed to  gain 1 of the prestige currency..
    base: new Decimal(1500),
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
        {key: "b", description: "B: Reset for Breeders", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    aoGainExp() {
        let value = new Decimal(1)
        return value
    },
    aoGainMult() {
        let value = new Decimal(1)
        if (hasUpgrade(this.layer, 23)) value = new Decimal(5)
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
                    return "You have " + player.b.ancientoak.round() + " Ancient Oak."
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
            description: "Modify your Ancient Oak roots to have copper bark, increasing your copper point generation based on your Ancient Oak roots.",
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
            description: "Modify your Ancient Oak roots further to grow Copper nodules, increasing the previous upgrade's effect.",
            cost: new Decimal(100),
            currencyDisplayName: "Ancient Oak Roots",
            currencyInternalName: "ancientoak",
            currencyLayer: 'b',
        },
        23: {
            title: "Larger Seedlings",
            description: "Using larger seedlings, you are able to quintuple (x5) Ancient Oak root gain.",
            cost: new Decimal(250),
            currencyDisplayName: "Ancient Oak Roots",
            currencyInternalName: "ancientoak",
            currencyLayer: 'b',
        },
        24: {
            title: "Hypnotic Patterning",
            description: "By encouraging growth of a strange pattern on your Ancient Oak roots, you can stun adventurers to increase Slime and Trap copper point gain.",
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
    },
})

addLayer("a", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        energy: new Decimal(0),
        time: new Decimal(0),
    }},

    color: "#e8e8e8",                       // The color for this layer, which affects many elements.
    resource: "Ascensions",            // The name of this layer's main prestige resource.
    row: 4,                  
    baseAmount() {return player.points},
    baseResource: "Copper Points",
    requires: new Decimal(1),
    exponent: new Decimal(1),
    type: "normal",
    prestigeButtonText() {
        let current = new Decimal(player[this.layer].points)
        let buttonText = "Placeholder Text"
        if (current == 0) { buttonText = "The next ascension requires 2 levels of the Core, 2 levels of the Gate mechanism, and 1e25 Copper Points."}
        return buttonText
    },
    getResetGain() {
        let current = new Decimal(player[this.layer].points)
        if (current == 0) {
            if(getBuyableAmount('m', 12) > 1 && getBuyableAmount('g', 11) > 1 && hasUpgrade('b', 25) && player.points > new Decimal(1e25)) return new Decimal(1)
        }
        return new Decimal(0)
    },
    canReset() {
        let current = new Decimal(player[this.layer].points)
        if (current == 0) if(getBuyableAmount('m', 12) > 1 && getBuyableAmount('g', 11) > 1 && hasUpgrade('b', 25) && player.points > new Decimal(1e25)) return true
        return false
    },
    
    layerShown() {
        if (player[this.layer].unlocked) return true
        if(getBuyableAmount('m', 12) > 1 && getBuyableAmount('g', 11) > 1 && hasUpgrade('b', 25) && player.points > new Decimal(1e25)) return true
        return false 
    },
    enGainBase() {
        let value = new Decimal(1)
        return value
    },
    enGainMult() {
        let value = new Decimal(1)
        return value
    },
    enGainExp() {
        let value = new Decimal(1)
        return value
    },
    update(diff) {
        player.a.time = player.a.time.add(diff)
        player.a.energy = player.a.energy.add(tmp.a.enGainBase.mul(tmp.a.enGainMult).pow(tmp.a.enGainExp).mul(diff))
    },
    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text", function() {
                    let layer = " layer."
                    if (player.a.points > 1) layer = " layers."
                    return "You have ascended through " + player.a.points + layer
                }],
                ["display-text", function() {
                    return "You have " + format(player.a.energy) + " ascension energy."
                }],
                "blank",
                "upgrades",
            ]
        }
    },
    upgrades: {
        11: {
            title: "Upgrade Bank",
            description: "Keep all upgrades on all resets",
            cost: new Decimal(100),
            currencyDisplayName: "Ascension Energy",
            currencyInternalName: "energy",
            currencyLayer: 'a',
        },
    },
})