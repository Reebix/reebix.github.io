function setup() {
  createCanvas(400, 400);
}

function draw() {
    background(220);
   for (var i = 0; i < mouseX * 4; i += 10) {
    line(i*0.25, 0, i*0.25, i*0.25);
   }
    }