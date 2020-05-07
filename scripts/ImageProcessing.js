class ImageProcessing {
  static setBothCanvasDimension() {
    imageCanvas.width = mazeWidth;
    imageCanvas.height = mazeHeight;
    processedCanvas.width = mazeWidth;
    processedCanvas.height = mazeHeight;
  }

  static loadImageInImageCanvas() {
    imageCanvas.getContext("2d").drawImage(img, 0, 0, mazeWidth, mazeHeight);
  }

  static createBoundariesInProcessedCanvas() {
    let pixelData;
    for (let x_coord = 0; x_coord < mazeWidth; x_coord++) {
      for (let y_coord = 0; y_coord < mazeHeight; y_coord++) {
        pixelData = this.getPixelDataOfImageCanvas(x_coord, y_coord);
        if (this.isPixelBlackColor(pixelData)) {
          this.setPixelColor(x_coord, y_coord);
        }
      }
    }
  }

  static getPixelDataOfImageCanvas(x_coord, y_coord) {
    let pixelData = imageCanvas
      .getContext("2d")
      .getImageData(x_coord, y_coord, 1, 1).data;
    return pixelData;
  }

  static getPixelDataOfProcessedCanvas(x_coord, y_coord) {
    let pixelData = processedCanvas
      .getContext("2d")
      .getImageData(x_coord, y_coord, 1, 1).data;
    return pixelData;
  }

  static getCellColorOfMaze(row, col) {
    let tr = maze.rows;
    return tr[row].cells[col].style.backgroundColor;
  }

  static isPixelBlackColor(pixelData) {
    //checking if pixel of imageCanvas is nearest to black color
    if (
      Math.abs(pixelData[0] - pixelData[1]) < 50 &&
      Math.abs(pixelData[1] - pixelData[2]) < 50 &&
      pixelData[0] < 200
    ) {
      return true;
    }
    return false;
  }

  static setPixelColor(x_coord, y_coord) {
    //setting color of pixel of processedCanvas
    processedCanvas.getContext("2d").fillStyle = "rgb(0,120,215)"; //setting pixel color in processed canvas
    processedCanvas.getContext("2d").fillRect(x_coord, y_coord, 1, 1);
  }
}
