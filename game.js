/*
Global Vars
*/

let r = 3, c = 3
let hand_size = Math.floor(r*c/2)+1;
let initialX, initialY;
let cardToDrag = null;
let id = 0;
let selection = 'solo';
let userTurn = true;
const cards = new Array(r * c).fill(null);

const board = document.getElementById("board");
const hand = document.getElementById("hand");

// create array for user and opponent to store the idx of their selected cards
const userCards = [];
const opponentCards = [];






/*
Game Logic Functions
*/
function addCard(card, idx) {
    let img = card.querySelector('img');
    cards[idx] = cardMap.get(parseInt(img.alt));
}

/*
Display Functions
*/

function toggleMode(mode) {
    var modeIcon = document.getElementById('modeIcon');
    if (mode === 'light') {
        document.body.classList.remove('dark-mode');
        modeIcon.classList.remove('fa-moon', 'fa-circle-half-stroke', 'dark-toggle');
        modeIcon.classList.add('fa-sun');
    } else if (mode === 'dark') {
        document.body.classList.add('dark-mode');
        modeIcon.classList.remove('fa-sun', 'fa-circle-half-stroke');
        modeIcon.classList.add('fa-moon', 'dark-toggle');
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            toggleMode('dark');
        } else {
            toggleMode('light')
        }
        modeIcon.classList.remove('fa-sun', 'fa-moon');
        modeIcon.classList.add('fa-circle-half-stroke');
    }
}

function makeGridCells(row, col) {
    for (let r = 0; r < row; r++) {
        let row = document.createElement('div');
        board.appendChild(row).className = "row";
        for (let c = 0; c < col; c++) {
            let cell = document.createElement('div');
            cell.id = r * 3 + c;
            cell.className = "cell";
            row.appendChild(cell);
        }
    }
}

function makeHandCards(hand, selection) {
    console.log(userCards, opponentCards); 
    for (let i = 0; i < userCards.length; i++) {
        createCard(hand, "player", cardMap.get(parseInt(userCards[i].cardInfo.id)));
    }
    // if (selection === "vs") {
    for (let i = 0; i < opponentCards.length; i++) {
        createCard(hand, "opponent", cardMap.get(parseInt(opponentCards[i].cardInfo.id)));
    }
    // }    
}

function selectCard(card, button) {
    // console.log(button);
    card.classList.remove('selection');
    if (button === 2) {
        if (card.classList.contains('opponent')) {
            card.classList.remove('opponent');
            opponentCards.pop(card);
        } else {
            card.classList.add('opponent');
            card.classList.remove('player');
            opponentCards.push(card);
            if (userCards.includes(card)) {
                userCards.pop(card);
            }
        }
    } else {
        if (card.classList.contains('player')) {
            card.classList.remove('player');
            userCards.pop(card);
        } else {
            card.classList.add('player');
            card.classList.remove('opponent');
            userCards.push(card);
            if (opponentCards.includes(card)) {
                opponentCards.pop(card);
            }
        }
    } 
    // console.log(userCards, opponentCards);
}

function createCard(hand, team, cardInfo) {
    let card = document.createElement('div');
    card.className = "card"
    card.classList.add(team);
    card.cardInfo = cardInfo;
    if (team === "selection") {
        card.onmousedown = function (e) {
            e.preventDefault();
            selectCard(card, e.buttons);
        }
    } else {
        card.onmousedown = function (e) {
            cardToDrag = card;
            card.classList.add('placed');
            dragMouseDown(e);
        };
    }
    createSpikes(card, cardInfo.character.up, 'top');
    createSpikes(card, cardInfo.character.down, 'bottom');
    createSpikes(card, cardInfo.character.left, 'left');
    createSpikes(card, cardInfo.character.right, 'right');
    let img = document.createElement('img');
    cardInfo.player = team == "player";
    img.src = cardInfo.character.image;
    img.alt = cardInfo.id;
    console.log(cardInfo.player)
    card.appendChild(img);
    hand.appendChild(card);
}

function createSpikes(card, count, position) {
    if (count == 1) {
        let spike = document.createElement("div");
        spike.className = `spike ${position}`;
        // spike.style[position] = `${i * 1.5}em`;
        if (position === 'top' || position === 'bottom') {
            spike.style.left = `${(3) * 1.5}em`; // Adjust spacing between spikes
        } else if (position === 'left' || position === 'right') {
            spike.style.top = `${(3) * 1.5}em`; // Adjust spacing between spikes
        }
        card.appendChild(spike);
    } else {
        for (let i = 0; i < count; i++) {
            let spike = document.createElement("div");
            spike.className = `spike ${position}`;
            // spike.style[position] = `${i * 1.5}em`;
            if (position === 'top' || position === 'bottom') {
                spike.style.left = `${(i + 6 / count) * 1.5}em`; // Adjust spacing between spikes
            } else if (position === 'left' || position === 'right') {
                spike.style.top = `${(i + 6 / count) * 1.5}em`; // Adjust spacing between spikes
            }
            card.appendChild(spike);
        }
    }
}

function dragMouseDown(e) {
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = placeCard;
    document.onmousemove = dragElement;
}

function dragElement(e) {
    if (cardToDrag) {
        let dx = e.clientX - initialX;
        let dy = e.clientY - initialY;
        cardToDrag.style.transform = `translate(${dx}px, ${dy}px)`;
    }
}

function placeCard(e) {
    if (cardToDrag) {
        let cell = getOverlappingCell(e);
        if (cell) {
            cell.appendChild(cardToDrag);
            cell.classList.add('filled');
            cardToDrag.style.transform = "translate(0px, 0px)";
            cardToDrag.onmousedown = null;
            cardToDrag.style.margin = "0";
            let idx = parseInt(cell.id);
            addCard(cardToDrag, idx);
            checkAdjacent(cell, idx);
            userTurn = false;
            let winner = checkWin();
            if (winner) {
                if (winner == 1) {
                    alert("Player 1 Wins!");
                } else {
                    alert("Player 2 Wins!");  
                }
            }
        } else {
            cardToDrag.style.transform = "translate(0px, 0px)";
            cardToDrag.classList.remove('placed');
        }

    }
    cardToDrag = null;
    document.onmouseup = null;
    document.onmousemove = null;
    if (selection === 'solo' && !userTurn) cpuPlay();
}