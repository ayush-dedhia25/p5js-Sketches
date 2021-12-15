function Tree() {
   this.root = null;
   
   this.addValue = function(val) {
      const node = new Node(val);
      if (this.root === null) {
         this.root = node;
         this.root.x = width / 2;
         this.root.y = 30;
      } else {
         this.root.addNode(node);
      }
   };
   
   this.traverse = function() {
      this.root.visit(this.root);
   };
   
   this.search = function(val) {
      const found = this.root.search(val);
      return found;
   };
}

function Node(val, x, y) {
   this.left = null;
   this.right = null;
   this.value = val;
   this.x = x;
   this.y = y;
   
   this.addNode = function(n) {
      if (n.value < this.value) {
         if (this.left === null) {
            this.left = n;
            this.left.x = this.x - 70;
            this.left.y = this.y + 50;
         } else {
            this.left.addNode(n);
         }
      } else if (n.value > this.value) {
         if (this.right === null) {
            this.right = n;
            this.right.x = this.x + 70;
            this.right.y = this.y + 50;
         } else {
            this.right.addNode(n);
         }
      }
   };
   
   this.visit = function(parent) {
      if (this.left !== null) {
         this.left.visit(this);
      }
      fill(255);
      noStroke();
      textAlign(CENTER);
      text(this.value, this.x, this.y);
      stroke(255);
      noFill();
      ellipse(this.x, this.y, 30, 30);
      line(parent.x, parent.y, this.x, this.y);
      if (this.right !== null) {
         this.right.visit(this);
      }
   };
   
   this.search = function(val) {
      if (this.value === val) {
         return this;
      } else if (val < this.value && this.left !== null) {
         return this.left.search(val);
      } else if (val > this.value && this.right !== null) {
         return this.right.search(val);
      }
      return null;
   };
}

function setup() {
   createCanvas(800, windowHeight);
   background(51);
   const tree = new Tree();
   for (let i = 0; i < 50; i++) {
      tree.addValue(floor(random(0, 100)));
   }
   console.log(tree);
   tree.traverse();
   
   const result = tree.search(10);
   if (result === null) {
      console.log('Not found!!!');
   } else {
      console.log(result);
   }
}