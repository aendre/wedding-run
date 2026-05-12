import Phaser from 'phaser';
import ToplistService from 'services/ToplistService';

export default class HighScores extends Phaser.Scene {

  constructor() {
    super('HighScores');
  }

  create() {
    this.cameras.main.setBackgroundColor('#8e8869');
    this.createHeader();

    this.loadingText = this.add.text(this.scale.width / 2, 200, 'loading...', {
      fontFamily: 'arcade',
      fontSize: '40px',
      color: '#504c39'
    }).setOrigin(0.5);

    const results = ToplistService.getTop10();
    this.renderHighScores(results);

    this.input.keyboard.on('keyup-ESC', () => {
      this.scene.start('MainMenu');
    });
    this.input.keyboard.on('keyup-ENTER', () => {
      this.scene.start('MainMenu');
    });
  }

  createHeader() {
    const headerOffset = 80;

    this.add.text(this.scale.width / 2, headerOffset, 'High Scores - Top 10', {
      fontFamily: 'arcade',
      fontSize: '60px',
      color: '#FFFFFF',
      stroke: '#504c39',
      strokeThickness: 6,
      align: 'center'
    }).setOrigin(0.5);
  }

  renderHighScores(toplist) {
    this.loadingText.destroy();

    const topListOffset = 120;
    const lineHeight = 35;

    toplist.forEach((item, index) => {
      const rank = `${index + 1}.`;
      const name = item.playerName;
      const score = item.score;

      this.add.text(100, topListOffset + lineHeight * index, rank, {
        fontFamily: 'arcade',
        fontSize: '40px',
        color: '#504c39'
      });

      this.add.text(160, topListOffset + lineHeight * index, name, {
        fontFamily: 'arcade',
        fontSize: '40px',
        color: '#504c39'
      });

      this.add.text(500, topListOffset + lineHeight * index, score, {
        fontFamily: 'arcade',
        fontSize: '40px',
        color: '#504c39'
      });
    });
  }
}
