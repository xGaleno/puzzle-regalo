const size = 3;
const totalPieces = size * size;
let solved = { puzzle1: false, puzzle2: false };

createPuzzle("puzzle1", "img/nosotros.png");
createPuzzle("puzzle2", "img/martina.png");

function createPuzzle(containerId, imagePath) {
  const container = document.getElementById(containerId);
  let positions = [...Array(totalPieces).keys()];
  shuffleArray(positions);

  positions.forEach((pos, i) => {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundImage = `url("${imagePath}")`;
    piece.style.backgroundPosition = `${-(pos % size) * 100}px ${-Math.floor(pos / size) * 100}px`;
    piece.dataset.index = i;
    piece.dataset.correct = pos;

    piece.addEventListener("click", () => onPieceClick(containerId, i));
    container.appendChild(piece);
  });
}

let currentSelection = {};

function onPieceClick(containerId, index) {
  const container = document.getElementById(containerId);
  if (!currentSelection[containerId]) {
    currentSelection[containerId] = index;
    highlightPiece(container, index, true);
  } else {
    swapPieces(container, currentSelection[containerId], index);
    highlightPiece(container, currentSelection[containerId], false);
    currentSelection[containerId] = null;

    if (isSolved(container)) {
      solved[containerId] = true;
      if (solved.puzzle1 && solved.puzzle2) {
        document.getElementById("message").classList.remove("hidden");
      }
    }
  }
}

function highlightPiece(container, index, highlight) {
  const piece = container.children[index];
  piece.style.border = highlight ? "2px solid #ff69b4" : "none";
}

function swapPieces(container, i, j) {
  const temp = container.children[i].style.backgroundPosition;
  container.children[i].style.backgroundPosition = container.children[j].style.backgroundPosition;
  container.children[j].style.backgroundPosition = temp;

  const tempCorrect = container.children[i].dataset.correct;
  container.children[i].dataset.correct = container.children[j].dataset.correct;
  container.children[j].dataset.correct = tempCorrect;
}

function isSolved(container) {
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
