class Lives {

	constructor(game, nrOfLives = 5) {
		this.game = game;
		this.nrOfLives = nrOfLives;
		this.hearts = [];

		this.heartScale = 1;
		this.topOffset = 60;
		this.rightOffset = 25;
		this.spacing = 6;

		this.draw();
	}

	draw() {
		for (let i = 0; i < this.nrOfLives; i++) {
			let heart = this.game.add.sprite(0, this.topOffset, 'heart');
			heart.scale.setTo(this.heartScale, this.heartScale);
			heart.fixedToCamera = true;
			this.hearts.push(heart);
		}
		this.alignHearts();
	}

	alignHearts() {
		if (this.hearts.length === 0) return;

		let heartWidth = this.hearts[0].width;
		let totalWidth = this.hearts.length * heartWidth + (this.hearts.length - 1) * this.spacing;
		let startX = this.game.width - totalWidth - this.rightOffset;

		for (let i = 0; i < this.hearts.length; i++) {
			this.hearts[i].cameraOffset.x = startX + i * (heartWidth + this.spacing);
			this.hearts[i].cameraOffset.y = this.topOffset;
		}
	}

	loseLife() {
		if (this.hearts.length === 0) return 0;
		let heart = this.hearts.pop();
		heart.destroy();
		return this.hearts.length;
	}

	getLives() {
		return this.hearts.length;
	}

	isAlive() {
		return this.hearts.length > 0;
	}

}

export default Lives;
