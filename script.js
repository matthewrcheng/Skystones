/*
Dark/Light Toggle
*/

document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    themeSwitcher.addEventListener('click', toggleTheme);

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
    }
});

/*
Global Vars
*/

let r=3, c=3, hand_size=5;
let initialX, initialY;
let cardToDrag = null;
const cards = new Array(r*c).fill(null);

const board = document.getElementById("board");
const hand = document.getElementById("hand");

class Card {
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
const cardMap = new Map();
const apple = new Card("Apple", "img/apple.png", 4, 3, 3, 3);
cardMap.set(apple.name, apple);
const coffee = new Card("Coffee", "img/coffee.png", 3, 3, 2, 5);
cardMap.set(coffee.name, coffee);
const crab = new Card("Crab", "img/crab.png", 5, 1, 4, 2);
cardMap.set(crab.name, crab);
const fish = new Card("Fish", "img/fish.png", 5, 2, 2, 3);
cardMap.set(fish.name, fish);
const gin = new Card("Gin", "img/gin.png", 3, 3, 4, 4);
cardMap.set(gin.name, gin);
const gopher = new Card("Gopher", "img/gopher.png", 4, 4, 3, 3);
cardMap.set(gopher.name, gopher);
const penguin = new Card("Penguin", "img/penguin.png", 3, 2, 5, 3);
cardMap.set(penguin.name, penguin);
const sheep = new Card("Sheep", "img/sheep.png", 2, 4, 4, 4);
cardMap.set(sheep.name, sheep);
const snake = new Card("Snake", "img/snake.png", 1, 5, 3, 4);
cardMap.set(snake.name, snake);
const star = new Card("Star", "img/star.png", 4, 3, 1, 4);
cardMap.set(star.name, star);


/*
Display Functions
*/
function makeGridCells(row, col) {
    for (let r = 0; r < row; r++) {
        let row = document.createElement('div');
        board.appendChild(row).className = "row";
        for (let c = 0; c < col; c++) {
            let cell = document.createElement('div');
            cell.id = r*3 + c;
            cell.className = "cell";
            row.appendChild(cell);
        }
    }
}

function makeHandCards(count) {
    const starters = ["Gopher", "Crab", "Fish", "Apple", "Sheep"];
    const opponents = ["Coffee", "Gin", "Penguin", "Snake", "Star"];
    for (let i = 0; i < count; i++) {
        createCard(hand, "player", cardMap.get(starters[i]));
    }
    for (let i = 0; i < count; i++) {
        createCard(hand, "opponent", cardMap.get(opponents[i]));
    }
}

function createCard(hand, team, cardInfo) {
    let card = document.createElement('div');
    card.className = "card"
    card.classList.add(team);
    card.onmousedown = function(e) {
        cardToDrag = card;
        card.classList.add('placed');
        dragMouseDown(e);
    };
    createSpikes(card, cardInfo.up, 'top');
    createSpikes(card, cardInfo.down, 'bottom');
    createSpikes(card, cardInfo.left, 'left');
    createSpikes(card, cardInfo.right, 'right');
    let img = document.createElement('img');
    cardInfo.player = team == "player";
    img.src = cardInfo.image;
    img.alt = cardInfo.name;
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
                spike.style.left = `${(i + 6/count) * 1.5}em`; // Adjust spacing between spikes
            } else if (position === 'left' || position === 'right') {
                spike.style.top = `${(i + 6/count) * 1.5}em`; // Adjust spacing between spikes
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
    cards[idx] = cardMap.get(img.alt);
}

function checkAdjacent(cell, idx) {
    if (idx >= c) {
        const up = idx-c;
        if (cards[up]) {
            let placedCard = cards[idx];
            let altCard = cards[up];
            console.log(placedCard);
            console.log(altCard);
            if (placedCard.player != altCard.player && placedCard.up > altCard.down) {
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
    if (idx < cards.length-c) {
        const down = idx+c;
        if (cards[down]) {
            let placedCard = cards[idx];
            let altCard = cards[down];
            if (placedCard.player != altCard.player && placedCard.down > altCard.up) {
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
    if (idx%c > 0) {
        const left = idx-1;
        if (cards[left]) {
            let placedCard = cards[idx];
            let altCard = cards[left];
            if (placedCard.player != altCard.player && placedCard.left > altCard.right) {
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
    if (idx%c < c-1) {
        const right = idx+1;
        if (cards[right]) {
            let placedCard = cards[idx];
            let altCard = cards[right];
            if (placedCard.player != altCard.player && placedCard.right > altCard.left) {
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

makeGridCells(r, c);
makeHandCards(hand_size);