var game;

function setup() {
  createCanvas(800, 600);
  game = new Game();
}

function draw() {
  if (this.game.isAlive()) {
    game.render();
  }
  
}

function keyReleased() {
  if (key == ' ') {
    game.ship.fire(false);
  }
  if (keyCode == LEFT_ARROW) {
    game.ship.turnLeft(false);
  }
  if (keyCode == RIGHT_ARROW) {
    game.ship.turnRight(false);
  }
  if (keyCode == UP_ARROW) {
    game.ship.boost(false);
  }
}

function keyPressed() {
  if (key == ' ') {
    game.ship.fire(true);
  }
  if (keyCode == LEFT_ARROW) {
    game.ship.turnLeft(true);
  }
  if (keyCode == RIGHT_ARROW) {
    game.ship.turnRight(true);
  }
  if (keyCode == UP_ARROW) {
    game.ship.boost(true);
  }
}
