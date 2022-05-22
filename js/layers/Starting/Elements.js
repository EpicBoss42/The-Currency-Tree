addLayer("e", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            fire: new Decimal(0),
            fSec: new Decimal(0),
            water: new Decimal(0),
            wSec: new Decimal(0),
            earth: new Decimal(0),
            eSec: new Decimal(0),
            air: new Decimal(0),
            aSec: new Decimal(0),
            time: new Decimal(0),
        }
    },
    color: "#CFA441",
    resource: "Elemental Essence",
    row: 1,
    baseResource: "points",
    baseAmount() { return player.w.tpoints },
    requires: new Decimal(10),
    type: "normal",
    exponent: 0.3,
    hotkeys: [
        {key: "e", description: "E: Reset for Elemental Essence", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player.w.realKey}},
    ],
    doReset(x) {
        if (x === this.layer) {
            player.w.tpoints = new Decimal(0)
        }
        if (x === "v" || x === "ae" || x === "ti" || x === "sp") {
            layerDataReset(this.layer)
        }
    },
    gainMult() {
        let value = new Decimal(1)
        if (hasUpgrade(this.layer, 71)) value = value.mul(upgradeEffect(this.layer, 71))
        if (hasChallenge('v', 11)) value = value.mul(challengeEffect('v', 11))
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        if (inChallenge('v', 11)) value = value.mul(0.5)
        return value
    },
    layerShown() {
        if (hasUpgrade('m', 12)) return true
        return true
    },    
    fBase() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 11)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    fGainMult() {
        let value = new Decimal(1)
        let eBoost = new Decimal(player[this.layer].points)
        if (hasUpgrade(this.layer, 52)) eBoost = eBoost.mul(upgradeEffect(this.layer, 52))
        value = value.mul(eBoost)
        if (hasUpgrade(this.layer, 81)) value = value.mul(upgradeEffect(this.layer, 81))
        if (hasUpgrade(this.layer, 41)) value = value.div(upgradeEffect(this.layer, 41)[1])
        if (hasUpgrade(this.layer, 21)) value = value.mul(upgradeEffect(this.layer, 21)[0])
        return value
    },
    fGainExp() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 21)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    wBase() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 11)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    wGainMult() {
        let value = new Decimal(1)
        let eBoost = new Decimal(player[this.layer].points)
        if (hasUpgrade(this.layer, 52)) eBoost = eBoost.mul(upgradeEffect(this.layer, 52))
        if (hasUpgrade(this.layer, 82)) value = value.mul(upgradeEffect(this.layer, 82))
        if (hasUpgrade(this.layer, 61)) value = value.div(upgradeEffect(this.layer, 61)[1])
        if (hasUpgrade(this.layer, 41)) value = value.mul(upgradeEffect(this.layer, 41)[0])
        value = value.mul(eBoost)
        return value
    },
    wGainExp() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 21)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    aBase() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 11)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    aGainMult() {
        let value = new Decimal(1)
        let eBoost = new Decimal(player[this.layer].points)
        if (hasUpgrade(this.layer, 52)) eBoost = eBoost.mul(upgradeEffect(this.layer, 52))
        value = value.mul(eBoost)
        if (hasUpgrade(this.layer, 11)) value = value.mul(upgradeEffect(this.layer, 11))
        if (hasUpgrade(this.layer, 31)) value = value.mul(upgradeEffect(this.layer, 31))
        if (hasUpgrade(this.layer, 51)) value = value.mul(upgradeEffect(this.layer, 51))
        return value
    },
    aGainExp() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 21)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    eBase() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 11)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    eGainMult() {
        let value = new Decimal(1)
        let eBoost = new Decimal(player[this.layer].points)
        if (hasUpgrade(this.layer, 52)) eBoost = eBoost.mul(upgradeEffect(this.layer, 52))
        if (hasUpgrade(this.layer, 83)) value = value.mul(upgradeEffect(this.layer, 83))
        if (hasUpgrade(this.layer, 21)) value = value.div(upgradeEffect(this.layer, 21)[1])
        if (hasUpgrade(this.layer, 61)) value = value.mul(upgradeEffect(this.layer, 61)[0])
        value = value.mul(eBoost)
        return value
    },
    eGainExp() {
        let value = new Decimal(1)
        if (hasUpgrade('ae', 21)) value = value.add(upgradeEffect('ae', 11))
        return value
    },
    update(diff) {
        if (player.e.unlocked) {
            player.e.fSec = tmp.e.fBase.pow(tmp.e.fGainExp).mul(tmp.e.fGainMult)
            player.e.aSec = tmp.e.aBase.pow(tmp.e.aGainExp).mul(tmp.e.aGainMult)
            player.e.eSec = tmp.e.eBase.pow(tmp.e.eGainExp).mul(tmp.e.eGainMult)
            player.e.wSec = tmp.e.wBase.pow(tmp.e.wGainExp).mul(tmp.e.wGainMult)
            if (inChallenge('v', 11)) {
                player.e.fSec = player.e.fSec.pow(0.5)
                player.e.aSec = player.e.aSec.pow(0.5)
                player.e.eSec = player.e.eSec.pow(0.5)
                player.e.wSec = player.e.wSec.pow(0.5)
            }
            player.e.water = player.e.water.add(player.e.wSec.mul(diff))
            player.e.air = player.e.air.add(player.e.aSec.mul(diff))
            player.e.earth = player.e.earth.add(player.e.eSec.mul(diff))
            player.e.fire = player.e.fire.add(player.e.fSec.mul(diff))

        }
    },
    tabFormat: {
        "Fire": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player[this.layer].fire) + " Fire Essence"
                }],
                ["display-text", function() {
                    return "(" + format(player.e.fSec) + "/sec)"
                }],
                ["display-text", function() {
                    return "You have " + format(player.w.tpoints) + " Points"
                }],
                "blank",
                ["upgrades", ['1', '2']]
            ],
            glowColor: "#F53B00",
            shouldNotify() {return true}
        },
        "Water": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player[this.layer].water) + " Water Essence"
                }],
                ["display-text", function() {
                    return "(" + format(player.e.wSec) + "/sec)"
                }],
                ["display-text", function() {
                    return "You have " + format(player.w.tpoints) + " Points"
                }],
                "blank",
                ["upgrades", ['3', '4']]
            ],
            glowColor: "#1B61C6",
            shouldNotify() {return true}
        },
        "Earth": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player[this.layer].earth) + " Earth Essence"
                }],
                ["display-text", function() {
                    return "(" + format(player.e.eSec) + "/sec)"
                }],
                ["display-text", function() {
                    return "You have " + format(player.w.tpoints) + " Points"
                }],
                "blank",
                ["upgrades", ['5', '6']]
            ],
            glowColor: "#217427",
            shouldNotify() {return true}
        },
        "Air": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player[this.layer].air) + " Air Essence"
                }],
                ["display-text", function() {
                    return "(" + format(player.e.aSec) + "/sec)"
                }],
                ["display-text", function() {
                    return "You have " + format(player.w.tpoints) + " Points"
                }],
                "blank",
                ["upgrades", ['7', '8']]
            ],
            glowColor: "#FFFFFF",
            shouldNotify() {return true}
        }
    },
    upgrades: {
        11: {
            title: "Combustion",
            description: "Fire Essence increases Air Essence gain",
            cost: new Decimal(100),
            currencyDisplayName: "Fire Essence",
            currencyInternalName: "fire",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].fire)
                if (player[this.layer].fire > 0) {
                    value = value.pow(0.5).log(2).div(5)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        }, 
        12: {
            title: "Incineration",
            description: "Fire Essence increases Point gain",
            cost: new Decimal(1000),
            currencyDisplayName: "Fire Essence",
            currencyInternalName: "fire",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].fire)
                if (value > 0) {
                    value = value.pow(0.2).log(3).div(4)
                    if (hasUpgrade(this.layer, 13)) value = value.mul(2)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        13: {
            title: "Flash Fire",
            description: "Incineration is more effective",
            cost: new Decimal(5000),
            currencyDisplayName: "Fire Essence",
            currencyInternalName: "fire",
            currencyLayer: 'e',
        },
        21: {
            title: "Combustion",
            description: "Earth Essence gain is halved, but Fire Essence gain is doubled",
            cost: new Decimal(25000),
            currencyDisplayName: "Fire Essence",
            currencyInternalName: "fire",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(2)
                if (hasUpgrade(this.layer, 22)) value = value.add(1)
                if (hasUpgrade(this.layer, 24)) value = value.mul(3)
                let value2 = new Decimal(2)
                if (hasUpgrade(this.layer, 22)) value2 = value2.add(0.5)
                if (hasUpgrade(this.layer, 23)) value2 = value2.sub(1)
                if (hasUpgrade(this.layer, 24)) value2 = value2.mul(4)
                return [value, value2]
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)[0]) + "x buff, " + format(upgradeEffect(this.layer, this.id)[1]) + "x nerf"
            },
            unlocked() {
                if (inChallenge('v', 12)) return false
                return true
            }
        },
        22: {
            title: "Hotter Flames",
            description: "Combustion's buff is increased by 1, but it's nerf is increased by 0.5",
            cost: new Decimal(50000),
            currencyDisplayName: "Fire Essence",
            currencyInternalName: "fire",
            currencyLayer: 'e',
            unlocked() {
                if (inChallenge('v', 12)) return false
                return true
            }
        },
        23: {
            title: "More Fuel",
            description: "Combustion's nerf is decreased by 1",
            cost: new Decimal(100000),
            currencyDisplayName: "Fire Essence",
            currencyInternalName: "fire",
            currencyLayer: 'e',
            unlocked() {
                if (inChallenge('v', 12)) return false
                return true
            }
        },
        24: {
            title: "Solar Furnace",
            description: "The buff from Combustion is tripled, but the nerf is quadrupled",
            cost: new Decimal(250000),
            currencyDisplayName: "Fire Essence",
            currencyInternalName: "fire",
            currencyLayer: 'e',
            unlocked() {
                if (inChallenge('v', 12)) return false
                if (player.ae.unlocked || player.v.unlocked || player.sp.unlocked || player.ti.unlocked) return true
                return false
            }
        },
        31: {
            title: "Ocean Foam",
            description: "Water Essence increases Air Essence gain",
            cost: new Decimal(100),
            currencyDisplayName: "Water Essence",
            currencyInternalName: "water",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].water)
                if (player[this.layer].water > 0) {
                    value = value.pow(0.5).log(2).div(5)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        }, 
        32: {
            title: "Fishing",
            description: "Water Essence increases Point gain",
            cost: new Decimal(1500),
            currencyDisplayName: "Water Essence",
            currencyInternalName: "water",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].water)
                if (value > 0) {
                    value = value.pow(0.5).log(2)
                    if (!hasUpgrade(this.layer, 33)) value = value.div(7)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        33: {
            title: "Shark Bait",
            description: "Fishing is vastly more effective",
            cost: new Decimal(10000),
            currencyDisplayName: "Water Essence",
            currencyInternalName: "water",
            currencyLayer: 'e',
        },
        41: {
            title: "Extinguishment",
            description: "Fire Essence gain is halved, but Water Essence gain is doubled",
            cost: new Decimal(25000),
            currencyDisplayName: "Water Essence",
            currencyInternalName: "water",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(2)
                let value2 = new Decimal(2)
                if (hasUpgrade(this.layer, 42)) value = value.add(1)
                if (hasUpgrade(this.layer, 42)) value2 = value2.add(0.5)
                if (hasUpgrade(this.layer, 43)) value2 = value2.sub(1)
                return [value, value2]
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)[0]) + "x buff, " + format(upgradeEffect(this.layer, this.id)[1]) + "x nerf"
            },
            unlocked() {
                if (inChallenge('v', 12)) return false
                return true
            }
        },
        42: {
            title: "Colder Water",
            description: "Extinguishment's buff is increased by 1, but it's nerf is increased by 0.5",
            cost: new Decimal(50000),
            currencyDisplayName: "Water Essence",
            currencyInternalName: "water",
            currencyLayer: 'e',
            unlocked() {
                if (inChallenge('v', 12)) return false
                return true
            }
        },
        43: {
            title: "Backup Firestarters",
            description: "Extinguishment's nerf is decreased by 1",
            cost: new Decimal(100000),
            currencyDisplayName: "Water Essence",
            currencyInternalName: "water",
            currencyLayer: 'e',
            unlocked() {
                if (inChallenge('v', 12)) return false
                return true
            }
        },
        51: {
            title: "Whistling Canyons",
            description: "Earth Essence increases Air Essence Gain",
            cost: new Decimal(100),
            currencyDisplayName: "Earth Essence",
            currencyInternalName: "earth",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].earth)
                if (player[this.layer].earth > 0) {
                    value = value.pow(0.5).log(2).div(5)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        52: {
            title: "Elemental Boulders",
            description: "Earth Essence increases effect of Elemental Essence on individual Essence gain",
            cost: new Decimal(1250),
            currencyDisplayName: "Earth Essence",
            currencyInternalName: "earth",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].earth)
                if (value > 0) {
                    value = value.pow(0.25).log(5)
                    if (hasUpgrade(this.layer, 53)) value = value.mul(2)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        }, 
        53: {
            title: "Elemental Landslide",
            description: "Elemental Boulders is more effective",
            cost: new Decimal(10000),
            currencyDisplayName: "Earth Essence",
            currencyInternalName: "earth",
            currencyLayer: 'e',
        },
        61: {
            title: "Deposition",
            description: "Water Essence gain is halved, but Earth Essence gain is doubled",
            cost: new Decimal(25000),
            currencyDisplayName: "Earth Essence",
            currencyInternalName: "earth",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(2)
                let value2 = new Decimal(2)
                if (hasUpgrade(this.layer, 62)) value = value.add(1)
                if (hasUpgrade(this.layer, 62)) value2 = value2.add(0.5)
                if (hasUpgrade(this.layer, 63)) value2 = value2.sub(1)
                return [value, value2]
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)[0]) + "x buff, " + format(upgradeEffect(this.layer, this.id)[1]) + "x nerf"
            },
            unlocked() {
                if (inChallenge('v', 12)) return false
                return true
            }
        },
        62: {
            title: "Harder Stone",
            description: "Deposition's buff is increased by 1, but it's nerf is increased by 0.5",
            cost: new Decimal(50000),
            currencyDisplayName: "Earth Essence",
            currencyInternalName: "earth",
            currencyLayer: 'e',
            unlocked() {
                if (inChallenge('v', 12)) return false
                return true
            }
        },
        63: {
            title: "Larger Oceans",
            description: "Deposition's nerf is decreased by 1",
            cost: new Decimal(100000),
            currencyDisplayName: "Earth Essence",
            currencyInternalName: "earth",
            currencyLayer: 'e',
            unlocked() {
                if (inChallenge('v', 12)) return false
                return true
            }
        },
        71: {
            title: "Wind Power",
            description: "Air Essence increases Elemental Essence gain",
            cost: new Decimal(1000),
            currencyDisplayName: "Air Essence",
            currencyInternalName: "air",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].air)
                if (value == 0) value = 1
                if (player[this.layer].air > 0) {
                    value = value.pow(0.2).log(5).div(10)
                    if (hasUpgrade(this.layer, 72)) value = value.mul(5)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        72: {
            title: "Jet Stream",
            description: "Wind Power uses a better formula",
            cost: new Decimal(5000),
            currencyDisplayName: "Air Essence",
            currencyInternalName: "air",
            currencyLayer: 'e',
        },
        73: {
            title: "Chaos Theorem",
            description: "Air Essence increases point gain based on individual Essence amounts",
            cost: new Decimal(50000),
            currencyDisplayName: "Air Essence",
            currencyInternalName: "air",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].air)
                let value_f = new Decimal(player[this.layer].fire)
                let value_w = new Decimal(player[this.layer].water)
                let value_e = new Decimal(player[this.layer].earth)
                if (value > 0) {
                    value = value.pow(0.1).log(3)
                    value_f = value_f.pow(0.1).log(3).div(10).add(1)
                    value_w = value_f.pow(0.1).log(3).div(10).add(1)
                    value_e = value_e.pow(0.1).log(3).div(10).add(1)
                    value = value.mul(value_f)
                    value = value.mul(value_w)
                    value = value.mul(value_e)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        },
        81: {
            title: "Drifting Embers",
            description: "Air Essence increases Fire Essence gain",
            cost() {
                let value = new Decimal(15000)
                if (hasUpgrade(this.layer, 82)) value = value.mul(2)
                if (hasUpgrade(this.layer, 83)) value = value.mul(2)
                return value
            },
            currencyDisplayName: "Air Essence",
            currencyInternalName: "air",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].air)
                if (player[this.layer].air > 0) {
                    value = value.log(10)
                    if (hasUpgrade(this.layer, 82)) value = value.mul(1.5)
                    if (hasUpgrade(this.layer, 83)) value = value.mul(1.5)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            },
            unlocked() {
                if (inChallenge('v', 12)) return false
                return true
            }
        },
        82: {
            title: "Oceanic Vortex",
            description: "Air Essence increases Water Essence gain",
            cost() {
                let value = new Decimal(15000)
                if (hasUpgrade(this.layer, 81)) value = value.mul(2)
                if (hasUpgrade(this.layer, 83)) value = value.mul(2)
                return value
            },
            currencyDisplayName: "Air Essence",
            currencyInternalName: "air",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].air)
                if (player[this.layer].air > 0) {
                    value = value.log(10)
                    if (hasUpgrade(this.layer, 81)) value = value.mul(1.5)
                    if (hasUpgrade(this.layer, 83)) value = value.mul(1.5)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            },
            unlocked() {
                if (inChallenge('v', 12)) return false
                return true
            }
        },
        83: {
            title: "Wind Tunnels",
            description: "Air Essence increases Earth Essence gain",
            cost() {
                let value = new Decimal(15000)
                if (hasUpgrade(this.layer, 81)) value = value.mul(2)
                if (hasUpgrade(this.layer, 82)) value = value.mul(2)
                return value
            },
            currencyDisplayName: "Air Essence",
            currencyInternalName: "air",
            currencyLayer: 'e',
            effect() {
                let value = new Decimal(player[this.layer].air)
                if (player[this.layer].air > 0) {
                    value = value.log(10)
                    if (hasUpgrade(this.layer, 81)) value = value.mul(1.5)
                    if (hasUpgrade(this.layer, 82)) value = value.mul(1.5)
                    return value.add(1)
                }
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            },
            unlocked() {
                if (inChallenge('v', 12)) return false
                return true
            }
        }
    }, 
})
