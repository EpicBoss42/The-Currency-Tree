addLayer("p_c_cc", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#EF6600",
    resource: "Copper Coins",
    row: 1,
    passiveGeneration() {
        if (hasMilestone("p_c_sp", 0)) return tmp.p_c_sp.milestoneEffects[1]
    },
    symbol: "CC",
    baseResource: "Copper Points",
    baseAmount() { return player.ygg.p_c_points },
    requires() {
        let base = new Decimal(10)
        if (hasUpgrade(this.layer, 13)) base = base.sub(0.75)
        return base
    },
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let value = new Decimal(1)
        if (hasUpgrade(this.layer, 13)) value = value.add(0.5)
        if (hasUpgrade("p_c_cc", 21)) value = value.mul(upgradeEffect("p_c_cc", 21))
        if (hasUpgrade(this.layer, 33)) value = value.mul(upgradeEffect(this.layer, 33))
        if (hasUpgrade("p_c_sp", 11)) value = value.mul(2)
        if (hasUpgrade("p_c_ba", 11)) value = value.mul(0.75)
        value = value.mul(buyableEffect("p_c_ba", 11))
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        if (hasUpgrade(this.layer, 32)) value = value.mul(1.1)
        return value
    },
    layerShown() {
        return true
    },    
    doReset(x) {
        let currentUpgrades = []
        currentUpgrades.push(...player[this.layer].upgrades)
        let savedUpgrades = []
        if (x === this.layer) {
            player.ygg.p_c_points = new Decimal(0)
        } else if (x == "p_c") {
            layerDataReset(this.layer)
        } else if (x == "p_c_sp") {
            currentUpgrades.forEach(function(x) {
                if (hasUpgrade("p_c_sp", 13) && new Decimal(x).lt(30)) savedUpgrades.push(x)
                if (hasMilestone("p_c_sp", 3) && new Decimal(x).lt(40) && new Decimal(x).gte(30)) savedUpgrades.push(x)
            })
            layerDataReset(this.layer)
            player[this.layer].upgrades = savedUpgrades
        } else if (x == "p_c_ba") {
            currentUpgrades.forEach(function(x) {
                if (hasAchievement("p_c_ba", 11)) savedUpgrades.push(x)
            })
            layerDataReset(this.layer)
            player[this.layer].upgrades = savedUpgrades
        }
    },
    upgrades: {
        11: {
            title: "Money Makes Money",
            description: "Copper Coins increase Copper Point gain",
            cost: new Decimal(1),
            effect() {
                let base = new Decimal(player[this.layer].points)
                base = base.add(1).pow(0.5).div(5)
                return base.add(1).max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        12: {
            title: "Copper Consumption",
            description: "Double Copper Point gain",
            cost: new Decimal(5)
        },
        13: {
            title: "Better Banking",
            description: "Copper Coins are cheaper",
            cost: new Decimal(15)
        },
        14: {
            title: "Worthy Wealth",
            description: "Copper Points boost Copper Point gain",
            cost: new Decimal(25),
            effect() {
                let base = new Decimal(player.ygg.p_c_points)
                base = base.pow(0.25).div(2)
                if (hasUpgrade(this.layer, 31)) base = base.pow(1.5)
                return base.add(1).max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        21: {
            title: "Pure Copper",
            description: "Copper Points increase Copper Coin gain",
            cost: new Decimal(50),
            effect() {
                let base = new Decimal(player.ygg.p_c_points)
                base = base.add(1).div(2).pow(0.4).log(2)
                if (hasUpgrade(this.layer, 31)) base = new Decimal(1.5).pow(base)
                base = base.add(1)
                return base.max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
            unlocked() {return hasUpgrade(this.layer, 14)}
        },
        22: {
            title: "Economic Variation",
            description: "Increases Copper Point gain",
            cost: new Decimal(100),
            effect() {
                let finalEffect = new Decimal(1.5)
                e2 = new Decimal(player.points)
                e2 = e2.add(1).log(5).pow(0.75)
                if (player[this.layer].points.gte(25)) finalEffect = finalEffect.add(new Decimal(player.p_c_cc.upgrades.length).div(5))
                if (hasUpgrade(this.layer, 23)) finalEffect = finalEffect.add(upgradeEffect(this.layer, 23))
                if (hasUpgrade(this.layer, 24)) finalEffect = finalEffect.add(e2)
                return finalEffect.max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
            unlocked() {return hasUpgrade(this.layer, 14)}
        },
        23: {
            title: "Microeconomics",
            description: "Adds another aspect to the Economic Variation effect, based on Copper Points",
            cost: new Decimal(250),
            unlocked() {return hasUpgrade(this.layer, 14)},
            effect() {
                let base = new Decimal(player.ygg.p_c_points)
                base = base.add(1).log(15).pow(0.15)
                if (hasUpgrade(this.layer, 31)) base = base.pow(new Decimal(5).div(3))
                return base.max(0)
            },
            effectDisplay() {return "+" + format(upgradeEffect(this.layer, this.id))}
        },
        24: {
            title: "Macroeconomics",
            description: "Adds yet another aspect to Economic Variation, based on Omnipoints",
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade(this.layer, 14)},
            effectDisplay() {return "+" + format(new Decimal(player.points).add(1).log(5).pow(0.75))}
        },
        31: {
            title: "Larger Points",
            description: "Effects based on Copper Points are increased",
            cost: new Decimal(10000),
            unlocked() {return hasUpgrade("p_c_sp", 13) && hasUpgrade(this.layer, 24)}
        },
        32: {
            title: "Sudden Inflation",
            description: "Raises Copper Coin gain to ^1.1",
            cost: new Decimal(500000),
            unlocked() {return hasUpgrade("p_c_sp", 13) && hasUpgrade(this.layer, 24)}
        },
        33: {
            title: "Silver Surplus",
            description: "Increases Copper Coin gain based on Silver Points",
            cost: new Decimal(25000000),
            unlocked() {return hasUpgrade("p_c_sp", 13) && hasUpgrade(this.layer, 24)},
            effect() {
                let base = new Decimal(player.p_c_sp.points)
                base = base.add(1).pow(0.5).log(25)
                return base.add(1).max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        34: {
            title: "Coin Storage",
            description: "Unlocks the Banking layer and doubles Silver Point gain",
            cost: new Decimal("1e9"),
            unlocked() {return hasUpgrade("p_c_sp", 13) && hasUpgrade(this.layer, 24)}
        }
    },
})