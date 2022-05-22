addLayer("w", {
    startData() {
        return {
            unlocked: true,
            //Above line is temporary, fix later
            points: new Decimal(0),
            tpoints: new Decimal(0),
            tSec: new Decimal(0),
            copper: new Decimal(10),
            copperSec: new Decimal(0),
            realKey: true,
            rpgKey: false,
        }
    },
    color: "#e1e1e1",
    image: "https://github.com/EpicBoss42/The-World-Tree/raw/master/resources/Portal.png",
    leftTab: true,
    resource: "Wormholes",
    row: 100,
    baseResource: "points",
    baseAmount() { return player.points },
    requires: new Decimal(1),
    type: "normal",
    exponent: 1,
    copperGainMult() {
        let value = new Decimal(1)
        return value
    },
    copperGainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        if (true) return true
        return "ghost"
    },    
    unlocked() {
        return true
    },
    update(diff) {
        let tGain = new Decimal(1)
        //Normal Point Addition
        if (hasUpgrade('ae', 12)) tGain = tGain.add(upgradeEffect('ae', 12))
        //Normal Point Multipliers
        if (hasUpgrade('e', 12)) tGain = tGain.mul(upgradeEffect('e', 12))
        if (hasUpgrade('e', 32)) tGain = tGain.mul(upgradeEffect('e', 32))
        if (hasUpgrade('e', 73)) tGain = tGain.mul(upgradeEffect('e', 73))
        if (hasUpgrade('ti', 11)) tGain = tGain.mul(upgradeEffect('ti', 11))
        if (hasUpgrade('ti', 12)) tGain = tGain.mul(upgradeEffect('ti', 12))
        if (hasUpgrade('ti', 21)) tGain = tGain.mul(upgradeEffect('ti', 21))
        if (hasChallenge('v', 11)) tGain = tGain.mul(challengeEffect('v', 11))
        if (hasUpgrade('sp', 11)) tGain = tGain.mul(upgradeEffect('sp', 11))
        if (hasUpgrade('sp', 24)) tGain = tGain.mul(upgradeEffect('sp', 24)[1])
        if (player.v.unlocked) tGain = tGain.mul(tmp.v.effect)
        //Normal Point Exponent
        //Normal Point Challenge Effects
        if (inChallenge('v', 11)) tGain = tGain.pow(0.5)

        player[this.layer].tSec = tGain
        player[this.layer].tpoints = player[this.layer].tpoints.add(tGain.mul(diff))
        if (player.points != player[this.layer].tpoints) player.points = player[this.layer].tpoints        

        //Copper Point Gain
        let copperGain = new Decimal(0)
            if (hasUpgrade('ba', 11)) copperGain = copperGain.add(upgradeEffect('ba', 11))
            if (hasUpgrade('s', 11)) copperGain = copperGain.add(buyableEffect('s', 11))
            if (hasUpgrade('s', 12)) copperGain = copperGain.add(buyableEffect('s', 12))
            if (hasUpgrade('s', 13)) copperGain = copperGain.add(buyableEffect('s', 13))
            if (hasUpgrade('si', 13)) copperGain = copperGain.mul(upgradeEffect('si', 13))
            if (hasUpgrade('c', 14)) copperGain = copperGain.mul(upgradeEffect('c', 14))
            if (player.m.unlocked) copperGain = copperGain.mul(buyableEffect('m', 11))
            if (hasUpgrade('b', 21)) copperGain = copperGain.mul(upgradeEffect('b', 21))
            if (hasUpgrade('t', 13)) copperGain = copperGain.mul(upgradeEffect('t', 13))
            if (hasUpgrade('a', 11)) {
                if (hasUpgrade('g', 11)) copperGain = copperGain.mul(upgradeEffect('g', 11))
            } else {
            if (hasUpgrade('g', 11)) copperGain = copperGain.pow(upgradeEffect('g', 11))
            if (hasUpgrade('g', 11) && getBuyableAmount('g', 11) > 0) copperGain = copperGain.pow(buyableEffect('g', 11))
            }
            if (copperGain == 0 && player.s.points == 0 && player.w.copper <= 10) copperGain = copperGain.add(0.1)
            if (copperGain >= 1000000000000) {
                copperGain = copperGain.sub(1000000000000)
                if (copperGain <= 0) copperGain = new Decimal(1)
                copperGain = copperGain.log(5)
                copperGain = copperGain.add(1000000000000)
            }
        player.w.copper = player.w.copper.add(copperGain.mul(diff))
        player.w.copperSec = copperGain
    },
    tabFormat: {
        "The Real World": {
            content: [
                ["display-text", "Toggle this world's Hotkeys"],
                ["display-text", "(More than one at once may cause problems)"],
                "blank",
                ["toggle", ["w", "realKey"]],
                "blank",
                ["display-text", function() {
                    return "You have " + format(player[this.layer].tpoints) + " Points<br>(" + format(player[this.layer].tSec) + "/sec)"
                }],
                ["tree", [["v"], ["ae", "e", "ti"], ["sp"], ["w"]]]
            ]
        },
        "RPG Monster World": {
            content: [
                ["display-text", "Toggle this world's Hotkeys"],
                ["display-text", "(More than one at once may cause problems)"],
                "blank",
                ["toggle", ["w", "rpgKey"]],
                "blank",
                ["display-text", function() {
                    return "You have " + format(player[this.layer].copper) + " Copper Points"
                }],
                ["display-text", function() {
                    return "(" + format(player[this.layer].copperSec) + "/sec)"
                }],
                ["tree", [["a"], ["s"], ["c", "si"], ["b", "m", "g"]]]
            ]
        }
    },
    upgrades: {
        
    },
})
