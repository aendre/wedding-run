export default class Score {

  constructor(scene) {
    this.scene = scene;
    this.digitNumber = 7;
    this.topOffset = 20;
    this.rightOffset = 20;
    this.characterWidth = 13;

    const w = scene.scale.width;
    const labelX = w - (this.characterWidth * this.digitNumber) - this.rightOffset - 70;
    const scoreX = w - (this.characterWidth * this.digitNumber) - this.rightOffset;

    this.label = scene.add.text(labelX, this.topOffset, 'Score', {
      fontFamily: 'arcade',
      fontSize: '24px',
      color: '#777d90'
    });

    this.score = scene.add.text(scoreX, this.topOffset, '0', {
      fontFamily: 'arcade',
      fontSize: '24px',
      color: '#343537'
    });

    this.setScore(5);
  }

  setScore(score) {
    const zeros = '' + Math.pow(10, this.digitNumber);
    const paddedScore = (zeros + score).slice(-this.digitNumber);
    this.score.setText(paddedScore);
  }

  update(value) {
    this.setScore(value);
  }
}
