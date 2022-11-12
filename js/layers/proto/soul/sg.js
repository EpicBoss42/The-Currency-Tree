addLayer("p_s_sg", {
    name: "Soul Generators", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SG", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires() { 
        let requirement = new Decimal(10)
        if (hasUpgrade("p_s_sb", 12)) requirement = requirement.sub(0.1)
        return requirement
    }, // Can be a function that takes requirement increases into account
    resource: "soul generators", // Name of prestige currency
    baseResource: "souls", // Name of resource prestige is based on
    baseAmount() {return player.ygg.p_s_points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("p_s_sg", 13)) mult = mult.times(upgradeEffect("p_s_sg", 13))
        if (hasUpgrade("p_s_sg", 15)) mult = mult.times(2)
        if (hasUpgrade("p_s_sg", 22)) mult = mult.times(2)
        if (hasUpgrade("p_s_sg", 23)) mult = mult.times(3)
        if (hasUpgrade("p_s_sb", 11)) mult = mult.times(1.2)
        if (hasUpgrade("p_s_sb", 14)) mult = mult.mul(2)   
        if (hasUpgrade("p_s_sc", 22)) mult = mult.mul(3) 
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        // {key: "s", description: "S: Reset for soul generators", onPress(){if (canReset(this.layer)) doReset(this.layer)}},       HOTKEYS ARE DISABLED
    ],
    layerShown(){return true},
    doReset(x) {
        if (x == "p_s_sb") {
            savedUpgrades = []
            save = []
            if (hasUpgrade(this.layer, 25)) {
                savedUpgrades.push("25")
                save.push("achievements")
            }
            layerDataReset(this.layer, save)
            player[this.layer].upgrades = savedUpgrades
        } else if (x == "p_s_sc") {
            layerDataReset(this.layer)
        } else if (x == "p_s_mb") {
            layerDataReset(this.layer)
        } else if (x === this.layer) {
            player.ygg.p_s_points = new Decimal(0)
        }
    },
    passiveGeneration() {
        let gain = new Decimal(0)
        if (hasMilestone("p_s_sb", 1)) gain = gain.add(0.1)
        return gain
    },
    upgrades: {
        11: {
            title: "Generator Efficency",
            description: "Double soul generation.",
            cost: new Decimal(1)
        },
        12: {
            title: "Self-sufficiency",
            description: "Soul generation scales with the amount of soul generators you have.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+ "x" },
            unlocked() { return hasUpgrade("p_s_sg", 11) },         
        },
        13: {
            title: "Empowering",
            description: "Your number of souls reduce the cost of your soul generators.",
            cost: new Decimal(5),
            effect() {
                return player.ygg.p_s_points.add(1).pow(0.15)
            },
            unlocked() { return hasUpgrade("p_s_sg", 12) },
        },
        14: {
            title: "Overclock",
            description: "Triples soul generation.",
            cost: new Decimal(7),
            unlocked() { return hasUpgrade("p_s_sg", 13) },
        },
        15: {
            title: "Duplificat-inator",
            description: "Doubles both soul generation and soul generator gain.",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("p_s_sg", 14) },
        },
        21: {
            title: "Second Circle",
            description: "Gain access to a new layer, and add a x1.5 modifier to soul gain.",
            cost: new Decimal(50),
            unlocked() { return hasUpgrade("p_s_sg", 15) },
        },
        22: {
            title: "Tax Cuts",
            description: "Halves soul generator cost, and gives them a small boost.",
            cost: new Decimal(150),
            unlocked() { return hasUpgrade("p_s_sg", 21) },
        },
        23: {
            title: "Ultra-Overclock",
            description: "Triple both soul and soul generator gain, and unlocks the first soul battery upgrade.",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade("p_s_sg", 22) },           
        },
        24: {
            title: "Soul Recursion",
            description: "Souls increase soul generation.",
            cost: new Decimal(25000),
            unlocked() { return hasUpgrade("p_s_sg", 23) && hasMilestone("p_s_sb", 1)},
            effect() {
                let base = new Decimal(player.ygg.p_s_points)
                base = base.add(1).pow(0.25).log(5).div(3).add(1)
                return base.max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        25: {
            title: "Postmortal Achievements",
            description: "Your achievements increase Soul Battery gain, and both they and this upgrade are kept on Soul Battery reset.",
            cost: new Decimal(1000000),
            unlocked() { return hasUpgrade("p_s_sg", 24) || hasUpgrade(this.layer, this.id)},
            effect() {
                let base = new Decimal(player.p_s_sg.achievements.length).add(1)
                base = base.log(5).add(1)
                return base.max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        }
    },
    achievements: {
        11: {
            name: "The Start",
            done() { return player.p_s_sg.points.gte(1) },
            tooltip: "Get your first generator."
        },
        12: {
            name: "Upgrades, people!",
            done() { return hasUpgrade("p_s_sg", 11) },
            tooltip: "Buy the first upgrade."
        },
        13: {
            name: "Double Duplicate",
            done() {return hasUpgrade("p_s_sg", 15)},
            tooltip: "Buy Duplificat-inator."
        },
        14: {
            name: "Finally, some recursion",
            done() {return hasUpgrade("p_s_sg", 24)},
            tooltip: "Buy Soul Recursion." 
        },
        15: {
            name: "Batteries for days",
            done() {return hasUpgrade("p_s_sg", 25) && player.p_s_sb.points.gte(1000)},
            tooltip: "Buy Postmortal Achievements, then gain over 1,000 Soul Batteries."
        }
    }
})