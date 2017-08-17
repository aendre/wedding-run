class PoppingHeartAnimation {

	constructor(objToAnimate,game){
		this.obj = objToAnimate;
	    this.game = game;

	    // The total duration of a single animation
	    this.duration = 3000 + this.game.rnd.between(0,2000);

	    // The object is raised by this many pixels / animation step
	    this.verticalSpeed = 35;

	    // The degree of swinging in pixels
	    this.swingDegree = 20 + this.game.rnd.between(0,20);

	    // Delay animation
	    this.delay = this.game.rnd.between(0,2000);
	}

	animate() {
		let initialX = this.obj.x;
		let initialY = this.obj.y;

	    let animateX = [
	    	initialX + this.getApproximateValue(this.swingDegree)
	    	,initialX - 2*this.getApproximateValue(this.swingDegree)
	    	,initialX + 2*this.getApproximateValue(this.swingDegree)
	    ];

	    let animateY = [
	    	initialY - this.verticalSpeed
	    	,initialY - 2*this.verticalSpeed
	    	,initialY - 3*this.verticalSpeed
	    ];

   		// transition, duration, easing, auto start, delay, repeat, yoyo
   		this.heartTween = this.game.add.tween(this.obj).to({ 
			x: animateX,
            y: animateY,
            alpha: [ 1.0, 0.8, 0.2]
   		}, this.duration,Phaser.Easing.Cubic.Out, true, this.delay).loop();
		
		this.game.add.tween(this.obj.scale).to({x: 0.1,y: 0.1}, this.duration,Phaser.Easing.Linear.In, true, this.delay).loop();

		this.heartTween.interpolation(function(v, k){
            return Phaser.Math.bezierInterpolation(v, k);
        });
	}

	getApproximateValue(value,tolerance=10) {
		// normal() returns a random real number between -1 and 1.
		let sign = (this.game.rnd.normal() > 0) ? 1 : -1;
		return value + sign*this.game.rnd.between(0,tolerance);
	}

}

export default PoppingHeartAnimation;