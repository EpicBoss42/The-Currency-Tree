addLayer("p_c_ba", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#0079EF",
    resource: "Banks",
    row: 2,
    branches: ["p_c_cc"],
    baseResource: "Copper Coins",
    baseAmount() { return player.p_c_cc.points },
    requires: new Decimal("1e9"),
    type: "static",
    exponent: 1.5,
    symbol: "BA",
    doReset(x) {
        if (x === this.layer) {
            player.ygg.p_c_points = new Decimal(0)
        } else if (x == "p_c") {
            layerDataReset(this.layer)
            player[this.layer].unlocked = false
        }
    },
    unlocked() {
        return hasUpgrade("p_c_cc", 34)
    },
    gainMult() {
        let value = new Decimal(1)
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        return true
    },   
    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player.p_c_cc.points) + " Copper Coins"
                }],
                "blank",
                "upgrades",
                "blank",
                "buyables"
            ]
        },
        "Achievements": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player.p_c_cc.points) + " Copper Coins"
                }],
                "blank",
                "achievements"
            ]
        }
    },
    upgrades: {
        11: {
            title: "Money Exchange",
            description: "Reduce Copper Coin gain by 25% and increase Silver Point gain by 50%",
            cost: new Decimal(2)
        },
        12: {
            title: "Stable Currency I",
            description: "Increase the first cap on Silver Milestone base by 5",
            cost: new Decimal(4)
        },
        13: {
            title: "Basics of Investing",
            description: "Unlock the first Investment",
            cost: new Decimal(5)
        }
    },
    achievements: {
        11: {
            name: "Safe Deposit Box A",
            done() {return player[this.layer].points.gte(5)},
            tooltip: "Get 5 Banks<br><br>Reward: Keep the first three rows of Copper Coin upgrades on Bank reset"
        },
        12: {
            name: "Thousandare",
            done() {return tmp.p_c_sp.milestoneEffects[0].gte(25)},
            tooltip: "Get a Silver Point Milestone base of 25<br><br>Reward: Unlock the second Silver Point milestone"
        }
    },
    buyables: {
        11: {
            title: "Nanoinvestment",
            cost(x) {
                let base = new Decimal("1e10")
                return base
            },
            effect(x) {
                let base = new Decimal(x)
                base = base.add(1).pow(0.5).log(3)
                return base.max(1)
            },
            display() {
                return `Increases Copper Coin gain based on Coins invested<br>
                (1e10 at once)<br>
                You have invested: ` + format(getBuyableAmount(this.layer, this.id).mul("1e9")) + `<br>
                Currently: ` + format(buyableEffect(this.layer, this.id)) + "x"
            },
            canAfford() {
                return player.p_c_cc.points.gte(this.cost())
            },
            unlocked() {
                return hasUpgrade(this.layer, 13)
            },
            buy() {
                let amt = new Decimal(1)
                player.p_c_cc.points = player.p_c_cc.points.sub(this.cost().mul(amt))
                addBuyables(this.layer, this.id, amt)
            }
        }
    }
})