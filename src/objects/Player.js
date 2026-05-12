import Phaser from 'phaser';
import Settings from '../settings.js';

export default class Player {

  constructor(scene) {
    this.scene = scene;

    const characterSprite = this.isWoman() ? 'brideSprite' : 'groomSprite';

    this.character = scene.physics.add.sprite(
      scene.scale.width / 2,
      scene.scale.height - 150,
      characterSprite
    );

    this.character.setBounce(0, Settings.physics.playerBounce);
    this.character.body.setGravityY(Settings.physics.playerGravity);

    const img = scene.textures.get(characterSprite).getSourceImage();
    this.character.body.setSize(25, img.height - 5, true);
    this.character.body.setOffset(4, 5);

    this.character.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers(characterSprite, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.character.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers(characterSprite, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.sounds = {
      jump: scene.sound.add('jump', { volume: Settings.effectVolume }),
      damage: scene.sound.add(this.isWoman() ? 'damage-woman' : 'damage-man', { volume: Settings.effectVolume }),
      coin: scene.sound.add('coin', { volume: Settings.effectVolume })
    };

    this.isStunned = false;
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  getObject() {
    return this.character;
  }

  isMale() {
    return Settings.characterType !== 'bride';
  }

  isWoman() {
    return !this.isMale();
  }

  collectBounty(x, y, velocity) {
    this.sounds.coin.play();
    const score = velocity * Settings.score.enemy;
    this.scorePoints(x, y, score);
  }

  collectCoin(x, y) {
    this.sounds.coin.play();
    this.scorePoints(x, y, Settings.score.coin);
  }

  scorePoints(x, y, points) {
    const text = this.scene.add.text(x, y, `+${Math.round(points)}`, {
      fontFamily: 'arcade',
      fontSize: '25px',
      color: '#FFFFFF',
      stroke: '#504c39',
      strokeThickness: 2,
      align: 'center'
    }).setOrigin(0.5);

    this.scene.tweens.add({
      targets: text,
      y: y - 60,
      duration: 500,
      ease: 'Linear',
      onComplete: () => text.destroy()
    });
  }

  takeDamage(knockForward = false) {
    this.sounds.damage.play();
    this.character.setTint(0xff0000);
    this.isStunned = true;
    this.character.body.velocity.x = knockForward ? 200 : -200;
    this.character.body.velocity.y = -150;

    this.scene.time.delayedCall(400, () => {
      this.character.clearTint();
      this.isStunned = false;
    });
  }

  die() {
    this.sounds.damage.play();
    this.character.anims.stop();
    this.character.setFrame(4);
  }

  update(hitPlatform) {
    if (this.isStunned) return;

    this.character.body.velocity.x = -Settings.physics.platformSpeed;
    this.character.body.setGravityY(Settings.physics.playerGravity);

    if (this.cursors.left.isDown) {
      this.character.body.velocity.x = -Settings.physics.playerRunningBackwardSpeed - Settings.physics.platformSpeed;
      this.character.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.character.body.velocity.x = Settings.physics.playerRunningForwardSpeed;
      this.character.anims.play('right', true);
    } else {
      this.character.anims.stop();
      this.character.setFrame(4);
    }

    if (this.cursors.down.isDown) {
      this.character.body.setGravityY(Settings.physics.playerGravity + Settings.physics.extraGravity);
    }

    if (this.cursors.up.isDown && this.character.body.touching.down && hitPlatform) {
      this.sounds.jump.play();
      this.character.body.velocity.y = -Settings.physics.playerJumpVelocity;
    }
  }
}
