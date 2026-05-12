import Phaser from 'phaser';
import PoppingHeartAnimation from 'animations/PoppingHeart';
import Menu from 'objects/Menu';
import SoundControl from 'objects/SoundControl';
import Settings from '../settings.js';

export default class MainMenu extends Phaser.Scene {

  constructor() {
    super('MainMenu');
  }

  create() {
    this.cameras.main.setBackgroundColor('#8e8869');
    this.cameras.main.setRoundPixels(true);

    this.createHeader();
    this.createFooter();

    const mainMenuOptions = {
      title: '- use arrow keys -',
      items: [
        { label: 'Start Game', callback: () => this.choosePlayer() },
        { label: 'High scores', callback: () => this.showHighScores() },
        { label: 'Credits', callback: () => this.showCredits() }
      ]
    };
    this.mainMenu = new Menu(mainMenuOptions, this);
    this.playerMenu = null;

    this.soundControl = new SoundControl(this);
    this.music = this.sound.add('menu', { volume: Settings.musicVolume, loop: true });
    this.music.play();

    this.events.on('shutdown', () => {
      this.mainMenu.destroy();
      this.music.destroy();
    });
  }

  choosePlayer() {
    this.mainMenu.destroy();
    const playerMenuOptions = {
      title: '- choose player -',
      items: [
        {
          label: 'Groom',
          callback: () => {
            Settings.characterType = 'groom';
            this.startGame();
          }
        },
        {
          label: 'Bride',
          callback: () => {
            Settings.characterType = 'bride';
            this.startGame();
          }
        }
      ]
    };
    this.playerMenu = new Menu(playerMenuOptions, this);
  }

  showCredits() {
    this.scene.start('Credits');
  }

  showHighScores() {
    this.scene.start('HighScores');
  }

  startGame() {
    this.scene.start('Main');
  }

  createHeader() {
    const headerOffset = 80;
    const centerX = this.scale.width / 2;

    const leftHeart = this.add.sprite(centerX - 150, headerOffset + 5, 'heart');
    new PoppingHeartAnimation(leftHeart, this).animate();

    const rightHeart = this.add.sprite(centerX + 110, headerOffset + 5, 'heart');
    new PoppingHeartAnimation(rightHeart, this).animate();

    this.add.image(centerX - 170, headerOffset - 5, 'brideLarge').setOrigin(0, 0);
    this.add.image(centerX + 100, headerOffset - 5, 'groomLarge').setOrigin(0, 0);

    this.add.text(centerX, headerOffset, 'WEDDING', {
      fontFamily: 'arcade',
      fontSize: '50px',
      color: '#333023',
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(centerX + 3, headerOffset + 35, 'RUN', {
      fontFamily: 'arcade',
      fontSize: '120px',
      color: '#504c39',
      align: 'center'
    }).setOrigin(0.5);
  }

  createFooter() {
    const firstLine = 'copyright \u00a9 2017 - zsondre.hu';
    const secondLine = 'Music by Hunor Sukosd';
    const footerHeight = 80;
    const w = this.scale.width;
    const h = this.scale.height;

    const graphics = this.add.graphics();
    graphics.fillStyle(0xF99601, 1);
    graphics.lineStyle(2, 0xF99601, 1);
    graphics.fillRect(0, h - footerHeight, w, footerHeight);

    this.add.text(w / 2, h - footerHeight + 30, firstLine, {
      fontFamily: 'arcade',
      fontSize: '20px',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(w / 2, h - footerHeight + 50, secondLine, {
      fontFamily: 'arcade',
      fontSize: '20px',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(0.5);
  }
}
