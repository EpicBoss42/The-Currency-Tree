addLayer("ygg", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            leaves: new Decimal(0),
            leafs: new Decimal(0),
            p_s_points: new Decimal(0),
            p_s_gain: new Decimal(0)
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
                    SuperJakeyLKR for <a href = \"https://github.com/superjakeyLKR/The-Soul-Tree\">The Soul Tree</a>`
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
            player.ygg.p_s_points = player.ygg.p_s_points.add(p_s_gain.mul(diff))
            player.ygg.p_s_gain = p_s_gain
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