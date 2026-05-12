import Phaser from 'phaser';

export default class Credits extends Phaser.Scene {

  constructor() {
    super('Credits');
  }

  create() {
    this.cameras.main.setBackgroundColor('#8e8869');
    this.scrollSpeed = 1;
    this.separatorHeight = 80;
    this.lineHeight = 25;
    this.titleTextSize = 28;
    this.nameTextSize = 35;
    this.textStackHeight = this.scale.height;
    this.credits = [];

    this.addTitle();
    this.addCredits();
    this.registerKeyhandler();
  }

  update() {
    for (const text of this.credits) {
      text.y -= this.scrollSpeed;
      if (text.y < -100) {
        text.destroy();
      }
    }

    if (this.credits.length > 0 && this.credits[this.credits.length - 1].y < -50) {
      this.scene.start('MainMenu');
    }
  }

  addTitle() {
    const text = this.add.text(this.scale.width / 2, this.textStackHeight, 'Credits', {
      fontFamily: 'arcade',
      fontSize: '60px',
      color: '#FFFFFF',
      stroke: '#504c39',
      strokeThickness: 6,
      align: 'center'
    }).setOrigin(0.5);

    this.credits.push(text);
    this.textStackHeight += this.separatorHeight;
  }

  addCredits() {
    const credits = this.getCredits();
    for (const credit of credits) {
      const title = this.getStyledText(credit.title, 'title');
      this.credits.push(title);
      this.textStackHeight += this.lineHeight;

      const value = Array.isArray(credit.value) ? credit.value.join(', ') : credit.value;
      const name = this.getStyledText(value, 'name');
      this.credits.push(name);
      this.textStackHeight += this.separatorHeight;
    }
  }

  getStyledText(label, style) {
    const isTitle = style === 'title';
    const text = this.add.text(this.scale.width / 2, this.textStackHeight, label, {
      fontFamily: 'arcade',
      fontSize: isTitle ? `${this.titleTextSize}px` : `${this.nameTextSize}px`,
      color: isTitle ? '#504c39' : '#FFFFFF',
      stroke: isTitle ? '#FFFFFF' : '#504c39',
      strokeThickness: isTitle ? 0 : 5,
      align: 'center'
    }).setOrigin(0.5);
    return text;
  }

  registerKeyhandler() {
    this.input.keyboard.on('keyup-ESC', () => {
      this.scene.start('MainMenu');
    });
    this.input.keyboard.on('keyup-ENTER', () => {
      this.scene.start('MainMenu');
    });
  }

  getCredits() {
    return [
      { title: 'Lead Programmer', value: 'Endre Andras' },
      { title: 'Test Engineer', value: 'Zsofia Andras-Simko' },
      { title: 'Music by', value: 'Hunor Sukosd' },
      { title: 'Music supervisor', value: 'Kinga Andras' },
      { title: 'Level Design', value: 'Endre Andras' },
      { title: 'Character Design', value: 'Endre Andras' },
      { title: 'Sounds by', value: 'Hunor Sukosd' },
      { title: 'Game Engine', value: 'Phaser' },
      { title: 'Thanks to', value: 'the Phaser community' },
      { title: 'Thanks for the tutorials', value: 'Josh Morony' },
      { title: 'Background', value: 'opengameart.org/users/greggman' },
      { title: 'Platforms', value: 'opengameart.org/users/buch' },
      { title: 'Coins', value: 'opengameart.org/users/irmirx' },
      { title: 'Flying rabbit', value: 'jpopkitty.deviantart.com' },
      { title: 'Special thanks to', value: ['Nyula', 'Picica'] }
    ];
  }
}
