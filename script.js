let board = [
  ["br","bn","bb","bq","bk","bb","bn","br"],
  ["bp","bp","bp","bp","bp","bp","bp","bp"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["wp","wp","wp","wp","wp","wp","wp","wp"],
  ["wr","wn","wb","wq","wk","wb","wn","wr"]
];

function renderBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {

      let square = document.createElement("div");
      square.className = "square " + ((r + c) % 2 ? "black" : "white");

      square.dataset.row = r;
      square.dataset.col = c;

      let piece = board[r][c];
      if (piece) {
        let img = document.createElement("img");
        img.src = "assets/" + piece + ".png";
        square.appendChild(img);
      }

      boardDiv.appendChild(square);
    }
  }
}

renderBoard();

let selected = null;

document.getElementById("board").addEventListener("click", e => {
  let square = e.target.closest(".square");
  if (!square) return;

  let r = +square.dataset.row;
  let c = +square.dataset.col;

  if (selected) {
    movePiece(selected.r, selected.c, r, c);
    selected = null;
    renderBoard();
  } else {
    if (board[r][c]) {
      selected = { r, c };
    }
  }
});

function movePiece(sr, sc, tr, tc) {
  if (!board[sr][sc]) return;

  board[tr][tc] = board[sr][sc];
  board[sr][sc] = "";
}

function isValidMove(sr, sc, tr, tc) {
  let piece = board[sr][sc];
  if (!piece) return false;

  let color = piece[0];
  let type = piece[1];

  if (type === "p") return pawnMove(sr, sc, tr, tc, color);
  if (type === "r") return rookMove(sr, sc, tr, tc);
  if (type === "n") return knightMove(sr, sc, tr, tc);
  if (type === "b") return bishopMove(sr, sc, tr, tc);
  if (type === "q") return queenMove(sr, sc, tr, tc);
  if (type === "k") return kingMove(sr, sc, tr, tc);

  return false;
}

