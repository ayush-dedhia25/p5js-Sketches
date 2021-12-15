let x = 0;
let y = 0;
const spacing = 10;

function setup() {
  createCanvas(360, 360);
  background(0);
}

function draw() {
  stroke(255);
  
  if (random(1) < 0.5) {
    line(x, y, x + spacing, y + spacing);
  } else {
    line(x, y + spacing, x + spacing, y);
  }
  
  x += spacing;
  
  if (x > width) {
    x = 0;
    y += spacing;
  }
  
  if (y >= height) {
    noLoop();
    console.log("STOPPED!");
  }
}