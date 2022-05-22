addLayer("ti", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            time: new Decimal(0),
            bestTime: new Decimal(21474836),
            lastTime: new Decimal(0),
        }
    },
    color: "#3AFF00",
    resource: "Time Essence",
    row: 2,
    branches: ['e'],
    baseResource: "Elemental Essence",
    baseAmount() { return player.e.points },
    requires: new Decimal(100),
    type: "normal",
    exponent: 0.25,
    hotkeys: [
        {key: "t", description: "T: Reset for Time Essence", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.w.realKey}},
    ],
    gainMult() {
        let value = new Decimal(1)
        if (hasUpgrade(this.layer, 14)) value = value.mul(upgradeEffect(this.layer, 14))
        if (hasUpgrade('sp', 13)) value = value.mul(upgradeEffect('sp', 13))
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        return true
    },  
    getTime() {
        return new Decimal(player[this.layer].time)
    },
    getBest() {
        return new Decimal(player[this.layer].bestTime)
    },
    doPrestige(x) {
        if (x == "ti") {

        }
    },
    onPrestige() {
        let keptUpgrades = []
        player[this.layer].lastTime = player[this.layer].time
        if (new Decimal(player[this.layer].bestTime).min(player[this.layer].time) == player[this.layer].time) player[this.layer].bestTime = player[this.layer].time
        player[this.layer].time = new Decimal(0)
        player.w.tpoints = new Decimal(0)
        player[this.layer].upgrades = keptUpgrades
    },
    update(diff) {
        let mult = new Decimal(1)
        if (hasUpgrade(this.layer, 13)) mult = new Decimal(upgradeEffect(this.layer, 13))
        player[this.layer].time = player[this.layer].time.add(new Decimal(1).mul(diff).mul(mult))
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player.e.points) + " Elemental Essence"
                }],
                ["display-text", function() {
                    let suffix = " seconds "
                    let tV = tmp.ti.getTime
                    if (tV > 60) {
                        suffix = " minutes " 
                        tV = tV.div(60)
                        if (tV > 60) {
                            suffix = " hours " 
                            tV = tV.div(60)
                            if (tV > 24) {
                                suffix = " days " 
                                tV = tV.div(24)
                                if (tV > 7) {
                                    suffix = " weeks " 
                                    tV = tV.div(7)
                                }
                            }
                        }
                    } 
                    return "You have spent " + format(tV) + suffix + "on this Time reset"
                }],
                ["display-text", function() {
                    let suffix = " seconds"
                    let bV = tmp.ti.getBest
                    if (bV > 60) {
                        suffix = " minutes " 
                        bV = bV.div(60)
                        if (bV > 60) {
                            suffix = " hours " 
                            bV = bV.div(60)
                            if (bV > 24) {
                                suffix = " days " 
                                bV = bV.div(24)
                                if (bV > 7) {
                                    suffix = " weeks " 
                                    bV = bV.div(7)
                                }
                            }
                        }
                    }
                    return "Your best time is " + format(bV) + suffix
                }],
                ["display-text", function() {
                    let suffix = " seconds"
                    let bV = player[this.layer].lastTime
                    if (bV > 60) {
                        suffix = " minutes " 
                        bV = bV.div(60)
                        if (bV > 60) {
                            suffix = " hours " 
                            bV = bV.div(60)
                            if (bV > 24) {
                                suffix = " days " 
                                bV = bV.div(24)
                                if (bV > 7) {
                                    suffix = " weeks " 
                                    bV = bV.div(7)
                                }
                            }
                        }
                    }
                    return "Your last reset took " + format(bV) + suffix
                }],
                "blank",
                "upgrades",
            ],
        },  
    },
    upgrades: {
        11: {
            title: "Time marches on",
            description: "Increase point gain based on time this run",
            cost: new Decimal(-30),
            currencyDisplayName: "Seconds",
            currencyInternalName: "time",
            currencyLayer: 'ti',
            effect() {
                let value = new Decimal(player[this.layer].time)
                value = value.sub(30)
                if (value > 0) {
                    value = value.div(100).pow(0.1).div(2).add(1).log(3)
                    return value.add(1)
                }
            },
            fullDisplay() {
                if (player[this.layer].bestTime > 300) {
                    return `
                        Time Marches On<br>
                        Increase point gain based on time this run<br>
                        Requires sub-5 minutes best time`
                }
                return `
                    Time Marches On<br>
                    Increase point gain based on time this run<br>
                    Currently: ` + format(upgradeEffect(this.layer, this.id)) + `x<br>
                    <br>
                    Cost: +30 Seconds`
            },
            canAfford() {
                if (player[this.layer].bestTime > 300) return false
                return true
            }
        },
        12: {
            title: "Not Enough Time",
            description: "The difference between time this run and best time increases point gain",
            cost: new Decimal(-60),
            currencyDisplayName: "Minute",
            currencyInternalName: "time",
            currencyLayer: 'ti',
            effect() {
                let value = new Decimal(player[this.layer].time)
                value = value.sub(60)
                value = value.sub(player[this.layer].bestTime).abs()
                if (value > 0) {
                    value = value.div(2).log(10).add(1)
                    return value
                }
            },
            fullDisplay() {
                if (player[this.layer].bestTime > 270) {
                    return `
                        Not Enough Time<br>
                        The difference between time this run and best time increases point gain<br>
                        Requires sub-4:30 minutes best time`
                }
                return `
                    Not Enough Time<br>
                    The difference between time this run and best time increases point gain<br>
                    Currently: ` + format(upgradeEffect(this.layer, this.id)) + `x<br>
                    <br>
                    Cost: +1 Minute`
            },
            canAfford() {
                if (player[this.layer].bestTime > 270) return false
                return true
            }
        },
        13: {
            title: "Burning Time",
            description: "Time runs faster based on Time Essence",
            cost: new Decimal(-120),
            currencyDisplayName: "Minutes",
            currencyInternalName: "time",
            currencyLayer: 'ti',
            effect() {
                let value = new Decimal(player[this.layer].points)
                if (value > 0) {
                    value = value.log(4)
                    return value.add(1)
                }
            },
            fullDisplay() {
                if (player[this.layer].bestTime > 240) {
                    return `
                        Burning Time<br>
                        Time runs faster based on Time Essence<br>
                        Requires sub-4 minutes best time`
                }
                return `
                    Burning Time<br>
                    Time runs faster based on Time Essence<br>
                    Currently: ` + format(upgradeEffect(this.layer, this.id)) + `x<br>
                    <br>
                    Cost: +2 Minutes`
            },
            canAfford() {
                if (player[this.layer].bestTime > 240) return false
                return true
            }
        },
        14: {
            cost: new Decimal(-180),
            currencyInternalName: "time",
            currencyLayer: 'ti',
            effect() {
                let value = new Decimal(player[this.layer].lastTime)
                if (value > 0) {
                    value = value.div(100).pow(0.5).log(3)
                    return value.add(1)
                }
            },
            fullDisplay() {
                if (player[this.layer].bestTime > 180) {
                    return `
                        Unstable Loop<br>
                        Last reset time increases Time Essence gain<br>
                        Requires sub-3 minutes best time`
                }
                return `
                    Unstable Loop<br>
                    Last reset time increases Time Essence gain<br>
                    Currently: ` + format(upgradeEffect(this.layer, this.id)) + `x<br>
                    <br>
                    Cost: +3 Minutes`
            },
            canAfford() {
                if (player[this.layer].bestTime > 180) return false
                return true
            }
        },
        15: {
            cost: new Decimal(-210),
            currencyInternalName: "time",
            currencyLayer: 'ti',
            effect() {
                let value = new Decimal(player[this.layer].time)
                value = value.sub(210)
                value = value.div(2).pow(0.5).div(10).add(1)
                return value.max(1)
            },
            fullDisplay() {
                if (player[this.layer].bestTime > 150) {
                    return `
                    Space-Time Link<br>
                    Current Time increases Space Essence gain<br>
                    Requires sub-2:30 best time`
                }
                return `
                Space-Time Link<br>
                Current Time increases Space Essence gain<br>
                Currently: ` + format(upgradeEffect(this.layer, this.id))  + `x<br>
                <br>
                Cost: +3:30 Minutes`
            },
            canAfford() {
                if (player[this.layer].bestTime > 150) return false
                return true
            }
        },
        21: {
            cost: new Decimal(-300),
            currencyInternalName: "time",
            currencyLayer: 'ti',
            effect() {
                let value = new Decimal(player[this.layer].bestTime)
                if (value > 0) {
                    value = value.div(60).log(5)
                    value = new Decimal(2).sub(value)
                    return value.add(1).max(0.01)
                }
            },
            fullDisplay() {
                if ((600 < player[this.layer].time || 300 > player[this.layer].time) && !hasUpgrade(this.layer, this.id)) {
                    return `
                        Lightning Fast<br>
                        Best reset time increases point gain<br>
                        Requires current run time between 5 and 10 minutes`
                }
                return `
                    Lightning Fast<br>
                    Best reset time increases point gain<br>
                    Currently: ` + format(upgradeEffect(this.layer, this.id)) + `x<br>
                    <br>
                    Cost: +5 minutes`
            },
            canAfford() {
                if (600 < player[this.layer].time || 300 > player[this.layer].time) return false
                return true
            }
        }
    },
})
