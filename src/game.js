import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js";
import Ball from "/src/ball";
import Brick from "/src/brick";
import { buildLevel, level1 } from "/src/level";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    let bricks = buildLevel(this, level1);

    this.gameObjects = [this.ball, this.paddle, ...bricks];

    new InputHandler(this.paddle);
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
  }

  update(deltaTime) {
    this.gameObjects.forEach(object => object.update(deltaTime));
    this.gameObjects = this.gameObjects.filter(
      object => !object.markForDeletion
    );
  }
}
