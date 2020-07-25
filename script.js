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
  const domPlayer1 = document.querySelector(`#player1`);
  const domPlayer2 = document.querySelector(`#player2`);
  const domPlayer1Score = document.querySelector(`#player1score`);
  const domPlayer2Score = document.querySelector(`#player2score`);
  const restartBtn = document.querySelector(`#restart`);
  let playerOneScore = 1;
  let playerTwoScore = 1;
  const playerTurn = document.querySelector(`#player-turn`);
  playerTurn.innerHTML = `It's Player1 move!`;

  const createGrid = () => {
    let count = 0;
    for (let i = 0; i < 3; i++) {
      let tr = document.createElement(`tr`);
      tr.className = `get-removed`;
      for (let j = 0; j < 3; j++) {
        let td = document.createElement("td");
        td.id = `data-index-${count}`;
        td.className = `get-removed`;
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
    round = 0;
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
        playerTurn.innerHTML = `It's ${domPlayer2.textContent.slice(
          0,
          -1
        )} move!`;
        getIdItem.innerHTML = player1;
        round++;
        getPlayerArr(e);
      }
    } else {
      if (getIdItem.innerHTML == ``) {
        playerTurn.innerHTML = `It's ${domPlayer1.textContent.slice(
          0,
          -1
        )} move!`;
        getIdItem.innerHTML = player2;
        round++;
        getPlayerArr(e);
      }
    }
    if (round > 8) {
      prompt(`It's a tie!`);
      makePlayerMove();
      clearPlayerInput();
    }
  };

  const getPlayerArr = (e) => {
    let id = e.target.id;
    let content = e.target.textContent;
    if (content === `x`) {
      winPlayer1.push(id.slice(id.length - 1));
      if (checkPlayerWin(winPlayer1, winningConditions)) {
        prompt(`${domPlayer1.textContent.slice(0, -1)} has won`);
        domPlayer1Score.innerHTML = `${playerOneScore++}`;
        makePlayerMove();
        clearPlayerInput();
      }
    } else {
      winPlayer2.push(id.slice(id.length - 1));
      if (checkPlayerWin(winPlayer2, winningConditions)) {
        prompt(`${domPlayer2.textContent.slice(0, -1)} has won`);
        domPlayer2Score.innerHTML = `${playerTwoScore++}`;
        makePlayerMove();
        clearPlayerInput();
      }
    }
  };

  const clearPlayerInput = () => {
    winPlayer1 = [];
    winPlayer2 = [];
    restartBoard();
  };

  const restartBoard = () => {
    let first = board.firstElementChild;
    while (first) {
      first.remove();
      first = board.firstElementChild;
    }
    init();
  };

  const checkPlayerWin = (playerCon, winningConditions) => {
    return !!winningConditions.find((_playerCon) =>
      _playerCon.every((ele) => playerCon.indexOf(ele.toString()) !== -1)
    );
  };

  const changeName = (player) => {
    let userName = prompt(`How would you like to call you?`);
    player = document.querySelector(`#${player.target.id}`);
    player.innerHTML = `${userName}:`;
    if (playerTurn.textContent === `It's Player1 move!`) {
      playerTurn.innerHTML = `It's ${domPlayer1.textContent.slice(
        0,
        -1
      )} move!`;
    }
    if (playerTurn.textContent === `It's Player2 move!`) {
      playerTurn.innerHTML = `It's ${domPlayer2.textContent.slice(
        0,
        -1
      )} move!`;
    }
  };

  const makePlayerMove = () => {
    playerTurn.innerHTML = `It's ${domPlayer1.textContent.slice(0, -1)} move!`;
  };

  const resetScore = () => {
    playerOneScore = 0;
    playerTwoScore = 0;
    domPlayer2Score.innerHTML = `${playerTwoScore++}`;
    domPlayer1Score.innerHTML = `${playerOneScore++}`;
  };

  domPlayer1.addEventListener(`click`, changeName);
  domPlayer2.addEventListener(`click`, changeName);
  restartBtn.addEventListener(`click`, () => {
    resetScore();
    clearPlayerInput();
  });
  init();
})();
