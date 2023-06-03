const size = 20; //size of tiles
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
stroke(0)
fill(255)
    rect(this.pos[0] * size, this.pos[1] * size,size,size);
    fill(0,255,0);
    stroke(0,255,0);

}
}
let tiles = [new tile()]; //array of tiles
let tileMap = []; //array of tiles

function setup() {
  tileMap = new Map();
  createCanvas(400, 400);
  /*
  for (let i = 0; i < width / size; i++) {
    for (let j = 0; j < height / size; j++) {
      if(random(1) < 0.5){
      let n = tiles[0].create();
  n.pos = [i,j];
  tileMap.push(n);
      }
    }
   
  }
   */
}

function draw() {

  background(0);
tileMap.forEach(tile => tile.draw());
}

function mousePressed() {
 randomTile();
}

function randomTile() {
  let t = tiles[0].create();
  let pos = [floor(random(width / size)), floor(random(height / size))];
  t.pos = pos;
  tileMap.set(pos, t);
}