const questions = [
  {
    question: "Quanto é 1+1?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "5", correct: false },
      { text: "2", correct: true },
    ],
  },

  {
    question: "Quais desses famosos não é um cantor internacional?",
    answers: [
      { text: "Justin Bieber", correct: false },
      { text: "Britney Spears", correct: false },
      { text: "Drake", correct: false },
      { text: "Sergio Malandro", correct: true },
    ],
  },

];

let currentQuestionIndex = 0;
let userScore = 0;

const startButtonEl = document.querySelector(".start-btn");
const welcomeScreenEl = document.querySelector(".welcome-screen");
const quizScreenEl = document.querySelector(".quiz-screen");
const questionEl = document.querySelector(".question");
const answersButtons = document.querySelector(".answers-container");
const nextButtonEl = document.querySelector(".next-btn");

startButtonEl.addEventListener("click", startQuiz);

// Função para embaralhar o array de perguntas
function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startQuiz() {
  welcomeScreenEl.style.display = "none";
  quizScreenEl.style.display = "flex";
  currentQuestionIndex = 0;
  userScore = 0;
  nextButtonEl.innerHTML = "Próxima pergunta";
  nextButtonEl.style.display = "none";

  // Embaralhar as perguntas
  shuffleQuestions(questions);

  displayQuestion();
}

function displayQuestion() {
  resetContainer();
  questionEl.textContent = questions[currentQuestionIndex].question;

  const shuffledAnswers = shuffleArray(questions[currentQuestionIndex].answers);

  shuffledAnswers.forEach((answer) => {
    const buttonEl = document.createElement("button");
    buttonEl.innerHTML = answer.text;
    buttonEl.classList.add("ans-btn");
    answersButtons.appendChild(buttonEl);

    if (answer.correct) {
      buttonEl.dataset.correctAns = answer.correct;
    }

    buttonEl.addEventListener("click", checkAnswer);
  });
}

function checkAnswer(e) {
  const selectedButton = e.target;
  if (selectedButton.dataset.correctAns) {
    userScore++;
    console.log(userScore);
    selectedButton.classList.add("correct-ans");
  } else {
    selectedButton.classList.add("wrong-ans");
  }

  Array.from(answersButtons.children).forEach((button) => {
    if (button.dataset.correctAns === "true") {
      button.classList.add("correct-ans");
    }
    button.disabled = "true";
  });

  nextButtonEl.style.display = "block";
}

function displayResult() {
  resetContainer();
  questionEl.innerHTML = `Você terminou o Quiz! <br> Sua pontuação: <span class="score">${userScore}/${questions.length}</span>`;

  nextButtonEl.innerHTML = "Refazer o quiz";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    nextButtonEl.style.display = "none";
  } else {
    displayResult();
  }
}

nextButtonEl.addEventListener("click", function () {
  if (currentQuestionIndex < questions.length) {
    nextQuestion();
  } else {
    startQuiz();
  }
});

function resetContainer() {
  questionEl.textContent = "";
  answersButtons.innerHTML = "";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}