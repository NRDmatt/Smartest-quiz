const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'String values must be enclosed within _____ when being assigned to variables.',
        choice1: 'Commas',
        choice2: 'Curly brackets',
        choice3: 'quotes',
        choice4: 'paraenthesis',
        answer: 2,

    },
    {
        question: 'Which is NOT a datatype supported by javascript?',
        choice1: 'Null',
        choice2: 'Object',
        choice3: 'Number',
        choice4: 'Addition',
        answer: 4,

    },
    {
        question: 'Is Javascript a case-sensitive language?',
        choice1: 'yes',
        choice2: 'no',
        choice3: 'idk',
        choice4: 'Of course not',
        answer: 1,

    },
    {
        question: 'What is jQuery most common use?',
        choice1: 'Wrapping js methods that can be called with a line of code.',
        choice2: 'Styling and designing websites.',
        choice3: 'To run backend process with ease.',
        choice4: 'To create apis and have them serve there function',
        answer: 1,

    },
    {
        question: 'What year was JavaScript invented',
        choice1: '1993',
        choice2: '1995',
        choice3: '1990',
        choice4: '1989',
        answer: 2,

    },
    {
        question: 'What was the original name of JavaScript',
        choice1: 'ShortScript',
        choice2: 'KingScript',
        choice3: 'LiveScript',
        choice4: 'OriginScipt',
        answer: 3,

    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS= 6

startGame = () => {
questionCounter = 0
score = 0
availableQuestions = [...questions]
getNewQuestion()
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('endpage.html')
    }
    questionCounter++ 
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()


