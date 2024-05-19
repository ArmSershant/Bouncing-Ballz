import { Ball } from "./Ball.js";
import { Tools } from "./Tools.js";

export class Game {
  constructor() {
    this.balls = [];
    this.spawnedBallsCount = 0;
    this.interval = null;
    this.lastTime = 0;
    this.tutorialDisplayed = true;
    this.timer = 60;
    this.gameOver = false;
    this.record = 350;
    this.drawTutorialMessage();
  }

  play(x, y) {
    if (this.tutorialDisplayed) {
      this.tutorialDisplayed = false;
      this.startGameTimer();
    }

    if (!this.gameOver) {
      this.balls.push(new Ball(x, y));
      this.spawnedBallsCount++;
    }

    if (!this.interval) {
      this.lastTime = performance.now();
      this.interval = requestAnimationFrame(this.tick.bind(this));
    }
  }

  tick(currentTime) {
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    Tools.ctx.clearRect(0, 0, Tools.canvas.width, Tools.canvas.height);
    this.balls.forEach((ball) => ball.move(deltaTime));
    this.checkCollisions();
    this.drawBallsCount();
    this.drawTimer();

    if (this.tutorialDisplayed) {
      this.drawTutorialMessage();
    }

    if (!this.gameOver) {
      this.interval = requestAnimationFrame(this.tick.bind(this));
    }
  }

  checkCollisions() {
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        if (this.balls[i].checkCollision(this.balls[j])) {
          this.balls[i].resolveCollision(this.balls[j]);
        }
      }
    }
  }

  drawBallsCount() {
    Tools.ctx.font = "16px din-round, sans-serif";
    Tools.ctx.fillStyle = "yellow";
    Tools.ctx.fillText(`Balls: ${this.spawnedBallsCount}`, 600, 530);
  }

  drawTutorialMessage() {
    Tools.ctx.font = "16px din-round, sans-serif";
    Tools.ctx.fillStyle = "yellow";
    Tools.ctx.fillText(`Click to start bouncing`, 270, 300);
    Tools.ctx.fillText(`My record is ${this.record}`, 290, 320);
    Tools.ctx.fillText(`Let's see if you can hit my record 😊`, 225, 340);
  }

  drawTimer() {
    Tools.ctx.font = "16px din-round, sans-serif";
    Tools.ctx.fillStyle = "yellow";
    Tools.ctx.fillText(`Time: ${this.timer}s`, 600, 50);
  }

  startGameTimer() {
    const timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(timerInterval);
        this.endGame();
      }
    }, 1000);
  }

  endGame() {
    this.gameOver = true;
    cancelAnimationFrame(this.interval);
    Tools.ctx.clearRect(0, 0, Tools.canvas.width, Tools.canvas.height);
    this.drawGameOverMessage();
  }

  drawGameOverMessage() {
    Tools.ctx.font = "32px din-round, sans-serif";
    Tools.ctx.fillStyle = "yellow";
    if (this.spawnedBallsCount >= this.record) {
      Tools.ctx.fillText(`You win!`, 280, 300);
      Tools.ctx.fillText(`${this.spawnedBallsCount} Balls spawned`, 225, 330);
    } else {
      Tools.ctx.fillText(`You lose!`, 280, 300);
      Tools.ctx.fillText(
        `${
          this.spawnedBallsCount === 1
            ? "1 Spawned Ball"
            : `${this.spawnedBallsCount} Spawned Balls`
        }`,
        225,
        330
      );
    }
  }
}
