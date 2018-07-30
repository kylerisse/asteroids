class Projectile {

    constructor(position, force) {
        this.position = position;
        this.velocity = force;
        this.r = 5;
        this.timer = 45; 
    }

    tick() {
        this.timer -= 1;
        this.position.add(this.velocity);
        this.borders();
    }

    render() {
        ellipse(this.position.x, this.position.y, this.r, this.r);
    }

    borders() {
        if (this.position.x < -this.r) this.position.x = width + this.r;
        if (this.position.y < -this.r) this.position.y = height + this.r;
        if (this.position.x > width + this.r) this.position.x = -this.r;
        if (this.position.y > height + this.r) this.position.y = -this.r;
    }

    isTimeout() {
        return this.timer < 0;
    }

}
