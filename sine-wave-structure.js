function setup() {
   createCanvas(windowWidth, windowWidth, WEBGL);
   angleMode(DEGREES);
}

function draw() {
   background(30);
   rotateX(60);
   noFill();
   stroke(255);
   
   for (let i = 0; i < 50; i++) {
      const r = map(sin(frameCount / 2), -1, 1, 100, 200);
      const g = map(i, 0, 50, 100, 200);
      const b = map(cos(frameCount), -1, 1, 200, 100);
      stroke(r, g, b);
      rotate(frameCount / 20);
      
      beginShape();
      for (let j = 0; j < 360; j += 30) {
         const rad = i * 3;
         const x = rad * cos(j);
         const y = rad * sin(j);
         const z = sin(frameCount * 2 + i * 5) * 50;
         vertex(x, y, z);
      }
      endShape(CLOSE);
   }
}