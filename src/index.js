import Phaser from 'phaser';
import Settings from './settings.js';
import Preload from 'scenes/Preload';
import MainMenu from 'scenes/MainMenu';
import Credits from 'scenes/Credits';
import HighScores from 'scenes/HighScores';
import Main from 'scenes/Main';

const config = {
  type: Phaser.AUTO,
  width: Settings.canvasWidth,
  height: Settings.canvasHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [Preload, MainMenu, Credits, HighScores, Main]
};

new Phaser.Game(config);
