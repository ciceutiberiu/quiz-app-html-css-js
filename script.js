const questions = [
  {
    id: 1,
    text: "What's the biggest animal in the world?",
    answer_1: "The blue whale",
    answer_2: "African Elephant",
    answer_3: "Giraffe",
    answer_4: "Brown Bear",
    correct_answer: "The blue whale",
  },
  {
    id: 2,
    text: "Who painted the Mona Lisa?",
    answer_1: "Vincent Van Gogh",
    answer_2: "Pablo Picasso",
    answer_3: "Leonardo da Vinci",
    answer_4: "Michelangelo",
    correct_answer: "Leonardo da Vinci",
  },
  {
    id: 3,
    text: "Which planet is closest to the sun?",
    answer_1: "Venus",
    answer_2: "Mercury",
    answer_3: "Earth",
    answer_4: "Neptun",
    correct_answer: "Mercury",
  },
  {
    id: 4,
    text: "Who exclaimed 'Evrika'?",
    answer_1: "Aristotle",
    answer_2: "Homer",
    answer_3: "Socrates",
    answer_4: "Archimedes",
    correct_answer: "Archimedes",
  },
  {
    id: 5,
    text: "In what country was Coca Cola invented?",
    answer_1: "China",
    answer_2: "United States",
    answer_3: "Canada",
    answer_4: "Mexico",
    correct_answer: "United States",
  },
];

const questionNumber = document.getElementById("number");
const score = document.getElementById("score");
const questionContent = document.querySelector(".question");
const answersContainer = document.querySelector(".answers-container");
const submitBtn = document.getElementById("submit-btn");
const quizContainer = document.querySelector(".quiz-container");
const results = document.querySelector(".results");

let scores = 1;
let currentQuestion = 0;
let correctAnswers = 0;

const loadQuestion = () => {
  const question = questions[currentQuestion];

  questionNumber.innerHTML = `<p>Question: ${currentQuestion + 1}</p>`;
  questionContent.innerHTML = `<p>${question.text}</p>`;
  score.innerHTML = `Score: ${scores}`;
  answersContainer.innerHTML = `
  <h3 class="question-element">${question.answer_1}</h3>
  <h3 class="question-element">${question.answer_2}</h3>
  <h3 class="question-element">${question.answer_3}</h3>
  <h3 class="question-element">${question.answer_4}</h3>
  `;

  const questionElement = document.querySelectorAll(".question-element");
  console.log(questionElement);

  const handleClick = (e) => {
    questionElement.forEach((element) => {
      element.classList.remove("highlight");
    });
    e.target.classList.add("highlight");
  };

  questionElement.forEach((question) => {
    question.addEventListener("click", handleClick);
  });
};

loadQuestion();

submitBtn.addEventListener("click", () => {
  let userAnswer = undefined;
  let answerExists = 0;

  const answerSelected = document.querySelectorAll(".question-element");
  answerSelected.forEach((answer) => {
    if (answer.classList.contains("highlight")) {
      ++answerExists;
      userAnswer = answer.innerHTML;
    }
  });

  if (answerExists === 0) {
    alert("Please select one answer");
    currentQuestion -= 1;
  } else {
    if (userAnswer === questions[currentQuestion].correct_answer) {
      scores *= 10;
      score.innerHTML = `${scores}`;
      ++correctAnswers;
    }
  }

  console.log(correctAnswers);
  ++currentQuestion;

  if (currentQuestion < questions.length && answerExists > 0) {
    loadQuestion();
  } else if (currentQuestion === questions.length) {
    setTimeout(() => {
      quizContainer.innerHTML = "";
    }, 1500);
    setTimeout(() => {
      results.style.display = "block";
      results.innerHTML = `<h3>Congrats, you finished the quiz</h3>
      <h3>You answered ${correctAnswers}/${questions.length}
      <h3>Your score is: ${scores} points <h3/>
      `;
    }, 1500);
  }
});
