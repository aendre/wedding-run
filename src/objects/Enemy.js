import Phaser from 'phaser';
import Settings from '../settings.js';
import { resetSprite, killIfOutOfBounds } from '../utils/pool.js';

export default class Enemy {

  constructor(scene) {
    this.scene = scene;

    this.enemies = scene.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    for (let i = 0; i < 10; i++) {
      const bunny = this.enemies.create(0, 0, 'bunny');
      bunny.setOrigin(0, 0);
      bunny.setActive(false).setVisible(false);
      bunny.body.stop();
      bunny.body.enable = false;
    }

    if (!scene.anims.exists('bunny-fly')) {
      scene.anims.create({
        key: 'bunny-fly',
        frames: scene.anims.generateFrameNumbers('bunny', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
      });
    }

    this.timer = scene.time.addEvent({
      delay: Settings.timers.enemySpawn,
      callback: this.addBunny,
      callbackScope: this,
      loop: true
    });
  }

  getObject() {
    return this.enemies;
  }

  addBunny() {
    const bunny = this.enemies.getFirstDead(false);
    if (!bunny) return;

    const x = this.scene.scale.width;
    const y = this.scene.scale.height - Phaser.Math.Between(2, 6) * Settings.sizes.groundHeight;

    bunny.setOrigin(0, 0);
    resetSprite(bunny, x, y);
    bunny.anims.play('bunny-fly', true);
    bunny.body.setImmovable(true);
    bunny.body.setAllowGravity(false);
    bunny.body.setVelocityX(-Phaser.Math.Between(1, 4) * Settings.physics.platformSpeed - 35);

    const bunnyImage = this.scene.textures.get('bunny').getSourceImage();
    bunny.body.setSize(25, bunnyImage.height - 8);
    bunny.body.setOffset(3, 4);
  }

  update() {
    this.enemies.getChildren().forEach(bunny => {
      killIfOutOfBounds(bunny);
    });
  }
}
