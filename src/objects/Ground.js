import Settings from '../settings.js';
import { killSprite, resetSprite, killIfOutOfBounds } from '../utils/pool.js';

export default class Ground {

  constructor(scene) {
    this.scene = scene;
    this.tileSize = Settings.sizes.groundHeight;

    this.ground = scene.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    for (let i = 0; i < 16; i++) {
      const tile = this.ground.create(0, 0, 'ground');
      tile.setOrigin(0, 0);
      tile.setActive(false).setVisible(false);
      tile.body.stop();
      tile.body.enable = false;
    }

    this.lastAddedTile = null;
    this.createFullGround();
    this.tileCount = 0;
  }

  getObject() {
    return this.ground;
  }

  createFullGround() {
    for (let i = 0; i < this.scene.scale.width; i += this.tileSize) {
      this.addTile(i);
    }
  }

  addTile(initX) {
    const tile = this.ground.getFirstDead(false);
    if (!tile) return;

    const x = typeof initX === 'undefined' ? (this.scene.scale.width - 2) : initX;
    const y = this.scene.scale.height - this.tileSize;

    tile.setOrigin(0, 0);
    resetSprite(tile, x, y);
    tile.body.setVelocityX(-Settings.physics.platformSpeed);
    tile.body.setImmovable(true);
    tile.body.setAllowGravity(false);

    this.lastAddedTile = tile;
  }

  distanceTravelled() {
    return this.tileCount * this.tileSize;
  }

  update() {
    if (this.lastAddedTile && this.lastAddedTile.x + this.tileSize < this.scene.scale.width) {
      this.addTile();
      this.tileCount++;
    }

    this.ground.getChildren().forEach(tile => {
      killIfOutOfBounds(tile);
    });
  }
}
