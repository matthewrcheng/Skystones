
document.addEventListener('DOMContentLoaded', () => {
    const soloBtn = document.getElementById('solo-btn');
    const vsBtn = document.getElementById('vs-btn');
    const startBtn = document.getElementById('start-btn');
    const selectionBox = document.getElementById('selection-box');
    const handSelectionBox = document.getElementById('hand-selection');
    const gameContent = document.getElementById('container');
    const cardHolder = document.getElementById('card-holder');
    

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
                alert('Please select at least ' + hand_size + '  cards');
                return;
            } else {
                // query all card classes that do not have player class
                document.querySelectorAll('.card:not(.player)').forEach((card) => {
                    selectCard(card, 2);
                });
            }
        } else if (selection === 'vs') {
            if (userCards.length < hand_size) {
                alert('Please select at least ' + hand_size + ' cards');
                return;
            } else if (opponentCards.length < hand_size) {
                alert('Please select at least ' + hand_size + ' cards');
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