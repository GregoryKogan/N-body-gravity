let planets = []
const planetNum = 10


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(60);
    for (let i = 0; i < planetNum; ++i){
        let pl = new Planet(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
        planets.push(pl)
    }
}


function draw() {
    const dt = 1 / frameRate() * 60
    background(18)
    for (let i = 0; i < planetNum; ++i){
        for (let j = i + 1; j < planetNum; ++j){
            Planet.react(planets[i], planets[j])
        }
    }
    for (let i = 0; i < planetNum; ++i){
        planets[i].update(dt)
        planets[i].render()
    }
}