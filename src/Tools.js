export class Tools {
  static canvas = document.querySelector("canvas");
  static ctx = Tools.canvas.getContext("2d");

  static initializeCanvas() {
    if (!Tools.canvas) {
      Tools.canvas = document.createElement("canvas");
      document.body.appendChild(Tools.canvas);
      Tools.ctx = Tools.canvas.getContext("2d");
    }
  }

  static getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

Tools.initializeCanvas();
