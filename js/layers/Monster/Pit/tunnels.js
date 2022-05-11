addLayer("t", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            tunnellength: new Decimal(0),
            fuel: new Decimal(0),
            time: new Decimal(0)
        }
    },
    color: "#e8e8e8",
    resource: "Tunnel Diggers",
    row: 5,
    onPrestige() {
        let cost = new Decimal(getNextAt(this.layer))
        player.ba.points = player.ba.points.sub(cost)
        player[this.layer].fuel = new Decimal(1)
        player[this.layer].time = new Decimal(0)
    },
    baseResource: "copper coins",
    baseAmount() { return player.ba.points },
    requires: new Decimal(25),
    type: "static",
    exponent: 1.5,
    hotkeys: [
        {key: "t", description: "T: Reset for Tunnels", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.w.rpgKey}},
    ],
    base: new Decimal(25),
    gainMult() {
        let value = new Decimal(1)
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        if (hasUpgrade('m', 12)) return true
        return true
    },    
    lengthBase() {
        let value = new Decimal(player[this.layer].points)
        return value
    },
    lengthMult() {
        let value = new Decimal(1)
        return value
    },
    lengthExp() {
        let value = new Decimal(1)
        return value
    },
    update(diff) {
        let fuel = new Decimal(0.02)
        let fuelMin = new Decimal(0)
        if (hasUpgrade(this.layer, 11)) fuelMin = new Decimal(0.01)
        if (player[this.layer].unlocked) {
            player[this.layer].time = player[this.layer].time.add(diff)
            player[this.layer].fuel = player[this.layer].fuel.sub(fuel)
            if (player[this.layer].fuel <= fuelMin) player[this.layer].fuel = new Decimal(fuelMin)
            player[this.layer].tunnellength = player[this.layer].tunnellength.add(tmp.t.lengthBase.pow(tmp.t.lengthExp).mul(tmp.t.lengthMult).mul(player[this.layer].fuel).mul(diff))
            if (hasUpgrade('t', 14)) player.bs.metal = player.bs.metal.add(tmp.t.lengthBase.pow(tmp.t.lengthExp).mul(tmp.t.lengthMult).mul(player[this.layer].fuel).mul(diff))        
        }
    },
    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player.ba.points) + " Copper Coins."
                }],
                ["display-text", function() {
                    return "Your tunnel drills have excavated " + format(player.t.tunnellength) + "ft of tunnels"
                }],
                ["display-text", function() {
                    return "Your tunnel drills have a " + format(player.t.fuel) + "x modifier from fuel"
                }],
                "blank",
                "upgrades"
            ]
        },
    },
    upgrades: {
        11: {
            title: "Fuel Supplier",
            description: "Fuel has a minimum of 0.01, rather than 0",
            cost: new Decimal(125),
            currencyDisplayName: "Copper Coins",
            currencyInternalName: "points",
            currencyLayer: 'ba',
        },
        12: {
            title: "Artificial Caves",
            description: "Use some of your tunnels to increase your Cave gain by 25%",
            cost: new Decimal(100),
            currencyDisplayName: "ft of Tunnels",
            currencyInternalName: "tunnellength",
            currencyLayer: 't',
        },
        13: {
            title: "Tunnel Network Alpha",
            description: "Using your tunnel network, you can identify likely adventurers, and directly entice them to come into your dungeon.",
            cost: new Decimal(1000),
            currencyDisplayName: "ft of Tunnels",
            currencyInternalName: "tunnellength",
            currencyLayer: 't',
            effect() {
                let value = new Decimal(player[this.layer].tunnellength).add(1)
                value = value.log(9).div(1.3).add(1)
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        14: {
            title: "Metallic Waste",
            description: "With advanced filtering devices, you can extract some metal as your tunnel diggers work.",
            cost: new Decimal(5),
            currencyDisplayName: "Silver Coins",
            currencyInternalName: "silver",
            currencyLayer: 'ba',
            unlocked() {
                if (hasUpgrade('ba', 13)) return true
                return false
            }
        }
    },
    
})