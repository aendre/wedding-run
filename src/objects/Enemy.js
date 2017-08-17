class Enemy {

	constructor(game){
		this.game = game;

		// Create a group for the platforms
		this.enemies = this.game.add.group();
	    this.enemies.enableBody = true;
	    this.enemies.createMultiple(10, 'bunny');
	    
	    this.timer = game.time.events.loop(this.game.Settings.timers.enemySpawn, this.addBunny, this);
	    return this;
	}

	getObject() {
 		return this.enemies;
	}

	addBunny(){
 		// Get a cloud that is not currently on screen
	    let bunny = this.enemies.getFirstDead();

	 	if (bunny){

	 		// Initial position of the bunny is outside of the game world
		 	let x = this.game.width;
	    	let y = this.game.world.height - this.game.rnd.between(2,6) * this.game.Settings.sizes.groundHeight;

		    //Reset it to the specified coordinates
		    bunny.reset(x, y);
		   
	    	bunny.animations.add('fly', [0, 1, 2, 3, 4], 10, true);
	    	bunny.animations.play('fly');
	    	bunny.body.immovable = true;
	    	bunny.body.allowGravity = false;
	    	bunny.body.velocity.x = - this.game.rnd.between(1,4) * this.game.Settings.physics.platformSpeed - 35;

	    	 // Set a narrower bounding box for the bunny than the image itself
	    	let bunnyImage = this.game.cache.getImage('bunny');
	    	bunny.body.setSize(25, bunnyImage.height-8, 3, 4);
 
		    //When the bunny leaves the screen, kill it
		    bunny.checkWorldBounds = true;
		    bunny.outOfBoundsKill = true;
	 	}
	}

	update() {
 		
	}

}

export default Enemy;