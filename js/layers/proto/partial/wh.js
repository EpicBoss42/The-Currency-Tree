addLayer("p_p_wh", {
    name: "wholes", 
    symbol: "Wh", 
    position: 0, 
    branches: ["p_p_pa"],
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        clickable11: new Decimal(0)
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
    tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", function() {return "You have " + format(player.ygg.p_p_points) + " Partial Points"}],
        "blank",
        "upgrades",
        "blank",
        "clickables"
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
            onPurchase() {
                setClickableState(this.layer, 11, "Inactive")
            }
       	},
        22: {
	        title: "Partial+",
        	description: "Unlock new partial upgrades",
         	cost: new Decimal(5),
       	},
        23: {
            title: "Square Wholes",
            description: "Raise point gain to ^1.25",
            cost: new Decimal(7)
        }
    },
    clickables: {
        11: {
            title: "Exceed",
            display() {
                return `
                Points are affected by ^0.33<br>
                Goal: Have Partial Unlock<br>
                Reward: Points are affected by ^1.15<br>
                Currently: ^` + format(this.effect()) + `<br><br>
                Currently ` + getClickableState(this.layer, this.id) 
            },
            unlocked() {return hasUpgrade("p_p_wh", 21)},
            canClick() {
                if (getClickableState(this.layer, this.id) == "Active") return true
                if ((getClickableState(this.layer, this.id) == "Inactive") && player[this.layer].clickable11.equals(0)) return true
                return false
            },
            onClick() {
                if (getClickableState(this.layer, this.id) == "Active") {
                    if (hasUpgrade("p_p_pa", 33)) player[this.layer].clickable11 = "1"
                    state = "Inactive"
                } else {
                    state = "Active"
                }
                setClickableState(this.layer, this.id, state)
            },
            effect() {
                let base = new Decimal(player[this.layer].clickable11)
                return new Decimal(1).add(base.mul(0.15))
            }
        }
    }
})
