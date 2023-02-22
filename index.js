import { Game } from './scenes/game';
import { GameOver } from './scenes/gameOver';
import { Congratulations } from './scenes/congratulations';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: [Game, GameOver, Congratulations],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

var game = new Phaser.Game(config);