class Solve {
  static isValid(row, col) {
    var tr = maze.rows;
    if (row >= 0 && row < no_of_rows && col >= 0 && col < no_of_cols) {
      if (tr[row].cells[col].style.backgroundColor == "black") {
        //if boundary is detected
        return false;
      } else if (visitedCell[[row, col]]) {
        return false;
      } else {
        return true;
      }
    } else {
      //out of maze area
      return false;
    }
  }

  static initializeMaze(visitedCell, parentCell) {
    for (let row = 0; row < no_of_rows; row++) {
      for (let col = 0; col < no_of_cols; col++) {
        visitedCell[[row, col]] = false;
        parentCell[[row, col]] = [row, col];
      }
    }
  }
  static solveForDirection(adjacentCell) {
    let row = adjacentCell[0],
      col = adjacentCell[1],
      sourceCell = adjacentCell[2];

    if (this.isValid(row, col)) {
      queue.push([row, col]);
      parentCell[[row, col]] = sourceCell;
      visitedCell[[row, col]] = true;
    }
  }
  static solveMaze() {
    this.initializeMaze(visitedCell, parentCell);

    queue.push(src);
    visitedCell[src] = true;

    while (queue.length > 0) {
      let current_cell = queue.shift();
      let current_row = current_cell[0],
        current_col = current_cell[1];

      let LEFT = [current_row, current_col - 1, current_cell];
      let RIGHT = [current_row, current_col + 1, current_cell];
      let UP = [current_row - 1, current_col, current_cell];
      let DOWN = [current_row + 1, current_col, current_cell];

      this.solveForDirection(LEFT);
      this.solveForDirection(RIGHT);
      this.solveForDirection(UP);
      this.solveForDirection(DOWN);
    }

    this.storePath();
  }
  static storePath() {
    let pt = parentCell[dest];
    while (true) {
      path.push(dest);
      if (JSON.stringify(dest) == JSON.stringify(src)) {
        break;
      }
      dest = parentCell[dest];
    }

    // if (JSON.stringify(dest) == JSON.stringify(src)) {
    //   path.push(dest);
    //   Animate.colorPath(path, 0);
    // } else {
    //   document.getElementById("status").innerText = "No path found";
    //   return;
    // }
    path.reverse();
    colorPath(path, 0);
  }
}
