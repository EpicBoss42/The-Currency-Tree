let modInfo = {
	name: "The World Tree",
	id: "worldtree",
	author: "EpicBoss42",
	pointsName: "Points",
	modFiles: [
        "layers.js", 
        "tree.js", 
        "layers/Starting/Elements.js",
        "layers/Starting/Wormhole.js",
        "layers/Monster/s.js", 
        "layers/Monster/si.js", 
        "layers/Monster/c.js", 
        "layers/Monster/g.js", 
        "layers/Monster/m.js", 
        "layers/Monster/b.js",
        "layers/Monster/a.js",
        "layers/Monster/Town/bank.js",
        "layers/Monster/Town/blacksmith.js",
        "layers/Monster/Pit/tunnels.js"
    ],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.0",
	name: "The Beginning Seed",
}

let changelog = `<h1>Changelog:</h1><br>
	<h2>v0.1.0 - The Beginning Seed</h2><br>
		<h3>Changed from RPG Monster Tree to World Tree, so versions reset</h3><br>
		-Added Elements and Wormhole<br>
		-Added Element Upgrades<br><br>
    <h2>v1.1.0</h2><br>
        -Added The Pit<br>
        -Added The Town<br>
        -Reformatted source code organization<br>
        -Added Taverns, Banks, Blacksmiths, and Tunnel Diggers<br><br>
    <h2>v1.0.0 - The First Ascension</h2><br>
        -Added Breeders<br>
        -Added Ascensions<br><br>
	<h2>v0.1.2</h2><br>
		-Added Mechanics.<br>
		-Added Mechanic milestones and buyable.<br><br>
	<h2>v0.1.1</h2><br>
		-Added Silver milestones.<br>
		-Added Gold point upgrades.<br>
		-Added Gold points.<br><br>
	<h2>v0.1 - The Revolt of The Slimes</h2><br>
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
	let gain = new Decimal(1)
    gain = player.w.tSec
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
    "Endgame is currently at e1e1e1000 Points", "This is probably unachievable"
]

// Determines when the game "ends"
function isEndgame() {
	if (player.points.gte(new Decimal("e1e10")) && player.a.points == 1) return true
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
