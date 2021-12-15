let start = 0;
let r1, r2, b1, b2, g1, g2;

function setup() {
   createCanvas(windowWidth, windowWidth, WEBGL);
   angleMode(DEGREES);
   noiseDetail(4);
   
   r1 = random(255);
   r1 = random(255);
   g1 = random(255);
   g2 = random(255);
   b1 = random(255);
   b2 = random(255);
   
   // noLoop();
}

function draw() {
   background(30);
   noStroke();
   
   translate(0, 0, -width);
   rotateX(frameCount / 2);
   rotateY(frameCount / 2);
   
   translate(-width / 2, -height / 2, -width / 2);
   
   const space = width / 10;
   let index_X = 0;
   
   for (let x = 0; x < width; x += space) {
      let index_Y = 0;
      for (let y = 0; y < height; y += space) {
         let index_Z = 0;
         for (let z = 0; z < width; z += space) {
            push();
            const h = noise(index_X + start, index_Y + start, index_Z + start) * 255;
            
            const r = map(h, 0, 255, r1, r2);
            const g = map(h, 0, 255, g1, g2);
            const b = map(h, 0, 255, b1, b2);
            fill(r, g, b);
            
            translate(x, y, z);
            box(space);
            pop();
            
            index_Z += 0.1;
         }
         index_Y += 0.1;
      }
      index_X += 0.1;
   }
   
   start += 0.01;
}