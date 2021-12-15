function findProjection(pos, a, b) {
   const v1 = p5.Vector.sub(a, pos);
   const v2 = p5.Vector.sub(b, pos);
   v2.normalize();
   // Scalar projection
   const sp = v1.dot(v2);
   v2.mult(sp);
   v2.add(pos);
   return v2;
}

class Path {
   constructor(x1, y1, x2, y2) {
      this.start = createVector(x1, y1);
      this.end = createVector(x2, y2);
      this.radius = 20;
   }
   
   show() {
      stroke(255);
      strokeWeight(2);
      line(this.start.x, this.start.y, this.end.x, this.end.y);
      
      stroke(255, 100);
      strokeWeight(this.radius * 2);
      line(this.start.x, this.start.y, this.end.x, this.end.y);
   }
}

class Vehicle {
   constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.maxSpeed = 6;
      this.maxForce = 0.1;
      this.r = 16;
   }
   
   follow(path) {
      // Path following algorithm here ↓
      // Step 1: Calculating the future position.
      const future = this.vel.copy();
      future.mult(20);
      future.add(this.pos);
      fill(255, 0, 0);
      noStroke();
      circle(future.x, future.y, 16);
      
      // Step 2: Is future on path?
      const target = findProjection(path.start, future, path.end);
      fill(0, 255, 0);
      noStroke();
      circle(target.x, target.y, 16);
      
      const d = p5.Vector.dist(future, target);
      if (d > path.radius) {
         return this.seek(target);
      } else {
         return createVector(0, 0);
      }
   }
   
   seek(target, arrival = false) {
      const force = p5.Vector.sub(target, this.pos);
      let desiredSpeed = this.maxSpeed;
      
      if (arrival) {
         const slowRadius = 100;
         const distance = force.mag();
         
         if (distance < slowRadius) {
            desiredSpeed = map(distance, 0, slowRadius);
         }
      }
      
      force.setMag(desiredSpeed);
      force.sub(this.vel);
      force.limit(this.maxForce);
      return force;
   }
   
   applyForce(force) {
      this.acc.add(force);
   }
   
   update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
   }
   
   show() {
      stroke(255);
      strokeWeight(2);
      fill(255);
      
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
      pop();
   }
   
   edges() {
      if (this.pos.x > width + this.r) {
         this.pos.x = -this.r;
      } else if (this.pos.x < -this.r) {
         this.pos.x = width + this.r;
      }
      
      if (this.pos.y > height + this.r) {
         this.pos.y = -this.r;
      } else if (this.pos.y < -this.r) {
         this.pos.y = height + this.r;
      }
   }
}

let vehicle;
let path;

function setup() {
   createCanvas(800, 400);
   vehicle = new Vehicle(100, 100);
   vehicle.vel.x = 2;
   path = new Path(0, height / 2, width, height / 2);
}

function draw() {
   background(0);
   
   path.end.y = mouseY;
   
   const force = vehicle.follow(path);
   vehicle.applyForce(force);
   
   vehicle.edges();
   vehicle.update();
   vehicle.show();
   
   path.show();
}