const grid: string[][] = [
  [">", "-", "-", "-", "A", "-", "@", "-", "+"],
  [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
  ["+", "-", "U", "-", "+", " ", " ", " ", "C"],
  ["|", " ", " ", " ", "|", " ", " ", " ", "|"],
  ["s", " ", " ", " ", "C", "-", "-", "-", "+"],
];

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function isLetter(char: string): boolean {
  return /^[A-Z]$/.test(char);
}

function findThePath(grid: string[][]): { path: string; lettersFound: string } {
  const queue: [number, number][] = [[0, 0]];
  let path = "";
  let lettersFound = "";
  let visited: boolean[][] = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(false)
  );

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;
    const currentChar = grid[row][col];

    if (currentChar === "s") {
      path += "s";
      break;
    }

    if (!visited[row][col]) {
      visited[row][col] = true;
      path += currentChar;

      if (isLetter(currentChar)) {
        lettersFound += currentChar;
      }

      for (const [dRow, dCol] of directions) {
        const newRow = row + dRow;
        const newCol = col + dCol;

        if (
          newRow >= 0 &&
          newCol >= 0 &&
          newRow < grid.length &&
          newCol < grid[0].length &&
          grid[newRow][newCol] !== " " &&
          !visited[newRow][newCol]
        ) {
          queue.push([newRow, newCol]);
        }
      }
    }
  }
  return { path, lettersFound };
}

const result = findThePath(grid);
console.log(`Path: ${result.path}`);
console.log(`Letters: ${result.lettersFound}`);
