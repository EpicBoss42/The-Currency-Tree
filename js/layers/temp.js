addLayer("", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#",
    resource: "",
    row: ,
    baseResource: "",
    baseAmount() { return player..points },
    requires: new Decimal(),
    type: "",
    exponent: ,
    gainMult() {
        let value = new Decimal(1)
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    layerShown() {
        if (hasUpgrade('m', 12)) return true
        return true
    },    
    upgrades: {
        
    },
})