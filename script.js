const size = 3;
const totalPieces = size * size;
let solved = { puzzle1: false, puzzle2: false };

createPuzzle("puzzle1", "img/nosotros.png");
createPuzzle("puzzle2", "img/martina.png");

function createPuzzle(containerId, imagePath) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // limpiar antes de agregar

  let positions = [...Array(totalPieces).keys()];
  shuffleArray(positions);

  positions.forEach((pos, i) => {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundImage = `url("${imagePath}")`;
    piece.style.backgroundPosition = `${-(pos % size) * 100}px ${-Math.floor(pos / size) * 100}px`;
    piece.dataset.index = i;
    piece.dataset.correct = pos;

    // Habilitar para ser arrastrado
    piece.setAttribute("draggable", true);
    piece.addEventListener("dragstart", dragStart);
    piece.addEventListener("dragover", dragOver);
    piece.addEventListener("dragenter", dragEnter);
    piece.addEventListener("drop", dropPiece);
    piece.addEventListener("dragend", dragEnd);

    container.appendChild(piece);
  });

  solved[containerId] = false;
}

function reshuffle(containerId, imagePath) {
  createPuzzle(containerId, imagePath);
  document.getElementById("message").classList.add("hidden");
}

let draggedPiece = null;

function dragStart(event) {
  draggedPiece = event.target;
  setTimeout(() => {
    draggedPiece.classList.add("dragging");
  }, 0);
}

function dragEnd() {
  draggedPiece.classList.remove("dragging");
  draggedPiece = null;
}

function dragOver(event) {
  event.preventDefault(); // Permitir la colocación del elemento
}

function dragEnter(event) {
  event.preventDefault();
}

function dropPiece(event) {
  event.preventDefault();
  const targetPiece = event.target;

  if (targetPiece === draggedPiece) return; // No intercambiar con la misma pieza

  const draggedIndex = draggedPiece.dataset.index;
  const targetIndex = targetPiece.dataset.index;

  // Intercambiar las posiciones visualmente
  swapPieces(draggedPiece, targetPiece);

  // Verificar si el rompecabezas está resuelto
  const container = draggedPiece.parentElement;
  if (isSolved(container)) {
    solved[container.id] = true;
    if (solved.puzzle1 && solved.puzzle2) {
      document.getElementById("message").classList.remove("hidden");
    }
  }
}

function swapPieces(draggedPiece, targetPiece) {
  const draggedPosition = draggedPiece.style.backgroundPosition;
  const targetPosition = targetPiece.style.backgroundPosition;

  draggedPiece.style.backgroundPosition = targetPosition;
  targetPiece.style.backgroundPosition = draggedPosition;

  const draggedCorrect = draggedPiece.dataset.correct;
  const targetCorrect = targetPiece.dataset.correct;

  draggedPiece.dataset.correct = targetCorrect;
  targetPiece.dataset.correct = draggedCorrect;
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
