import Phaser from 'phaser';
import Settings from '../settings.js';
import { killSprite, resetSprite, killIfOutOfBounds } from '../utils/pool.js';

export default class Coins {

  constructor(scene, platform) {
    this.scene = scene;
    this.platform = platform;
    this.enableSpawning = true;
    this.platformMap = {};

    this.coins = scene.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    for (let i = 0; i < 20; i++) {
      const coin = this.coins.create(0, 0, 'coin');
      coin.setOrigin(0, 0);
      coin.setActive(false).setVisible(false);
      coin.body.stop();
      coin.body.enable = false;
    }

    if (!scene.anims.exists('coin-spin')) {
      scene.anims.create({
        key: 'coin-spin',
        frames: scene.anims.generateFrameNumbers('coin', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
      });
    }

    this.timer = scene.time.addEvent({
      delay: Settings.timers.coinSpawn,
      callback: this.addCoin,
      callbackScope: this,
      loop: true
    });
  }

  getObject() {
    return this.coins;
  }

  disableSpawning() {
    this.enableSpawning = false;
  }

  removeCoin(coin) {
    this.platformMap[coin.platformId] = false;
    killSprite(coin);
  }

  addToPlatformMap(platformId) {
    this.platformMap[platformId] = true;
  }

  setCoinPosition(coin) {
    const platforms = this.platform.getOnScreenPlatforms();

    let x = Phaser.Math.Between(0, this.scene.scale.width);
    let y = this.scene.scale.height - Settings.sizes.groundHeight - 40;

    if (platforms.length) {
      const platformData = platforms[Phaser.Math.Between(0, platforms.length - 1)];

      if (!this.platformMap[platformData.id]) {
        this.addToPlatformMap(platformData.id);
        coin.platformId = platformData.id;
        x = platformData.x + platformData.width / 2 - 10;
        y = platformData.y - 40;
      }
    }

    coin.setOrigin(0, 0);
    resetSprite(coin, x, y);
  }

  addCoin() {
    if (!this.enableSpawning) return;

    const coin = this.coins.getFirstDead(false);
    if (!coin) return;

    this.setCoinPosition(coin);
    coin.anims.play('coin-spin', true);
    coin.body.setImmovable(true);
    coin.body.setAllowGravity(false);
    coin.body.setVelocityX(-Settings.physics.platformSpeed);
  }

  update() {
    this.coins.getChildren().forEach(coin => {
      killIfOutOfBounds(coin);
    });
  }
}
