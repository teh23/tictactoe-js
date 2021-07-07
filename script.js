const STARTER_TABLE = () => [0, 1, 2, 3, 4, 5, 6, 7, 8];
const PLAYER = {
    state: false,
    name: "Player X",
    togglePlayer() {
        if (this.state) {
            this.state = false;
            this.name = "Player X";
        } else {
            this.state = true;
            this.name = "Player O";
        }
    },
    winner() {
        if (this.state) {
            return "Player X";
        } else {
            return "Player 0";
        }
    },
    reset() {
        this.state = false;
        this.name = "Player X";
    },
};
let table = STARTER_TABLE();

let boxes = [];

function clearTable() {
    table = STARTER_TABLE();
    let removeSign = "";
    console.log(table);
    for (let item of boxes) {
        item.classList.remove("check");
        item.innerHTML = removeSign;
    }
    PLAYER.reset();
}
function winnerInfo(draw = false) {
    if (draw) {
        setTimeout(() => {
            alert(`DRAW`);
            clearTable();
        }, 100);
        return;
    }
    setTimeout(() => {
        alert(`The winner ${PLAYER.winner()}`);
        clearTable();
        return;
    }, 100);
}

function checkTable(table) {
    /*
        all possibilities to win:
            x,x,x,0,0,0,0,0,0

            0,0,0,x,x,x,0,0,0

            0,0,0,0,0,0,x,x,x


            x,0,0,0,x,0,0,0,x

            0,0,x,0,x,0,x,0,0


            x,0,0,x,0,0,x,0,0

            0,x,0,0,x,0,0,x,0

            0,0,x,0,0,x,0,0,x
    
    
    */
    if (table[0] == table[4] ? table[0] == table[8] : false) {
        /*
                    look awful but:

            if (t[0] && t[1]) && t[2] so
                t[0] = t[1] = t[2]  
            else 
                false
        */
        winnerInfo();

        return;
    }
    if (table[2] == table[4] ? table[2] == table[6] : false) {
        winnerInfo();

        return;
    }
    for (let i = 0; i < 3; i++) {
        if (
            table[0 + i * 3] == table[1 + i * 3]
                ? table[0 + i * 3] == table[2 + i * 3]
                : false
        ) {
            winnerInfo();

            return;
        }
        if (
            table[0 + i] == table[3 + i] ? table[0 + i] == table[6 + i] : false
        ) {
            winnerInfo();
            return;
        }
    }
    let countSign = 0;
    for (let i = 0; i < 9; i++) {
        console.log(countSign);
        if (typeof table[i] === "string") {
            countSign++;
        }
        if (countSign === 9) {
            winnerInfo((draw = true));
            return;
        }
    }
}

const grid = document.querySelector(".grid");
for (let i = 0; i < 9; i++) {
    let box = document.createElement("div");
    box.className = `box b${i}`;
    box.addEventListener("click", (event) => {
        if (PLAYER.state) {
            if (event.target.classList.contains("check")) {
                return;
            }
            event.target.classList.add("check");
            event.target.innerHTML = `<span class="check">o</span>`;

            let numberBox = parseInt(event.target.classList[1][1]);
            table[numberBox] = "o";
        } else {
            if (event.target.classList.contains("check")) {
                return;
            }
            event.target.classList.add("check");
            event.target.innerHTML = `<span class="check">x</span>`;

            let numberBox = parseInt(event.target.classList[1][1]);
            table[numberBox] = "x";
        }
        checkTable(table);
        PLAYER.togglePlayer();
    });
    boxes.push(box);
    grid.appendChild(box);
}
