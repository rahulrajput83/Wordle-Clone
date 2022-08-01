document.addEventListener('DOMContentLoaded', () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;
    const WordArray = ['eager', 'earth', 'stone', 'abuse', 'actor', 'agree', 'alert', 'alone', 'anger', 'drama', 'doing', 'daily', 'cross', 'cover', 'crown',
    'dance', 'enjoy', 'error', 'false', 'faith', 'extra', 'enter', 'going', 'grand', 'group', 'guess', 'guest', 'heart', 'horse', 'guard', 'henry', 'ideal'
];
    var randomNumber = Math.floor(Math.random() * WordArray.length);
    console.log(WordArray.length)
    let word = WordArray[randomNumber];
    let guessedWordCount = 0;

    const keys = document.querySelectorAll('.keyboard-row button');

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length
        return guessedWords[numberOfGuessedWords - 1]
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr()

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace))
            availableSpace = availableSpace + 1

            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter)

        if (!isCorrectLetter) {
            return "rgb(208, 236, 241)";
        }

        const letterInThisPosition = word.charAt(index)
        const isCorrectPosition = letter === letterInThisPosition

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        }


        return "rgb(181, 159, 59)"
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr()
        if (currentWordArr.length !== 5) {
            alert('Words must be 5 letters');
        }

        const currentWord = currentWordArr.join('');

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.style = `background-color: ${tileColor};border-color: ${tileColor}`
            }, interval * index)
        });
        guessedWordCount += 1;

        if (currentWord === word) {
            alert('Correct Answer')
        }

        if (guessedWords.length === 6) {
            alert(`You have 0 guesses left ! The correct word is ${word}.`)
        }

        guessedWords.push([])
    }

    function createSquares() {
        const gameBoard = document.getElementById('board')

        for (let i = 0; i < 30; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', i + 1);
            gameBoard.appendChild(square);
        }
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr()
        const removedLetter = currentWordArr.pop()

        guessedWords[guessedWords.length - 1] = currentWordArr

        const lastLetterEl = document.getElementById(String(availableSpace - 1))
        lastLetterEl.textContent = ''
        availableSpace = availableSpace - 1
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === 'enter') {
                handleSubmitWord()
                return;
            }

            if (letter === 'del') {
                handleDeleteLetter()
                return;
            }

            updateGuessedWords(letter)
        };
    }

});