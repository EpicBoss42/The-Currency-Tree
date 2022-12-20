addLayer("p_g_hl", {
    startData() { return { 
        unlocked: true, 
        points: new Decimal(0),
        seeds: new Decimal(1),
        seedSec: new Decimal(0),
        knowledge: new Decimal(0),
        knowSec: new Decimal(0),
        seedProg: new Decimal(0),
        herbs: {
            rainRoots: new Decimal(0),
            starGrain: new Decimal(0),
            moonSprout: new Decimal(0)
        }
    }},
    name: "Home Layer",
    symbol: "HL",
    color: "#EF0000", 
    resource: "Happiness",  
    row: 1,
    baseResource: "Comfort",   
    baseAmount() { return player.ygg.p_g_points}, 
    requires: new Decimal(10),          
    type: "normal",  
    exponent: 0.5,  
    passiveGeneration() {
        if (hasUpgrade(this.layer, 52)) return tmp.p_g_hl.herbEffects[2]
    },
    gainMult() {    
        let value = new Decimal(1)
        return value     
    },
    gainExp() {                        
        return new Decimal(1)
    },
    doReset(x) {
        if (x === this.layer) {
            player.ygg.p_g_points = new Decimal(0)
        } else if (x == "p_g") {
            layerDataReset(this.layer)
            player[this.layer].knowledge = new Decimal(0)
            player[this.layer].seeds = new Decimal(1)
            player[this.layer].seedProg = new Decimal(0)
        }
    },
    tabFormat: {
        "Main Tab": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player.ygg.p_g_points) + " Comfort"
                }],
                "blank",
                ["upgrades", ["1", "2"]]
            ]
        },
        "Greenhouse": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player.ygg.p_g_points) + " Comfort"
                }],
                ["display-text", function() {
                    return "You have " + format(player[this.layer].seeds) + " Seeds"
                }],
                ["display-text", function() {
                    return "(" + format(player[this.layer].seedSec) + "/sec)"
                }],
                "blank",
                ["bar", "seedBar"],
                "blank",
                ["buyables", ["1"]]
            ],
            unlocked() {return hasUpgrade("p_g_hl", 21)}
        },
        "Library": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player.ygg.p_g_points) + " Comfort"
                }],
                ["display-text", function() {
                    return "You have " + format(player[this.layer].knowledge) + " Knowledge"
                }],
                ["display-text", function() {
                    return "(" + format(player[this.layer].knowSec) + "/sec)"
                }],
                "blank",
                ["upgrade-tree", [["31"], ["41", "32", "51"], ["42", "33", "52"]]]
            ],
            unlocked() {return hasUpgrade("p_g_hl", 22)}
        },
        "Kitchen": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player.ygg.p_g_points) + " Comfort"
                }],
                "blank",
                ["display-text", "NYI, Sorry"],
                // ["buyables", ["1"]]
            ],
            unlocked() {return hasUpgrade("p_g_hl", 23)}
        },
        "Plant Storage": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text", function() {
                    if (hasUpgrade(this.layer, 52)) return "Clipped Rainbow Roots: "  + format(player[this.layer].herbs.rainRoots) + ", giving a " + format(tmp.p_g_hl.herbEffects[0]) + "x boost to Knowledge gain"
                    return "Clipped Rainbow Roots: " + format(player[this.layer].herbs.rainRoots)
                }],
                ["display-text", function() {
                    if (getBuyableAmount(this.layer, 11).lt(7)) return ""
                    if (hasUpgrade(this.layer, 52)) return "Stardust Grains: "  + format(player[this.layer].herbs.starGrain) + ", giving a " + format(tmp.p_g_hl.herbEffects[1]) + "x boost to Seed gain"
                    return "Stardust Grains: " + format(player[this.layer].herbs.starGrain)
                }],
                ["display-text", function() {
                    if (getBuyableAmount(this.layer, 12).lt(5)) return ""
                    if (hasUpgrade(this.layer, 52)) return "Moon Sprouts: "  + format(player[this.layer].herbs.moonSprout) + ", giving " + format(tmp.p_g_hl.herbEffects[2].mul(100)) + "% of Happiness gain on reset each second"
                    return "Moon Sprouts: " + format(player[this.layer].herbs.moonSprout)
                }]
            ],
            unlocked() {return hasUpgrade("p_g_hl", 21)}
        }
    },
    update(diff) {

        let seedProg = new Decimal(0.2)

        player[this.layer].seedProg = player[this.layer].seedProg.add(seedProg.mul(diff))
        if (player[this.layer].seedProg.gte(1)) {
            player[this.layer].seedProg = new Decimal(0)
            
            
            player[this.layer].seeds = player[this.layer].seeds.add(buyableEffect(this.layer, 11)[0])
            player[this.layer].herbs.rainRoots = player[this.layer].herbs.rainRoots.add(buyableEffect(this.layer, 11)[1])

            player[this.layer].seeds = player[this.layer].seeds.add(buyableEffect(this.layer, 12)[0])
            player[this.layer].herbs.starGrain = player[this.layer].herbs.starGrain.add(buyableEffect(this.layer, 12)[1])

            player[this.layer].seeds = player[this.layer].seeds.add(buyableEffect(this.layer, 13)[0])
            player[this.layer].herbs.moonSprout = player[this.layer].herbs.moonSprout.add(buyableEffect(this.layer, 13)[1])
        }

        let seedGain = new Decimal(0)
        
        seedGain = seedGain.add(buyableEffect(this.layer, 11)[0])
        seedGain = seedGain.add(buyableEffect(this.layer, 12)[0])
        seedGain = seedGain.add(buyableEffect(this.layer, 13)[0])
        seedGain = seedGain.mul(seedProg)
        player[this.layer].seedSec = seedGain

        let knowGain = new Decimal(0)

        if (hasUpgrade(this.layer, 31)) knowGain = knowGain.add(1)
        if (hasUpgrade(this.layer, 32)) knowGain = knowGain.mul(2)
        if (hasUpgrade(this.layer, 33)) knowGain = knowGain.mul(1.5)

        if (hasUpgrade(this.layer, 52)) knowGain = knowGain.mul(tmp.p_g_hl.herbEffects[0])

        player[this.layer].knowledge = player[this.layer].knowledge.add(knowGain.mul(diff))
        player[this.layer].knowSec = knowGain
    },
    layerShown() { return true },       
    herbEffects() {
        let rainRoots = new Decimal(player[this.layer].herbs.rainRoots)
        let starGrain = new Decimal(player[this.layer].herbs.starGrain)
        let moonSprout = new Decimal(player[this.layer].herbs.moonSprout)

        rainRoots = rainRoots.add(1).pow(0.1).log(5).add(1)
        starGrain = starGrain.add(1).pow(0.15).log(5.5).add(1)
        moonSprout = moonSprout.add(1).pow(0.05).log(6)

        return [rainRoots, starGrain, moonSprout]
    },
    upgrades: {
        11: {
            title: "Cozy Couch",
            description: "A comfortable couch to relax on after a long day.",
            cost: new Decimal(1),
            effect() {
              let base = new Decimal(player[this.layer].points)
              base = base.add(1).pow(0.5).add(1)
              return base.max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        12: {
            title: "Cozy Fireplace",
            description: "A warm and inviting fireplace to snuggle up to on cold nights.",
            cost: new Decimal(5),
            effect() {
              let base = new Decimal(player[this.layer].points)
              base = base.add(1).pow(0.35).add(1)
              return base.max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        13: {
            title: "Luxurious Jacuzzi",
            description: "A large, bubbly hot tub to unwind in after a long day of clicking.",
            cost: new Decimal(10),
        },
        14: {
            title: "Luxurious Bedroom",
            description: "A comfortable and stylish bedroom to recharge and rejuvenate in after a long day of idling.",
            cost: new Decimal(25),
            effect() {
                let base = new Decimal(player.points)
                base = base.div(3).add(1).log(5)
                base = base.add(1)
                return base.max(1)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"}
        },
        15: {
            title: "Private Sauna",
            description: "A relaxing, steamy space to unwind and detox in.",
            cost: new Decimal(50),
        },
        21: {
            title: "High-Tech Greenhouse",
            description: "A climate-controlled greenhouse to grow a variety of plants and crops to sustain your idle empire.",
            cost: new Decimal(500)
        },
        22: {
            title: "Expansive Library",
            description: "A large, well-stocked library to research new upgrades and technologies for your idle empire.",
            cost: new Decimal(2500)
        }, 
        23: {
            title: "Gourmet Kitchen",
            description: "A state-of-the-art kitchen to whip up delicious meals and snacks to keep your idle empire running smoothly.",
            cost: new Decimal(10000)
        },
        31: {
            title: "Books of Knowledge",
            description: "Begin studying your books to gain 1 knowledge per second",
            cost: new Decimal(100),
            branches: ["32", "41", "51"],
            canAfford() {return hasUpgrade(this.layer, 22)}
        },
        32: { 
            title: "Rare Maps",
            description: "Add rare maps to your library, allowing users to explore and learn about different parts of the world and their histories in greater detail.<br>Doubles Knowledge Gain",
            currencyDisplayName: "Knowledge",
            currencyInternalName: "knowledge",
            currencyLayer: "p_g_hl",
            cost() {
                let base = new Decimal(50)
                if (hasUpgrade(this.layer, 41)) base = base.mul(1.5)
                if (hasUpgrade(this.layer, 51)) base = base.mul(1.5)
                return base
            },
            canAfford() {return hasUpgrade(this.layer, 31)}
        },
        33: {
            title: "Vintage Books",
            description: "Add vintage books to your library, allowing users to discover unique and valuable information from the past.<br>Increases Knowledge gain by 50%",
            currencyDisplayName: "Knowledge",
            currencyInternalName: "knowledge",
            currencyLayer: "p_g_hl",
            cost() {
                let base = new Decimal(250)
                if (hasUpgrade(this.layer, 42)) base = base.mul(2)
                if (hasUpgrade(this.layer, 52)) base = base.mul(2)
                return base
            },
            canAfford() {return hasUpgrade(this.layer, 32)},
            branches: ["32"]
        },
        41: {
            title: "Soft Pillows",
            description: "Upgrade your pillows to be softer and more comfortable, increasing your comfort gain by 10%",
            currencyDisplayName: "Knowledge",
            currencyInternalName: "knowledge",
            currencyLayer: "p_g_hl",
            cost() {
                let base = new Decimal(50)
                if (hasUpgrade(this.layer, 32)) base = base.mul(1.5)
                if (hasUpgrade(this.layer, 51)) base = base.mul(1.5)
                return base
            },
            canAfford() {return hasUpgrade(this.layer, 31)}
        },
        42: {
            title: "Cozy Blankets",
            description: "Add some cozy blankets to your bed, increasing your comfort gain by 25%",
            currencyDisplayName: "Knowledge",
            currencyInternalName: "knowledge",
            currencyLayer: "p_g_hl",
            cost() {
                let base = new Decimal(250)
                if (hasUpgrade(this.layer, 33)) base = base.mul(2)
                if (hasUpgrade(this.layer, 52)) base = base.mul(2)
                return base
            },
            canAfford() {return hasUpgrade(this.layer, 41)},
            branches: ["41"]
        },
        51: { 
            title: "Vertical Gardens",
            description: "Upgrade your space with vertical gardening systems, increasing seed gain by 10%",
            currencyDisplayName: "Knowledge",
            currencyInternalName: "knowledge",
            currencyLayer: "p_g_hl",
            cost() {
                let base = new Decimal(50)
                if (hasUpgrade(this.layer, 41)) base = base.mul(1.5)
                if (hasUpgrade(this.layer, 32)) base = base.mul(1.5)
                return base
            },
            canAfford() {return hasUpgrade(this.layer, 31)}
        },
        52: { 
            title: "Mystical Herbs",
            description: "The first three plant products have effects",
            currencyDisplayName: "Knowledge",
            currencyInternalName: "knowledge",
            currencyLayer: "p_g_hl",
            cost() {
                let base = new Decimal(250)
                if (hasUpgrade(this.layer, 33)) base = base.mul(2)
                if (hasUpgrade(this.layer, 42)) base = base.mul(2)
                return base
            },
            canAfford() {return hasUpgrade(this.layer, 51)},
            branches: ["51"]
        },
    },
    bars: {
        seedBar: {
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                let base = new Decimal(player[this.layer].seedProg)
                base = base
                return base
            },
            display() {
                return "Current seed growth: " + format(this.progress().mul(100)) + "%"
            },
            fillStyle: {
                "background-color": "rgb(234, 0, 0)"
            },

        }
    },
    buyables: {
        11: {
            title: "Rainbow Root",
            cost(x) {
                let base = new Decimal(1)
                let y = new Decimal(x)
                base = base.mul(y.add(1).pow(2).mul(1.5))
                if (y.lt(1)) base = new Decimal(1)
                return base
            },
            display() {
                return `
                A root vegetable with a rainbow-colored exterior and a crisp, sweet flavor.  Easily grown, it serves as the basis of your greenhouse.<br>
                Effect: Creates ` + format(buyableEffect(this.layer, this.id)[0]) + " Seeds per growth cycle, and gives " + format(buyableEffect(this.layer, this.id)[1]) + ` Clipped Rainbow Roots<br>
                You own: ` + format(getBuyableAmount(this.layer, this.id)) + `<br>
                Cost of next one: ` + format(this.cost()) + " Seeds"
            },
            effect(x) {
                let baseSeed = new Decimal(1)
                let baseClip = new Decimal(0.05)

                if (hasUpgrade(this.layer, 51)) baseSeed = baseSeed.mul(1.1)
                if (hasUpgrade(this.layer, 52)) baseSeed = baseSeed.mul(tmp.p_g_hl.herbEffects[1])

                baseClip = baseClip.mul(x)
                baseSeed = baseSeed.mul(x)
                let base = [baseSeed, baseClip]
                return base
            },
            canAfford() {return player[this.layer].seeds.gte(this.cost()) && hasUpgrade(this.layer, 21)},
            buy() {
                let num = new Decimal(1)
                player[this.layer].seeds = player[this.layer].seeds.sub(this.cost().mul(num))
                addBuyables(this.layer, this.id, num)
            }
        },
        12: {
            title: "Stardust Wheat",
            cost(x) {
                let base = new Decimal(1)
                let y = new Decimal(x)
                base = base.mul(y.add(2).pow(3).mul(2))
                return base
            },
            display() {
                return `
                A variety of wheat with shimmering, silver-colored grains that are said to have magical properties.  Cross-pollination with this plant increases seed yields.<br>
                Effect: Creates ` + format(buyableEffect(this.layer, this.id)[0]) + " Seeds per growth cycle, and gives " + format(buyableEffect(this.layer, this.id)[1]) + ` Stardust Grains<br>
                You own: ` + format(getBuyableAmount(this.layer, this.id)) + `<br>
                Cost of next one: ` + format(this.cost()) + " Seeds"
            },
            effect(x) {
                let baseSeed = new Decimal(1)
                let baseGrain = new Decimal(0.1)

                if (hasUpgrade(this.layer, 51)) baseSeed = baseSeed.mul(1.1)
                if (hasUpgrade(this.layer, 52)) baseSeed = baseSeed.mul(tmp.p_g_hl.herbEffects[1])

                return [baseSeed.mul(x), baseGrain.mul(x)]
            },
            canAfford() {return player[this.layer].seeds.gte(this.cost())},
            buy() {
                let num = new Decimal(1)
                player[this.layer].seeds = player[this.layer].seeds.sub(this.cost().mul(num))
                addBuyables(this.layer, this.id, num)
            },
            unlocked() {return getBuyableAmount(this.layer, 11).gte(7)}
        },
        13: {
            title: "Moonbean",
            cost(x) {
                let base = new Decimal(1)
                let y = new Decimal(x)
                base = base.mul(y.add(3).pow(3.25).mul(3))
                return base
            },
            display() {
                return `
                Moonbeans have a unique, slightly nutty flavor and are rich in protein and other nutrients.  They seem to increase happiness of those who see them.<br>
                Effect: Creates ` + format(buyableEffect(this.layer, this.id)[0]) + " Seeds per growth cycle, and gives " + format(buyableEffect(this.layer, this.id)[1]) + ` Moon Sprouts<br>
                You own: ` + format(getBuyableAmount(this.layer, this.id)) + `<br>
                Cost of next one: ` + format(this.cost()) + " Seeds"
            },
            effect(x) {
                let baseSeed = new Decimal(1)
                let baseGrain = new Decimal(0.15)

                if (hasUpgrade(this.layer, 51)) baseSeed = baseSeed.mul(1.1)
                if (hasUpgrade(this.layer, 52)) baseSeed = baseSeed.mul(tmp.p_g_hl.herbEffects[1])

                return [baseSeed.mul(x), baseGrain.mul(x)]
            },
            canAfford() {return player[this.layer].seeds.gte(this.cost())},
            buy() {
                let num = new Decimal(1)
                player[this.layer].seeds = player[this.layer].seeds.sub(this.cost().mul(num))
                addBuyables(this.layer, this.id, num)
            },
            unlocked() {return getBuyableAmount(this.layer, 12).gte(5)}
        }
    }
})
