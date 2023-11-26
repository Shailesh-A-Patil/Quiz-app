let question = document.getElementById("question");
let nextbtn = document.getElementById("nextbtn");
let currentscore = document.getElementById("score");
let choices = Array.from(document.getElementsByClassName("choice-text"));
let currentQuesNo = document.getElementById("loading");
let availableQuestion = [];
let questionNumber;
let score;
let acceptingAnswers = false;
let selectedChoice;
let applyClass;
let totalQuestions;
const CORRECT_BONUS = 10;

fetch("questions.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    availableQuestion = loadedQuestions;
    startGame();
  })
  .catch((err) => alert("Error getting questions, Please restart the quiz"));

startGame = () => {
  score = 0;
  questionNumber = 0;
  totalQuestions = availableQuestion.length;
  nextQuestion();
};

let nextQuestion = () => {
  if (questionNumber > availableQuestion.length - 1) return;

  if (questionNumber === availableQuestion.length - 1)
    nextbtn.innerHTML = "Submit";
  currentscore.innerHTML = `${score}`;
  currentQuesNo.innerHTML = `${questionNumber + 1}/${totalQuestions}`;
  choices.forEach((choice, index) => {
    choice.innerText = availableQuestion[questionNumber]["choice" + ++index];
  });

  question.innerHTML = availableQuestion[questionNumber].question;
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    applyClass =
      selectedAnswer == availableQuestion[questionNumber].answer
        ? "correct"
        : "incorrect";
    if (applyClass === "correct") {
      score += CORRECT_BONUS;
      currentscore.innerHTML = `${score}`;
    }
    selectedChoice.parentElement.classList.add(applyClass);
  });
});

nextbtn.addEventListener("click", () => {
  if (questionNumber >= availableQuestion.length - 1) {
    localStorage.setItem("score", score);
    window.location.href = "../result.html";
  }
  if (selectedChoice) selectedChoice.parentElement.classList.remove(applyClass);
  questionNumber++;
  nextQuestion();
});
