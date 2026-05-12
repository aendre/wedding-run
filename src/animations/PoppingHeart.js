import Phaser from 'phaser';

export default class PoppingHeartAnimation {

  constructor(objToAnimate, scene) {
    this.obj = objToAnimate;
    this.scene = scene;

    this.duration = 3000 + Phaser.Math.Between(0, 2000);
    this.verticalSpeed = 35;
    this.swingDegree = 20 + Phaser.Math.Between(0, 20);
    this.delay = Phaser.Math.Between(0, 2000);
  }

  animate() {
    const initialX = this.obj.x;
    const initialY = this.obj.y;

    this.scene.tweens.add({
      targets: this.obj,
      x: {
        value: initialX + this.getApproximateValue(this.swingDegree),
        ease: 'Sine.easeInOut',
        yoyo: true
      },
      y: initialY - 3 * this.verticalSpeed,
      alpha: 0.2,
      scaleX: 0.1,
      scaleY: 0.1,
      duration: this.duration,
      delay: this.delay,
      repeat: -1
    });
  }

  getApproximateValue(value, tolerance = 10) {
    const sign = (Math.random() * 2 - 1) > 0 ? 1 : -1;
    return value + sign * Phaser.Math.Between(0, tolerance);
  }
}
