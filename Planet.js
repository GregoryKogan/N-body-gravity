class Planet{
    constructor(x=0, y=0, m=100) {
        this.mass = m
        this.acceleration = createVector(0, 0)
        this.velocity = createVector(0, 0)
        this.position = createVector(x, y)
        this.radius = m / 10
        this.g = 6
        this.k = 1
        this.color = color("#9ece6a")
    }

    update(dt){
        this.acceleration.mult(dt)
        this.velocity.add(this.acceleration)
        this.acceleration = createVector(0, 0)
        const dPos = this.velocity.copy().mult(dt)
        this.position.add(dPos)
    }

    applyForce(force){
        let fc = force.copy()
        fc.div(this.mass)
        this.acceleration.add(fc)
    }

    render(){
        fill(this.color)
        noStroke()
        circle(this.position.x, this.position.y, this.radius * 2)
    }

    static react(pl1, pl2){
        const r = pl1.position.dist(pl2.position)
        if (r < pl1.radius + pl2.radius)
            this.collide(pl1, pl2)
        else {
            const force = this.g * pl1.mass * pl2.mass / (r * r)
            let direction = createVector(pl2.position.x - pl1.position.x, pl2.position.y - pl1.position.y)
            direction.setMag(force)
            pl1.applyForce(direction)
            direction.mult(-1)
            pl2.applyForce(direction)
        }
    }

    static vectorProjection(a, b){
        let bCopy = b.copy().normalize()
        const sp = a.dot(bCopy)
        bCopy.mult(sp)
        return bCopy
    }

    static collide(pl1, pl2){
        const direction12 = createVector(pl2.position.x - pl1.position.x, pl2.position.y - pl1.position.y)
        const direction21 = createVector(pl1.position.x - pl2.position.x, pl1.position.y - pl2.position.y)
        const v1 = this.vectorProjection(pl1.velocity, direction12)
        const v2 = this.vectorProjection(pl2.velocity, direction21)
        const mSum = pl1.mass + pl2.mass
        const newV1 = ((pl1.mass - pl2.mass) / mSum) * v1.mag() + ((2 * pl2.mass) / mSum) * v2.mag()
        const newV2 = ((pl2.mass - pl1.mass) / mSum) * v2.mag() + ((2 * pl1.mass) / mSum) * v1.mag()
        pl1.velocity.sub(v1)
        pl2.velocity.sub(v2)
        direction12.setMag(newV1 * 0.95)
        direction21.setMag(newV2 * 0.95)
        pl1.velocity.sub(direction12)
        pl2.velocity.sub(direction21)
    }

    static wallCollide(pl){
        if (pl.position.x - pl.radius <= 0 || pl.position.x + pl.radius >= window.innerWidth)
            pl.velocity.x *= -1
        if (pl.position.y - pl.radius <= 0 || pl.position.y + pl.radius >= window.innerHeight)
            pl.velocity.y *= -1
        
        pl.position.x = constrain(pl.position.x, pl.radius + 1, window.innerWidth - pl.radius - 1)
        pl.position.y = constrain(pl.position.y, pl.radius + 1, window.innerHeight - pl.radius - 1)
    }
}