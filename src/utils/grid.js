class Grid {
  constructor(row, col) {
    this.row = row;
    this.col = col;

    this.content = Array(row).fill(0).map(() => Array(col).fill(0));
  }

  getCell(row, col) {
    return this.content[row][col];
  }

  setCell(row, col, value) {
    this.content[row][col] = value;
  }
}

export default Grid;
