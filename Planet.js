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
        const tmpDir12 = createVector(pl2.position.x - pl1.position.x, pl2.position.y - pl1.position.y)
        const offset = tmpDir12.mag() - (pl1.radius + pl2.radius)
        pl1.position.add(tmpDir12.copy().normalize().mult(offset / 2))
        pl2.position.add(tmpDir12.copy().normalize().mult(-offset / 2))
        const direction12 = createVector(pl2.position.x - pl1.position.x, pl2.position.y - pl1.position.y)
        const direction21 = createVector(pl1.position.x - pl2.position.x, pl1.position.y - pl2.position.y)
        const pl1ImpFrac = pl2.mass / (pl1.mass + pl2.mass)
        const pl2ImpFrac = pl1.mass / (pl1.mass + pl2.mass)
        const impulse1Dir = this.vectorProjection(pl1.velocity, direction12).mult(pl1.mass)
        const impulse2Dir = this.vectorProjection(pl2.velocity, direction21).mult(pl2.mass)
        const totalImpulse = impulse1Dir.copy().add(impulse2Dir.copy().mult(-1))
        const resImpulse1 = totalImpulse.copy().mult(-pl1ImpFrac).mult(pl1.k * pl2.k)
        const resImpulse2 = totalImpulse.copy().mult(pl2ImpFrac).mult(pl1.k * pl2.k)
        const stop1Force = this.vectorProjection(pl1.velocity, direction12).mult(pl1.mass).mult(-1)
        const stop2Force = this.vectorProjection(pl2.velocity, direction21).mult(pl2.mass).mult(-1)
        pl1.applyForce(stop1Force)
        pl2.applyForce(stop2Force)
        pl1.applyForce(resImpulse1)
        pl2.applyForce(resImpulse2)
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