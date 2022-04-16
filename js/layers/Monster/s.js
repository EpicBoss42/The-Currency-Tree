addLayer("s", {
    name: "slimepoints",
    symbol: "S",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#B36D22",
    requires: new Decimal(10),
    resource: "slime points",
    baseResource: "copper points",
    baseAmount() {
        return player.w.copper
    },
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade('si', 14)) mult = mult.mul(upgradeEffect('si', 14))
        if (hasUpgrade('c', 11)) mult = mult.mul(upgradeEffect('c', 11))
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    passiveGeneration() {
        let value = new Decimal(0)
        if (hasMilestone('m', 2)) { value = new Decimal(0.1) }
        return value
    },
    row: 0,
    hotkeys: [
        {
            key: "s", 
            description: "S: Reset for Slime Points", 
            onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown(){return true},
    doReset(x) {
        if (x !== "s" && x !== "ba" && x !== 'bs' && x !== 'e' && x !== 'v') {
            let keptUpgrades = []
            if (hasMilestone('si', 0)) {
                keptUpgrades.push('11')
                keptUpgrades.push('12')
                keptUpgrades.push('13')
            } 
            if (hasMilestone('si', 1)) {
                keptUpgrades.push('21')
                keptUpgrades.push('22')
                keptUpgrades.push('23')
            }
            if (hasMilestone('si', 2)) {
                keptUpgrades.push('31')
                keptUpgrades.push('32')
                keptUpgrades.push('33')
            }
            if (hasUpgrade('s', 41)) { keptUpgrades.push('41')}
            layerDataReset("s")
            player[this.layer].upgrades = keptUpgrades
        }
        if (x === this.layer) {
            player.w.copper = new Decimal(0)
        }
    },
    automate() {
        if (hasUpgrade('b', 11) && hasUpgrade(this.layer, 11)) {
            let cost = new Decimal(getBuyableAmount(this.layer, 11))
            let amount = new Decimal(1)
            let costtwo = new Decimal(getBuyableAmount(this.layer, 21))
            if (hasUpgrade('c', 21)) { amount = amount.mul(2) }
            if (hasUpgrade('c', 21)) { cost = cost.div(2) }
            if (hasUpgrade('c', 21)) { costtwo = costtwo.div(2) }
            cost = cost.add(1).pow(2).floor()
            costtwo = costtwo.add(2).pow(3.1).mul(5).floor()
            if (player[this.layer].points.gte(cost)) {
                setBuyableAmount(this.layer, 11, getBuyableAmount(this.layer, 11).add(amount))
                player[this.layer].points = player[this.layer].points.sub(cost)
                if (hasUpgrade('b', 27)) player[this.layer].points = player[this.layer].points.add(cost)
            }
            if (hasUpgrade('b', 26) && hasUpgrade(this.layer, 21) && player[this.layer].points.gte(costtwo)) {
                setBuyableAmount(this.layer, 21, getBuyableAmount(this.layer, 21).add(amount))
                player[this.layer].points = player[this.layer].points.sub(costtwo)
                if (hasUpgrade('b', 27)) player[this.layer].points = player[this.layer].points.add(costtwo)                
            }
            
        }
        if (hasUpgrade('b', 12) && hasUpgrade(this.layer, 12)) {
            let cost = new Decimal(getBuyableAmount(this.layer, 12))
            let amount = new Decimal(1)
            let costtwo = new Decimal(getBuyableAmount(this.layer, 22))
            if (hasUpgrade('c', 21)) { amount = amount.mul(2) }
            if (hasUpgrade('c', 21)) { cost = cost.div(2) }
            if (hasUpgrade('c', 21)) { costtwo = costtwo.div(2) }
            cost = cost.add(1).pow(2.1).mul(5).floor()
            costtwo = costtwo.add(2).pow(3.1).mul(6).floor()
            if (player[this.layer].points.gte(cost)) {
                setBuyableAmount(this.layer, 12, getBuyableAmount(this.layer, 12).add(amount))
                player[this.layer].points = player[this.layer].points.sub(cost)
                if (hasUpgrade('b', 27)) player[this.layer].points = player[this.layer].points.add(cost)
            }
            if (hasUpgrade('b', 26) && hasUpgrade(this.layer, 22) && player[this.layer].points.gte(costtwo)) {
                setBuyableAmount(this.layer, 22, getBuyableAmount(this.layer, 22).add(amount))
                player[this.layer].points = player[this.layer].points.sub(costtwo)
                if (hasUpgrade('b', 27)) player[this.layer].points = player[this.layer].points.add(costtwo)                
            }
        }
        if (hasUpgrade('b', 13) && hasUpgrade(this.layer, 13)) {
            let cost = new Decimal(getBuyableAmount(this.layer, 13))
            let amount = new Decimal(1)
            let costtwo = new Decimal(getBuyableAmount(this.layer, 23))
            if (hasUpgrade('c', 21)) { amount = amount.mul(2) }
            if (hasUpgrade('c', 21)) { cost = cost.div(2) }
            if (hasUpgrade('c', 21)) { costtwo = costtwo.div(2) }
            cost = cost.add(1).pow(2.5).mul(10).floor()
            costtwo = costtwo.add(2).pow(3.1).mul(7).floor() 
            if (player[this.layer].points.gte(cost)) {
                setBuyableAmount(this.layer, 13, getBuyableAmount(this.layer, 13).add(amount))
                player[this.layer].points = player[this.layer].points.sub(cost)
                if (hasUpgrade('b', 27)) player[this.layer].points = player[this.layer].points.add(cost)
            }
            if (hasUpgrade('b', 26) && hasUpgrade(this.layer, 23) && player[this.layer].points.gte(costtwo)) {
                setBuyableAmount(this.layer, 23, getBuyableAmount(this.layer, 23).add(amount))
                player[this.layer].points = player[this.layer].points.sub(costtwo)
                if (hasUpgrade('b', 27)) player[this.layer].points = player[this.layer].points.add(costtwo)                
            }
        }
    },
    globalSlimeMult() {
        let value = new Decimal(1)
        if (hasUpgrade('b', 24)) value = value.mul(upgradeEffect('b', 24))
        return value
    },
    upgrades: {
        11: {
            title: "Baby Slime Unlock",
            description: "Unlock the Baby Slime monster for purchase!",
            cost: new Decimal(0),
        },
        12: {
            title: "Juvenile Slime Unlock",
            description: "Unlock the Juvenile Slime monster for purchase!",
            cost: new Decimal(5),
        },
        13: {
            title: "Adult Slime Unlock",
            description: "Unlock the Adult Slime monster for purchase!",
            cost: new Decimal(15),
        },
        21: {
            title: "Red Slime Unlock",
            description: "Unlock the ability to specialize Adult Slimes into Red Slimes",
            cost: new Decimal(25),
            unlocked() {
                if (hasUpgrade('si', 12)) {return true}
                return false
            },
        },
        22: {
            title: "Blue Slime Unlock",
            description: "Unlock the ability to specialize Adult Slimes into Blue Slimes",
            cost: new Decimal(50),
            unlocked() {
                if (hasUpgrade('si', 12)) {return true}
                return false
            },
        },
        23: {
            title: "Yellow Slime Unlock",
            description: "Unlock the ability to specialize Adult Slimes into Yellow Slimes",
            cost: new Decimal(75),
            unlocked() {
                if (hasUpgrade('si', 12)) {return true}
                return false
            },
        },
        31: {
            title: "Baby Horde",
            description: "Teach your Baby Slimes how to attack all at once, increasing Baby Slime effectiveness based on how many Baby Slimes you own",
            cost: new Decimal(5000),
            unlocked() {
                if (hasUpgrade('si', 24) && hasUpgrade('s', 11)) {return true}
                return false
            },
            effect() {
                let value = new Decimal(getBuyableAmount(this.layer, 11)).add(1).log(4).add(1)
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        32: {
            title: "Juvenile Delinquency",
            description: "Encourage your Juvenile Slimes to become more aggressive, allowing them to earn 125% more copper points per second",
            cost: new Decimal(10000),
            unlocked() {
                if (hasUpgrade('si', 24) && hasUpgrade('s', 12)) {return true}
                return false
            },
            effect() {
                let value = new Decimal(2.25)
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        33: {
            title: "Adult Support",
            description: "Your adult slimes help your Red, Blue, and Yellow slimes, increasing their buff by 25% for each Adult Slime",
            cost: new Decimal(25000),
            unlocked() {
                if (hasUpgrade('si', 24) && hasUpgrade('s', 13)) {return true}
                return false
            },
            effect() {
                let value = new Decimal(1)
                let value2 = new Decimal(0.25).mul(getBuyableAmount('s', 13))
                value = value.add(value2)
                return value
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        41: {
            title: "Join the League of Silver",
            description: "By purchasng a membership for the League of Silver, you can unlock milestones for Silver Points.",
            cost: new Decimal(100000),
            unlocked() {
                if (hasUpgrade('s', 31) && hasUpgrade('s', 32) && hasUpgrade('s', 33)) {return true}
                return false
            },
        }
    },
    buyables: {
        11: {
            title: "Baby Slime",
            cost(x) { 
                let amount = new Decimal(x)
                if (hasUpgrade('c', 21)) amount = amount.div(2)
                return amount.add(1).pow(2).floor() 
            },
            effect(x) {
                let individualValue = new Decimal(1)
                if (hasUpgrade('si', 11)) individualValue = individualValue.mul(upgradeEffect('si', 11))
                if (hasUpgrade('s', 21)) individualValue = individualValue.mul(buyableEffect('s', 21))
                if (hasUpgrade('si', 21)) individualValue = individualValue.pow(upgradeEffect('si', 21))
                if (hasUpgrade('c', 12)) individualValue = individualValue.mul(upgradeEffect('c', 12))
                if (hasUpgrade('c', 13)) individualValue = individualValue.mul(upgradeEffect('c', 13))
                if (hasUpgrade('s', 31)) individualValue = individualValue.mul(upgradeEffect('s', 31))
                if (hasUpgrade('c', 22)) individualValue = individualValue.mul(upgradeEffect('c', 21))
                individualValue = individualValue.mul(tmp.s.globalSlimeMult)
                let value = individualValue.mul(x)
                return value
            },
            display() { 
                let xNan = new Decimal(getBuyableAmount(this.layer, this.id))
                if (xNan == 0) xNan = new Decimal(1)
                return `A Baby Slime to slay an adventurer and generate ` + format(buyableEffect(this.layer, this.id).div(xNan)) + ` copper points per second.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Baby Slimes! <br>
                The next one costs ` + this.cost() + ` slime points.<br>
                Overall, your Baby Slimes are generating ` + format(buyableEffect(this.layer, this.id)) + " copper points per second."
            },
            unlocked() {
                if (hasUpgrade('s', 11)) {return true}
                return false
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                if (hasUpgrade('b', 27)) player[this.layer].points = player[this.layer].points.add(this.cost())
                let gain = new Decimal(1)
                if (hasUpgrade('c', 21)) gain = gain.mul(upgradeEffect('c', 21))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            },
            
        },
        12: {
            title: "Juvenile Slime",
            cost(x) { 
                let amount = new Decimal(x)
                if (hasUpgrade('c', 21)) amount = amount.div(2)
                return amount.add(1).pow(2.1).mul(5).floor() 
            },
            effect(x) {
                let individualValue = new Decimal(5)
                if (hasUpgrade('s', 22)) individualValue = individualValue.mul(buyableEffect('s', 22))
                if (hasUpgrade('si', 21)) individualValue = individualValue.pow(upgradeEffect('si', 21))
                if (hasUpgrade('c', 12)) individualValue = individualValue.mul(upgradeEffect('c', 12))
                if (hasUpgrade('c', 13)) individualValue = individualValue.mul(upgradeEffect('c', 13))
                if (hasUpgrade('s', 32)) individualValue = individualValue.mul(upgradeEffect('s', 32))
                if (hasUpgrade('c', 22)) individualValue = individualValue.mul(upgradeEffect('c', 21))
                individualValue = individualValue.mul(tmp.s.globalSlimeMult)
                let value = individualValue.mul(x)
                return value
            },
            display() {
                let xNan = new Decimal(getBuyableAmount(this.layer, this.id))
                if (xNan == 0) xNan = new Decimal(1)
                return `A Juvenile Slime to slay more adventurers and generate ` + format(buyableEffect(this.layer, this.id).div(xNan)) + ` copper points per second.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Juvenile Slimes! <br>
                The next one costs ` + this.cost() + ` slime points.<br>
                Overall, your Juvenile Slimes are generating ` + format(buyableEffect(this.layer, this.id)) + " copper points per second."                
            },
            unlocked() {
                if (hasUpgrade('s', 12)) {return true}
                return false
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                if (hasUpgrade('b', 27)) player[this.layer].points = player[this.layer].points.add(this.cost())
                let gain = new Decimal(1)
                if (hasUpgrade('c', 21)) gain = gain.mul(upgradeEffect('c', 21))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            }
        },
        13: {
            title: "Adult Slime",
            cost(x) { 
                let amount = new Decimal(x)
                if (hasUpgrade('c', 21)) amount = amount.div(2)
                return amount.add(1).pow(2.5).mul(10).floor() 
            },
            effect(x) {
                let individualValue = new Decimal(25)
                if (hasUpgrade('s', 23)) individualValue = individualValue.mul(buyableEffect('s', 23))
                if (hasUpgrade('si', 21)) individualValue = individualValue.pow(upgradeEffect('si', 21))
                if (hasUpgrade('c', 13)) individualValue = individualValue.mul(upgradeEffect('c', 13))
                individualValue = individualValue.mul(tmp.s.globalSlimeMult)
                let value = individualValue.mul(x)
                return value
            },
            display() {
                let xNan = new Decimal(getBuyableAmount(this.layer, this.id))
                if (xNan == 0) xNan = new Decimal(1)
                return `An Adult Slime to slay adventurers quickly, generating ` + format(buyableEffect(this.layer, this.id).div(xNan)) + ` copper points per second.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Adult Slimes!<br>
                The next one costs ` + this.cost() + ` slime points.<br>
                Overall, your Adult Slimes are generating ` + format(buyableEffect(this.layer, this.id)) + " copper points per second."
            },
            unlocked() {
                if (hasUpgrade('s', 13)) {return true}
                return false
            },
            canAfford() {return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                if (hasUpgrade('b', 27)) player[this.layer].points = player[this.layer].points.add(this.cost())
                let gain = new Decimal(1)
                if (hasUpgrade('c', 21)) gain = gain.mul(upgradeEffect('c', 21))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            },
        },
        21: {
            title: "Red Slime",
            cost(x) { 
                let amount = new Decimal(x)
                if (hasUpgrade('c', 21)) amount = amount.div(2)
                return amount.add(2).pow(3.1).mul(5).floor() 
            },
            effect(x) {
                let value = new Decimal(x).add(1).pow(0.5)
                if (hasUpgrade(this.layer, 33)) value = value.mul(upgradeEffect(this.layer, 33))
                return value
            },
            display() {
                return `A Red Slime to increase the effect of your Baby Slimes.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Red Slimes!<br>
                The next one costs ` + this.cost() + ` slime points and one Adult Slime.<br>
                Your Red Slimes are providing a ` + format(buyableEffect(this.layer, this.id)) + "x boost to the Baby Slime's production"
            },
            unlocked() {
                if (hasUpgrade('s', 21)) {return true}
                return false
            },
            canAfford() {return player[this.layer].points.gte(this.cost()) && getBuyableAmount('s', 13).gte(1) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                if (hasUpgrade('b', 27)) player[this.layer].points = player[this.layer].points.add(this.cost())
                let gain = new Decimal(1)
                if (hasUpgrade('c', 21)) gain = gain.mul(upgradeEffect('c', 21))
                setBuyableAmount(this.layer, '13', getBuyableAmount(this.layer, '13').sub(gain))
                if (hasUpgrade('b', 26)) setBuyableAmount(this.layer, '13', getBuyableAmount(this.layer, '13').add(gain))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            }
        },
        22: {
            title: "Blue Slime",
            cost(x) { 
                let amount = new Decimal(x)
                if (hasUpgrade('c', 21)) amount = amount.div(2)
                return amount.add(2).pow(3.1).mul(6).floor() 
            },
            effect(x) {
                let value = new Decimal(x).add(1).pow(0.4)
                if (hasUpgrade(this.layer, 33)) value = value.mul(upgradeEffect(this.layer, 33))
                return value
            },
            display() {
                return `A Blue Slime to increase the effect of your Juvenile Slimes.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Blue Slimes!<br>
                The next one costs ` + this.cost() + ` slime points and one Adult Slime.<br>
                Your Blue Slimes are providing a ` + format(buyableEffect(this.layer, this.id)) + "x boost to the Juvenile Slime's production"
            },
            unlocked() {
                if (hasUpgrade('s', 22)) {return true}
                return false
            },
            canAfford() {return player[this.layer].points.gte(this.cost()) && getBuyableAmount('s', 13).gte(1) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                if (hasUpgrade('b', 27)) player[this.layer].points = player[this.layer].points.add(this.cost())
                let gain = new Decimal(1)
                if (hasUpgrade('c', 21)) gain = gain.mul(upgradeEffect('c', 21))
                setBuyableAmount(this.layer, '13', getBuyableAmount(this.layer, '13').sub(gain))
                if (hasUpgrade('b', 26)) setBuyableAmount(this.layer, '13', getBuyableAmount(this.layer, '13').add(gain))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            }
        },
        23: {
            title: "Yellow Slime",
            cost(x) { 
                let amount = new Decimal(x)
                if (hasUpgrade('c', 21)) amount = amount.div(2)
                return amount.add(2).pow(3.1).mul(7).floor() 
            },
            effect(x) {
                let value = new Decimal(x).add(1).pow(0.25)
                if (hasUpgrade(this.layer, 33)) value = value.mul(upgradeEffect(this.layer, 33))
                return value
            },
            display() {
                return `A Red Slime to increase the effect of your Adult Slimes.<br>
                You own ` + getBuyableAmount(this.layer, this.id) + ` Yellow Slimes!<br>
                The next one costs ` + this.cost() + ` slime points and one Adult Slime.<br>
                Your Yellow Slimes are providing a ` + format(buyableEffect(this.layer, this.id)) + "x boost to the Adult Slime's production"
            },
            unlocked() {
                if (hasUpgrade('s', 23)) {return true}
                return false
            },
            canAfford() {return player[this.layer].points.gte(this.cost()) && getBuyableAmount('s', 13).gte(1) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                if (hasUpgrade('b', 27)) player[this.layer].points = player[this.layer].points.add(this.cost())
                let gain = new Decimal(1)
                if (hasUpgrade('c', 21)) gain = gain.mul(upgradeEffect('c', 21))
                setBuyableAmount(this.layer, '13', getBuyableAmount(this.layer, '13').sub(gain))
                if (hasUpgrade('b', 26)) setBuyableAmount(this.layer, '13', getBuyableAmount(this.layer, '13').add(gain))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(gain))
            }
        },
    }
})
