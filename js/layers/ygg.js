addLayer("ygg", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            leaves: new Decimal(0),
            leafs: new Decimal(0),
            p_s_points: new Decimal(0),
            p_s_gain: new Decimal(0),
            p_c_points: new Decimal(0),
            p_c_gain: new Decimal(0),
            p_g_points: new Decimal(0),
            p_g_gain: new Decimal(0)
        }
    },
    name: "Yggdrasil",
    color: "#C0550F",
    resource: "Branches",
    row: 100,
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
                    ChatGPT for the base of the GPTree, expanded by myself<br><br>
                    My own personal trees: The Omnitree, The Currency Tree`
                }]
            ]
        },
        "Tree Resets": {
            content: [
                ["tree", [["p_s"], ["p_c"], ["p_g"]]]
            ],
            unlocked() {return hasUpgrade("ygg", 12)}
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
            Currency: {
                content: [
                    ["display-text", "Balanced until third row of Copper Coin Upgrades"],
                    ["display-text", function() {
                        return "You have " + format(player.ygg.p_c_points) + " Copper Points"
                    }],
                    ["display-text", function() {
                        return "(" + format(player.ygg.p_c_gain) + "/sec)"
                    }],
                    "blank",
                    ["tree", [["p_c_cc"], ["p_c_sp", "p_c_ba"]]]
                ]
            },
            GPTree: {
                content: [
                    ["display-text", function() {
                        return "You have " + format(player.ygg.p_g_points) + " Comfort"
                    }],
                    ["display-text", function() {
                        return "(" + format(player.ygg.p_g_gain) + "/sec)"
                    }],
                    "blank",
                    ["tree", [["p_g_hl"]]]
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

            let p_c_gain = new Decimal(1)
            
            if (hasUpgrade("p_c_cc", 11)) p_c_gain = p_c_gain.mul(upgradeEffect("p_c_cc", 11))
            if (hasUpgrade("p_c_cc", 12)) p_c_gain = p_c_gain.mul(2)
            if (hasUpgrade("p_c_cc", 14)) p_c_gain = p_c_gain.mul(upgradeEffect("p_c_cc", 14))
            if (hasUpgrade("p_c_cc", 22)) p_c_gain = p_c_gain.mul(upgradeEffect("p_c_cc", 22))
            if (hasMilestone("p_c_sp", 1)) p_c_gain = p_c_gain.mul(tmp.p_c_sp.milestoneEffects[2].add(1))

            player.ygg.p_c_points = player.ygg.p_c_points.add(p_c_gain.mul(diff))
            player.ygg.p_c_gain = p_c_gain

            let p_g_gain = new Decimal(1)

            if (hasUpgrade("p_g_hl", 11)) p_g_gain = p_g_gain.mul(upgradeEffect("p_g_hl", 11))
            if (hasUpgrade("p_g_hl", 12)) p_g_gain = p_g_gain.mul(upgradeEffect("p_g_hl", 12))
            if (hasUpgrade("p_g_hl", 13)) p_g_gain = p_g_gain.mul(5)
            if (hasUpgrade("p_g_hl", 14)) p_g_gain = p_g_gain.mul(upgradeEffect("p_g_hl", 14))
            if (hasUpgrade("p_g_hl", 15)) p_g_gain = p_g_gain.mul(10)
            if (hasUpgrade("p_g_hl", 41)) p_g_gain = p_g_gain.mul(1.1)    
            if (hasUpgrade("p_g_hl", 42)) p_g_gain = p_g_gain.mul(1.25)

            player.ygg.p_g_points = player.ygg.p_g_points.add(p_g_gain.mul(diff))
            player.ygg.p_g_gain = p_g_gain
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
        },
        12: {
            title: "Falling Leaves",
            description: "Double Omnipoints gain and unlock the ability to reset individual trees",
            cost: new Decimal(100),
            currencyDisplayName: "Leaves",
            currencyInternalName: "leaves",
            currencyLayer: "ygg"
        }
    },
})