/*
Global Vars
*/

let r = 3, c = 3, hand_size = 5;
let initialX, initialY;
let cardToDrag = null;
let id = 0;
const cards = new Array(r * c).fill(null);

const board = document.getElementById("board");
const hand = document.getElementById("hand");

// create array for user and opponent to store the idx of their selected cards
const userCards = [];
const opponentCards = [];

class Card {
    constructor(id, character) {
        this.id = id;
        this.character = character;
    }
}

class Character {
    constructor(name, image, up, down, left, right) {
        this.name = name;
        this.image = image;
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
    }
}

/*
Available Cards metrics: performance, ease of use, community/ecosystem, portability/tooling 
*/
const characterMap = new Map();
const apple = new Character("Apple", "img/apple.png", 4, 3, 3, 3);
characterMap.set(apple.name, apple);
const coffee = new Character("Coffee", "img/coffee.png", 3, 3, 2, 5);
characterMap.set(coffee.name, coffee);
const crab = new Character("Crab", "img/crab.png", 5, 1, 4, 2);
characterMap.set(crab.name, crab);
const fish = new Character("Fish", "img/fish.png", 5, 2, 2, 3);
characterMap.set(fish.name, fish);
const gin = new Character("Gin", "img/gin.png", 3, 3, 4, 4);
characterMap.set(gin.name, gin);
const gopher = new Character("Gopher", "img/gopher.png", 4, 4, 3, 3);
characterMap.set(gopher.name, gopher);
const penguin = new Character("Penguin", "img/penguin.png", 3, 2, 5, 3);
characterMap.set(penguin.name, penguin);
const sheep = new Character("Sheep", "img/sheep.png", 2, 4, 4, 4);
characterMap.set(sheep.name, sheep);
const snake = new Character("Snake", "img/snake.png", 1, 5, 3, 4);
characterMap.set(snake.name, snake);
const star = new Character("Star", "img/star.png", 4, 3, 1, 4);
characterMap.set(star.name, star);

const cardMap = new Map();
const apple1 = new Card(id++, apple);
cardMap.set(apple1.id, apple1);
const coffee1 = new Card(id++, coffee);
cardMap.set(coffee1.id, coffee1);
const crab1 = new Card(id++, crab);
cardMap.set(crab1.id, crab1);
const fish1 = new Card(id++, fish);
cardMap.set(fish1.id, fish1);
const gin1 = new Card(id++, gin);
cardMap.set(gin1.id, gin1);
const gopher1 = new Card(id++, gopher);
cardMap.set(gopher1.id, gopher1);
const penguin1 = new Card(id++, penguin);
cardMap.set(penguin1.id, penguin1);
const sheep1 = new Card(id++, sheep);
cardMap.set(sheep1.id, sheep1);
const snake1 = new Card(id++, snake);
cardMap.set(snake1.id, snake1);
const star1 = new Card(id++, star);
cardMap.set(star1.id, star1);


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
    if (selection === "vs") {
        for (let i = 0; i < opponentCards.length; i++) {
            createCard(hand, "opponent", cardMap.get(parseInt(opponentCards[i].cardInfo.id)));
        }
    }    
}

function selectCard(card, button) {
    // console.log(button);
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
}

function getOverlappingCell(e) {
    let x = e.clientX;
    let y = e.clientY;
    let cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        let cellRect = cell.getBoundingClientRect();
        if (
            !cell.classList.contains('filled') &&
            x >= cellRect.left &&
            y >= cellRect.top &&
            x <= cellRect.right &&
            y <= cellRect.bottom
        ) {
            return cell;
        }
    }
    return null;
}

/*
Game Logic Functions
*/
function addCard(card, idx) {
    let img = card.querySelector('img');
    cards[idx] = cardMap.get(parseInt(img.alt));
}

