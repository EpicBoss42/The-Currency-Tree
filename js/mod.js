let modInfo = {
	name: "The RPG Monster Tree",
	id: "monstertree",
	author: "EpicBoss42",
	pointsName: "Copper Points",
	modFiles: [
        "layers.js", 
        "tree.js", 
        "layers/s.js", 
        "layers/si.js", 
        "layers/c.js", 
        "layers/g.js", 
        "layers/m.js", 
        "layers/b.js",
        "layers/a.js",
        "layers/Town/bank.js",
        "layers/Town/blacksmith.js",
        "layers/Pit/tunnels.js"
    ],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.1.0",
	name: "The First Ascension",
}

let changelog = `<h1>Changelog:</h1><br>
    <h3>v1.1.0</h3><br>
        -Added The Pit<br>
        -Added The Town<br>
        -Reformatted source code organization<br>
        -Added Taverns, Banks, Blacksmiths, and Tunnel Diggers<br><br>
    <h3>v1.0.0 - The First Ascension</h3><br>
        -Added Breeders<br>
        -Added Ascensions<br><br>
	<h3>v0.1.2</h3><br>
		-Added Mechanics.<br>
		-Added Mechanic milestones and buyable.<br><br>
	<h3>v0.1.1</h3><br>
		-Added Silver milestones.<br>
		-Added Gold point upgrades.<br>
		-Added Gold points.<br><br>
	<h3>v0.1 - The Revolt of The Slimes</h3><br>
		- Added Slime, Cave, and Silver Upgrades.<br>
		- Added Baby, Juvenile, Adult, Red, Blue, and Green slimes.<br>
		- Added Copper points, slime points, and silver points.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(0)
    if (hasUpgrade('ba', 11)) gain = gain.add(upgradeEffect('ba', 11))
	if (hasUpgrade('s', 11)) gain = gain.add(buyableEffect('s', 11))
	if (hasUpgrade('s', 12)) gain = gain.add(buyableEffect('s', 12))
	if (hasUpgrade('s', 13)) gain = gain.add(buyableEffect('s', 13))
	if (hasUpgrade('si', 13)) gain = gain.mul(upgradeEffect('si', 13))
	if (hasUpgrade('c', 14)) gain = gain.mul(upgradeEffect('c', 14))
	if (player.m.unlocked) gain = gain.mul(buyableEffect('m', 11))
    if (hasUpgrade('b', 21)) gain = gain.mul(upgradeEffect('b', 21))
    if (hasUpgrade('t', 13)) gain = gain.mul(upgradeEffect('t', 13))
    if (hasUpgrade('a', 11)) {
        if (hasUpgrade('g', 11)) gain = gain.mul(upgradeEffect('g', 11))
    } else {
    if (hasUpgrade('g', 11)) gain = gain.pow(upgradeEffect('g', 11))
    if (hasUpgrade('g', 11) && getBuyableAmount('g', 11) > 0) gain = gain.pow(buyableEffect('g', 11))
    }
    if (gain == 0 && player.s.points == 0 && player.points <= 10) gain = gain.add(0.1)
    if (gain >= 1000000000000) {
        gain = gain.sub(1000000000000)
        if (gain <= 0) gain = new Decimal(1)
        gain = gain.log(5)
        gain = gain.add(1000000000000)
    }
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
    "Current endgame is e1e100 copper points and 1 Ascension", "Buying Ascension upgrades may or may not make endgame unachievable"
]

// Determines when the game "ends"
function isEndgame() {
	if (player.points.gte(new Decimal("e1e100")) && player.a.points == 1) return true
    return false
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
