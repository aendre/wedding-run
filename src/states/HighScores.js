import ToplistService from 'services/ToplistService';

class HighScores extends Phaser.State {

	create() {
		// Set the game background colour
		this.game.stage.backgroundColor = '#8e8869';
		this.createHeader();

		this.loadingText = this.game.add.text(this.game.width/2, 200,'loading...');
	    this.loadingText.anchor.set(0.5);
	    this.loadingText.font = 'arcade';
	    this.loadingText.fontSize = 40;
	    this.loadingText.fill = '#504c39';	   

		let results = ToplistService.getTop10();
		this.renderHighScores(results);
	}

	update() {
	    this.game.input.keyboard.onUpCallback = _.bind(function(e){
			if(e.keyCode == Phaser.Keyboard.ESC || e.keyCode == Phaser.Keyboard.ENTER) {
	  			this.game.state.start('MainMenu');
			}
		},this);
	}

	createHeader() {
		let headerOffset = 80;

		let text = this.game.add.text(this.game.width/2, headerOffset,'High Scores - Top 10');
	    text.anchor.set(0.5);
	    text.align = 'center';
	    text.font = 'arcade';
	    text.fontSize = 60;
	    text.fill = '#FFFFFF';
	    text.stroke = '#504c39';
   		text.strokeThickness = 6;
	}

	renderHighScores(toplist) {
		this.loadingText.destroy();
		
		let topListOffset = 120;
		let lineHeight = 35;

		_.each(toplist,_.bind(function(item,index){
			let value = (index+1)+'.  '+item.playerName + "\t\t" + item.score;
			let playerName = this.game.add.text(130, topListOffset + lineHeight*index,value);
		    playerName.align = 'left';
		    playerName.font = 'arcade';
		    playerName.fontSize = 40;
		    playerName.fill = '#504c39';
		    playerName.tabs = 400;
		},this));
	}
}

export default HighScores;