function cpuPlay() {
    const cells = Array.from(document.querySelectorAll('.cell:not(.filled)'));
    const opponentCardsLeft = Array.from(document.querySelectorAll('.opponent:not(.placed)'));
    if (cells.length > 0) {
        const randomCell = cells[Math.floor(Math.random() * cells.length)];
        const randomCard = opponentCardsLeft[Math.floor(Math.random() * opponentCardsLeft.length)];
        randomCell.appendChild(randomCard);
        randomCell.classList.add('filled');
        randomCard.style.transform = "translate(0px, 0px)";
        randomCard.onmousedown = null;
        randomCard.style.margin = "0";
        randomCard.classList.add('placed');
        let idx = parseInt(randomCell.id);
        addCard(randomCard, idx);
        checkAdjacent(randomCell, idx);
        let winner = checkWin();
        if (winner) {
            if (winner == 1) {
                alert("Player 1 Wins!");
            } else {
                alert("Player 2 Wins!");  
            }
        }
    }
}

