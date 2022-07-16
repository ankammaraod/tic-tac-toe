let intervalId = null;

const performXhr = (method, callBack, path, data = '') => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => callBack(xhr));
  xhr.open(method, path);
  xhr.send(data);
};

const updateBoard = (gameStats) => {
  gameStats.players.forEach(({ symbol, positions }) => {
    positions.forEach(pos => {
      const div = document.getElementById(pos);
      div.innerText = symbol;
    });
  });

  if (!gameStats.isRunning) {
    const msg = document.querySelector('#display');
    msg.innerText = `${gameStats.currentPlayer.name} has WON`;

    const board = document.querySelector('.board');
    board.onclick = () => { }
    clearInterval(intervalId);
  }
};

const registerMove = ({ status }) => {
  const msg = document.querySelector('#display');

  if (status === 400) {
    msg.innerText = 'Invalid';
    setTimeout(() => {
      msg.innerText = '';
    }, 1000);
  }
};

const playMove = (event) => {
  const cell = event.target.id;

  performXhr('POST', registerMove, '/move', cell);
};

const getStats = ({ responseText }) => {
  const stats = JSON.parse(responseText);
  updateBoard(stats);
};

intervalId = setInterval(() => {
  performXhr('GET', getStats, '/stats');
}, 700);
