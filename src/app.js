import { Game } from "./Game.js";
import { Tools } from "./Tools.js";

const mygame = new Game();
let restartButton = document.getElementById("restartButton");
restartButton.disabled = true;

Tools.canvas.addEventListener("click", function (event) {
  const rect = Tools.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  mygame.play(x, y);
  restartButton.disabled = false;
});
