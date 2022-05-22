addLayer("sp", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            space: new Decimal(0),
            subspace: new Decimal(0),
            hyperspace: new Decimal(0),
            spaceSec: new Decimal(0),
            subspaceSec: new Decimal(0),
            hyperspaceSec: new Decimal(0),
            gen1Sec: new Decimal(0),
        }
    },
    color: "#FF00FF",
    resource: "Space Essence",
    row: 2,
    branches: ['e'],
    baseResource: "Elemental Essence",
    baseAmount() { return player.e.points },
    requires: new Decimal(100),
    //reset back to 100 once finished
    type: "normal",
    exponent: 0.25,
    hotkeys: [
        {key: "s", description: "S: Reset for Space Essence", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.w.realKey}},
    ],
    gainMult() {
        let value = new Decimal(1)
        if (hasUpgrade('ti', 15)) value = value.mul(upgradeEffect('ti', 15))
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        return true
    },   
    doReset(x) {
        if (x === this.layer) {
            player.w.tpoints = new Decimal(0)
        }
    }, 
    update(diff) {
        if (player[this.layer].unlocked) {
            //base Space gain
            player[this.layer].spaceSec = new Decimal(buyableEffect(this.layer, 11))

            //Space exponents
            if (getBuyableAmount(this.layer, 13) > 0) player[this.layer].spaceSec = player[this.layer].spaceSec.pow(buyableEffect(this.layer, 13))

            //Space multipliers
            if (hasUpgrade(this.layer, 12)) player[this.layer].spaceSec = player[this.layer].spaceSec.mul(upgradeEffect(this.layer, 12))
            if (getBuyableAmount(this.layer, 12) > 0) player[this.layer].spaceSec = player[this.layer].spaceSec.mul(buyableEffect(this.layer, 12))

            //Space overall gain
            player[this.layer].space = player[this.layer].space.add(player[this.layer].spaceSec.mul(diff))

            //base Mk1 gain
            player[this.layer].gen1Sec = new Decimal(buyableEffect(this.layer, 21))

            //Mk1 Exponents
            if (getBuyableAmount(this.layer, 23) > 0) player[this.layer].gen1Sec = player[this.layer].gen1Sec.pow(buyableEffect(this.layer, 23))

            //Mk1 multipliers
            if (getBuyableAmount(this.layer, 22) > 0) player[this.layer].gen1Sec = player[this.layer].gen1Sec.mul(buyableEffect(this.layer, 22))

            //Mk1 overall gain
            setBuyableAmount(this.layer, 11, getBuyableAmount(this.layer, 11).add(player[this.layer].gen1Sec.mul(diff)))
            if (hasUpgrade(this.layer, 22)) setBuyableAmount(this.layer, 12, getBuyableAmount(this.layer, 12).add(player[this.layer].gen1Sec.mul(diff).div(4)))
            if (hasUpgrade(this.layer, 23)) setBuyableAmount(this.layer, 13, getBuyableAmount(this.layer, 13).add(player[this.layer].gen1Sec.mul(diff).div(20)))
        }
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + player.e.points + " Elemental Essence"
                }],
                ["display-text", function() {
                    return "You have " + format(player[this.layer].space) + " Space (" + format(player[this.layer].spaceSec) + "/sec)"
                }],
                ["display-text", function() {
                    if (true) return ""
                    return "You have " + format(player[this.layer].subspace) + " Subspace (" + format(player[this.layer].subspaceSec) + "/sec)"
                }],
                ["display-text", function() {
                    if (true) return ""
                    return "You have " + format(player[this.layer].hyperspace) + " Hyperspace (" + format(player[this.layer].hyperspaceSec) + "/sec)"
                }],
                "blank",
                "buyables",
                "blank",
                "upgrades"
            ]
        }
    },
    upgrades: {
        11: {
            title: "Background Radiation",
            description: "Boost point gain based on Space upgrades bought",
            cost: new Decimal(250),
            currencyDisplayName: "Space",
            currencyInternalName: "space",
            currencyLayer: 'sp',
            effect() {
                let value = new Decimal(player[this.layer].upgrades.length)
                let boost = new Decimal(getBuyableAmount(this.layer, 21)).add(getBuyableAmount(this.layer, 22)).add(getBuyableAmount(this.layer, 23))
                value = value.add(1).log(3)
                if (hasUpgrade(this.layer, 21)) {
                    boost = boost.mul(2).pow(0.35).log(2.1)
                    value = value.add(boost)
                }
                value = value.add(1)
                return value.max(1)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        12: {
            title: "Primordial Nebulae",
            description: "Space boosts Space gain",
            cost: new Decimal(1000),
            currencyDisplayName: "Space",
            currencyInternalName: "space",
            currencyLayer: 'sp',
            effect() {
                let value = new Decimal(player[this.layer].space)
                value = value.pow(0.3).log(3.5).add(1)
                return value.max(1)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        13: {
            title: "Time-Space Link",
            description: "Space boosts Time Essence gain",
            cost: new Decimal(2500),
            currencyDisplayName: "Space",
            currencyInternalName: "space",
            currencyLayer: 'sp',
            effect() {
                let value = new Decimal(player[this.layer].space)
                value = value.div(2).pow(0.5).div(10).add(1)
                if (value > 2) {
                    value = value.sub(2)
                    value = value.pow(0.1)
                    value = value.add(2)
                }
                return value.max(1)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        14: {
            title: "White Dwarf Star",
            description: "Each Space Essence provides +0.1 to the Space Generator Mk1 base",
            cost: new Decimal(5000),
            currencyDisplayName: "Space",
            currencyInternalName: "space",
            currencyLayer: 'sp',
            effect() {
                let value = new Decimal(player[this.layer].points)
                return new Decimal(0.1).mul(value)
            },
            effectDisplay() {
                return "+" + format(upgradeEffect(this.layer, this.id))
            }
        },
        15: {
            title: "Primordial Black Hole",
            description: "Reset your Mk1 Space buyables to gain 1 Void Essence and unlock Mk2 Space Buyables",
            cost: new Decimal(10000),
            currencyDisplayName: "Space",
            currencyInternalName: "space",
            currencyLayer: 'sp',
            onPurchase() {
                setBuyableAmount(this.layer, 11, new Decimal(1))
                setBuyableAmount(this.layer, 12, new Decimal(0))
                setBuyableAmount(this.layer, 13, new Decimal(0))
                player.v.points = player.v.points.add(1)
            }
        },
        21: {
            title: "Xray Detectors",
            description: "Total amount of Space Mk2 buyables is factored into Background Radiation",
            cost: new Decimal(100000),
            currencyDisplayName: "Space",
            currencyInternalName: "space",
            currencyLayer: 'sp',
            unlocked() {return hasUpgrade(this.layer, 15)}
        },
        22: {
            title: "Secondary Generation",
            description: "Space Generator Mk2s also produce Space Booster Mk1s at 25% of the normal rate",
            cost: new Decimal(150000),
            currencyDisplayName: "Space",
            currencyInternalName: "space",
            currencyLayer: 'sp',
            unlocked() {return hasUpgrade(this.layer, 15)}
        },
        23: {
            title: "Tertiary Generation",
            description: "Space Generator Mk2s also produce Space Expander Mk1s at 5% of the normal rate",
            cost: new Decimal(400000),
            currencyDisplayName: "Space",
            currencyInternalName: "space",
            currencyLayer: 'sp',
            unlocked() {return hasUpgrade(this.layer, 15)} 
        },
        24: {
            title: "Gamma Bursts",
            description: "Each Mk1 Space buyable provides +0.1% point gain",
            cost: new Decimal(1000000),
            currencyDisplayName: "Space",
            currencyInternalName: "space",
            currencyLayer: 'sp',
            unlocked() {return hasUpgrade(this.layer, 15)},
            effect() {
                let out = []
                let value = new Decimal(getBuyableAmount(this.layer, 11)).add(getBuyableAmount(this.layer, 12)).add(getBuyableAmount(this.layer, 13))
                out.push(new Decimal(0.1).mul(value))
                out.push(new Decimal(0.001).mul(value).add(1))
                return out
            },
            effectDisplay() {
                return "+" + format(upgradeEffect(this.layer, this.id)[0]) + "%"
            }
        }
    },
    buyables: {
        11: {
            title: "Space Generator Mk1",
            cost(x) {
                let value = new Decimal(0)
                if (x > 10) {
                    value = value.add(x).mul(x).pow(2)
                } else {
                    value = value.add(x).mul(5).add(1)
                }
                return value
            },
            effect(x) {
                let value = new Decimal(1)
                if (hasUpgrade(this.layer, 14)) value = value.add(upgradeEffect(this.layer, 14))
                value = value.mul(x)
                if (value > 0) {
                    return value
                }
            },
            display() {
                if (hasUpgrade(this.layer, 15)) {
                    return `
                    Generate Space every second<br>
                    Current Effect: ` + format(buyableEffect(this.layer, this.id)) + ` Space/sec<br>
                    Current Amount: ` + format(getBuyableAmount(this.layer, this.id)) + `<br>
                    (` + format(player[this.layer].gen1Sec) + "/sec)"
                }
                return `
                Generate Space every second<br>
                Current Effect: ` + format(buyableEffect(this.layer, this.id)) + ` Space/sec<br>
                Cost of next one: ` + format(this.cost()) + ` Space Essence<br>
                Current Amount: ` + format(getBuyableAmount(this.layer, this.id))
            },
            canAfford() {
                if (getBuyableAmount(this.layer, 21) > 0) return false
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(this.cost())
                let amount = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(cost.mul(amount))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(amount))
            }
        },
        12: {
            title: "Space Booster Mk1",
            cost(x) {
                let value = new Decimal(0)
                if (x > 10) {
                    value = value.add(x).mul(x.mul(2)).pow(2)
                } else {
                    value = value.add(x).mul(10).add(2)
                }
                return value
            },
            effect(x) {
                let value = new Decimal(x)
                value = value.pow(0.3).add(1)
                return value.max(1)
            },
            display() {
                if (hasUpgrade(this.layer, 22)) {
                    return `
                    Multiply Space gain<br>
                    Current Effect: ` + format(buyableEffect(this.layer, this.id)) + `x<br>
                    Current Amount: ` + format(getBuyableAmount(this.layer, this.id)) + `<br>
                    (` + format(player[this.layer].gen1Sec.div(4)) + "/sec)"
                }
                return `
                Multiply Space gain<br>
                Current Effect: ` + format(buyableEffect(this.layer, this.id)) + `x<br>
                Cost of next one: ` + format(this.cost()) + ` Space Essence<br>
                Current Amount: ` + format(getBuyableAmount(this.layer, this.id))
            },
            canAfford() {
                if (player[this.layer].points.gte(this.cost())) return true
                return false
            },
            buy() {
                let cost = new Decimal(this.cost())
                let amount = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(cost.mul(amount))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(amount))
            }
        },
        13: {
            title: "Space Expander Mk1",
            cost(x) {
                let value = new Decimal(0)
                if (x > 10) {
                    value = value.add(x).mul(x.mul(5)).pow(2)
                } else {
                    value = value.add(x).mul(25).add(5)
                }
                return value
            },
            effect(x) {
                let value = new Decimal(x)
                value = value.pow(0.25).div(10).add(1)
                return value.max(1)
            },
            display() {
                if (hasUpgrade(this.layer, 23)) {
                    return `
                    Raise base Space gain to a power<br>
                    Current Effect: ^` + format(buyableEffect(this.layer, this.id)) + `<br>
                    Current Amount: ` + format(getBuyableAmount(this.layer, this.id)) + `<br>
                    (` + format(player[this.layer].gen1Sec.div(20)) + "/sec)"
                }
                return `
                Raise base Space gain to a power<br>
                Current Effect: ^` + format(buyableEffect(this.layer, this.id)) + `<br>
                Cost of next one: ` + format(this.cost()) + ` Space Essence<br>
                Current Amount: ` + format(getBuyableAmount(this.layer, this.id))
            },
            canAfford() {
                if (player[this.layer].points.gte(this.cost())) return true
                return false
            },
            buy() {
                let cost = new Decimal(this.cost())
                let amount = new Decimal(1)
                player[this.layer].points = player[this.layer].points.sub(cost.mul(amount))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(amount))
            }
        },
        21: {
            title: "Space Generator Mk2",
            cost(x) {
                let value = new Decimal(0)
                if (x > 5) {
                    value = value.add(x).mul(x)
                } else {
                    value = value.add(x).mul(5).add(1)
                }
                return value
            },
            effect(x) {
                let value = new Decimal(x)
                return value.div(5)
            },
            display() {
                return `
                Generate Space Generator Mk1 each second<br>
                Current Effect: +` + format(buyableEffect(this.layer, this.id)) + `/sec<br>
                Cost of next one: ` + format(this.cost()) + ` Space Generator Mk 1s<br>
                Current Amount: ` + format(getBuyableAmount(this.layer, this.id))
            },
            canAfford() {
                return getBuyableAmount(this.layer, 11).gte(this.cost())
            },
            buy() {
                let cost = new Decimal(this.cost())
                let amount = new Decimal(1)
                setBuyableAmount(this.layer, 11, getBuyableAmount(this.layer, 11).sub(cost.mul(amount)))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(amount))
            },
            unlocked() {
                return hasUpgrade(this.layer, 15)
            }
        },
        22: {
            title: "Space Booster Mk2",
            cost(x) {
                let value = new Decimal(0)
                if (x > 5) {
                    value = value.add(x).mul(x.mul(2))
                } else {
                    value = value.add(x).mul(10).add(2)
                }
                return value
            },
            effect(x) {
                let value = new Decimal(x)
                value = value.pow(0.3)
                return value.div(5).add(1)
            },
            display() {
                return `
                Multiply Space Generator Mk1 Gain<br>
                Current Effect: ` + format(buyableEffect(this.layer, this.id)) + `x<br>
                Cost of next one: ` + format(this.cost()) + ` Space Booster Mk1s<br>
                Current Amount: ` + format(getBuyableAmount(this.layer, this.id))
            },
            canAfford() {
                return getBuyableAmount(this.layer, 12).gte(this.cost())
            },
            buy() {
                let cost = new Decimal(this.cost())
                let amount = new Decimal(1)
                setBuyableAmount(this.layer, 12, getBuyableAmount(this.layer, 12).sub(cost.mul(amount)))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(amount))
            },
            unlocked() {
                return hasUpgrade(this.layer, 15)
            }
        },
        23: {
            title: "Space Expander Mk2",
            cost(x) {
                let value = new Decimal(0)
                if (x > 5) {
                    value = value.add(x).mul(x.mul(5))
                } else {
                    value = value.add(x).mul(25).add(1)
                }
                return value
            },
            effect(x) {
                let value = new Decimal(x)
                value = value.pow(0.25).div(10)
                return value.div(5).add(1)
            },
            display() {
                return `
                Raise Space Generator Mk1 Gain to a power<br>
                Current Effect: ^` + format(buyableEffect(this.layer, this.id)) + `<br>
                Cost of next one: ` + format(this.cost()) + ` Space Expander Mk 1s<br>
                Current Amount: ` + format(getBuyableAmount(this.layer, this.id))
            },
            canAfford() {
                return getBuyableAmount(this.layer, 13).gte(this.cost())
            },
            buy() {
                let cost = new Decimal(this.cost())
                let amount = new Decimal(1)
                setBuyableAmount(this.layer, 13, getBuyableAmount(this.layer, 13).sub(cost.mul(amount)))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(amount))
            },
            unlocked() {
                return hasUpgrade(this.layer, 15)
            }
        }
    }
})
