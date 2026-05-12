export default class SplashText {

  constructor(scene) {
    this.scene = scene;
    this.timeOut = 2000;
    this.timer = undefined;
    this.splashText = undefined;
  }

  write(text) {
    if (this.splashText) {
      this.splashText.destroy();
    }

    this.splashText = this.scene.add.text(this.scene.scale.width / 2, 100, text, {
      fontFamily: 'arcade',
      fontSize: '30px',
      color: '#FFFFFF',
      stroke: '#0b77a5',
      strokeThickness: 6,
      align: 'center'
    }).setOrigin(0.5).setAlpha(0);

    this.scene.tweens.add({
      targets: this.splashText,
      alpha: 1,
      scaleX: 1.6,
      scaleY: 1.6,
      duration: 500,
      ease: 'Linear'
    });

    this.timer = this.scene.time.delayedCall(this.timeOut, () => {
      this.destroySplashText();
    });
  }

  destroySplashText() {
    if (this.splashText) {
      this.splashText.destroy();
      this.splashText = undefined;
    }
  }
}
