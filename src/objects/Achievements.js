import SplashText from 'objects/SplashText';

class Achievements {

	constructor(game){
		this.game = game;

		// Create an instance of the splash text
		this.splash = new SplashText(this.game);
		
		// Store completed and uncompleted achievements
		this.completed = [];
		this.uncompleted = this.getAchievements();

		return this;
	}

	getAchievements() {		
		return [
			{
				'text'  : '10 coins collected !'
				,'check' : function() {
					return this.coinsCollected>9;
				}
			}
			,{
				'text' : '20 coins collected !'			
				,'check' : function() {
					return this.coinsCollected>19;
				}
			}
			,{
				'text' : '50 coins collected !'			
				,'check' : function() {
					return this.coinsCollected>49;
				}
			}
			,{
				'text'  : '5 bunnies eliminated !'
				,'check' : function() {
					return this.bunniesKilled>4;
				}
			}
			,{
				'text'  : '10 bunnies eliminated !'
				,'check' : function() {
					return this.bunniesKilled>9;
				}
			}
			,{
				'text'  : '10000 points reached !'
				,'check' : function() {
					return this.calculateScore()>9999;
				}
			}
			,{
				'text'  : 'You have travelled 5000px !'
				,'check' : function() {
					return this.ground.distanceTravelled()>4999;
				}
			}
		];
	}

	check(referenceObj) {
		_.each(this.uncompleted,_.bind(function(achievement,index){
			let isAchievementCompleted = _.bind(achievement.check,referenceObj);
			if (isAchievementCompleted()) {
				this.splash.write(achievement.text);
				let completedAchievement = this.uncompleted.splice(index, 1);
				this.completed.push(completedAchievement);
				return false;
			}
		},this));		
	}
}

export default Achievements;