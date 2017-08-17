class SplashText {

	constructor(game){
		this.game = game;
		this.timeOut = 2000;
		this.timer = undefined;
		this.splashText = undefined;
		
		return this;
	}

	write(text) {
		this.splashText = this.game.add.text(this.game.width/2, 100,text);
	    this.splashText.anchor.set(0.5);
	    this.splashText.align = 'center';
	    this.splashText.font = 'arcade';
	    this.splashText.fontSize = 30;
	    this.splashText.fill = '#FFFFFF';
		this.splashText.stroke = '#0b77a5';
		this.splashText.strokeThickness = 6;
		this.splashText.alpha = 0;

		this.game.add.tween(this.splashText).to( { alpha: 1 }, 500, "Linear", true);
		this.game.add.tween(this.splashText).to( { fontSize: 50 }, 500, "Linear", true);

		this.timer = this.game.time.events.loop(this.timeOut, this.destroySplashText, this);
	}

	destroySplashText() {
		this.splashText.destroy();
		this.game.time.events.remove(this.timer);
	}
}

export default SplashText;