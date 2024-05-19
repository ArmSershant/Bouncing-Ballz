import { Tools } from "./Tools.js";

export class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = (Math.random() - 0.5) * 10;
    this.dy = (Math.random() - 0.5) * 10;
    this.radius = 15;
    this.color = Tools.getRandomColor();
    this.gravity = 0.98 * 24;
    this.friction = 0.9;
    this.bounce = 0.7;
  }

  draw() {
    Tools.ctx.beginPath();
    Tools.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    Tools.ctx.fillStyle = this.color;
    Tools.ctx.fill();
    Tools.ctx.closePath();
  }

  move(deltaTime) {
    this.dy += this.gravity;
    this.x += this.dx * deltaTime;
    this.y += this.dy * deltaTime;

    if (this.y + this.radius > Tools.canvas.height) {
      this.y = Tools.canvas.height - this.radius;
      this.dy *= -this.bounce;
      this.dx *= this.friction;
    }

    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.dy *= -this.bounce;
    }

    if (this.x + this.radius > Tools.canvas.width) {
      this.x = Tools.canvas.width - this.radius;
      this.dx *= -this.bounce;
    }

    if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.dx *= -this.bounce;
    }

    this.draw();
  }

  checkCollision(otherBall) {
    const dx = this.x - otherBall.x;
    const dy = this.y - otherBall.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + otherBall.radius;
  }

  resolveCollision(otherBall) {
    const dx = this.x - otherBall.x;
    const dy = this.y - otherBall.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return;

    const overlap = this.radius + otherBall.radius - distance;
    const smallerMass = 0.5;

    this.x += (dx / distance) * overlap * smallerMass;
    this.y += (dy / distance) * overlap * smallerMass;
    otherBall.x -= (dx / distance) * overlap * smallerMass;
    otherBall.y -= (dy / distance) * overlap * smallerMass;

    const vx = this.dx - otherBall.dx;
    const vy = this.dy - otherBall.dy;

    const dotProduct = (dx * vx + dy * vy) / (distance * distance);

    this.dx -= dotProduct * dx;
    this.dy -= dotProduct * dy;
    otherBall.dx += dotProduct * dx;
    otherBall.dy += dotProduct * dy;
  }
}
