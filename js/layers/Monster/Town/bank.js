addLayer("ba", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            silver: new Decimal(0),
            gold: new Decimal(0),
        }
    },
    previousTab: 'a',
    color: "#e3e3e3",
    resource: "Copper Coins",
    row: 5,
    baseResource: "Copper Points",
    baseAmount() { return player.points },
    requires: new Decimal(25),
    type: "normal",
    exponent: 1,
    gainMult() {
        let value = new Decimal(1)
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        if (hasUpgrade('a', 11)) return true
        return true
    },
    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "upgrades"
            ]
        },
        "Investments": {
            content: [
                "main-display",
                ["buyables", '1']
            ],
            unlocked() {
                if (hasUpgrade('ba', 12)) return true
                return false
            }
        },
        "Conversion": {
            content: [
                ["display-text", function() {
                    return "You have " + format(player[this.layer].points) + " Copper Coins."
                }],
                ["display-text", function() {
                    return "You have " + format(player[this.layer].silver) + " Silver Coins."
                }],
                ["display-text", function() {
                    return "You have " + format(player[this.layer].gold) + " Gold Coins."
                }],
                "blank",
                "clickables"
            ],
            unlocked() {
                if (hasUpgrade('ba', 13)) return true
                return false
            }
        },
    },
    branches: ['bs'],
    buyables: {
        11: {
            title: "Minor Investment",
            cost(x) {
                let value = new Decimal(1)
                return value
            },
            effect(x) {
                let value = new Decimal(x)
                value = value.pow(0.25).div(2)
                return value
            },
            display() {
                return "You have invested " + getBuyableAmount(this.layer, this.id).floor() + " Copper Coins via Minor Investments, providing +" + format(buyableEffect(this.layer, this.id)) + " Copper Points to your Savings Vault payments."
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
            },
        },
        12: {
            title: "Small Investment",
            cost(x) {
                return new Decimal(5)
            },
            effect(x) {
                let value = new Decimal(x)
                value = value.pow(0.3).div(2).mul(5)
                return value
            },
            display() {
                return "You have invested " + getBuyableAmount(this.layer, this.id).mul(5).floor() + " Copper Coins via Small Investments, providing +" + format(buyableEffect(this.layer, this.id)) + " Copper Points to your Savings Vault payments."
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
            },
            unlocked() {
                if (getBuyableAmount(this.layer, 11).gte(25)) return true
                return false
            },
        },
    },
    upgrades: {
        11: {
            title: "Savings Vault",
            description: "Invest a few Copper Coins in order to gain a few Copper Points each second",
            cost: new Decimal(5),
            effect() {
                let value = new Decimal(5)
                value = value.add(buyableEffect(this.layer, 11))
                value = value.add(buyableEffect(this.layer, 12))
                return value
            },
        },
        12: {
            title: "Department of Investments",
            description: "Unlock Investments, a new tab that allows you to generate more Copper Points",
            cost: new Decimal(10),
        },
        13: {
            title: "Department of Lesser Currencies",
            description: "Unlock Conversion, a new tab that allows you to convert Copper Coins into Silver or Gold coins",
            cost: new Decimal(1000),
        }
    },
    clickables: {
        11: {
            title: "Copper to Silver Conversion",
            display() {
                return "Convert 100 Copper Coins into 1 Silver Coin"
            },
            canClick() { return player[this.layer].points.gte(100) },
            onClick() {
                player[this.layer].points = player[this.layer].points.sub(100)
                player[this.layer].silver = player[this.layer].silver.add(1)
            },
            onHold() {
                player[this.layer].points = player[this.layer].points.sub(100)
                player[this.layer].silver = player[this.layer].silver.add(1)
            },
        },
        12: {
            title: "Silver to Gold Conversion",
            display() {
                return "Convert 100 Silver Coins into 1 Gold Coin"
            },
            canClick() { return player[this.layer].silver.gte(100) },
            onClick() {
                player[this.layer].points = player[this.layer].silver.sub(100)
                player[this.layer].silver = player[this.layer].gold.add(1)
            },
            onHold() {
                player[this.layer].points = player[this.layer].silver.sub(100)
                player[this.layer].silver = player[this.layer].gold.add(1)
            },
        },
        21: {
            title: "Silver to Copper Conversion",
            display() {
                return "Convert 1 Silver Coin into 100 Copper Coins"
            },
            canClick() { return player[this.layer].silver.gte(1) },
            onClick() {
                player[this.layer].points = player[this.layer].points.add(100)
                player[this.layer].silver = player[this.layer].silver.sub(1)
            },
            onHold() {
                player[this.layer].points = player[this.layer].points.add(100)
                player[this.layer].silver = player[this.layer].silver.sub(1)
            },
        },
        22: {
            title: "Gold to Silver Conversion",
            display() {
                return "Convert 1 Gold Coin into 100 Silver Coins"
            },
            canClick() { return player[this.layer].gold.gte(1) },
            onClick() {
                player[this.layer].points = player[this.layer].gold.sub(1)
                player[this.layer].silver = player[this.layer].silver.add(100)
            },
            onHold() {
                player[this.layer].points = player[this.layer].gold.sub(1)
                player[this.layer].silver = player[this.layer].silver.add(100)
            },
        },
    }
})
