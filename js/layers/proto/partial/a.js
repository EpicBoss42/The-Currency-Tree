addLayer("p_p_a", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "yellow",
    resource: "Achievements", 
    row: 100,
    symbol: "a",
    achievements: {
        11: {
            name: "Start the game",
            done() {return player.p_p_pa.points.gte("1")},
            goalTooltip: "Uhm, I think you should do something...",
            doneTooltip: "You started the game!",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        12: {
            name: "Expansion",
            done() {return hasUpgrade("p_p_pa", 13)},
            tooltip: "Get Point Booster Booster.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        13: {
            name: "Self-Boosted",
            done() {return hasUpgrade("p_p_pa", 22)},
            tooltip: "Get Point Booster?",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        14: {
            name: "Self-Boosted 2",
            done() {return hasUpgrade("p_p_pa", 31)},
            tooltip: "Get Partial Increased.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        15: {
            name: "Base Boost",
            done() {return hasUpgrade("p_p_pa", 32)},
            tooltip: "Get Partial Partial.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        21: {
            name: "Wholey",
            done() {return player.p_p_wh.points.gte(1)},
            goalTooltip: "Get a Whole.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        22: {
            name: "Self-Boosted 3",
            done() {return hasUpgrade("p_p_wh", 12)},
            tooltip: "Get Increased Parts.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        23: {
            name: "Auto-Gain",
            done() {return hasUpgrade("p_p_wh", 13)},
            tooltip: "Get Passive Partial.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        24: {
            name: "Exceeded",
            done() {return challengeCompletions("p_p_wh",11) > 0},
            tooltip: "Complete Exceed challenge",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        25: {
            name: "Self-Boosted 4",
            done() {return hasUpgrade("p_p_pa", 24)},
            tooltip: "Get Partial Pointed.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
    },
},
)