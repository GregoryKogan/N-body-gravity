let planets = []
const planetNum = 20


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(60);
    for (let i = 0; i < planetNum; ++i){
        let pl = new Planet(Math.random() * window.innerWidth, 
                            Math.random() * window.innerHeight,
                            Math.random() * 200 + 50,
                    )
        planets.push(pl)
    }
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