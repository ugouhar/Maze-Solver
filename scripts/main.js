/*
   canvas - imageCanvas
   myCanvas - imageCanvas
   maze - processedCanvas
   ctx -- removed
   myTable - maze
   imgWidth = mazeWidth
   imgHeight = mazeHeight
   var ctx = canvas.getContext("2d");
*/

var img = document.getElementById("myImg");
var imageCanvas = document.getElementById("imageCanvas");
let processedCanvas = document.getElementById("processedCanvas");
var maze = document.getElementById("maze");
let cellDimen = 5;
let no_of_rows;
let no_of_cols;
const mazeWidth = parseInt(window.getComputedStyle(img).width);
const mazeHeight = parseInt(window.getComputedStyle(img).height);
var pathColor = "red";
let path = [];
let parentCell = new Map();
let visitedCell = new Map();
let queue = [];
let srcSelected = false;
let destSelected = false;

maze.onclick = e => {
  var tr = maze.rows;
  var selectedRow = e.target.parentNode.rowIndex;
  var selectedCol = e.target.cellIndex;

  if (ImageProcessing.getCellColorOfMaze(selectedRow, selectedCol) == "black") {
    return;
  }

  if (!srcSelected) {
    src = [selectedRow, selectedCol];
    srcSelected = true;
    Maze.colorPixelOfMaze(selectedRow, selectedCol, "blue");
    Maze.colorAdjacentPixels(selectedRow, selectedCol, "blue");
    setStatus("Select Destination");
  } else if (!destSelected) {
    dest = [selectedRow, selectedCol];
    destSelected = true;
    Maze.colorPixelOfMaze(selectedRow, selectedCol, "orange");
    Maze.colorAdjacentPixels(selectedRow, selectedCol, "orange");
    setStatus("Click on solve");
  }
};

function setStatus(message) {
  document.getElementById("status").innerText = message;
}
function resetSourceAndDestination() {
  srcSelected = false;
  destSelected = false;
}
function resetAll() {
  Maze.resetMaze();
  resetSourceAndDestination();
  setStatus("Select Source");
  queue = [];
  path = [];
}

ImageProcessing.setBothCanvasDimension();
ImageProcessing.loadImageInImageCanvas();
ImageProcessing.createBoundariesInProcessedCanvas();

Maze.setMazeDimension();
Maze.createRowsAndColumns();
Maze.createBoundaries();
