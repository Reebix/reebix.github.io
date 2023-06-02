const size = 25; //size of tiles
class tile {
  constructor(sides, pos = [0,0]) {
    this.neighbours = [];
    this.sides = sides;
    this.image = null;
    this.rotation = 0;

    this.pos = pos;
    this.sides = sides;
  }

  addNeighbour(tile) {
    this.neighbours.push(tile);
  }    

  create(){
    return new tile(this.sides);
  }

  draw() {
    rect(this.pos[0] * size, this.pos[1] * size,size,size);
  }
}

let tiles = [new tile([[0,1,0],[0,1,0],[0,1,0],[0,1,0]])]; //array of tiles
let tileMap = []; //array of tiles

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < width / size; i++) {
    for (let j = 0; j < height / size; j++) {
      let n = tiles[0].create();
  n.pos = [i,j];
  tileMap.push(n);
    }
  }
}

function draw() {
  background(5);
tileMap.forEach(tile => tile.draw());
}