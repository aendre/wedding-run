import Phaser from 'phaser';
import Settings from '../settings.js';
import { killSprite, resetSprite, killIfOutOfBounds } from '../utils/pool.js';

let platformIdCounter = 0;

export default class Platform {

  constructor(scene) {
    this.scene = scene;
    this.groundHeight = Settings.sizes.groundHeight;
    this.lastFloor = 0;
    this.floorHeight = 95;
    this.playerWasOnThePlatforms = false;
    this.playerFallDownToGround = false;

    this.platforms = scene.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    for (let i = 0; i < 25; i++) {
      const key = `platform-${Phaser.Math.Between(1, 3)}`;
      const platform = this.platforms.create(0, 0, key);
      platform.setOrigin(0, 0);
      platform.setActive(false).setVisible(false);
      platform.body.stop();
      platform.body.enable = false;
    }

    this.timer = scene.time.addEvent({
      delay: Settings.timers.platformSpawn,
      callback: this.addPlatform,
      callbackScope: this,
      loop: true
    });
  }

  getObject() {
    return this.platforms;
  }

  getOnScreenPlatforms() {
    const positions = [];
    this.platforms.getChildren().forEach(platform => {
      if (platform.active) {
        positions.push({
          x: platform.x,
          y: platform.y,
          id: platform.platformId,
          width: platform.width,
          height: platform.height
        });
      }
    });
    return positions;
  }

  addPlatform(floor, initX) {
    const platform = this.platforms.getFirstDead(false);
    if (!platform) return;

    const isFloorDefined = typeof floor !== 'undefined' && typeof floor === 'number';
    this.lastFloor = isFloorDefined ? floor : this.getNextFloor();

    const x = typeof initX === 'undefined' ? this.scene.scale.width : initX;
    const y = this.scene.scale.height - this.groundHeight - this.lastFloor * this.floorHeight;

    platform.setOrigin(0, 0);
    resetSprite(platform, x, y);
    platform.body.setVelocityX(-Settings.physics.platformSpeed);
    platform.body.setImmovable(true);
    platform.body.setAllowGravity(false);
    platform.platformId = `platform-${platformIdCounter++}`;
  }

  getNextFloor() {
    if (this.playerFallDownToGround && this.lastFloor > 1) {
      this.resetPlayerState();
      return 1;
    }
    if (this.lastFloor === 0) return 1;
    if (this.lastFloor === 1) return Math.random() > 0.3 ? 2 : 1;
    if (this.lastFloor === 2) return Math.random() > 0.5 ? 2 : 3;
    return Phaser.Math.Between(1, 3);
  }

  resetPlayerState() {
    this.playerWasOnThePlatforms = false;
    this.playerFallDownToGround = false;
  }

  update(hitPlatform, hitGround) {
    if (!this.playerWasOnThePlatforms && hitPlatform) {
      this.playerWasOnThePlatforms = true;
    }
    if (this.playerWasOnThePlatforms && hitGround) {
      this.playerFallDownToGround = true;
    }

    this.platforms.getChildren().forEach(platform => {
      killIfOutOfBounds(platform);
    });
  }
}
