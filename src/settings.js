export default {
	// Width of the canvas in pixels (default:800)
	'canvasWidth' : 800
	
	// Height of the canvas in pixels (default:512)
	,'canvasHeight' : 512

	// Character type can be 'groom' of 'bride'
	,'characterType' : 'groom'

	// Volume of the looping music in the main menu and in-game
	,'musicVolume' : 0.25

	// Effect volume (jumps, coins, damage)
	,'effectVolume' : 0.4

	// Sizes
	,'sizes' : {
		// The height of the ground tile
		'groundHeight' : 64
	}

	// Constants for score calculations
	,'score' : {
		// How much does it worth to travel 1 pixel
		'pixel' : 1
		// How much does a coin worth
		,'coin' : 100
		// Kill bounty = enemy velocity x scale
		,'enemy' : 0.8
	}

	// There are some events that happen regularly (ms)
	,'timers' : {
		// New coin appears after each <coinSpawn> ms
		'coinSpawn' : 2000
		// New platforms appear in every <platformSpawn> ms
		,'platformSpawn' : 3000
		// New rabbits are spawn afer <enemySpawn> ms
		,'enemySpawn' : 2000
		// Cloud  timer
		,'cloudSpawn' : 4000
		// Check for game states in every second
		,'mainLoop' : 900
	}

	// Driving forces of the game
	,'physics' : {
		// World default gravity
		'worldGravity'        : 300
		// This is essentially the speed of the game, how fast the platforms are moving
		,'platformSpeed'      : 80
		// Default player gravity
		,'playerGravity'      : 400
		// Some extra gravity is applied when the down arrow is pressed
		,'extraGravity'       : 600
		// How high the player will jump?
		,'playerJumpVelocity' : 400
		// Speed of the player when running forward
		,'playerRunningForwardSpeed' : 120
		// When running backward, we add more speed, the game is easier that way
		,'playerRunningBackwardSpeed' : 200
		// When no button is pressed, the player is standing
		,'playerStandingSpeed': 0
		// A small bounce effect for the player
		,'playerBounce'       : 0.2
	}

	// URLs that are used by the Toplist service (absolute URLs)
	,'urls' : {
		// Getter to retrieve the top 10 players and their score
		'getTop10' : ''
		// Save the score at the end of the game
		,'saveScore' : ''
	}

	// Name of the player
	,'playerName': ''
};