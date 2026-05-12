export default class SoundControl {

  constructor(scene) {
    this.scene = scene;

    const defaultFrame = scene.sound.mute ? 1 : 0;
    this.button = scene.add.sprite(20, 20, 'sound-control', defaultFrame)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerdown', () => this.actionOnClick());
  }

  actionOnClick() {
    if (this.scene.sound.mute) {
      this.unMute();
    } else {
      this.mute();
    }
  }

  mute() {
    this.scene.sound.mute = true;
    this.button.setFrame(1);
  }

  unMute() {
    this.scene.sound.mute = false;
    this.button.setFrame(0);
  }
}
