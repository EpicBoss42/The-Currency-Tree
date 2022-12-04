addLayer("p_p_pa", {
    name: "parts", 
    symbol: "Pa", 
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#A600FF",
    requires: new Decimal(1), 
    resource: "partial points",
    baseResource: "points", 
    baseAmount() {return player.ygg.p_p_points}, 
    type: "normal", 
    exponent: 0.5, 
    gainMult() { 
        mult = new Decimal(1)
        if (hasUpgrade('p_p_pa', 31)) mult = mult.times(upgradeEffect('p_p_pa', 31))
        mult = mult.times(player.p_p_wh.points.gte("1") ? new Decimal("1.5").pow(player.p_p_wh.points) : new Decimal("1"))
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 0, 
    hotkeys: [
        //{key: "p", description: "P: Reset for partial points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    doReset(x) {
        if (x == "p_p_wh") {
            layerDataReset(this.layer)
        } else if (x === this.layer) {
            player.ygg.p_p_points = new Decimal(0)
        }
    },
    upgrades: {
	    11: {
	        title: "Partial Production",
        	description: "Start gaining points",
         	cost: new Decimal(1),
       	},
	    12: {
	        title: "Point Booster",
    	    description: "Partial points boost points",
    	    cost: new Decimal(3),
            effect() {
	    	    var gain = player[this.layer].points.add(1).pow(0.5)
	    	    if (hasUpgrade('p_p_pa', 13)) gain = gain.times(upgradeEffect('p_p_pa', 13))
                return gain
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
       	},
	    13: {
	        title: "Point Booster Booster",
    	    description: "Partial points boost Point Booster",
    	    cost: new Decimal(10),
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
       	},
        21: {
            title: "Partial Increaser",
            description: "Base point gain is increased",
            cost: new Decimal(50),
            effect() {
	    	    var gain = new Decimal(2)
	    	    if (hasUpgrade('p_p_pa', 32)) gain = gain.times(upgradeEffect('p_p_pa', 32))
                if (hasUpgrade('p_p_pa', 33)) gain = gain.times(upgradeEffect('p_p_pa', 33))
                return gain
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
        },
        22: {
            title: "Point Booster?",
            description: "Points boost themselves",
            cost: new Decimal(125),
            effect() {
                var gain = player.ygg.p_p_points.add(1).pow(0.2)
                if (hasUpgrade('p_p_pa', 23)) gain = gain.times(upgradeEffect('p_p_pa', 23))
                return gain
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        23: {
            title: "Point Booster+3",
            description: "Points boost Point Booster?",
            cost: new Decimal(50000),
            effect() {
                return player.ygg.p_p_points.add(1).pow(0.025)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("p_p_wh", 22) },
        },
        24: {
            title: "Partial Pointed",
            description: "Points boost Partial Partial",
            cost: new Decimal(250000),
            effect() {
                return player.ygg.p_p_points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("p_p_wh", 22) },
        },
        31: {
            title: "Partial Increased",
            description: "Partial points boost themselves",
            cost: new Decimal(300),
            effect() {
                var gain = player[this.layer].points.add(1).pow(0.1)
                if (hasUpgrade('p_p_wh', 12) && hasUpgrade('p_p_pa', 32)) gain = gain.times(upgradeEffect('p_p_pa', 32))
                return gain
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        32: {
            title: "Partial Partial",
            description: "Partial points boost Partial Increaser",
            cost: new Decimal(850),
            effect() {
                var gain = player[this.layer].points.add(1).pow(0.07)
                if (hasUpgrade('p_p_pa', 24)) gain = gain.times(upgradeEffect('p_p_pa', 24))
                return gain
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        33: {
            title: "Partial Unlock",
            description: "Multiply Partial Increaser by 2.5, and unlock something new",
            cost: new Decimal(3000),
            effect() {
                return new Decimal(2.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
    passiveGeneration() {
        if (hasUpgrade("p_p_wh",13)) return 0.1
    }
})
