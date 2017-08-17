class Background {

	constructor(game){
		this.game = game;

		// Set speeds
		this.mountainSpeed = 0.2;
 		this.bgHillSpeed = 0.4;
 		this.hillsSpeed = 0.6;
		
		// Set the game background colour
		this.game.stage.backgroundColor = '#ccf2ff';
		
		// Set a background image
		this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
		
		// Add mountains
		this.mountains = this.game.add.tileSprite(0, this.game.height-this.game.cache.getImage('background-mountains').height-64, this.game.width, this.game.world.height, 'background-mountains');

		// Add hills in the background
		this.bgHills = this.game.add.tileSprite(0, this.game.height-this.game.cache.getImage('background-back-hills').height+30, this.game.width, this.game.world.height, 'background-back-hills');

		// Add hills
		this.hills = this.game.add.tileSprite(0, this.game.height-this.game.cache.getImage('background-hills').height+30, this.game.width, this.game.world.height, 'background-hills');


		// Create a random cloud group
		this.clouds = this.game.add.group();
	    this.clouds.enableBody = true;
	    this.clouds.createMultiple(2, 'cloud-1');
	    this.clouds.createMultiple(2, 'cloud-2');
	    this.clouds.createMultiple(2, 'cloud-1');
	    this.clouds.createMultiple(2, 'cloud-2');

	    this.initializeClouds();
	    this.timer = game.time.events.loop(this.game.Settings.timers.cloudSpawn, this.createCloud, this);

	    return this;
	}

	initializeClouds() {
		// By default add a few clouds
		for (let i=0; i<3; i++) {
			this.createCloud(this.game.rnd.between(0,this.game.width));
		}
	}

	createCloud(initX) {
	    // Get a cloud that is not currently on screen
	    let cloud = this.clouds.getFirstDead();

	 	if (cloud){
	 		// Initial position of the cloud is outside of the game world
		 	let x = typeof initX ==='undefined' ? this.game.width : initX;
		 	// Generate a new position for the cloud
		 	let y = this.game.rnd.between(20,100);

		    //Reset it to the specified coordinates
		    cloud.reset(x, y);
		    cloud.body.velocity.x = this.game.rnd.between(-30,-100);
		    cloud.body.allowGravity = false;
		 
		    //When the cloud leaves the screen, kill it
		    cloud.checkWorldBounds = true;
		    cloud.outOfBoundsKill = true;
	 	}
	}

	update() {
 		this.mountains.tilePosition.x -= this.mountainSpeed;
 		this.bgHills.tilePosition.x -= this.bgHillSpeed;
 		this.hills.tilePosition.x -= this.hillsSpeed;
	}
}

export default Background;