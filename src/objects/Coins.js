class Coins {

	constructor(game,platform){
		this.game = game;
		this.platform = platform;
		this.enableSpawning = true;
		this.platformMap = {};

		// Create a group for the platforms
		this.coins = this.game.add.group();
	    this.coins.enableBody = true;
	    this.coins.createMultiple(20, 'coin');
	    
	    this.timer = game.time.events.loop(this.game.Settings.timers.coinSpawn, this.addCoin, this);
	    return this;
	}

	getObject() {
 		return this.coins;
	}

	disableSpawning() {
		this.enableSpawning = false;
	}

	removeCoin(coin) {
		this.platformMap[coin.platformId] = false;
		coin.kill();
	}

	addToPlatformMap(platformId) {
		this.platformMap[platformId] = true;
	}

	setCoinPosition(coin) {
		 // Get the list of platforms on the screen
	 	let platforms = this.platform.getOnScreenPlatforms();
	 	
	 	// By default render the coin randomly on the ground
	 	let x = this.game.rnd.between(0,this.game.width);
	 	let y = this.game.height - this.game.Settings.sizes.groundHeight - 40;
	 	
	 	if(platforms.length) {
			// Gets a random element from collection 
	 		let platformData = _.sampleSize(platforms)[0];

	 		// If we don't have a coin on this platform 
	 		if (!this.platformMap[platformData.id]) {
			    this.addToPlatformMap(platformData.id);
		 		coin.platformId = platformData.id;

		 		// Calculate the position of the coin on the platform
			 	x = platformData.x + platformData.width/2 - 10;
		    	y = platformData.y - 40;	 			
	 		}		
	 	}
		
		coin.reset(x, y);
	}

	addCoin(){
 		// If spawning is disabled exit
 		if (!this.enableSpawning) {
 			return;
 		}

 		// Get a coin that is not currently on screen
	    let coin = this.coins.getFirstDead();
	   
	 	if (coin){
	 		
	 		this.setCoinPosition(coin);		
	    	
	    	coin.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
	    	coin.animations.play('spin');
	    	coin.body.immovable = true;
	    	coin.body.allowGravity = false;
	    	coin.body.checkCollision = false;
	    	coin.body.velocity.x = -this.game.Settings.physics.platformSpeed;
 
		    //When the coin leaves the screen, kill it
		    coin.checkWorldBounds = true;
		    coin.outOfBoundsKill = true;
	 	}
	}

	update() {
 		
	}
}

export default Coins;