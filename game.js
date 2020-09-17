import { getClue as getClueFromCallback } from './callback-version.js';
import { getClue as getClueFromPromise } from './promise-version.js'
import { getClue as getClueFromAsyncFunction } from './async-await-version.js'

const cResponse = document.getElementById('check-response');
const res = document.getElementById('player-response');
const answer = document.getElementById('answer');
const val = document.getElementById('value');
const score = document.getElementById('score');
let playerScore = 0;
score.innerHTML = playerScore;



document.getElementById('use-callback')
    .addEventListener('click', () => {
        resetAnswer();
        res.value = '';
        getClueFromCallback((errorStatusCode, clue) => {
            if (errorStatusCode !== null) return console.error(errorStatusCode);
            console.log('errorStatusCode !== null')
            inner(clue)
            cResponse.classList.remove('is-hidden');
        });
    });

document.getElementById('use-promise')
    .addEventListener('click', () => {
        resetAnswer();
        res.value = '';
        getClueFromPromise()
            .then(inner)
            .catch(err => console.error(err.message))
        cResponse.classList.remove('is-hidden');
    })

document.getElementById('use-async-await')
    .addEventListener('click', async () => {
        resetAnswer();
        res.innerText = '';
        try {
            const clue = await getClueFromAsyncFunction()
            inner(clue)
            cResponse.classList.remove('is-hidden');
        } catch (err) {
            console.error(err);
        }
    })

document.getElementById('check-response')
    .addEventListener('click', () => {
        if (res.value === answer.innerHTML) {
            playerScore += Number(val.innerHTML);
            answer.classList.remove('is-hidden');
            cResponse.classList.add('is-hidden');
            res.value = '';
            score.innerHTML = playerScore;
        } else if (res.value !== answer.innerHTML) {
            playerScore -= Number(val.innerHTML);
            res.value = '';
            score.innerHTML = playerScore;
        }
    })


function inner(clue) {
    document.getElementById('question').innerHTML = clue.question
    document.getElementById('answer').innerHTML = clue.answer
    document.getElementById('value').innerHTML = clue.value
    document.getElementById('category-title').innerHTML = clue.category.title

    let validity = 'valid';
    if (clue.invalid_count && clue.invalid_count > 0) {
        validity = 'invalid';
    }
    document.getElementById('invalid-count').innerHTML = validity;
}

function resetAnswer() {
    answer.classList.add('is-hidden');
    cResponse.classList.remove('is-hidden');
}
