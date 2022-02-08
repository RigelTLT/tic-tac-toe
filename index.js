const wrapper = document.querySelector('.wrapper');
const areaWrapper = document.querySelector('.area-wrapper');

let result = '';
const sizeBlocks = 9;
let i = 0;
while (i < sizeBlocks) {
    const blocks = document.createElement('div');
    blocks.classList.add('block');
    wrapper.append(blocks);
    i++;
}
const windowsResult = document.createElement('div');
windowsResult.classList.add('windows-result');
areaWrapper.append(windowsResult);
const overlay = document.createElement('div');
overlay.classList.add('windows-result__overlay');
windowsResult.append(overlay);
const windowsModal = document.createElement('div');
windowsModal.classList.add('windows-result__modal');
windowsResult.append(windowsModal);
const resultContent = document.createElement('div');
resultContent.classList.add('windows-result__content');
windowsModal.append(resultContent);


const resetGame = document.createElement('div');
resetGame.classList.add('reset-game');
windowsModal.append(resetGame);
resetGame.innerHTML = 'New Game';

let move = 0;
wrapper.addEventListener('click' , e=>{
    if(e.target.classList.contains('block')){
        move % 2 === 0 ? e.target.innerHTML = 'X' : e.target.innerHTML = 'O';
        move ++;
        checkArea();
    }
})

function checkArea(){
    const boxes = document.querySelectorAll('.block');
    const arrProv = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    arrProv.forEach(function(value, index){
        if(boxes[arrProv[index][0]].innerHTML === 'X' && boxes[arrProv[index][1]].innerHTML === 'X' && boxes[arrProv[index][2]].innerHTML === 'X'){
            winnerResult('Крестики')
        }
        if(boxes[arrProv[index][0]].innerHTML === 'O' && boxes[arrProv[index][1]].innerHTML === 'O' && boxes[arrProv[index][2]].innerHTML === 'O'){
            winnerResult('Нолики')
        }
    })
}
function winnerResult(winner){
    windowsResult.style.display = 'flex';
    resultContent.innerHTML = `Победили: ${winner}`;
}