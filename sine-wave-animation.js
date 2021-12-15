function setup() {
   createCanvas(windowWidth, windowHeight);
   angleMode(DEGREES);
   rectMode(CENTER);
}

function draw() {
   background(10, 20, 30);
   translate(width / 2, height / 2);
   noFill();
   stroke(255);
   
   for (let i = 0; i < 100; i++) {
      push();
      rotate(sin(frameCount + i * 2) * 100);
      
      // RGB Coloring
      const r = map(sin(frameCount), -1, 1, 50, 255);
      const g = map(cos(frameCount / 2), -1, 1, 50, 255);
      const b = map(sin(frameCount / 4), -1, 1, 50, 255);
      stroke(r, g, b);
      
      rect(0, 0, 300 - i * 3, 300 - i * 3, 100 - i);
      pop();
   }
}