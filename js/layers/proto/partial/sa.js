addLayer("p_p_sa", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "orange",
    resource: "Secret Achievements", 
    symbol: "A?",
    row: 100,
    layerShown(){return player[this.layer].points.gte(1)},
    achievements: {
        11: {
            name: "Unlock Secret Achievents!",
            done() {return player[this.layer].points.gte("1")},
            tooltip: "Hmm...",
        },
        21: {
            name: "No more exceeding",
            done() {return challengeCompletions("p_p_wh",11) > 1},
            goalTooltip: "???",
            doneTooltip: "Complete exceed challenge twice",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
        22: {
            name: "Inflation",
            done() {return upgradeEffect('p_p_pa', 22).gte("1000")},
            goalTooltip: "???",
            doneTooltip: "Point Booster? multiplier goes to 1000x",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
        23: {
            name: "Relocked",
            done() {return canReset("p_p_wh") && !hasUpgrade("p_p_pa", 33)},
            goalTooltip: "???",
            doneTooltip: "Be able to whole reset without Partial Unlock",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
    },
},
)