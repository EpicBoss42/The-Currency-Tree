addLayer("p_c_sp", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            total: new Decimal(0)
        }
    },
    color: "#C0C0C0",
    resource: "Silver Points",
    row: 2,
    branches: ["p_c_cc"],
    symbol: "SP",
    baseResource: "Copper Coins",
    baseAmount() { return player.p_c_cc.points },
    requires: new Decimal(2500),
    type: "normal",
    exponent: 0.25,
    gainMult() {
        let value = new Decimal(1)
        if (hasMilestone("p_c_sp", 2)) value = value.mul(new Decimal(tmp.p_c_sp.milestoneEffects[3]).add(1))
        if (hasUpgrade("p_c_cc", 34)) value = value.mul(2)
        if (hasUpgrade("p_c_ba", 11)) value = value.mul(1.5)
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        return true
    },
    milestoneEffects() {
        let cap1 = new Decimal(10)
        if (hasUpgrade("p_c_ba", 12)) cap1 = cap1.add(5)
        if (hasAchievement("p_c_ba", 12)) cap1 = cap1.mul(buyableEffect(this.layer, 12))

        let mMod = new Decimal(player[this.layer].points)
        if (hasUpgrade(this.layer, 12)) mMod = new Decimal(player[this.layer].total).mul(upgradeEffect(this.layer, 12))

        if (mMod.gt(cap1)) mMod = mMod.sub(cap1).pow(0.25).add(cap1)


        let base0 = new Decimal(0.05)
        let base1 = new Decimal(0.25)
        let base2 = new Decimal(0.1)
        base0 = base0.mul(mMod)
        base1 = base1.mul(mMod)
        base2 = base2.mul(mMod)

        let result = [mMod, base0, base1, base2]
        return result
    }, 
    doReset(x) {
        if (x === this.layer) {
            player.ygg.p_c_points = new Decimal(0)
        } else if (x == "p_c") {
            layerDataReset(this.layer)
            player[this.layer].unlocked = false
            player[this.layer].total = new Decimal(0)
        }
    },
    tabFormat: [
            "main-display",
            "prestige-button",
            ["display-text", function() {
                return "You have " + format(player.p_c_cc.points) + " Copper Coins"
            }],
            ["display-text", function() {
                return "You have made a total of " + format(player[this.layer].total) + " Silver Points"
            }],
            "blank",
            "milestones",
            ["display-text", function() {
                return "Current Milestone Base: " + format(tmp.p_c_sp.milestoneEffects[0])
            }],
            "blank",
            "buyables",
            "blank",
            "upgrades"
    ],
    upgrades: {
        11: {
            title: "Mirrored Coins",
            description: "Double Copper Point gain",
            cost: new Decimal(2)
        },
        12: {
            title: "Reflection of Time",
            description: "Silver Milestone effects are now based on 25% of your total Silver Points",
            cost: new Decimal(5),
            effect() {
                let base = new Decimal(0.25)
                base = base.add(buyableEffect(this.layer, 11))
                return base
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id).mul(player[this.layer].total)) + ", " + format(upgradeEffect(this.layer, this.id).mul(100)) + "%"}
        },
        13: {
            title: "Mirrored Mirrors",
            description: "Retain the first two rows of Copper Coin Upgrades on Silver Point reset, and unlock another row of Copper Coin upgrades",
            cost: new Decimal(10)
        }
    },
    milestones: {
        0: {
            requirementDescription: "1 Silver Point",
            effectDescription() { 
                return "Gains 5% of Copper Coin gain on reset each second for each Silver Point<br><br>Currently: " + format(tmp.p_c_sp.milestoneEffects[1].mul(100)) + "%"
            },
            done() {return player[this.layer].points.gte(1)}
        },
        1: {
            requirementDescription: "5 Silver Points",
            effectDescription() {
                return "Increases Copper Point gain by 25% for each Silver Point<br><br>Currently: +" + format(tmp.p_c_sp.milestoneEffects[2].mul(100)) + "%"
            },
            done() {return player[this.layer].points.gte(5)}
        },
        2: {
            requirementDescription: "10 Silver Points",
            effectDescription() {
                return "Increases Silver Point gain by 10% for each Silver Point<br><br>Currently: +" + format(tmp.p_c_sp.milestoneEffects[3].mul(100)) + "%"
            },
            done() {return player[this.layer].points.gte(10)}
        },
        3: {
            requirementDescription: "50 Silver Points",
            effectDescription() {
                return "Keep the third row of Copper Coin upgrades on Silver Point resets"
            },
            done() {return player[this.layer].points.gte(50)}
        }
    },
    buyables: {
        11:{
            title: "Time Contraction",
            cost(x) {
                let base = new Decimal(2)
                base = base.mul(x.add(1)).pow(1.5).floor()
                if (new Decimal(x).gte(15)) base = base.pow(1.5)
                if (new Decimal(x).gte(100)) base = base.pow(base)
                return base
            },
            effect(x) {
                let base = new Decimal(0.05)
                base = base.mul(x)
                return base
            },
            display() {
                return `Increases the Reflection of Time effect by 5%<br>
                You currently own: ` + format(getBuyableAmount(this.layer, this.id)) + `<br>
                Cost of the next one is ` + format(this.cost()) + ` Silver Points<br>
                Currently: +` + format(buyableEffect(this.layer, this.id).mul(100)) + "%"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            unlocked() {
                return hasUpgrade(this.layer, 12)
            },
            buy() {
                let amt = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(amt))
                addBuyables(this.layer, this.id, amt)
            }
        },
        12: {
            title: "End Of Time",
            cost(x) {
                let base = new Decimal(2500)
                base = base.mul(x.add(1).pow(2)).floor()
                if (new Decimal(x).gte(10)) base = base.pow(1.5)
                return base
            },
            effect(x) {
                let base = new Decimal(x)
                base = base.add(1).pow(0.5).log(3)
                return base.add(1)
            },
            display() {
                return `Raises the first Silver Milestone base cap<br>
                You own: ` + format(getBuyableAmount(this.layer, this.id)) + ` Ends of Time<br>
                Cost of the next one is ` + format(this.cost()) + ` Silver Points<br>
                Currently: ` + format(buyableEffect(this.layer, this.id)) + "x"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            unlocked() {
                return hasAchievement("p_c_ba", 12)
            },
            buy() {
                let amt = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(amt))
                addBuyables(this.layer, this.id, amt)
            }
        }
    }
})