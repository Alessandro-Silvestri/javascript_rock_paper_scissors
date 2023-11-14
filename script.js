// localStorage.clear();

// check if the score data is saved in the jason file
function checkScore() {
    // if not I create the score object, i save in the jason and I return it 
    if(localStorage.getItem('score')== null) {
        // score object
        let score = {
            scorePlayer: 0,
            scoreComputer: 0,
            draw: 0
        };
        localStorage.setItem('score', JSON.stringify(score));
        return score;
        }
    
    // if yes I get it and I return it
    else {       
        // JSON.parse: avoid to do it all in one line
        let score = localStorage.getItem('score');
        score = JSON.parse(score);
        return score;
    }
}

// game / show the result / save the score
function game(player) {
    let computer = Math.round(Math.random() * 2);
    
    // result emojis
    document.getElementById('player').innerHTML = emoji[player];
    document.getElementById('computer').innerHTML = emoji[computer];

    // player wins
    if((player == 2 && computer == 1) || (player == 1 && computer == 0) || (player == 0 && computer == 2)) {
        scoreActions.playerWin();
        document.getElementById('js-result-title').innerHTML = "You WIN!";
        scoreActions.getScore()
    }
    // computer wins
    else if((player == 0 && computer == 1) || (player == 2 && computer == 0) || (player == 1 && computer == 2)) {
        scoreActions.computerWin();
        document.getElementById('js-result-title').innerHTML = "You LOOSE";
        scoreActions.getScore()
    }
    // draw
    else {
        scoreActions.gameDraw();
        document.getElementById('js-result-title').innerHTML = "DRAW";
        scoreActions.getScore()
    }
}

// this object modifies the values of 'score' object
let scoreActions = {
    saveJsonFile: function() {
        localStorage.setItem('score', JSON.stringify(score));
    },

    playerWin: function() {
        score.scorePlayer ++;
        this.saveJsonFile();
    },

    computerWin: function() {
        score.scoreComputer ++;
        this.saveJsonFile();
    },

    gameDraw: function() {
        score.draw ++;
        this.saveJsonFile();
    },

    reset: function() {
        score.scoreComputer = 0;
        score.scorePlayer = 0;
        score.draw = 0;
        localStorage.setItem('score', JSON.stringify(score));
        document.getElementById('js-result').innerHTML = `the score has been reset`
    },

    getScore: function() {
        let scoreResult = document.getElementById('js-result');
        scoreResult.innerHTML = `\n\nyou: ${score.scorePlayer}\ncomputer: ${score.scoreComputer}\ndraw: ${score.draw}`
    }
};

// emoji object
let emoji = {
    0: "&#128074;",
    1: "&#128400;",
    2: "&#9996;"
};

// create the score object and show it in the page
let score = checkScore();
let outputInitalScore = `Initial score: You ${score.scorePlayer}, Computer ${score.scoreComputer}, draw ${score.draw}`;
document.getElementById('js-result').innerHTML = outputInitalScore;

