import Phaser from 'phaser';
import Player from 'objects/Player';
import Platform from 'objects/Platform';
import Ground from 'objects/Ground';
import Background from 'objects/Background';
import Score from 'objects/Score';
import Lives from 'objects/Lives';
import Coins from 'objects/Coins';
import Enemies from 'objects/Enemy';
import SoundControl from 'objects/SoundControl';
import Achievements from 'objects/Achievements';
import ToplistService from 'services/ToplistService';
import Settings from '../settings.js';

export default class Main extends Phaser.Scene {

  constructor() {
    super('Main');
  }

  create() {
    this.physics.world.gravity.y = Settings.physics.worldGravity;
    this.physics.world.setBounds(0, 0, Settings.canvasWidth, Settings.canvasHeight);

    this.coinsCollected = 0;
    this.bunniesKilled = 0;
    this.bountyPoints = 0;
    this.nrOfLives = 5;
    this.isGameOver = false;

    this.background = new Background(this);
    this.score = new Score(this);
    this.lives = new Lives(this, this.nrOfLives);
    this.ground = new Ground(this);
    this.platform = new Platform(this);
    this.player = new Player(this);
    this.coins = new Coins(this, this.platform);
    this.enemies = new Enemies(this);
    this.achievements = new Achievements(this);

    this.registerKeyhandler();

    const playerObject = this.player.getObject();
    playerObject.body.setCollideWorldBounds(true);
    playerObject.body.onWorldBounds = true;
    this.physics.world.on('worldbounds', (body, up, down, left, right) => {
      if (body.gameObject === playerObject) {
        if (right || left) {
          this.applyDamage(left);
          return;
        }
        this.gameOver();
      }
    });

    this.soundControl = new SoundControl(this);
    this.inGameMusic = this.sound.add('ingame', { volume: Settings.musicVolume, loop: true });
    this.gameOverMusic = this.sound.add('game-over', { volume: Settings.musicVolume, loop: false });
    this.inGameMusic.play();

    this.mainLoopTimer = this.time.addEvent({
      delay: Settings.timers.mainLoop,
      callback: this.mainLoop,
      callbackScope: this,
      loop: true
    });

    this.events.on('shutdown', () => {
      this.inGameMusic.destroy();
    });
  }

  registerKeyhandler() {
    this.input.keyboard.on('keyup-ESC', () => {
      this.scene.start('MainMenu');
    });
    this.input.keyboard.on('keyup-ENTER', () => {
      if (this.isGameOver) {
        this.scene.start('Main');
      }
    });
  }

  applyDamage(knockForward = false) {
    this.player.takeDamage(knockForward);
    const remaining = this.lives.loseLife();
    if (remaining < 1) {
      this.gameOver();
    }
  }

  gameOver() {
    this.physics.pause();
    this.isGameOver = true;
    this.player.die();
    this.inGameMusic.destroy();
    this.gameOverMusic.play();
    this.showGameOver();
    ToplistService.saveScore(Settings.playerName, this.calculateScore());
  }

  showGameOver() {
    const w = this.scale.width;

    this.add.text(w / 2, 100, 'GAME OVER', {
      fontFamily: 'arcade',
      fontSize: '100px',
      color: '#333023',
      stroke: '#FFFFFF',
      strokeThickness: 6,
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(w / 2, 200, 'ENTER - Restart the game\n ESC - Go to main menu', {
      fontFamily: 'arcade',
      fontSize: '30px',
      color: '#0b77a5',
      stroke: '#FFFFFF',
      strokeThickness: 2,
      align: 'center'
    }).setOrigin(0.5);
  }

  update() {
    if (!this.isGameOver) {
      const hitPlatform = this.physics.collide(this.player.getObject(), this.platform.getObject());
      const hitGround = this.physics.collide(this.player.getObject(), this.ground.getObject());
      const touchingSolidGround = hitPlatform || hitGround;

      this.player.update(touchingSolidGround);
      this.platform.update(hitPlatform, hitGround);
      this.ground.update();
      this.coins.update();
      this.background.update();
      this.enemies.update();

      this.score.update(this.calculateScore());

      this.physics.collide(this.player.getObject(), this.coins.getObject(), this.collectCoin, null, this);
      this.physics.collide(this.player.getObject(), this.enemies.getObject(), this.hitEnemyLines, null, this);
    } else {
      this.coins.disableSpawning();
    }
  }

  calculateScore() {
    return this.coinsCollected * Settings.score.coin
      + this.ground.distanceTravelled() * Settings.score.pixel
      + this.bountyPoints;
  }

  hitEnemyLines(player, enemy) {
    if (player.body.touching.down && enemy.body.touching.up) {
      const x = enemy.x;
      const y = enemy.y;
      const velocity = Math.abs(enemy.body.velocity.x);
      enemy.setActive(false).setVisible(false);
      enemy.body.stop();
      enemy.body.enable = false;
      this.player.collectBounty(x, y, velocity);
      this.bunniesKilled++;
      this.bountyPoints += velocity;
    } else {
      enemy.setActive(false).setVisible(false);
      enemy.body.stop();
      enemy.body.enable = false;
      this.applyDamage();
    }
  }

  collectCoin(player, coin) {
    this.player.collectCoin(coin.x, coin.y);
    this.coins.removeCoin(coin);
    this.coinsCollected++;
  }

  mainLoop() {
    this.achievements.check(this);
  }
}
