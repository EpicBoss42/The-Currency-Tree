addLayer("p_p_wh", {
    name: "wholes", 
    symbol: "Wh", 
    position: 0, 
    branches: ["p_p_pa"],
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#00ffa6",
    effectDescription() {return "multiplying partial point gain by "+format(player.p_p_wh.points.gte("1") ? new Decimal("1.5").pow(player.p_p_wh.points) : new Decimal("1"))},
    requires: new Decimal(8000), 
    resource: "wholes", 
    baseResource: "partial points", 
    baseAmount() {return player.p_p_pa.points}, 
    type: "static", 
    exponent: 1, 
    gainMult() { 
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(0.5)
    },
    row: 1, 
    doReset(x) {
        if (x === this.layer) {
            player.ygg.p_p_points = new Decimal(1)
        }
    },
    hotkeys: [
        //{key: "w", description: "W: Reset for wholes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("p_p_pa", 33) || player[this.layer].unlocked},
    upgrades: {
	    11: {
	        title: "Part Part Whole",
        	description: "Multiply point gain by 3",
         	cost: new Decimal(1),
       	},
        12: {
	        title: "Increased Parts",
        	description: "Partial Partial also boosts Partial Increased",
         	cost: new Decimal(2),
       	},
        13: {
	        title: "Passive Partial",
        	description: "Gain 10% of partial points every second",
         	cost: new Decimal(2),
       	},
        21: {
	        title: "Challenged",
        	description: "Unlock a challenge",
         	cost: new Decimal(3),
       	},
        22: {
	        title: "Partial+",
        	description: "Unlock new partial upgrades",
         	cost: new Decimal(5),
       	},
    },
    challenges: {
        11: {
            name: "Exceed",
            completionLimit: 2,
            challengeDescription() {return "Points are affected by ^0.33"},
            unlocked() { return hasUpgrade("p_p_wh", 21) },
            goalDescription: 'Have Partial Unlock',
            canComplete() {
                return hasUpgrade("p_p_pa", 33)
            },
            rewardEffect() {
                return challengeCompletions("p_p_wh",11) > 0 ? 1.15 : 1.0;
            },
            rewardDisplay() { return "^"+format(this.rewardEffect()) },
            countsAs: [], 
            rewardDescription: "Points are affected by ^1.15",
        },
    },
})
