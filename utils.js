let playerTurn = true;
let soloMode = false;


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