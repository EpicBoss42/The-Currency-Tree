addLayer("p_s_sb", {
    name: "Soul Batteries",
    symbol: "SB",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#000DFF",
    requires: new Decimal(10000),
    resource: "soul batteries",
    baseResource: "soul generators",
    baseAmount() { return player.p_s_sg.points },
    type: "normal",
    exponent: 0.5,
    gainMult() {  
        mult = new Decimal(1)
        if (hasUpgrade("p_s_sb", 13)) mult = mult.times(1.75)                      
        return mult               
    },
    gainExp() {                             
        return new Decimal(1)
    },
    doReset(x) {
        if (x === this.layer) {
            player.ygg.p_s_points = new Decimal(0)
        }
    },
    row: 1,
    layerShown() { return hasUpgrade("p_s_sg", 21) || hasMilestone("p_s_sb", 0) },
    upgrades: {
        11: {
            title: "Battery Power",
            description: "Soul generation scales with the amount of soul batteries you have.",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade("p_s_sg", 23) || hasMilestone("p_s_sb", 0) },
            effect() {
                return player[this.layer].points.add(2).pow(0.6)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+ "x" },
        },
        12: {
            title: "Challenging",
            description: "Generators are slightly cheaper.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("p_s_sb", 11) },
        },
        13: {
            title: "Battery Bulk Buy",
            description: "Battery gain is largely increased.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("p_s_sb", 12) },
        }
    },
    milestones: {
        0: {
            requirementDescription: "1 battery",
            effectDescription: "Multiplies soul gain by 1.15.",
            done() { return player.p_s_sb.points.gte(1) }
        }
    }
})