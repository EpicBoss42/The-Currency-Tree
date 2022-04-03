addLayer("bs", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            metal: new Decimal(0),
            time: new Decimal(0),
        }
    },
    previousTab: 'a',
    color: "#e3e3e3",
    resource: "Blacksmith's Favors",
    row: 5,
    onPrestige() {
        let cost = new Decimal(getNextAt(this.layer))
        player.ba.points = player.ba.points.sub(cost)
    },
    baseResource: "Copper Coins",
    baseAmount() { return player.ba.points },
    requires: new Decimal(5),
    type: "static",
    exponent: 1.1,
    base: new Decimal(5),
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
    metalBase() {
        let base = new Decimal(player[this.layer].points)
        return base
    },
    metalMult() {
        let mult = new Decimal(1)
        return mult
    },
    metalExp() {
        let exp = new Decimal(1)
        return mult
    },
    update(diff) {
        if (player[this.layer].unlocked) player[this.layer].time = player[this.layer].time.add(diff)
        if(hasUpgrade('bs', 11)) {
            player[this.layer].metal = player[this.layer].metal.add(tmp.bs.metalBase.pow(tmp.bs.metalExp).mul(tmp.bs.metalMult).mul(diff))
        }
    },
    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "upgrades",
            ]
        },
        "Metal Forging": {
            content: [
                "main-display",
                "blank",
                ["display-text", function() {
                    return "You have " + format(player[this.layer].metal) + " metal."
                }],
            ],
            unlocked() {
                if (hasUpgrade('bs', 11)) return true
                return false
            },
        },
    },
    
    upgrades: {
        11: {
            title: "Metal Smelting",
            description: "Begin smelting metal for use in various tasks",
            cost: new Decimal(1),
        },
    },
})
