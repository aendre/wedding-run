class Ground {

	constructor(game){
		this.game = game;

		// Store the size if the ground tile
		this.tileSize = this.game.Settings.sizes.groundHeight;
		
		// Create a group for the platforms
		this.ground = this.game.add.group();
	    this.ground.enableBody = true;
	    this.ground.createMultiple(16, 'ground');

	    // Store the tile that was added last
	    this.lastAddedTile = null;

	    // Add tiles from the left side of the screen until it fills the width of the game
	    this.createFullGround();

	    // Store how many tiles were added
	    this.tileCount = 0;

	    return this;
	}

	getObject() {
 		return this.ground;
	}

	// Create a full ground
	createFullGround() {
		for (let i=0; i<this.game.width; i=i+this.tileSize) {
			this.addTile(i);
		}
	}

	addTile(initX){
 		// Get a cloud that is not currently on screen
	    let tile = this.ground.getFirstDead();

	 	if (tile){
		    // If no x cordinate is provided, render it just outside of the screen
	        let x = typeof initX==='undefined' ? (this.game.width-2) : initX;
	    	let y = this.game.world.height - this.tileSize;

		    //Reset it to the specified coordinates
		    tile.reset(x, y);
	    	tile.body.immovable = true;
	    	tile.body.allowGravity = false;
		    tile.body.velocity.x = -this.game.Settings.physics.platformSpeed;

		    //When the tile leaves the screen, kill it
		    tile.checkWorldBounds = true;
		    tile.outOfBoundsKill = true;

		    // Save the last added tile for later user
		    this.lastAddedTile = tile;		    
	 	}
	}

	distanceTravelled() {
		return this.tileCount*this.tileSize;
	}

	update() {
		// If the last added tile is about to leave the edge of the game
		if (this.lastAddedTile.x + this.tileSize < this.game.width) {
			// Append a new tile
			this.addTile();
			// Increment tile counter (this will count in the scores)
			this.tileCount++;
		}		
	}

}

export default Ground;