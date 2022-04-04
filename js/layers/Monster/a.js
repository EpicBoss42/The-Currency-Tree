addLayer("a", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        energy: new Decimal(0),
        time: new Decimal(0),
    }},
    leftTab: true,
    previousTab: "tree-tab",
    color: "#e8e8e8",                       // The color for this layer, which affects many elements.
    resource: "Ascensions",            // The name of this layer's main prestige resource.
    row: 10,                  
    baseAmount() {return player.w.copper},
    baseResource: "Copper Points",
    requires: new Decimal(1),
    exponent: new Decimal(1),
    type: "normal",
    prestigeButtonText() {
        let current = new Decimal(player[this.layer].points)
        let buttonText = "Placeholder Text"
        if (current == 0) { buttonText = "The next ascension requires 2 levels of the Core, 2 levels of the Gate mechanism, and 1e25 Copper Points."}
        return buttonText
    },
    getResetGain() {
        let current = new Decimal(player[this.layer].points)
        if (current == 0) {
            if(getBuyableAmount('m', 12) > 1 && getBuyableAmount('g', 11) > 1 && hasUpgrade('b', 25) && player.w.copper > new Decimal(1e25)) return new Decimal(1)
        }
        return new Decimal(0)
    },
    canReset() {
        let current = new Decimal(player[this.layer].points)
        if (current == 0) if(getBuyableAmount('m', 12) > 1 && getBuyableAmount('g', 11) > 1 && hasUpgrade('b', 25) && player.w.copper > new Decimal(1e25)) return true
        return false
    },
    
    layerShown() {
        if (player[this.layer].unlocked) return true
        if(getBuyableAmount('m', 12) > 1 && getBuyableAmount('g', 11) > 1 && hasUpgrade('b', 25) && player.w.copper > new Decimal(1e25)) return true
        return "ghost"
    },
    enGainBase() {
        let value = new Decimal(1)
        return value
    },
    enGainMult() {
        let value = new Decimal(1)
        return value
    },
    enGainExp() {
        let value = new Decimal(1)
        return value
    },
    update(diff) {
        if (player.a.unlocked) {
            player.a.time = player.a.time.add(diff)
            player.a.energy = player.a.energy.add(tmp.a.enGainBase.mul(tmp.a.enGainMult).pow(tmp.a.enGainExp).mul(diff))
        }
    },
    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text", function() {
                    let layer = " layer."
                    if (player.a.points > 1) layer = " layers."
                    return "You have ascended through " + player.a.points + layer
                }],
                ["display-text", function() {
                    return "You have " + format(player.a.energy) + " ascension energy."
                }],
                "blank",
                "upgrades",
            ]
        },
        "The Town": {
            content: [
                "main-display",
                "blank",
                ["tree", [["ba", "bs"]]]
            ],
            unlocked() {
                if (hasUpgrade('a', 11)) return true
                return false
            },
        },
        "The Pit": {
            content: [
                "main-display",
                "blank",
                ["tree", [["t"]]]
            ],
            //unlocked() {
            //    if (hasUpgrade('m', 12)) return true
            //    return false
            //},
        },
    },
    upgrades: {
        11: {
            title: "The Town",
            description: "Unlock the town, and rebalance previous layers",
            cost: new Decimal(100),
            currencyDisplayName: "Ascension Energy",
            currencyInternalName: "energy",
            currencyLayer: 'a',
        },
        12: {
            title: "Town Connections",
            description: "Utilize your connections within town to unlock new upgrades for previous layers",
            cost: new Decimal(250),
            currencyDisplayName: "Ascension Energy",
            currencyInternalName: "energy",
            currencyLayer: 'a',
        }
    },
})