function checkAdjacent(cell, idx) {
    if (idx >= c) {
        const up = idx - c;
        if (cards[up]) {
            let placedCard = cards[idx];
            let altCard = cards[up];
            console.log("Evaluating " + placedCard.character.name + " vs " + altCard.character.name);
            console.log(placedCard.character, placedCard.player);
            console.log(altCard.character, altCard.player);
            if (placedCard.player != altCard.player && placedCard.character.up > altCard.character.down) {
                console.log("Character " + placedCard.character.name + " beats " + altCard.character.name);
                altCard.player = placedCard.player;
                if (altCard.player) {
                    card = document.getElementById(up.toString()).querySelector('div');
                    card.classList.add('player');
                    card.classList.remove('opponent');
                } else {
                    card = document.getElementById(up.toString()).querySelector('div');
                    card.classList.add('opponent');
                    card.classList.remove('player');
                }
            }
        }
    }
    if (idx < cards.length - c) {
        const down = idx + c;
        if (cards[down]) {
            let placedCard = cards[idx];
            let altCard = cards[down];
            console.log("Evaluating " + placedCard.character.name + " vs " + altCard.character.name);
            console.log(placedCard.character, placedCard.player);
            console.log(altCard.character, altCard.player);
            if (placedCard.player != altCard.player && placedCard.character.down > altCard.character.up) {
                console.log("Character " + placedCard.character.name + " beats " + altCard.character.name);
                altCard.player = placedCard.player;
                if (altCard.player) {
                    card = document.getElementById(down.toString()).querySelector('div');
                    card.classList.add('player');
                    card.classList.remove('opponent');
                } else {
                    card = document.getElementById(down.toString()).querySelector('div');
                    card.classList.add('opponent');
                    card.classList.remove('player');
                }
            }
        }
    }
    if (idx % c > 0) {
        const left = idx - 1;
        if (cards[left]) {
            let placedCard = cards[idx];
            let altCard = cards[left];
            console.log("Evaluating " + placedCard.character.name + " vs " + altCard.character.name);
            console.log(placedCard.character, placedCard.player);
            console.log(altCard.character, altCard.player);
            if (placedCard.player != altCard.player && placedCard.character.left > altCard.character.right) {
                console.log("Character " + placedCard.character.name + " beats " + altCard.character.name);
                altCard.player = placedCard.player;
                if (altCard.player) {
                    card = document.getElementById(left.toString()).querySelector('div');
                    card.classList.add('player');
                    card.classList.remove('opponent');
                } else {
                    card = document.getElementById(left.toString()).querySelector('div');
                    card.classList.add('opponent');
                    card.classList.remove('player');
                }
            }
        }
    }
    if (idx % c < c - 1) {
        const right = idx + 1;
        if (cards[right]) {
            let placedCard = cards[idx];
            let altCard = cards[right];
            console.log("Evaluating " + placedCard.character.name + " vs " + altCard.character.name);
            console.log(placedCard.character, placedCard.player);
            console.log(altCard.character, altCard.player);
            if (placedCard.player != altCard.player && placedCard.character.right > altCard.character.left) {
                console.log("Character " + placedCard.character.name + " beats " + altCard.character.name);
                altCard.player = placedCard.player;
                if (altCard.player) {
                    card = document.getElementById(right.toString()).querySelector('div');
                    card.classList.add('player');
                    card.classList.remove('opponent');
                } else {
                    card = document.getElementById(right.toString()).querySelector('div');
                    card.classList.add('opponent');
                    card.classList.remove('player');
                }
            }
        }
    }
}

function checkWin() {
    // if all cells contain a card
    let cells = document.querySelectorAll('.cell');
    let playerCount = 0;
    for (let cell of cells) {
        if (!cell.classList.contains('filled')) {
            return 0;
        }
        if (cell.classList.contains('player')) {
            playerCount++;
        }
    }
    if (playerCount >= hand_size) {
        return 1; // player wins
    } else {
        return 2; // opponent wins
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const soloBtn = document.getElementById('solo-btn');
    const vsBtn = document.getElementById('vs-btn');
    const startBtn = document.getElementById('start-btn');
    const selectionBox = document.getElementById('selection-box');
    const handSelectionBox = document.getElementById('hand-selection');
    const gameContent = document.getElementById('container');
    const cardHolder = document.getElementById('card-holder');
    let selection = 'solo';

    const chooseHand = (mode) => {
        console.log(`Choosing hand for ${mode} mode`);
        selection = mode;
        selectionBox.style.display = 'none';
        handSelectionBox.style.display = 'flex';
        cardMap.forEach((card) => {
            // add selected idx to the array
            createCard(cardHolder, 'selection', card);
        })
    }
    const startGame = (selection) => {

        
        // Add your game initialization logic here based on the mode
        if (selection === 'solo') {
            if (userCards.length < hand_size) {
                alert('Please select at least 5 cards');
                return;
            }
        } else if (selection === 'vs') {
            if (userCards.length < hand_size) {
                alert('Please select at least 5 cards');
                return;
            } else if (opponentCards.length < hand_size) {
                alert('Please select at least 5 cards');
                return;
            }
        }
        // Hide the selection box and show the game content
        handSelectionBox.style.display = 'none';
        gameContent.style.display = 'block';
        makeGridCells(r, c);
        makeHandCards(hand, selection);
    };

    soloBtn.addEventListener('click', () => chooseHand('solo'));
    vsBtn.addEventListener('click', () => chooseHand('vs'));
    startBtn.addEventListener('click', () => startGame(selection));
    toggleMode('auto');
});