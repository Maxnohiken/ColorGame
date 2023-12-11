
var colori = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];
var coloriItaliani = ['Rosso', 'Blu', 'Verde', 'Giallo', 'Viola', 'Arancione'];

var tasti = document.querySelectorAll('.upperbutton button, .lowerbutton button');
var scoreElement = document.getElementById('score');
var timerElement = document.getElementById('timer');
var score = 0;
var timer = 5;
var timerInterval;

function cambiaColoreTasti() {
    resetTimer();

    var indiceCorretto = Math.floor(Math.random() * tasti.length);
    var coloreCorretto = colori[indiceCorretto];

    tasti[indiceCorretto].textContent = coloriItaliani[indiceCorretto];
    tasti[indiceCorretto].style.backgroundColor = coloreCorretto.toLowerCase();
    tasti[indiceCorretto].dataset.coloreCorretto = 'true';

    var paroleCorretteDiverse = coloriItaliani.filter(function (parola, index) {
        return index !== indiceCorretto;
    });

    var parolaCorrettaDiversa = paroleCorretteDiverse[Math.floor(Math.random() * paroleCorretteDiverse.length)];

    for (var i = 0; i < tasti.length; i++) {
        if (i !== indiceCorretto) {
            var paroleErrateDiverse = coloriItaliani.filter(function (parola, index) {
                return index !== colori.indexOf(coloreCorretto);
            });

            var parolaErrataDiversa = paroleErrateDiverse[Math.floor(Math.random() * paroleErrateDiverse.length)];

            tasti[i].textContent = parolaErrataDiversa;
            tasti[i].style.backgroundColor = colori[Math.floor(Math.random() * colori.length)].toLowerCase();
            tasti[i].dataset.coloreCorretto = 'false';
        }
    }

    startTimer();

    for (var i = 0; i < tasti.length; i++) {
        tasti[i].addEventListener('click', rispostaClickHandler);
    }
}

function rispostaClickHandler() {
    var isColoreCorretto = this.dataset.coloreCorretto === 'true';

    if (isColoreCorretto) {
        incrementaScore();
    } else {
        decrementaScore();
    }

    cambiaColoreTasti();
}

function incrementaScore() {
    score++;
    scoreElement.textContent = score;
}

function decrementaScore() {
    score--;
    if (score < 0) {
        score = 0; 
    }
    scoreElement.textContent = score;
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(function () {
            timer--;

            if (timer <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                decrementaScore();
                cambiaColoreTasti();
            } else {
                timerElement.textContent = timer;
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timer = 5;
    timerElement.textContent = timer;
    timerInterval = null;
}

cambiaColoreTasti();
