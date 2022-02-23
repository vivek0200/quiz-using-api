const question = document.querySelector(".question");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const submit = document.querySelector("#submit");
const answers = document.querySelectorAll(".answer");

let quizDB = [];
let que = [];

fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`)
  .then((apidata) => {
    return apidata.json();
  })
  .then((data) => {
    que = data.results;

    data.results.map((data2) => {
      const qpiQus = {
        question: data2.question,
      };

      const answerChoices = [...data2.incorrect_answers];
      qpiQus.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(qpiQus.answer - 1, 0, data2.correct_answer);
      qpiQus.options = [];
      qpiQus.options.push(answerChoices);
      quizDB.push(qpiQus);
    });
    loadQuestion();
  });

let questionCount = 0;
let score = 0;
const loadQuestion = () => {
  console.log(quizDB);
  const questionList = quizDB[questionCount];
  question.innerText = quizDB[questionCount].question;
  option1.innerText = quizDB[questionCount].options[0][0];
  option2.innerText = quizDB[questionCount].options[0][1];
  option3.innerText = quizDB[questionCount].options[0][2];
  option4.innerText = quizDB[questionCount].options[0][3];
};

const getCheckAnswer = () => {
  let answer;
  answers.forEach((curAnsElem) => {
    if (curAnsElem.checked) {
      answer = curAnsElem.id;
    }
  });
  return answer;
};

const deselectAll = () => {
  answers.forEach((curAnsElem) => (curAnsElem.checked = false));
};

submit.addEventListener("click", () => {
  const checkedAnswer = getCheckAnswer();
  console.log(checkedAnswer);
  if (checkedAnswer == quizDB[questionCount].answer) {
    score++;
  }
  questionCount++;
  deselectAll();
  if (questionCount < quizDB.length) {
    loadQuestion();
  } else {
    showScore.innerHTML = `
        <h3>Your score ${score}/${quizDB.length} &#9996</h3>
        <button class="btn" onclick="location.reload()">Play again</button>
        `;
    showScore.classList.remove("scoreArea");
  }
});
