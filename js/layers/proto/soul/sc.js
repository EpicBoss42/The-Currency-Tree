addLayer("p_s_sc", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            unlockOrder: new Decimal(1),
            calculations: new Decimal(0),
            calcSec: new Decimal(0)
        }
    },
    color: "#00FF0A",
    resource: "soul computers",
    row: 2,
    symbol: "SC",
    baseResource: "soul batteries",
    baseAmount() { return player.p_s_sb.points },
    base() {
        let value = new Decimal(2500)
        value = value.mul(new Decimal(10).pow(player[this.layer].unlockOrder))
        return value
    },
    requires() {return tmp.p_s_sc.base},
    type: "custom",
    increaseUnlockOrder: ["p_s_mb"],
    exponent: 0.25,
    getResetGain() {return new Decimal(1)},
    getNextAt() {
        let base = new Decimal(2500)
        base = base.mul(new Decimal(10).pow(player[this.layer].unlockOrder))
        base = base.pow(player[this.layer].points.add(1).pow(new Decimal(0.25)))
        return base
    },
    canReset() {return player.p_s_sb.points.gte(tmp.p_s_sc.getNextAt)},
    prestigeButtonText() {
        return `Reset for +1 soul computer<br><br>
        Req: ` + format(tmp.p_s_sc.getNextAt) + " soul batteries"
    },
    doReset(x) {
        if (x === this.layer) {
            player.ygg.p_s_points = new Decimal(0)
        }
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
        return hasMilestone("p_s_sb", 2) || player[this.layer].unlocked
    },    
    update(diff) {
        let calcBase = new Decimal(0)
        
        if (hasUpgrade(this.layer, 11)) calcBase = calcBase.add(1)
        if (hasUpgrade(this.layer, 12)) calcBase = calcBase.mul(upgradeEffect(this.layer, 12))
        if (hasUpgrade(this.layer, 23)) calcBase = calcBase.mul(upgradeEffect(this.layer, 23))

        player[this.layer].calculations = player[this.layer].calculations.add(calcBase.mul(diff))
        player[this.layer].calcSec = calcBase
    },
    tabFormat: [
            "main-display",
            "prestige-button",
            ["display-text", function() {
                return "You have " + format(player.p_s_sb.points) + " soul batteries"
            }],
            ["display-text", function() {
                return "You have " + format(player[this.layer].calculations) + " calculations<br>(" + format(player[this.layer].calcSec) + "/sec)"
            }],
            "blank",
            "upgrades"
        ],
    upgrades: {
        11: {
            title: "Calculation Initialization",
            description: "Begin running calculations.",
            cost: new Decimal(1)
        },
        12: {
            title: "Extra Cores",
            description: "Soul Computers increase calculations gain.",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade(this.layer, 11)},
            effect() {
                let base = new Decimal(player[this.layer].points)
                base = base.add(2).pow(0.5)
                return base.max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        13: {
            title: "Solid Soul Drives",
            description: "Soul Computers increase Soul gain based on calculations.",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade(this.layer, 12)},
            effect() {
                let base = new Decimal(player[this.layer].points)
                let mult = new Decimal(player[this.layer].calculations)
                base = base.add(1).pow(0.6).log(1.2)
                mult = mult.add(1).pow(0.25).log(3)
                base = base.mul(mult)
                return base.add(1).max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        21: {
            title: "Generator Optimization",
            description: "Triple Soul Generator gain.",
            cost: new Decimal(25),
            currencyDisplayName: "Calculations",
            currencyInternalName: "calculations",
            currencyLayer: "p_s_sc",
            unlocked() {return hasUpgrade(this.layer, 11)}
        },
        22: {
            title: "Soul Datamining",
            description: "Calculations increase Soul gain.",
            cost: new Decimal(75),
            currencyDisplayName: "Calculations",
            currencyInternalName: "calculations",
            currencyLayer: "p_s_sc",
            unlocked() {return hasUpgrade(this.layer, 11)},
            effect() {
                let base = new Decimal(player[this.layer].calculations)
                base = base.add(1).pow(0.25).log(2).add(1)
                return base.max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        23: {
            title: "Benchmarking",
            description: "Unlock Soul Battery achievements, and Soul Battery achievements increase Calculation gain.",
            cost: new Decimal(250),
            currencyDisplayName: "Calculations",
            currencyInternalName: "calculations",
            currencyLayer: "p_s_sc",
            unlocked() {return hasUpgrade(this.layer, 11)},
            effect() {
                let base = new Decimal(player.p_s_sb.achievements.length).add(1)
                base = base.pow(0.75)
                return base.max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        }
    },
})