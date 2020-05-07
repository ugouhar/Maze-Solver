class Maze {
  static setMazeDimension() {
    maze.style.width = `${mazeWidth + 2}px`;
    maze.style.height = `${mazeHeight + 2}px`;
  }

  static createRowsAndColumns() {
    no_of_rows = mazeHeight / cellDimen;
    no_of_cols = mazeWidth / cellDimen;
    for (var i = 0; i < no_of_rows; i++) {
      var newRow = maze.insertRow();
      for (var j = 0; j < no_of_cols; j++) {
        newRow.insertCell(j);
      }
    }
  }

  static createBoundaries() {
    //filling cells to create boundaries

    let rowCount = maze.rows.length;
    let colCount = maze.rows[0].cells.length;

    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        if (this.isCellToBeColored(row, col)) {
          this.setCellColor(row, col);
        }
      }
    }
  }

  static setCellColor(row, col) {
    let tr = maze.rows;
    tr[row].cells[col].style.backgroundColor = "black";
  }

  static isCellToBeColored(row, col) {
    /*
      whatever be the position of canvas 0,0 points to top left position of canvas
      so we are checking the position of all pixels of in a given cell and comparing with
      corresponding position of processedCanvas
    */
    let cellXpos = col * cellDimen;
    let cellYpos = row * cellDimen;

    for (let x_coord = cellXpos; x_coord <= cellXpos + cellDimen; x_coord++) {
      for (let y_coord = cellYpos; y_coord <= cellYpos + cellDimen; y_coord++) {
        let pixelData = ImageProcessing.getPixelDataOfProcessedCanvas(
          x_coord,
          y_coord
        );
        let requiredColor = [0, 120, 215, 255];
        if (
          pixelData[0] == requiredColor[0] &&
          pixelData[1] == requiredColor[1] &&
          pixelData[2] == requiredColor[2]
        ) {
          return true;
        }
      }
    }
    return false;
  }

  static resetMaze() {
    let rowCount = maze.rows.length;
    let colCount = maze.rows[0].cells.length;
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        if (ImageProcessing.getCellColorOfMaze(row, col) != "black") {
          Maze.colorPixelOfMaze(row, col, "white");
        }
      }
    }
  }
  static colorAdjacentPixels(row, col, pixelColor) {
    this.colorPixelOfMaze(row, col - 1, pixelColor); //LEFT
    this.colorPixelOfMaze(row - 1, col, pixelColor); //UP
    this.colorPixelOfMaze(row, col + 1, pixelColor); //RIGHT
    this.colorPixelOfMaze(row + 1, col, pixelColor); //DOWN
  }
  static colorPixelOfMaze(row, col, pixelColor) {
    let tr = maze.rows;
    tr[row].cells[col].style.background = pixelColor;
  }
}

function colorPath(path, next_idx) {
  //coloring the path
  let lastIdx = path.length - 1;
  if (next_idx > lastIdx) {
    return;
  }
  let current_row = path[next_idx][0],
    current_col = path[next_idx][1];
  Maze.colorPixelOfMaze(current_row, current_col, pathColor);

  setTimeout(colorPath, 5, path, next_idx + 1);
}
