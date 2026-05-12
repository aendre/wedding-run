import Phaser from 'phaser';

export default class Menu {

  constructor(options, scene) {
    this.scene = scene;
    this.options = options;
    this.drawnTexts = [];

    this.options.items.forEach(navItem => {
      navItem.isActive = false;
    });
    this.options.items[0].isActive = true;

    this.registerKeyhandler();
    this.drawMenu();
  }

  drawMenu() {
    const navigationOffset = 250;
    const w = this.scene.scale.width;

    this.drawnTexts.forEach(text => text.destroy());
    this.drawnTexts = [];

    if (this.options.title) {
      const topOffset = navigationOffset - 40;
      const text = this.scene.add.text(w / 2, topOffset, this.options.title, {
        fontFamily: 'arcade',
        fontSize: '25px',
        color: '#FFFFFF',
        align: 'center'
      }).setOrigin(0.5);
      this.drawnTexts.push(text);
    }

    this.options.items.forEach((navItem, index) => {
      const topOffset = navigationOffset + index * 40;
      const text = this.scene.add.text(w / 2, topOffset, navItem.label, {
        fontFamily: 'arcade',
        fontSize: '50px',
        color: '#FFFFFF',
        stroke: '#504c39',
        strokeThickness: navItem.isActive ? 6 : 0,
        align: 'center'
      }).setOrigin(0.5);
      this.drawnTexts.push(text);
    });
  }

  getNextIndex() {
    const activeIndex = this.getActiveIndex();
    return (activeIndex === this.options.items.length - 1) ? 0 : activeIndex + 1;
  }

  getPrevIndex() {
    const activeIndex = this.getActiveIndex();
    return activeIndex === 0 ? this.options.items.length - 1 : activeIndex - 1;
  }

  getActiveIndex() {
    return this.options.items.findIndex(item => item.isActive);
  }

  getActiveMenu() {
    const activeIndex = this.getActiveIndex();
    return this.options.items[activeIndex];
  }

  moveCursor(newIndex) {
    const activeIndex = this.getActiveIndex();
    if (this.options.items[activeIndex] === undefined || this.options.items[newIndex] === undefined) {
      return;
    }
    this.options.items[activeIndex].isActive = false;
    this.options.items[newIndex].isActive = true;
  }

  registerKeyhandler() {
    this._onKeyUp = (event) => {
      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.UP) {
        this.moveCursor(this.getPrevIndex());
        this.drawMenu();
      }
      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.DOWN) {
        this.moveCursor(this.getNextIndex());
        this.drawMenu();
      }
      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
        const activeMenu = this.getActiveMenu();
        if (activeMenu) {
          activeMenu.callback();
        }
      }
    };
    this.scene.input.keyboard.on('keyup', this._onKeyUp);
  }

  destroy() {
    this.scene.input.keyboard.off('keyup', this._onKeyUp);
    this.drawnTexts.forEach(text => text.destroy());
    this.drawnTexts = [];
  }
}
