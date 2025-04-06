const container = document.getElementById("puzzle-container");
const message = document.getElementById("message");

const size = 3;
const totalPieces = size * size;
let positions = [];

function createPuzzle() {
  // Inicializa posiciones
  positions = [...Array(totalPieces).keys()];
  shuffleArray(positions);

  container.innerHTML = "";

  positions.forEach((pos, i) => {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundPosition = `${-(pos % size) * 100}px ${-Math.floor(pos / size) * 100}px`;
    piece.dataset.index = i;
    piece.dataset.correct = pos;

    piece.addEventListener("click", () => onPieceClick(i));
    container.appendChild(piece);
  });
}

let firstClick = null;

function onPieceClick(index) {
  if (firstClick === null) {
    firstClick = index;
    highlightPiece(index, true);
  } else {
    swapPieces(firstClick, index);
    highlightPiece(firstClick, false);
    firstClick = null;
    if (isSolved()) {
      setTimeout(() => {
        message.classList.remove("hidden");
      }, 300);
    }
  }
}

function highlightPiece(index, highlight) {
  const piece = container.children[index];
  piece.style.border = highlight ? "2px solid #ff69b4" : "none";
}

function swapPieces(i, j) {
  const temp = container.children[i].style.backgroundPosition;
  container.children[i].style.backgroundPosition = container.children[j].style.backgroundPosition;
  container.children[j].style.backgroundPosition = temp;

  const tempCorrect = container.children[i].dataset.correct;
  container.children[i].dataset.correct = container.children[j].dataset.correct;
  container.children[j].dataset.correct = tempCorrect;
}

function isSolved() {
  for (let i = 0; i < totalPieces; i++) {
    if (parseInt(container.children[i].dataset.correct) !== i) return false;
  }
  return true;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

createPuzzle();