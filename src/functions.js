import { faker } from '@faker-js/faker';

function createBoard(rows, columns) {
  return Array(rows).fill(0).map((_, row) => {
    return Array(columns).fill(0).map((_, column) => {
      return {
        row,
        column,
        opened: false,
        flagged: false,
        mined: false,
        exploded: false,
        nearMines: 0,
      };
    });
  });
}

function spreadMines(board, minesAmount) {
  const rows = board.length;
  const columns = board[0].length;

  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    const selectedRow = faker.number.int({ min: 0, max: rows - 1 });
    const selectedColumn = faker.number.int({ min: 0, max: columns  - 1});
  
    if (!board[selectedRow][selectedColumn].mined) {
      board[selectedRow][selectedColumn].mined = true;
      minesPlanted++;
    }
  }
}

function getNeighbors(board, row, column) {
  const neighbors = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];

  rows.forEach(r => {
    columns.forEach(c => {
      const different = r != row || c != column;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length;

      if (different && validRow && validColumn) {
        neighbors.push(board[r][c]);
      }
    });
  });

  return neighbors;
}

function safeNeighborhood(board, row, column) {
  return getNeighbors(board, row, column).every(neighbor => !neighbor.mined);
}

function fields(board) {
  return [].concat(...board);
}

function pending(field) {
  return (field.mined && !field.flagged) || (!field.mined && !field.opened);
}

export function flagsUsed(board) {
  return fields(board).filter(f => f.flagged).length;
}

export function cloneBoard(board) {
  return board.map(rows => {
    return rows.map(field => {
      return { ...field };
    });
  });
}

export function openField(board, row, column) {
  const field = board[row][column];

  if (!field.opened) {
    field.opened = true;

    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column)
        .forEach(neighbor => openField(board, neighbor.row, neighbor.column));
    } else {
      const neighborhood = getNeighbors(board, row, column);
      field.nearMines = neighborhood.filter(n => n.mined).length;
    }
  }
}

export function hadExplosion(board) {
  return fields(board).some(f => f.exploded);
}

export function wonGame(board) {
  return fields(board).filter(pending).length === 0;
}

export function showMines(board) {
  return fields(board).filter(f => f.mined).forEach(f => f.opened = true);
}

export function invertFlag(board, row, column) {
  const field = board[row][column];
  field.flagged = !field.flagged;
}

export function createMinedBoard(rows, columns, minesAmount) {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);

  return board;
}
