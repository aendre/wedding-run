import Phaser from 'phaser';
import Settings from '../settings.js';
import { killSprite, resetSprite, killIfOutOfBounds } from '../utils/pool.js';

export default class Background {

  constructor(scene) {
    this.scene = scene;

    this.mountainSpeed = 0.2;
    this.bgHillSpeed = 0.4;
    this.hillsSpeed = 0.6;

    const w = scene.scale.width;
    const h = scene.scale.height;

    scene.cameras.main.setBackgroundColor('#ccf2ff');

    this.bg = scene.add.tileSprite(0, 0, w, h, 'background').setOrigin(0, 0);

    const mountainsH = scene.textures.get('background-mountains').getSourceImage().height;
    this.mountains = scene.add.tileSprite(0, h - mountainsH - 64, w, mountainsH, 'background-mountains').setOrigin(0, 0);

    const bgHillsH = scene.textures.get('background-back-hills').getSourceImage().height;
    this.bgHills = scene.add.tileSprite(0, h - bgHillsH + 30, w, bgHillsH, 'background-back-hills').setOrigin(0, 0);

    const hillsH = scene.textures.get('background-hills').getSourceImage().height;
    this.hills = scene.add.tileSprite(0, h - hillsH + 30, w, hillsH, 'background-hills').setOrigin(0, 0);

    this.clouds = scene.physics.add.group({
      allowGravity: false
    });

    const cloudKeys = ['cloud-1', 'cloud-2', 'cloud-1', 'cloud-2', 'cloud-1', 'cloud-2', 'cloud-1', 'cloud-2'];
    for (const key of cloudKeys) {
      const cloud = this.clouds.create(0, 0, key);
      cloud.setOrigin(0, 0);
      cloud.setActive(false).setVisible(false);
      cloud.body.stop();
      cloud.body.enable = false;
    }

    this.initializeClouds();
    this.timer = scene.time.addEvent({
      delay: Settings.timers.cloudSpawn,
      callback: this.createCloud,
      callbackScope: this,
      loop: true
    });
  }

  initializeClouds() {
    for (let i = 0; i < 3; i++) {
      this.createCloud(Phaser.Math.Between(0, this.scene.scale.width));
    }
  }

  createCloud(initX) {
    const cloud = this.clouds.getFirstDead(false);
    if (!cloud) return;

    const x = typeof initX === 'undefined' ? this.scene.scale.width : initX;
    const y = Phaser.Math.Between(20, 100);

    cloud.setOrigin(0, 0);
    resetSprite(cloud, x, y);
    cloud.body.setVelocityX(Phaser.Math.Between(-100, -30));
    cloud.body.setAllowGravity(false);
  }

  update() {
    this.mountains.tilePositionX += this.mountainSpeed;
    this.bgHills.tilePositionX += this.bgHillSpeed;
    this.hills.tilePositionX += this.hillsSpeed;

    this.clouds.getChildren().forEach(cloud => {
      killIfOutOfBounds(cloud);
    });
  }
}
