let boxes = document.querySelectorAll(".box");
let resetBTN = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let draw = document.querySelector("#draw");

let turnO = true; // true for player O, false for player X

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count1 = 0;
    enablBoxes();
    msgContainer.classList.add("hide");
    draw.innerText = '';
}

let count1 = 0;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            count1++;

            if (!checkWinner()) {
                drawMatch();
            }
        }
    });
});

const disablBoxes = () => {
    boxes.forEach(box => box.disabled = true);
}

const enablBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
}

const drawMatch = () => {
    if (count1 === 9) {
        draw.innerText = "Match ended in a Draw. Please play again.";
        msg.innerText = "";
        msgContainer.classList.remove("hide");
        disablBoxes();
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disablBoxes();
}

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos1Val === pos2Val && pos1Val === pos3Val) {
            showWinner(pos1Val);
            return true; // A winner is found
        }
    }
    return false; // No winner
}

newGameBtn.addEventListener("click", resetGame);
resetBTN.addEventListener("click", resetGame);
