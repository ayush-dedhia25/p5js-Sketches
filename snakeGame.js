let snake;
let scl;

function setup() {
   createCanvas(windowWidth, windowWidth);
   snake = new Snake();
   frameRate(10);
}

function draw() {
   background(51);
   snake.update();
   snake.show();
}

function keyPressed() {
   if (keyCode === UP_ARROW) {
      snake.dir(0, -1);
   } else if (keyCode === DOWN_ARROW) {
      snake.dir(0, 1);
   } else if (keyCode === LEFT_ARROW) {
      snake.dir(-1, 0);
   } else if (keyCode === RIGHT_ARROW) {
      snake.dir(0, 1);
   }
}

function Snake() {
   this.x = 0;
   this.y = 0;
   this.xSpeed = 1;
   this.ySpeed = 0;
   
   this.update = function() {
      this.x += this.xSpeed * scl;
      this.y += this.ySpeed * scl;
      
      this.x = constrain(this.x, 0, width - scl);
      this.y = constrain(this.y, 0, height - scl);
   };
   
   this.show = function() {
      fill(255);
      rect(this.x, this.y, scl, scl);
   };
   
   this.dir = function(x, y) {
      this.xSpeed = x;
      this.ySpeed = y;
   };
}