let modInfo = {
	name: "Omni Tree Directory",
	id: "worlddir",
	author: "EpicBoss42",
	pointsName: "Wasted Time",
	modFiles: [
        "layers.js", 
        "tree.js", 
    ],
	discordName: "The World/Omni Tree Server",
	discordLink: "https://discord.gg/wNJxhxT9QH",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1",
	name: "Directory",
}

let changelog = `<h1>Changelog:</h1><br>
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
	let gain = new Decimal(1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
    "The repository structure has changed, you may be looking for:", 
	"<a href = \"https://raw.githack.com/EpicBoss42/The-Modding-Tree/world_tree/index.html\">The World Tree</a>", 
	"<a href = \"https://raw.githack.com/EpicBoss42/The-Modding-Tree/omnitree/index.html\">The Omnitree</a>"
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
