function setup() {
   createCanvas(360, 200);
}

function draw() {
   background(0);
   frameRate(1);
   stroke(255);
   noFill();
   drawCircle(180, 100, 150);
}

function drawCircle(x, y, d) {
   ellipse(x, y, d);

   if (d > 2) {
      drawCircle(x + d * 0.5, y, d * 0.5);
      drawCircle(x - d * 0.5, y, d * 0.5);
      drawCircle(x, y + d * 0.5, d * 0.5);
   }
}