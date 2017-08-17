class Score {

	constructor(game){
		this.game = game;
		this.digitNumber = 7;		
		this.topOffset = 20;
		this.rightOffset = 20;
		this.characterWidth = 13;
		
	    this.label = this.game.add.text(this.game.width-(this.characterWidth*this.digitNumber)-this.rightOffset-70, this.topOffset,'Score');
	    this.label.font = 'arcade';
	    this.label.fontSize = 24;
	    this.label.fill = '#777d90';

	    this.score = this.game.add.text(this.game.width-(this.characterWidth*this.digitNumber)-this.rightOffset, this.topOffset,'0');
	    this.score.font = 'arcade';
	    this.score.fontSize = 24;
	    this.score.fill = '#343537';
	    this.setScore(5);

	    return this;
	}

	setScore(score) {
		let zeros = '' + Math.pow(10,this.digitNumber);
		let paddedScore = (zeros + score).substr(-this.digitNumber);
		this.score.setText(paddedScore);
	}

	update(value) {
		this.setScore(value);
	}

}

export default Score;