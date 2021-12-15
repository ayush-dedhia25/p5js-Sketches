var cols = 50;
var rows = 50;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start, end;
var w, h;
var path = [];

function heuristic(a, b) {
   var d = abs(a.i - b.i) + abs(a.j - b.j);
   return d;
}

function Spot(i, j) {
   this.i = i;
   this.j = j;
   this.f = 0;
   this.g = 0;
   this.h = 0;
   this.neighbours = [];
   this.previous = undefined;
   this.wall = false;
   
   if (random(1) < 0.4) {
      this.wall = true;
   }
   
   this.show = function(col) {
      // fill(col);
      if (this.wall) {
         fill(0);
         noStroke();
         ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
      }
      // rect(this.i * w, this.j * h, w - 1, h - 1);
   };
   
   this.addNeighbours = function(grid) {
      var i = this.i;
      var j = this.j;
      
      if (i < cols - 1) {
         this.neighbours.push(grid[i + 1][j]);
      }
      if (i > 0) {
         this.neighbours.push(grid[i - 1][j]);
      }
      if (j < rows - 1) {
         this.neighbours.push(grid[i][j + 1]);
      }
      if (j > 0) {
         this.neighbours.push(grid[i][j - 1]);
      }
      if (i > 0 && j > 0) {
         this.neighbours.push(grid[i - 1][j - 1]);
      }
      if (i < cols - 1 && j > 0) {
         this.neighbours.push(grid[i + 1][j - 1]);
      }
      if (i > 0 && j < rows - 1) {
         this.neighbours.push(grid[i - 1][j + 1]);
      }
      if (i < cols - 1 && j < rows - 1) {
         this.neighbours.push(grid[i + 1][j + 1]);
      }
   };
}

function removeFromArray(arr, elem) {
   for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === elem) {
         arr.splice(i, 1);
      }
   }
}

function setup() {
   createCanvas(windowWidth, windowWidth);
   console.log('A*');
   
   w = width / cols;
   h = height / rows;
   
   // Making a 2D array
   for (var i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
   }
   
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         grid[i][j] = new Spot(i, j);
      }
   }
   
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         grid[i][j].addNeighbours(grid);
      }
   }

   start = grid[0][0];
   end = grid[cols-1][rows-1];
   start.wall = false;
   end.wall = false;
   
   openSet.push(start);
}

function draw() {
   if (openSet.length > 0) {
      var winner = 0;
      for (var i = 0; i < openSet.length; i++) {
         if (openSet[i].f < openSet[winner].f) {
            winner = i;
         }
      }
      
      var current = openSet[winner];
      
      if (current === end) {
         noLoop();
         console.log('DONE!!!');
         alert('Path Found!!');
      }
      
      removeFromArray(openSet, current);
      closedSet.push(current);
      
      var neighbours = current.neighbours;
      for (var i = 0; i < neighbours.length; i++) {
         var neighbour = neighbours[i];
         
         if (!closedSet.includes(neighbour) && !neighbour.wall) {
            var tempG = current.g + 1;
            
            var newPath = false;
            if (openSet.includes(neighbour)) {
               if (tempG < neighbour.g) {
                  neighbour.g = tempG;
                  newPath = true;
               }
            } else {
               neighbour.g = tempG;
               newPath = true;
               openSet.push(neighbour);
            }
            
            if (newPath) {
               neighbour.h = heuristic(neighbour, end);
               neighbour.f = neighbour.g + neighbour.h;
               neighbour.previous = current;
            }
         }
      }
   } else {
      console.log('No Solution!!');
      alert('No solution found!');
      noLoop();
      return;
   }
   
   background(255);
   
   for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
         grid[i][j].show(color(255));
      }
   }
   
   for (var i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color(255, 0, 0));
   }
   
   for (var i = 0; i < openSet.length; i++) {
      openSet[i].show(color(0, 255, 0));
   }
   
   path = [];
   var temp = current;
   path.push(temp);
   while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
   }
   
   noFill();
   stroke(255, 0, 200);
   strokeWeight(w / 2);
   beginShape();
   for (var i = 0; i < path.length; i++) {
      vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
   }
   endShape();
}