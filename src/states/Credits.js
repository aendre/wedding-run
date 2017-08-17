class Credits extends Phaser.State {

	create() {
		// Set the game background colour
		this.game.stage.backgroundColor = '#8e8869';
		this.scrollSpeed = 1;
		this.separatorHeight = 80;
		this.lineHeight = 25;
		this.titleTextSize = 28;
		this.nameTextSize = 35;
		this.textStackHeight = this.game.height;
		this.credits = [];

		this.addTitle();
		this.addCredits();
   
		// Add Key handler
		this.registerKeyhandler();	
	}


	update() {
		// Animate credits
		_.each(this.credits,_.bind(function(text,index){
			text.y -= this.scrollSpeed;
			if (text.y<-100) {
				text.destroy();
			}
		},this));

		// If the last credit is off the screen go back to the main screen
		if(this.credits[this.credits.length-1].y < -50) {
			this.game.state.start("MainMenu");
		}
	}

	addTitle() {
		let text = this.game.add.text(this.game.width/2, this.textStackHeight,'Credits');
	    text.anchor.set(0.5);
	    text.align = 'center';
	    text.font = 'arcade';
	    text.fontSize = 60;
	    text.fill = '#FFFFFF';
	    text.stroke = '#504c39';
   		text.strokeThickness = 6;

   		this.credits.push(text);

   		// Increase the initial position for the next credit 
   		this.textStackHeight += this.separatorHeight;
	};

	addCredits() {
		let credits = this.getCredits();
		_.each(credits,_.bind(function(credit){
			// First add the title
			let title = this.getStyledText(credit.title,'title');
	   		this.credits.push(title);

	   		// Increase the initial position for the next credit 
	   		this.textStackHeight += this.lineHeight;

			let name = this.getStyledText(credit.value,'name');
	   		this.credits.push(name);

	   		// Increase the initial position for the next credit 
	   		this.textStackHeight += this.separatorHeight;
		},this));
	}

	getStyledText(label,style){
		// First add the title
		let text = this.game.add.text(this.game.width/2, this.textStackHeight,label);
	    text.anchor.set(0.5);
	    text.align = 'center';
	    text.font = 'arcade';
	    text.fontSize = style=='title' ? this.titleTextSize : this.nameTextSize;
	    text.fill = style=='title' ? '#504c39' : '#FFFFFF';
	    text.stroke = style=='title'? '#FFFFFF' : '#504c39';
   		text.strokeThickness = style=='title'? 0 : 5;
   		return text;
	}
	
	registerKeyhandler() {
	    this.game.input.keyboard.onUpCallback = _.bind(function(e){
			if(e.keyCode == Phaser.Keyboard.ESC || e.keyCode == Phaser.Keyboard.ENTER) {
	  			this.game.state.start('MainMenu');
			}
		},this);		
	}

	getCredits() {

		return [
			{
				'title' : 'Lead Programmer'
				,'value': 'Endre Andras'
			}
			,{
				'title' : 'Test Engineer'
				,'value': 'Zsofia Andras-Simko'
			}
			,{
				'title' : 'Music by'
				,'value': 'Hunor Sukosd'
			}
			,{
				'title' : 'Music supervisor'
				,'value': 'Kinga Andras'
			}
			,{
				'title' : 'Level Design'
				,'value': 'Endre Andras'
			}
			,{
				'title' : 'Character Design'
				,'value': 'Endre Andras'
			}
			,{
				'title' : 'Sounds by'
				,'value': 'Hunor Sukosd'
			}
			,{
				'title' : 'Game Engine'
				,'value': 'Phaser'
			}
			,{
				'title' : 'Thanks to'
				,'value': 'the Phaser community'
			}
			,{
				'title' : 'Thanks for the tutorials'
				,'value': 'Josh Morony'
			}
			,{
				'title' : 'Background'
				,'value': 'opengameart.org/users/greggman'
			}
			,{
				'title' : 'Platforms'
				,'value': 'opengameart.org/users/buch'
			}
			,{
				'title' : 'Coins'
				,'value': 'opengameart.org/users/irmirx'
			}
			,{
				'title' : 'Flying rabbit'
				,'value': 'jpopkitty.deviantart.com'
			}
			,{
				'title' : 'Special thanks to'
				,'value': ['Nyula','Picica']
			}
		];		
	}

}

export default Credits;