class Game {

    constructor(ships) {
       this.ship = new Ship();
       this.asteroids = [];
    }

    render() {
        this.generateAsteroids();
        background(51);
        this.ship.tick();
        for (var i = this.asteroids.length - 1; i > -1; i--) {
          this.asteroids[i].tick();
          this.asteroids[i].render();
          if (this.ship.hits(this.asteroids[i]) == true && this.asteroids[i].isCollide()) {
              this.ship.die();
          }
          if (this.ship.projectilehits(this.asteroids[i]) == true) {
              let newpieces = this.asteroids[i].breakup();
              this.asteroids.splice(i, 1);
              this.asteroids = this.asteroids.concat(newpieces);
          }
        }
        this.ship.render();
        textSize(24);
        fill(220);
        text("Score: " + this.ship.score.toFixed(0), 10, 30);
    } 

    isAlive() {
        if (this.ship.dead == false) {
            return true;
        }
        return false;
    }

    generateAsteroids() {
        if (random(1) > .995) {
            this.asteroids.push(new Asteroid());
        }
    }
}
