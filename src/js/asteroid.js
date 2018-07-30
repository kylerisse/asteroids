class Asteroid {

    constructor () {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.r = random(25, 100);
        this.maxbright = 240;
        this.bright = 0;
    }

    tick() {
        this.position.add(this.velocity);
        this.borders();
        this.bright += 1;
    }

    render() {
        fill(240, 240, 240, this.bright);
        stroke(this.bright / 2);
        ellipse(this.position.x, this.position.y, this.r, this.r);
    }

    borders() {
        if (this.position.x < -this.r) this.position.x = width + this.r;
        if (this.position.y < -this.r) this.position.y = height + this.r;
        if (this.position.x > width + this.r) this.position.x = -this.r;
        if (this.position.y > height + this.r) this.position.y = -this.r;
    }

    breakup() {
        var newpieces = [];
        let newr = this.r / 3;
        if (newr < 20) {
            return [];
        }
        for (var i = 0; i < random(2, 4); i++) {
            let newpiece = new Asteroid();
            newpiece.position = this.position.copy();
            newpiece.bright = 120;
            newpiece.r = newr;
            newpieces.push(newpiece);
        }
        return newpieces;
    }

    isCollide() {
        return this.bright >= 240;
    }

}
