let result = [];
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);
function setLocalStorage() {
    localStorage.setItem("wins", JSON.stringify(result));
}
function getLocalStorage() {
    if (localStorage.getItem("wins")) {
        result = JSON.parse(localStorage.getItem("wins"));
        tableWins(result);
    }
}

const wrapper = document.querySelector(".wrapper");
const areaWrapper = document.querySelector(".area-wrapper");
const sizeBlocks = 9;
let i = 0;
while (i < sizeBlocks) {
  const blocks = document.createElement("div");
  blocks.classList.add("block");
  wrapper.append(blocks);
  i++;
}
const windowsResult = document.createElement("div");
windowsResult.classList.add("windows-result");
areaWrapper.append(windowsResult);
const overlay = document.createElement("div");
overlay.classList.add("windows-result__overlay");
windowsResult.append(overlay);
const windowsModal = document.createElement("div");
windowsModal.classList.add("windows-result__modal");
windowsResult.append(windowsModal);
const resultContent = document.createElement("div");
resultContent.classList.add("windows-result__content");
windowsModal.append(resultContent);
const resetGame = document.createElement("div");
resetGame.classList.add("reset-game");
windowsModal.append(resetGame);
resetGame.innerHTML = "New Game";
const areaResult = document.createElement("div");
areaResult.classList.add("area-result");
areaWrapper.append(areaResult);
const tableResult = document.createElement("table");
tableResult.classList.add("table-result");
areaResult.append(tableResult);

let move = 0;
wrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("block")) {
    if (!e.target.innerHTML) {
      if (move % 2 === 0) {
        e.target.innerHTML = "X";
        e.target.style.color = "blue";
      } else {
        e.target.innerHTML = "O";
        e.target.style.color = "red";
      }
      move++;
      checkArea();
      if(move === 9){
        winnerResult("Draw");
      }
    }
  }
});

function checkArea() {
  const boxes = document.querySelectorAll(".block");
  const arrProv = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  arrProv.forEach(function (value, index) {
    if (
      boxes[arrProv[index][0]].innerHTML === "X" &&
      boxes[arrProv[index][1]].innerHTML === "X" &&
      boxes[arrProv[index][2]].innerHTML === "X"
    ) {
      winnerResult("Winner: Players One");
    }
    if (
      boxes[arrProv[index][0]].innerHTML === "O" &&
      boxes[arrProv[index][1]].innerHTML === "O" &&
      boxes[arrProv[index][2]].innerHTML === "O"
    ) {
      winnerResult("Winner:  Players Two");
    }
  });
}
function winnerResult(winner) {
  windowsResult.style.display = "flex";
  resultContent.innerHTML = winner;
  result.push(winner);
  if(result.length > 9){
    result.shift();
  }
  resultContent.innerHTML += `<br>Number of moves : ${move}`;
}
function closeOverlay() {
  windowsResult.style.display = "none";
  location.reload();
}
function tableWins(result){
    if(result.length>0){
        const tableThGame = document.createElement("th");
        tableThGame.classList.add("table__th");
        tableResult.append(tableThGame);
        tableThGame.innerHTML = 'Game'
        const tableThScore = document.createElement("th");
        tableThScore.classList.add("table__th");
        tableResult.append(tableThScore);
        tableThScore.innerHTML = 'Wins'
        result.forEach(function(value, index){
            console.log(index);
            const tableTr = document.createElement("tr");
            tableTr.classList.add("table__tr");
            tableResult.append(tableTr);
            const tableTdGame = document.createElement("td");
            tableTdGame.classList.add("table__td");
            tableResult.append(tableTdGame);
            tableTdGame.innerHTML = index;
            const tableTdScore = document.createElement("td");
            tableTdScore.classList.add("table__td");
            tableResult.append(tableTdScore);
            tableTdScore.innerHTML = value;

        })
    }
}
overlay.addEventListener("click", closeOverlay);
resetGame.addEventListener("click", closeOverlay);
