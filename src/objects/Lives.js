export default class Lives {

  constructor(scene, nrOfLives = 5) {
    this.scene = scene;
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
      const heart = this.scene.add.sprite(0, this.topOffset, 'heart');
      heart.setScale(this.heartScale);
      heart.setScrollFactor(0);
      this.hearts.push(heart);
    }
    this.alignHearts();
  }

  alignHearts() {
    if (this.hearts.length === 0) return;

    const heartWidth = this.hearts[0].width;
    const totalWidth = this.hearts.length * heartWidth + (this.hearts.length - 1) * this.spacing;
    const startX = this.scene.scale.width - totalWidth - this.rightOffset;

    for (let i = 0; i < this.hearts.length; i++) {
      this.hearts[i].x = startX + i * (heartWidth + this.spacing);
      this.hearts[i].y = this.topOffset;
    }
  }

  loseLife() {
    if (this.hearts.length === 0) return 0;
    const heart = this.hearts.pop();
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
