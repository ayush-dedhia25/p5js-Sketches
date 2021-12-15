const particles = [];

function setup() {
   createCanvas(windowWidth, windowHeight, WEBGL);
   angleMode(DEGREES);
}

class Particle {
   constructor(pos, c) {
      this.pos = createVector(pos.x, pos.y, pos.z);
      this.vel = p5.Vector.random3D().normalize().mult(random(4, 6));
      this.c = c;
      this.w = random(4, 10);
   }
   
   update() {
      this.pos.add(this.vel);
   }
   
   show() {
      push();
      noStroke();
      fill(this.c);
      translate(this.pos.x, this.pos.y, this.pos.z);
      sphere(this.w);
      pop();
   }
}

function draw() {
   background(0, 0, 30);
   rotateX(sin(frameCount / 6) * 360);
   rotateY(cos(frameCount / 6) * 360);
   directionalLight([255], createVector(0, 0, -1));
   
   if (random(1) > 0.97) {
      const x = random(-100, 100);
      const y = random(-100, 100);
      const z = random(-100, 100);
      const pos = createVector(x, y, z);
      
      for (let i = 0; i < 100; i++) {
         const r = map(sin(frameCount), -1, 1, 0, 255) + random(-50, 50);
         const g = map(sin(frameCount / 2), -1, 1, 255, 0) + random(-50, 50);
         const b = map(sin(frameCount / 4), -1, 1, 0, 255) + random(-50, 50);
         const c = color(r, g, b);
         
         const p = new Particle(pos, c);
         particles.push(p);
      }
   }
   
   for (let i = particles.length - 1; i >= 0; i--) {
      if (dist(particles[i].pos.x, particles[i].pos.y, particles[i].pos.z, 0, 0, 0) < 500) {
         particles[i].update();
         particles[i].show();
      } else {
         particles.splice(i, 1);
      }
   }
}