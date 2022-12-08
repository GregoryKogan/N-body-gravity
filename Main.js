let planets = []
const planetNum = 12


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(60);
    for (let i = 0; i < planetNum - 1; ++i){
        let pl = new Planet(Math.random() * window.innerWidth, 
                            Math.random() * window.innerHeight,
                            Math.random() * 200 + 50,
                    )

        const randForce = createVector(Math.random() - 0.5, Math.random() - 0.5).normalize().mult(500)
        pl.applyForce(randForce)
        planets.push(pl)
    }
    let pl = new Planet(window.innerWidth / 2, window.innerHeight / 2, 500)
    planets.push(pl)
}


function draw() {
    const dt = 1 / frameRate() * 60
    background("#1a1b26")
    for (let i = 0; i < planetNum; ++i){
        for (let j = i + 1; j < planetNum; ++j){
            Planet.react(planets[i], planets[j])
        }
        Planet.wallCollide(planets[i])
    }
    for (let i = 0; i < planetNum; ++i){
        planets[i].update(dt)
        planets[i].render()
    }
}