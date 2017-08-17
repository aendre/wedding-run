class SoundControl {

	constructor(game){
		this.game = game;

		// The numbers given in parameters are the indexes of the frames, in this order: over, out, down
		let defaultFrame = this.game.sound.mute ? 1 : 0;
		this.button = this.game.add.button(20, 20, 'sound-control', this.actionOnClick,this,defaultFrame,defaultFrame,defaultFrame);
	    return this;
	}

	actionOnClick() {
		this.game.sound.mute ? this.unMute() : this.mute();
	}

	mute() {
		this.game.sound.mute = true;
		this.button.setFrames(1, 1, 1);
	}

	unMute() {
		this.game.sound.mute = false;
		this.button.setFrames(0, 0, 0);
	}

}

export default SoundControl;