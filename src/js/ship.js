class Ship {

    constructor() {
        this.position = createVector(width / 2, height / 2,);
        this.velocity = createVector(0, 0);
        this.r = 3.0;
        this.heading = 0;
        this.friction= .99;
        this.rotation = 0.1;
        this.projectiles = [];
        this.firecd = 0;
        this.maxfirecd = 30;
        this.maxspeed = 2;
        this.score = 0;
        this.dead = false;
        this.turningLeft = false;
        this.turningRight = false;
        this.firing = false;
        this.boosting = false;
    }

    tick() {
        if (this.turningLeft) { this.heading -= this.rotation };
        if (this.turningRight) { this.heading += this.rotation };
        if (this.boosting) {
            var force = p5.Vector.fromAngle(this.heading);
            force.mult(.1);
            this.velocity.add(force);
        }
        if (this.firing) {
            if (this.firecd < 1) {
                var force = p5.Vector.fromAngle(this.heading);
                this.projectiles.push(new Projectile(this.position.copy(), force.mult(10).add(this.velocity)));
                this.firecd = this.maxfirecd;
            }
        }
        this.firecd -= 1;
        this.position.add(this.velocity);
        this.velocity.mult(this.friction);
        this.borders();
        for (var i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].tick();
            if (this.projectiles[i].isTimeout() == true) {
                this.projectiles.splice(i, 1);
            }
        }
    }

    render() {
        fill(127);
        if (this.dead == true) {
            fill(255, 0, 0);
        } 
        stroke(200);
        push();
        translate(this.position.x, this.position.y);
        rotate(this.heading + PI / 2);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
        for (var i = this.projectiles.length; i > 0; i--) {
            this.projectiles[i - 1].render();
        }
    }

    fire(on) {
        this.firing = on;
    }

    boost(on) {
        this.boosting = on;
    }

    turnLeft(on) {
        this.turningLeft = on;
    }

    turnRight(on) {
        this.turningRight = on;
    }

    borders() {
        if (this.position.x < -this.r) this.position.x = width + this.r;
        if (this.position.y < -this.r) this.position.y = height + this.r;
        if (this.position.x > width + this.r) this.position.x = -this.r;
        if (this.position.y > height + this.r) this.position.y = -this.r;
    }

    hits(asteroid) {
        var d = dist(this.position.x, this.position.y, asteroid.position.x, asteroid.position.y);
        if (d < (this.r + asteroid.r / 2)) {
            return true;
        }
        return false;
    }

    projectilehits(asteroid) {
        for (var i = this.projectiles.length - 1; i > -1; i--) {
            var d = dist(this.projectiles[i].position.x, this.projectiles[i].position.y, asteroid.position.x, asteroid.position.y);
            if (d < (asteroid.r / 2)) {
                this.score += (100 - asteroid.r) / 10;
                this.projectiles.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    die() {
        this.dead = true;
    }

}
