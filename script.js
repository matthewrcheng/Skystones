let r=3, c=3, hand_size=5;
let initialX, initialY;
let cardToDrag = null;

const board = document.getElementById("board");
const hand = document.getElementById("hand");

function makeGridCells(row, col) {
    for (let r = 0; r < row; r++) {
        let row = document.createElement('div');
        board.appendChild(row).className = "row";
        for (let c = 0; c < col; c++) {
            let cell = document.createElement('div');
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
            cardToDrag.style.
            cardToDrag = null;
            document.onmouseup = null;
            document.onmousemove = null;
        } else {
            cardToDrag.style.transform = "translate(0px, 0px)";
            card.classList.remove('placed');
            cardToDrag = null;
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
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