let size = 50; //size of tiles min 10 max 400
const width = 400; //width of canvasä
const height = 400; //height of canvas

let eWidth;//width of canvas in tiles
let eHeight;//height of canvas in tiles

class tile {
  constructor(sides, pos = [0,0]) {
    this.sides = sides;
    this.pos = pos;
  } 

  create(){
    return new tile(this.sides);
  }

  draw() {
    stroke(0)
    fill(25)
    rect(this.pos[0] * size, this.pos[1] * size,size,size)
    fill(0,255,0)
    stroke(0,255,0)

    for (let x = 0; x < this.sides.length; x++)
      for (let y = 0; y < this.sides[x].length; y++)
        if (this.sides[y][x] == 1) {
          rect(this.pos[0] * size + x * size / this.sides.length, this.pos[1] * size + y * size / this.sides.length, size / this.sides.length, size / this.sides.length);
        }
}

canConnect(tile) {
  if(tile.pos[0] > this.pos[0] && arrayEquals(tile.getLeftSide(),this.getRightSide())){
    return true;
  } 
  if(tile.pos[0] < this.pos[0] && arrayEquals(tile.getRightSide(),this.getLeftSide())){
    return true;
  }
  if(tile.pos[1] > this.pos[1] && arrayEquals(tile.getTopSide(),this.getBottomSide())) {
    return true;
}
  if(tile.pos[1] < this.pos[1] && arrayEquals(tile.getBottomSide(),this.getTopSide())) {
    return true;
}
  return false;
}

getTopSide() {
  return this.sides[0];
}

getRightSide() {
  let rightSide = [];
  this.sides.forEach(line => {
    rightSide.push(line[line.length - 1]);
  });
  return rightSide;
}

getBottomSide() {
  return this.sides[this.sides.length - 1];
}

getLeftSide() {
  let leftSide = [];
  this.sides.forEach(line => {
    leftSide.push(line[0]);
  });
  return leftSide;
}

getPossibleNeighbours(p) {
  let possible = [];
  tileVariants.forEach(tile => {
    let t = tile.create();
    t.pos = p;
    if(p != null) 
    if (this.canConnect(t)) possible.push(t);
  });
  return possible;
}

rotate() {
  let newSides = rotateMatrix(this.sides);
  this.sides = newSides;
  }
createRotate() {
let t = this.create();
t.rotate();
return t;
}

}

const tiles = [new tile([[0,1,0],[1,1,1],[0,1,0]]),new tile([[0,0,0],[0,1,0],[0,0,0]]),new tile([[0,0,0],[0,1,0],[0,1,0]]),new tile([[0,0,0],[1,1,0],[0,1,0]]),new tile([[0,0,0],[1,1,0],[0,1,0]]),new tile([[0,0,0],[1,1,0],[0,1,0]]),new tile([[0,1,0],[1,1,1],[0,0,0]]),new tile([[0,0,0],[1,1,1],[0,0,0]])]; //array of tiles

let tileVariants = []; //array of tile variants
let tileMap; //map of tiles
let tilesWithFreeNeighbours = []; //array of tiles with free neighbours
let emptyTiles = []; //array of empty tiles

function setup() {
  createCanvas(width, height);

  eWidth = width / size;
  eHeight = height / size;

  tries = 0;
  tileMap = [];
  tileVariants = [];
  emptyTiles = [];
  tilesWithFreeNeighbours = [];

  tiles.forEach(tile => {
    for (let i = 0; i < 4; i++) {
      tileVariants.push(tile);
      tile = tile.createRotate();
    }
  });

  for (let y = 0; y < eHeight; y++){
  let line = [];
  for (let x = 0; x < eWidth; x++){
    line.push(null);
    emptyTiles.push([x,y]);
      }
      tileMap.push(line);
  }
  
  randomTile();
}

function draw() {
  background(0);
  tileMap.forEach(line => {
    line.forEach(tile => {
      if (tile != null) tile.draw();
    });
  });
  
}

function randomTile() {
  let t = tileVariants[Math.floor(Math.random() * tileVariants.length)];

  let pos = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  addTile(t, pos);
}

function rotateMatrix(matrix) {
  const n = matrix.length;
  const result = new Array(n).fill().map(() => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[j][n - i - 1] = matrix[i][j];
    }
  }
  return result;
}

function addTile(tile, pos) {
if(emptyTiles.length == 0 || tile == null) return;

  let t = tile.create();
  t.pos = pos;
  emptyTiles.splice(emptyTiles.indexOf(pos), 1);
  tileMap[pos[1]][pos[0]] = t;
  addFittingTile(t, getRandomFreePos(t, pos));
}

function getRandomFreePos(tile, pos) {
  let nPositions = getFreeNeighbouringPositions(pos);
  if (nPositions.length == 0) return;
  let nPos = nPositions[Math.floor(Math.random() * nPositions.length)];
  return nPos;
}


let tries = 0;
function addFittingTile(tile, pos) {
  if(emptyTiles.length == 0) return;
  let possible = tile.getPossibleNeighbours(pos);
  let nposes = getNeighbouringTilePositions(pos)
  
  if(nposes != null)
  nposes.forEach(p => {
    let nt = tileMap[p[1]][p[0]];
    possible = possible.filter(t => t.canConnect(nt));
  });

  if (possible.length == 0 && tries < 2500) {
    tries++;
    updateTilesWithFreeNeighbours();
    let nt = tilesWithFreeNeighbours[Math.floor(Math.random() * tilesWithFreeNeighbours.length)];
    addFittingTile(nt, getRandomFreePos(nt, nt.pos));
    return;
  };
  let t = possible[Math.floor(Math.random() * possible.length)];
  addTile(t, pos);
}

function getFreeNeighbouringPositions(pos) {
  let neighbouringPositions = [[pos[0] - 1, pos[1]], [pos[0] + 1, pos[1]], [pos[0], pos[1] - 1], [pos[0], pos[1] + 1]];
  let freeNeighbouringPositions = [];
  neighbouringPositions.forEach(p => {
    if (p[0] >= 0 && p[0] < eWidth && p[1] >= 0 && p[1] < eHeight && tileMap[p[1]][p[0]] == null) freeNeighbouringPositions.push(p);
  });
  return freeNeighbouringPositions;
}

function getNeighbouringTilePositions(pos) {
  if(pos == null) return;
  let neighbouringPositions = [[pos[0] - 1, pos[1]], [pos[0] + 1, pos[1]], [pos[0], pos[1] - 1], [pos[0], pos[1] + 1]];
  let freeNeighbouringPositions = [];
  neighbouringPositions.forEach(p => {
    if (p[0] >= 0 && p[0] < eWidth && p[1] >= 0 && p[1] < eHeight && tileMap[p[1]][p[0]] != null) freeNeighbouringPositions.push(p);
  });
  return freeNeighbouringPositions;
}

function arrayEquals(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val == b[index]);
}

function updateTilesWithFreeNeighbours() {
  tilesWithFreeNeighbours = [];
  tileMap.forEach(line => {
    line.forEach(tile => {
      if (tile != null && getFreeNeighbouringPositions(tile.pos).length > 0) tilesWithFreeNeighbours.push(tile);
    });
  });
}