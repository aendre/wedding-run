class Platform {

	constructor(game){
		this.game = game;

		this.groundHeight = this.game.Settings.sizes.groundHeight;
		this.lastFloor = 0;
		this.floorHeight = 95;
		this.playerWasOnThePlatforms = false;
		this.playerFallDownToGround = false;
		
		// Create a group for the platforms
		this.platforms = this.game.add.group();
	    this.platforms.enableBody = true;
	    
	    // Add a few random platforms to the group
	    for(var i=0; i<25; i++) {
	       	let platformVersion = 'platform-' + this.game.rnd.between(1,3);
	    	let platform = this.platforms.create(0, 0, platformVersion, undefined, false);
	    	platform.body.immovable = true;
	    	platform.body.allowGravity = false;	    	
	    }

	    this.timer = game.time.events.loop(this.game.Settings.timers.platformSpawn, this.addPlatform, this);
	    return this;
	}

	getObject() {
 		return this.platforms;
	}

	getOnScreenPlatforms() {
		let positions = [];
		this.platforms.forEachAlive(function(platform){
			positions.push({
				x : platform.x
				,y : platform.y
				,id : platform.id
				,width : platform.width
				,height : platform.height
			})
		});

		return positions;
	}

	addPlatform(floor,initX){
 		// Get a platform that is not currently on screen
	    let platform = this.platforms.getFirstDead();

	 	if (platform){
	 		let isFloorDefined = typeof floor === 'undefined' ? false : true;

	 		this.lastFloor = isFloorDefined ? floor : this.getNextFloor();

	 		// Initial position of the platform is outside of the game world
		 	let x = typeof initX === 'undefined' ? this.game.width : initX;
	    	let y = this.game.world.height - this.groundHeight - this.lastFloor * this.floorHeight;

		    //Reset it to the specified coordinates
		    platform.reset(x, y);
		    platform.body.velocity.x = -this.game.Settings.physics.platformSpeed;
		 
		    //When the platform leaves the screen, kill it
		    platform.checkWorldBounds = true;
		    platform.outOfBoundsKill = true;

		    // Generate a unique platform ID for each new 
		    platform.id = _.uniqueId('platform-');
	 	}
	}

	/** 
	 *	The game has 4 floors: ground, 1st, 2nd and 3rd floor.
	 *	This algorithm ensures that platforms are generated in a way,
	 *	that every platform is reachable.
	 */
	getNextFloor() {
		/**
		 *	Case 0 - If the player is on the ground, always render the next platform
		 *	to the 1st floor, so that the player can reach the upper platforms
		 **/
		if (this.playerFallDownToGround && this.lastFloor>1) {
			this.resetPlayerState();
			return 1;
		}

		/**
		 *	Case 1 - no platforms were added
		 *  
		 *	When the game starts, no platforms were added,
		 *	so we add the next platform to the 1st floor
		 **/
		if (this.lastFloor==0) {
			return 1;
		}

		/**
		 *	Case 2 - the last platform is at the 1st floor
		 *  
		 *	70% chance, that the next platform is added to the upper level
		 *	30% chance, that we add the next platform to the same level
		 **/
		if (this.lastFloor==1) {
			return Math.random() > 0.3 ? 2 : 1;
		}

		/**
		 *	Case 3 - the last platform was added to 2nd floor
		 *
		 **/
		if (this.lastFloor==2) {
			return Math.random() > 0.5 ? 2 : 3;
		}
		
		/**
		 *	Case 4 - last platform was added to the highest position
		 * 		 
		 *	The new platform can be added to any of the floors
		 **/		
		return this.game.rnd.between(1,3);
	}

	resetPlayerState() {
		this.playerWasOnThePlatforms = false;
		this.playerFallDownToGround = false;
	}

	update(hitPlatform,hitGround) {
		if (this.playerWasOnThePlatforms===false && hitPlatform) {
			this.playerWasOnThePlatforms = true;
		}

		if (this.playerWasOnThePlatforms && hitGround) {
			this.playerFallDownToGround = true;
		}		
	}

}

export default Platform;