import Preload from 'states/Preload';
import MainMenu from 'states/MainMenu';
import Credits from 'states/Credits';
import HighScores from 'states/HighScores';
import Main from 'states/Main';
import Settings from './settings';

class Game extends Phaser.Game {

	constructor() {		
		// Width, height of the game, AUTO = Detect canvas or webGL
		super(Settings.canvasWidth, Settings.canvasHeight, Phaser.AUTO);
		
		// Store game settings
		this.Settings = Settings;

		// Define game states
		this.state.add('Preload', Preload, false);
		this.state.add('MainMenu', MainMenu, false);
		this.state.add('Credits', Credits, false);
		this.state.add('HighScores', HighScores, false);
		this.state.add('Main', Main, false);

		// Start the preload state
		this.state.start('Preload');		
	}

}

new Game();