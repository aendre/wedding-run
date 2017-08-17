class Preload extends Phaser.State {

	preload() {
		
		// Load characters and game controls
		this.game.load.image('brideLarge', 'assets/images/bride_large.png');
		this.game.load.image('groomLarge', 'assets/images/groom_large.png');
		this.game.load.image('heart', 'assets/images/heart.png');
		this.game.load.spritesheet('sound-control', 'assets/images/sound-control.png', 48, 40);
		
		// Load sounds
		this.game.load.audio('ingame', ['assets/sounds/ingame.mp3']);
		this.game.load.audio('menu', ['assets/sounds/menu.mp3']);
		this.game.load.audio('game-over', ['assets/sounds/game-over.mp3']);
		this.game.load.audio('coin', ['assets/sounds/coin.mp3']);
		this.game.load.audio('jump', ['assets/sounds/jump.mp3']);
		this.game.load.audio('damage-man', ['assets/sounds/damage-man.mp3']);
		this.game.load.audio('damage-woman', ['assets/sounds/damage-woman.mp3']);

		// Load background related assets
		this.game.load.image('background', 'assets/images/bg.png');
		this.game.load.image('background-mountains', 'assets/images/mountains.png');
		this.game.load.image('background-hills', 'assets/images/hills.png');
		this.game.load.image('background-back-hills', 'assets/images/back-hills.png');
		this.game.load.image('cloud-1', 'assets/images/cloud-1.png');
		this.game.load.image('cloud-2', 'assets/images/cloud-2.png');

		// Ground and platform images
		this.game.load.image('ground', 'assets/images/ground.png');
		this.game.load.image('platform-1', 'assets/images/platform-1.png');
		this.game.load.image('platform-2', 'assets/images/platform-2.png');
		this.game.load.image('platform-3', 'assets/images/platform-3.png');
		
		// Sprites
		this.game.load.spritesheet('groomSprite', 'assets/images/groom.png', 32, 48);
		this.game.load.spritesheet('brideSprite', 'assets/images/bride.png', 32, 48);
		this.game.load.spritesheet('coin', 'assets/images/coin.png', 30, 30);
		this.game.load.spritesheet('bunny', 'assets/images/bunny.png', 32, 30);		
	}

	create() {
		// Activate input plugin
		this.game.plugins.add(PhaserInput.Plugin);		
		this.game.state.start("MainMenu");
	}

}

export default Preload;
