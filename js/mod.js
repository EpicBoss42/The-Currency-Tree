let modInfo = {
	name: "The Omnitree [Extended]",
	id: "omnitree-e",
	author: "EpicBoss42",
	pointsName: "Omnipoints",
	modFiles: [
        "layers.js", 
        "tree.js", 
		"layers/ygg.js",
		"layers/proto/soul/sg.js",
		"layers/proto/soul/sb.js",
		"layers/proto/soul/sc.js",
		"layers/proto/soul/mb.js",
		"layers/proto/partial/pa.js",
		"layers/proto/partial/wh.js",
		"layers/proto/partial/a.js",
		"layers/proto/partial/sa.js",
		"layers/proto/currency/cc.js"
    ],
	discordName: "The World Tree Server",
	discordLink: "https://discord.gg/wNJxhxT9QH",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2.1",
	name: "Partially Updated",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h3>v0.2.1</h3><br>
		Added the start of Copper Coins<br><br>
	<h3>v0.2.0 - Partially Updated</h3><br>
	  Added the Partial Tree<br>
	  Updated Credits<br>
	  Expanded the Partial Tree<br>
	  Updated the Soul Tree again<br>
	  Fixed a critical error with inter-tree challenges<br><br>
	<h3>v0.1.1</h3><br>
	  Updated Soul Tree with a minor update<br>
	  Prepared for the Partial Tree<br><br>
	<h3>v0.1.0: Advent of Soul</h3><br>
	  Created basic structure to allow for further development<br>
	  Added the Soul Tree<br>
	  Greatly expanded the Soul Tree<br>
	  Added Credits<br>
	`

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
	let gain = new Decimal(0.1)
	if (hasMilestone("p_s_sb", 2)) gain = gain.mul(new Decimal(2).pow(player.p_s_sb.points.add(1).log(10).floor()))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
    "All subtrees have recieved bug fixes (where applicable) and more content has been added"
]

// Determines when the game "ends"
function isEndgame() {
	if (player.points.gte(new Decimal("e1e1e1000"))) return true
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
