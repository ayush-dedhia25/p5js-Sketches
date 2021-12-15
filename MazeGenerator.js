let cols, rows;
let w = 15;
const grid = [];
let current;
const stack = [];

function setup() {
  createCanvas(360, 360);
  
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(5);
  
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  
  current = grid[0];
}

function draw() {
  background(51);
  
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  
  current.visited = true;
  current.highlight();
  
  // STEP 1
  const next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    
    // STEP 2
    stack.push(current);
    
    // STEP 3
    removeWalls(current, next);
    current = next;
  }
  else if (stack.length > 0) {
    current = stack.pop();
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  
  this.checkNeighbors = function() {
    const neighbors = [];
    
    const top = grid[index(i, j-1)];
    const right = grid[index(i+1, j)];
    const bottom = grid[index(i, j+1)];
    const left = grid[index(i-1, j)];
    
    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
    
    if (neighbors.length > 0) {
      const r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }
  
  this.highlight = function (){
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(135, 206, 250);
    rect(x, y, w, w);
  }
  
  this.show = function() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }
    
    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
  }
}

function removeWalls(a, b) {
  const x = a.i - b.i;
  const y = a.j - b.j;
  
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  }
  else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  }
  else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}