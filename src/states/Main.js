import Player from 'objects/Player';
import Platform from 'objects/Platform';
import Ground from 'objects/Ground';
import Background from 'objects/Background';
import Score from 'objects/Score';
import Coins from 'objects/Coins';
import Enemies from 'objects/Enemy';
import SoundControl from 'objects/SoundControl';
import Achievements from 'objects/Achievements';
import ToplistService from 'services/ToplistService';


class Main extends Phaser.State {

	create(characterType,params) {
		// Enable Arcade Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = this.game.Settings.physics.worldGravity;

		// Set world bounds: x, y, width, height
		this.game.world.setBounds(0, 0, this.game.Settings.canvasWidth, this.game.Settings.canvasHeight)

		// Initialize score counter
		this.coinsCollected = 0;
		this.bunniesKilled = 0;
		this.bountyPoints = 0;

		// Game over flag
		this.isGameOver = false;

		// Add Background
		this.background = new Background(this.game);

		// Add scoreboard
		this.score = new Score(this.game);
		
		// Add ground
		this.ground = new Ground(this.game);

		// Add floating platforms
		this.platform = new Platform(this.game);

		// Add player
		this.player = new Player(this.game);

		// Add some coins at a given rate considering the platform
		this.coins = new Coins(this.game,this.platform);

		// Add some coins at a given rate
		this.enemies = new Enemies(this.game);
		
		// Store achievements
		this.achievements = new Achievements(this.game);

		// Add hot key handlers
		this.registerKeyhandler();

	    let playerObject = this.player.getObject();
	    //  By default the Signal is empty, so we create it here:
	    playerObject.body.onWorldBounds = new Phaser.Signal();
	    playerObject.body.onWorldBounds.add(this.hitWorldBounds, this);

		// Start playing music
		this.soundControl = new SoundControl(this.game);
		this.inGameMusic = this.game.add.audio('ingame',this.game.Settings.musicVolume,true);
		this.gameOverMusic = this.game.add.audio('game-over',this.game.Settings.musicVolume,false);
    	this.inGameMusic.play();

    	// Check for specific game events
    	this.timer = this.game.time.events.loop(this.game.Settings.timers.mainLoop, this.mainLoop, this);
	}

	registerKeyhandler() {
	    this.game.input.keyboard.onUpCallback = _.bind(function(e){
			if(e.keyCode == Phaser.Keyboard.ESC) {
	  			this.game.state.start('MainMenu');
			}
			if(e.keyCode == Phaser.Keyboard.ENTER && this.isGameOver) {
	  			this.game.state.start('Main');
			}
		},this);
	}

	hitWorldBounds() {
		this.gameOver();
	}

	gameOver() {
		// Global physics pause
		this.game.physics.arcade.isPaused = true;
		
		// Set game over flag to true, so no object update will occur
		this.isGameOver = true;
		
		// Kill player
		this.player.die();

		// Start playing the game over soundtrack
    	this.inGameMusic.destroy();
    	this.gameOverMusic.play();

		// Show game over screen
		this.showGameOver();

		// Save settings in the background
		ToplistService.saveScore(this.game.Settings.playerName,this.calculateScore());
	}

	showGameOver() {
		var gameOverText = this.game.add.text(this.game.width/2, 100,'GAME OVER');
	    gameOverText.anchor.set(0.5);
	    gameOverText.align = 'center';
	    gameOverText.font = 'arcade';
	    gameOverText.fontSize = 100;
	    gameOverText.fill = '#333023';
	    gameOverText.stroke = '#FFFFFF';
    	gameOverText.strokeThickness = 6;

    	var restartText = this.game.add.text(this.game.width/2, 200,'ENTER - Restart the game\n ESC - Go to main menu');
	    restartText.anchor.set(0.5);
	    restartText.align = 'center';
	    restartText.font = 'arcade';
	    restartText.fontSize = 30;
	    restartText.fill = '#0b77a5';
	    restartText.stroke = '#FFFFFF';
    	restartText.strokeThickness = 2;
	}

	update() {   	
	   	// Update objects only if the game is running
	   	if (!this.isGameOver) {	

		    //  Collision detections
		    var hitPlatform = this.game.physics.arcade.collide(this.player.getObject(),this.platform.getObject());
		    var hitGround = this.game.physics.arcade.collide(this.player.getObject(),this.ground.getObject());
		    var touchingSolidGround = hitPlatform || hitGround;

		    this.player.update(touchingSolidGround);
		    this.platform.update(hitPlatform,hitGround);
		    this.ground.update();
		    this.coins.update();
		    this.background.update();
		    this.enemies.update();
		 
		    // Update score
		    this.score.update(this.calculateScore());

		    // Handle coin collection
		    this.game.physics.arcade.collide(this.player.getObject(), this.coins.getObject(), this.collectCoin, _.noop, this);

		    // Handle player - enemy collision
		    this.game.physics.arcade.collide(this.player.getObject(), this.enemies.getObject(), this.hitEnemyLines, _.noop, this);
	   	}
	   	else {
	   		this.coins.disableSpawning();
	   	}
	}

	calculateScore() {
		return this.coinsCollected * this.game.Settings.score.coin + this.ground.distanceTravelled() * this.game.Settings.score.pixel + this.bountyPoints;
	}

	hitEnemyLines(player,enemy) {
		if (player.body.touching.down && enemy.body.touching.up) {
			let x = enemy.x;
			let y = enemy.y;
			let velocity = Math.abs(enemy.body.velocity.x);
			enemy.kill();
        	this.player.collectBounty(x,y,velocity);
			this.bunniesKilled++;
			this.bountyPoints += velocity;
		}
		else {
			this.gameOver();
		}

	}

	collectCoin(player, coin) {
        this.player.collectCoin(coin.x,coin.y);
		this.coins.removeCoin(coin);
        this.coinsCollected++;
	}

	mainLoop() {
		this.achievements.check(this);		
	}

	shutdown() {
		this.inGameMusic.destroy();
	}

}

export default Main;
