const gameBoard = (() => {
  const gameBoard = document.querySelector(`#game-board`);
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const createGrid = () => {
    const tr = document.createElement(`tr`);
    const td = document.createElement("td");
    let count = 0;
    tr.className = `t-row`;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; i < 3w; j++) {
        td.className = `data-index-${count}`;
        tr.append(td);
        count++;
      }
      gameBoard.append(tr);
    }
  };
  init = () => {
    createGrid();
  };
  return { init };
})();

init();
