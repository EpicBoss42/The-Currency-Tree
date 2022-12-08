addLayer("p_c_cc", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#AAAAAA",
    resource: "Copper Coins",
    row: 1,
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
            player.ygg.p_c_points = new Decimal(0)
        }
    },
    upgrades: {
        11: {
            title: "Money Makes Money",
            description: "Copper Coins increase Copper Point gain",
            cost: new Decimal(1),
            effect() {
                let base = new Decimal(player[this.layer].points)
                base = base.pow(0.5).div(5)
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
                return base.add(1).max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        21: {
            title: "Economic Variation",
            description: "Increases or decreases Copper Point gain.  Effect not yet implemented.",
            cost: new Decimal(100),
            effect() {
                let finalEffect = new Decimal(1)
                let p_c_points_last = new Decimal(player[this.layer].points)
                p_c_points_last = p_c_points_last.sub(p_c_points_last.div(10).floor().mul(10)).floor()
                if (p_c_points_last.max(5).equals(new Decimal(5))) finalEffect = finalEffect.sub(new Decimal(1).div(3))
                if (player[this.layer].points.max(25) == player[this.layer].points) finalEffect = finalEffect.add(new Decimal(player.p_c_cc.upgrades.length).div(5))
                return finalEffect
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
            unlocked() {return hasUpgrade(this.layer, 14)}
        }
    },
})