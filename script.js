let r=3, c=3, hand_size=5;
let initialX, initialY;
let cardToDrag = null;
const cars = new Array(r*c).fill(null);

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

const apple = new Card("Apple", "img/apple.png", 2, 2, 2, 2);
const crab = new Card("Crab", "img/crab.png", 2, 2, 2, 2);
const fish = new Card("Fish", "img/fish.png", 2, 2, 2, 2);
const gin = new Card("Gin", "img/gin.png", 2, 2, 2, 2);
const gopher = new Card("Gopher", "img/gopher.png", 2, 2, 2, 2);
const sheep = new Card("Sheep", "img/sheep.png", 2, 2, 2, 2);

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
    for (let i = 0; i < count; i++) {
        let card = document.createElement('div');
        card.className = "card"
        card.onmousedown = function(e) {
            cardToDrag = card;
            card.classList.add('placed');
            dragMouseDown(e);
        };
        let img = document.createElement('img');
        img.src = gopher.image;
        img.alt = gopher.name;
        // img.height = '100%';
        // img.width = 'auto';
        card.appendChild(img);
        hand.appendChild(card);
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
            cardToDrag.style.transform = "translate(0px, 0px)";
            cardToDrag.onmousedown = null;
            cardToDrag.style.margin = "0";
        } else {
            cardToDrag.style.transform = "translate(0px, 0px)";
            cardToDrag.classList.remove('placed');
            
        }
        let idx = parseInt(cell.id);
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

makeGridCells(r, c);
makeHandCards(hand_size);