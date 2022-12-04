addLayer("ygg", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            leaves: new Decimal(0),
            leafs: new Decimal(0),
            p_s_points: new Decimal(0),
            p_s_gain: new Decimal(0),
            p_p_points: new Decimal(1),
            p_p_gain: new Decimal(0)
        }
    },
    name: "Yggdrasil",
    color: "#C0550F",
    resource: "Branches",
    row: 10,
    exponent: 1,
    baseResource: "Omnipoints",
    baseAmount() { return player.points },
    requires: new Decimal(0),
    type: "custom",
    gainMult() {
        let value = new Decimal(1)
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        return true
    },    
    getResetGain() {
        return new Decimal(1)
    },
    getNextAt() {
        if (player[this.layer].points < 1) return new Decimal(1)
        return new Decimal(1e10)
    },
    canReset() {
        return player.points.gte(tmp.ygg.getNextAt)
    },
    prestigeNotify() {
        return tmp.ygg.canReset
    },
    prestigeButtonText() {
        return `Reset for 1 Branch<br><br>
        Next at ` + format(tmp.ygg.getNextAt) + " Omnipoints"
    },
    leftTab: true,
    tabFormat: {
        "Omniworld": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text", function() {
                    return "You have " + format(player.points) + " Omnipoints"
                }],
                ["display-text", function() {
                    return "You have " + format(player[this.layer].leaves) + " Leaves (" + format(player[this.layer].leafs) + "/sec)"
                }],
                "blank",
                "upgrades"
            ]
        },
        "Protoworld": {
            content: [
                "main-display",
                "blank",
                "",
                ["microtabs", "proto"]
            ],
            unlocked() {return hasUpgrade("ygg", 11)}
        },
        "Credits": {
            content: [
                ["display-text", function() {
                    return `Credit for the original versions of the subtrees goes to the following:<br>
                    SuperJakeyLKR for <a href = \"https://github.com/superjakeyLKR/The-Soul-Tree\">The Soul Tree</a><br>
                    jwkloong for <a href = \"https://github.com/jwklong/The-Partial-Tree\">The Partial Tree</a>`
                }]
            ]
        }
    },
    microtabs: {
        proto: {
            Soul: {
                content: [
                    ["display-text", function() {
                        return "You have " + format(player.ygg.p_s_points) + " Souls"
                    }],
                    ["display-text", function() {
                        return "(" + format(player.ygg.p_s_gain) + "/sec)"
                    }],
                    "blank",
                    ["tree", [["p_s_sg"], ["p_s_sb"], ["p_s_sc", "p_s_mb"]]]
                    // naming convention is w(orld)_l(ayer)_original
                ]
            },
            Partial: {
                content: [
                    ["display-text", function() {
                        return "You have " + format(player.ygg.p_p_points) + " Points"
                    }],
                    ["display-text", function() {
                        return "(" + format(player.ygg.p_p_gain) + "/sec)"
                    }],
                    "blank",
                    ["tree", [["p_p_sa", "blank", "blank", "p_p_a"], ["p_p_pa"], ["p_p_wh"]]]
                ]
            }
        }
    },
    update(diff) {
        let baseleaf = new Decimal(1)
        baseleaf = baseleaf.mul(player.ygg.points)
        player.ygg.leaves = player.ygg.leaves.add(baseleaf.mul(diff))
        player.ygg.leafs = baseleaf

        // Soul Tree Generation
        if (hasUpgrade("ygg", 11)) {
            let p_s_gain = new Decimal(1)
            if (hasUpgrade("p_s_sg", 11)) p_s_gain = p_s_gain.mul(2)
            if (hasUpgrade("p_s_sg", 12)) p_s_gain = p_s_gain.mul(upgradeEffect("p_s_sg", 12))
            if (hasUpgrade("p_s_sg", 14)) p_s_gain = p_s_gain.mul(3)
            if (hasUpgrade("p_s_sg", 15)) p_s_gain = p_s_gain.mul(2)
            if (hasUpgrade("p_s_sg", 21)) p_s_gain = p_s_gain.mul(1.5)
            if (hasUpgrade("p_s_sg", 22)) p_s_gain = p_s_gain.mul(1.15)
            if (hasUpgrade("p_s_sg", 23)) p_s_gain = p_s_gain.mul(3)
            if (hasUpgrade("p_s_sg", 24)) p_s_gain = p_s_gain.mul(upgradeEffect("p_s_sg", 24))
            if (hasUpgrade("p_s_sb", 11)) p_s_gain = p_s_gain.mul(upgradeEffect("p_s_sb", 11))
            if (hasMilestone("p_s_sb", 0)) p_s_gain = p_s_gain.mul(1.15)
            if (hasUpgrade("p_s_sc", 22)) p_s_gain = p_s_gain.mul(upgradeEffect("p_s_sc", 22))
            if (hasUpgrade("p_s_sc", 13)) p_s_gain = p_s_gain.mul(upgradeEffect("p_s_sc", 13))
            player.ygg.p_s_points = player.ygg.p_s_points.add(p_s_gain.mul(diff))
            player.ygg.p_s_gain = p_s_gain

            let p_p_gain = new Decimal(0)
            if (hasUpgrade('p_p_pa', 11)) p_p_gain = p_p_gain.add(1)
            if (hasUpgrade('p_p_pa', 21)) p_p_gain = p_p_gain.add(2)
            if (hasUpgrade('p_p_pa', 12)) p_p_gain = p_p_gain.times(upgradeEffect('p_p_pa', 12))
            if (hasUpgrade('p_p_pa', 22)) p_p_gain = p_p_gain.times(upgradeEffect('p_p_pa', 22))
            if (hasUpgrade('p_p_wh', 11)) p_p_gain = p_p_gain.times(3)
            if (getClickableState("p_p_wh", 11) == "Active") p_p_gain = p_p_gain.pow(0.33)
            if (player.p_p_wh.clickable11 > 0 && !(getClickableState("p_p_wh", 11) == "Active")) p_p_gain = p_p_gain.pow(1.15)
            if (hasUpgrade("p_p_wh", 23)) p_p_gain = p_p_gain.pow(1.25)
            player.ygg.p_p_points = player.ygg.p_p_points.add(p_p_gain.mul(diff))
            player.ygg.p_p_gain = p_p_gain
        }
    },
    upgrades: {
        11: {
            title: "First World",
            description: "Unlock the first world for exploration",
            cost: new Decimal(25),
            currencyDisplayName: "Leaves",
            currencyInternalName: "leaves",
            currencyLayer: "ygg"
        }
    },
})