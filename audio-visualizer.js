let mySong;
let fft;
let particles = [];

class Particle {
   constructor() {
      this.pos = p5.Vector.random2D().mult(250);
      this.vel = createVector(0, 0);
      this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
      this.w = random(3, 5);
      this.color = [random(200, 255), random(200, 255), random(200, 255)];
   }
   
   show() {
      noStroke();
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.w);
   }
   
   update(cond) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      if (cond) {
         this.pos.add(this.vel);
         this.pos.add(this.vel);
         this.pos.add(this.vel);
      }
   }
   
   edges() {
      if (
         this.pos.x < -width / 2 || this.pos.x > width / 2
         || this.pos.y < -height / 2 || this.pos.y > height / 2
      ) {
         return true;
      } else {
         return false;
      }
   }
}

function preload() {
   mySong = loadSound('./sounds/ring.mp3');
}

function setup() {
   createCanvas(windowWidth, windowHeight);
   angleMode(DEGREES);
   fft = new p5.FFT();
}

function draw() {
   background(0);
   stroke(255);
   strokeWeight(3);
   noFill();
   translate(width / 2, height / 2);
   fft.analyze();
   const amp = fft.getEnergy(20, 200);
   
   const wave = fft.waveform();
   
   for (let t = -1; t <= 1; t += 2) {
      beginShape();
      for (let i = 0; i <= 180; i += 0.5) {
         const index = floor(map(i, 0, 180, 0, wave.length - 1));
         const radius = map(wave[index], -1, 1, 150, 350);
         
         const x = radius * sin(i) * t;
         const y = radius * cos(i);
         vertex(x, y);
      }
      endShape();
   }
   
   const p = new Particle();
   particles.push(p);
   
   for (let i = particles.length - 1; i >= 0; i--) {
      if (!particles[i].edges()) {
         particles[i].update(amp > 230);
         particles[i].show();
      } else {
         particles.splice(i, 1);
      }
   }
}

function mouseClicked() {
   if (mySong.isPlaying()) {
      mySong.pause();
      noLoop();
   } else {
      mySong.play();
      loop();
   }
}