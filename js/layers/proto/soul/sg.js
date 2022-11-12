addLayer("p_s_sg", {
    name: "Soul Generators", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SG", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    branches: ["p_s_sb"],
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
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
            layerDataReset(this.layer)
        } else if (x === this.layer) {
            player.ygg.p_s_points = new Decimal(0)
        }
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
            description: "Triple both soul generation, soul generator gain and unlocks the first soul battery upgrade.",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade("p_s_sg", 22) },           
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
        }
    }
})