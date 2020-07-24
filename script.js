const gameBoard = (() => {
  const board = document.querySelector(`#game-board`);
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
  const player1 = `x`;
  const player2 = `0`;
  let round = 0;
  let winPlayer1 = [];
  let winPlayer2 = [];
  const createGrid = () => {
    let count = 0;
    for (let i = 0; i < 3; i++) {
      let tr = document.createElement(`tr`);
      for (let j = 0; j < 3; j++) {
        let td = document.createElement("td");
        td.id = `data-index-${count}`;
        tr.append(td);
        count++;
        console.log(td);
      }
      board.append(tr);
    }
  };
  const init = () => {
    createGrid();
    clickEvent();
  };
  const clickEvent = () => {
    let gridGet = document.querySelectorAll(`td`);
    gridGet.forEach((e) => {
      e.addEventListener(`click`, checkPlayer);
    });
  };
  const checkPlayer = (e) => {
    let id = e.target.id;
    let getIdItem = document.querySelector(`#${id}`);
    if (round % 2 === 0) {
      if (getIdItem.innerHTML == ``) {
        getIdItem.innerHTML = player1;
        round++;
        getPlayerArr(e);
      }
    } else {
      if (getIdItem.innerHTML == ``) {
        getIdItem.innerHTML = player2;
        round++;
        getPlayerArr(e);
      }
    }
    if (round >= 9) {
      round = 0;
    }
  };
  const getPlayerArr = (e) => {
    let id = e.target.id;
    let content = e.target.textContent;
    if (content === `x`) {
      winPlayer1.push(id.slice(id.length - 1));
      if (checkPlayerWin(winPlayer1, winningConditions)) {
        prompt(`won`);
      }
    } else {
      winPlayer2.push(id.slice(id.length - 1));
      if (checkPlayerWin(winPlayer2, winningConditions)) {
        prompt(`won`);
      }
    }
  };
  const checkPlayerWin = (playerCon, winningConditions) => {
    return !!winningConditions.find(
      (_playerCon) => _playerCon.join() === playerCon.join()
    );
  };
  init();
})();
