addLayer("v", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#2C2C2C",
    resource: "Void Essence",
    row: 2,
    branches: ['e'],
    baseResource: "Elemental Essence",
    baseAmount() { return player.e.points },
    requires: new Decimal(100),
    type: "normal",
    exponent: 0.25,
    hotkeys: [
        {key: "v", description: "V: Reset for Void Essence", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.w.realKey}},
    ],
    gainMult() {
        let value = new Decimal(1)
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        if (player.e.points >= 75) return true
        return true
    },    
    doReset(x) {
        if (x === this.layer) {
            player.w.tpoints = new Decimal(0)
        }
    },
    effect() {
        let value = new Decimal(1)
        value = value.mul(player[this.layer].points.add(1))
        return value
    },
    effectDescription() {
        return "which are multiplying point generation by " + format(tmp.v.effect) + "x."
    },
    upgrades: {
        
    },
    challenges: {
        11: {
            name: "Void's Consumption",
            challengeDescription: "All previous resource gain is raised ^0.5",
            goalDescription: "100 Elemental Essence",
            canComplete() {
                if (player.e.points >= 100) return true
                return false
            },
            rewardDescription: "Increase Elemental Essence and Point gain based on Void Essence",
            rewardEffect() {
                let value = new Decimal(player[this.layer].points)
                value = value.mul(0.5).add(1).log(3)
                if (inChallenge('v', 12)) return new Decimal(1)
                return value.add(1)
            },
            rewardDisplay() {
                return format(challengeEffect(this.layer, this.id)) + "x"
            },
        },
        12: {
            name: "Power of the Void",
            challengeDescription: "Only the first row of each Elemental essence upgrades are available, and previous Void challenge rewards as well as Aether upgrades have no effect",
            goalDescription: "250 Elemental Essence",
            canComplete() {
                return (player.e.points >= 250)
            },
            rewardDescription: /*"Unlock Void Upgrades, and unlock a third row of Space upgrades" */ "Not Yet Implemented",
            unlocked() {
                return hasUpgrade('sp', 15)
            }
        }
    }
})
