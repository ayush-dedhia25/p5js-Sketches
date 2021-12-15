const points = [];
let r1, r2, g1, g2, b1, b2, mult;

function setup() {
   createCanvas(windowWidth, windowHeight);
   background(30);
   noiseDetail(1);
   angleMode(DEGREES);
   
   const density = 30;
   const space = width / density;
   
   for (let x = 0; x < width; x += space) {
      for (let y = 0; y < height; y += space) {
         const p = createVector(x + random(-10, 10), y + random(-10, 10));
         points.push(p);
      }
   }
   
   shuffle(points, true);
   
   r1 = random(255);
   r2 = random(255);
   g1 = random(255);
   g2 = random(255);
   b1 = random(255);
   b2 = random(255);
   mult = random(0.002, 0.01);
}

function draw() {
   noStroke();
   let max;
   
   if (frameCount <= points.length) {
      max = frameCount;
   } else {
      max = points.length;
   }
   
   for (let i = 0; i < max; i++) {
      const angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720);
      
      const r = map(points[i].x, 0, width, r1, r2);
      const g = map(points[i].y, 0, height, g1, g2);
      const b = map(points[i].x, 0, width, b1, b2);
      const alpha = map(dist(width / 2, height / 2, points[i].x, points[i].y), 0, 200, 400, 0);
      fill(r, g, b, alpha);
      
      points[i].add(createVector(cos(angle), sin(angle)));
      
      // Uncomment this if statement for using the whole screen area
      // instead of a circle
      if (dist(width / 2, height / 2, points[i].x, points[i].y) < 200)
      ellipse(points[i].x, points[i].y, 1);
   }
}

function mouseClicked() {
   saveCanvas('myFlowField', 'png');
}