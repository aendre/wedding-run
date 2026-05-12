import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {

  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image('brideLarge', 'assets/images/bride_large.png');
    this.load.image('groomLarge', 'assets/images/groom_large.png');
    this.load.image('heart', 'assets/images/heart.png');
    this.load.spritesheet('sound-control', 'assets/images/sound-control.png', { frameWidth: 48, frameHeight: 40 });

    this.load.audio('ingame', ['assets/sounds/ingame.mp3']);
    this.load.audio('menu', ['assets/sounds/menu.mp3']);
    this.load.audio('game-over', ['assets/sounds/game-over.mp3']);
    this.load.audio('coin', ['assets/sounds/coin.mp3']);
    this.load.audio('jump', ['assets/sounds/jump.mp3']);
    this.load.audio('damage-man', ['assets/sounds/damage-man.mp3']);
    this.load.audio('damage-woman', ['assets/sounds/damage-woman.mp3']);

    this.load.image('background', 'assets/images/bg.png');
    this.load.image('background-mountains', 'assets/images/mountains.png');
    this.load.image('background-hills', 'assets/images/hills.png');
    this.load.image('background-back-hills', 'assets/images/back-hills.png');
    this.load.image('cloud-1', 'assets/images/cloud-1.png');
    this.load.image('cloud-2', 'assets/images/cloud-2.png');

    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('platform-1', 'assets/images/platform-1.png');
    this.load.image('platform-2', 'assets/images/platform-2.png');
    this.load.image('platform-3', 'assets/images/platform-3.png');

    this.load.spritesheet('groomSprite', 'assets/images/groom.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('brideSprite', 'assets/images/bride.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('coin', 'assets/images/coin.png', { frameWidth: 30, frameHeight: 30 });
    this.load.spritesheet('bunny', 'assets/images/bunny.png', { frameWidth: 32, frameHeight: 30 });
  }

  create() {
    this.scene.start('MainMenu');
  }
}
