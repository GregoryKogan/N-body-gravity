class Planet{
    constructor(x=0, y=0, m=100) {
        this.mass = m
        this.acceleration = createVector(0, 0)
        this.velocity = createVector(0, 0)
        this.position = createVector(x, y)
        this.radius = m / 10
        this.g = 6
    }

    update(dt){
        this.acceleration.mult(dt)
        this.velocity.add(this.acceleration)
        this.acceleration = createVector(0, 0)
        this.position.add(this.velocity)
    }

    applyForce(force){
        let fc = force.copy()
        fc.div(this.mass)
        this.acceleration.add(fc)
    }

    static react(pl1, pl2){
        const r = pl1.position.dist(pl2.position)
        const force = this.g * pl1.mass * pl2.mass / (r * r)
        let direction = createVector(pl2.position.x - pl1.position.x, pl2.position.y - pl1.position.y)
        direction.setMag(force)
        pl1.applyForce(direction)
        direction.mult(-1)
        pl2.applyForce(direction)
    }

    render(){
        fill("#f6ca09")
        noStroke()
        circle(this.position.x, this.position.y, this.radius * 2)
    }
}