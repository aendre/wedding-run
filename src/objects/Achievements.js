import SplashText from 'objects/SplashText';

export default class Achievements {

  constructor(scene) {
    this.scene = scene;
    this.splash = new SplashText(scene);
    this.completed = [];
    this.uncompleted = this.getAchievements();
  }

  getAchievements() {
    return [
      {
        text: '10 coins collected !',
        check(ctx) { return ctx.coinsCollected > 9; }
      },
      {
        text: '20 coins collected !',
        check(ctx) { return ctx.coinsCollected > 19; }
      },
      {
        text: '50 coins collected !',
        check(ctx) { return ctx.coinsCollected > 49; }
      },
      {
        text: '5 bunnies eliminated !',
        check(ctx) { return ctx.bunniesKilled > 4; }
      },
      {
        text: '10 bunnies eliminated !',
        check(ctx) { return ctx.bunniesKilled > 9; }
      },
      {
        text: '10000 points reached !',
        check(ctx) { return ctx.calculateScore() > 9999; }
      },
      {
        text: 'You have travelled 5000px !',
        check(ctx) { return ctx.ground.distanceTravelled() > 4999; }
      }
    ];
  }

  check(referenceObj) {
    for (let i = this.uncompleted.length - 1; i >= 0; i--) {
      const achievement = this.uncompleted[i];
      if (achievement.check(referenceObj)) {
        this.splash.write(achievement.text);
        this.completed.push(this.uncompleted.splice(i, 1)[0]);
        break;
      }
    }
  }
}
