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
        return true
    },    
    upgrades: {
        
    },
})