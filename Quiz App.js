// Quiz questions
const programmingQuestions = [
  // Programming questions
  // ...

  {
    question: "What is a variable in programming?",
    options: [
      "A container to store data",
      "A way to repeat a block of code",
      "A function to print output",
      "A way to define a class",
    ],
    answer: 0,
  },
  {
    question: "What is the purpose of a loop?",
    options: [
      "To execute a block of code only once",
      "To make a decision between two options",
      "To store multiple values in an array",
      "To repeat a block of code",
    ],
    answer: 3,
  },
  {
    question: "What does the term 'algorithm' refer to?",
    options: [
      "A sequence of steps to solve a problem",
      "A programming language syntax",
      "A type of data structure",
      "A way to define a class",
    ],
    answer: 0,
  },
  {
    question: "What is a conditional statement?",
    options: [
      "A statement that defines a function",
      "A statement that controls the flow of execution",
      "A statement that prints output",
      "A statement that creates a variable",
    ],
    answer: 1,
  },
  {
    question: "What is the purpose of a function in programming?",
    options: [
      "To store multiple values in an array",
      "To make a decision between two options",
      "To repeat a block of code",
      "To group code for reuse and modularity",
    ],
    answer: 3,
  },
];

const fundamentalsQuestions = [
  // Computing Fundamentals questions
  // ...
  {
    question: "What is a binary system?",
    options: [
      "A number system with only two digits: 0 and 1",
      "A system for organizing files and folders",
      "A system for parallel processing",
      "A system for database management",
    ],
    answer: 0,
  },
  {
    question: "What is the purpose of an operating system?",
    options: [
      "To execute programs and manage hardware resources",
      "To store and retrieve data from a database",
      "To create graphical user interfaces",
      "To develop web applications",
    ],
    answer: 0,
  },
  {
    question: "What is a network protocol?",
    options: [
      "A set of rules for communication between devices",
      "A programming language for web development",
      "A data structure for storing hierarchical data",
      "A technique for encrypting data",
    ],
    answer: 0,
  },
  {
    question: "What is the purpose of a compiler?",
    options: [
      "To execute programs and manage hardware resources",
      "To convert high-level code into machine code",
      "To manage network connections",
      "To create user interfaces",
    ],
    answer: 1,
  },
  {
    question: "What is a file system?",
    options: [
      "A system for organizing files and folders",
      "A system for database management",
      "A system for parallel processing",
      "A system for network communication",
    ],
    answer: 0,
  },
];

const mathematicsQuestions = [
  // Computational Mathematics questions
  // ...
  /*
  
  {
  question: " ",
  options: [
  ],
  answer:
  },
  
  */
  {
    question: "What is a prime number?",
    options: [
      "A number that is divisible by 2",
      "A number that is divisible by 1 and itself",
      "A number that is divisible by 10",
      "A number that is divisible by 0",
    ],
    answer: 1,
  },
  {
    question: "What is a quadratic equation?",
    options: [
      "An equation with a single variable",
      "An equation involving square terms",
      "An equation with only linear terms",
      "An equation with fractions",
    ],
    answer: 1,
  },
  {
    question: "What is the Pythagorean theorem?",
    options: [
      "A theorem about the angles of a triangle",
      "A theorem about the area of a circle",
      "A theorem about the properties of prime numbers",
      "A theorem about the relationship between the sides of a right triangle",
    ],
    answer: 3,
  },
  {
    question: "What is the derivative of a function?",
    options: [
      "The slope of the function at a specific point",
      "The area under the curve of the function",
      "The integral of the function",
      "The maximum value of the function",
    ],
    answer: 0,
  },
  {
    question: "What is a matrix?",
    options: [
      "A rectangular array of numbers",
      "A sequence of numbers",
      "A type of graph",
      "A special type of equation",
    ],
    answer: 0,
  },
];

// Shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Get questions based on the selected topic
function getQuestionsByTopic(topic) {
  switch (topic) {
    case "programming":
      shuffleArray(programmingQuestions);
      return programmingQuestions;
    case "fundamentals":
      shuffleArray(fundamentalsQuestions);
      return fundamentalsQuestions;
    case "mathematics":
      shuffleArray(mathematicsQuestions);
      return mathematicsQuestions;
    default:
      return [];
  }
}

let currentQuestion = 0;
let score = 0;
let selectedTopic = "";
let timeLeft = 15; // Timer duration in seconds

const topicSelect = document.getElementById("topic");
const startButton = document.getElementById("start");
const quizContainer = document.getElementById("quiz");
const timerElement = document.getElementById("timer");

startButton.addEventListener("click", startQuiz);

// Start the quiz
function startQuiz() {
  selectedTopic = topicSelect.value;
  const selectedQuestions = getQuestionsByTopic(selectedTopic);
  if (selectedQuestions.length < 5) {
    alert("Insufficient questions for the selected topic.");
    return;
  }

  topicSelect.disabled = true;
  startButton.style.display = "none";
  quizContainer.style.display = "block";
  displayQuestion(selectedQuestions);
  startTimer();
}

// Get questions based on the selected topic
function getQuestionsByTopic(topic) {
  switch (topic) {
    case "programming":
      return programmingQuestions;
    case "fundamentals":
      return fundamentalsQuestions;
    case "mathematics":
      return mathematicsQuestions;
    default:
      return [];
  }
}

// Display the current question
function displayQuestion(questions) {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  questionElement.textContent = questions[currentQuestion].question;
  optionsElement.innerHTML = "";

  for (let i = 0; i < questions[currentQuestion].options.length; i++) {
    const option = document.createElement("button");
    option.textContent = questions[currentQuestion].options[i];
    option.addEventListener("click", () => {
      checkAnswer(option, questions);
    });
    optionsElement.appendChild(option);
  }
}

// Check the selected answer
function checkAnswer(selectedOption, questions) {
  const options = Array.from(selectedOption.parentNode.children);
  const selectedAnswer = options.indexOf(selectedOption);
  const correctAnswer = questions[currentQuestion].answer;

  if (selectedAnswer === correctAnswer) {
    selectedOption.classList.add("correct");
    score++;
  } else {
    selectedOption.classList.add("incorrect");
    options[correctAnswer].classList.add("correct");
  }

  disableOptions(options);
  clearInterval(timerInterval);

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion(questions);
      enableOptions(options);
      startTimer();
    } else {
      displayScore();
    }
  }, 2000);
}

// Disable option buttons
function disableOptions(options) {
  options.forEach((option) => {
    option.disabled = true;
  });
}

// Enable option buttons
function enableOptions(options) {
  options.forEach((option) => {
    option.disabled = false;
    option.classList.remove("correct", "incorrect");
  });
}

// Display the final score
function displayScore() {
  const containerElement = document.querySelector(".container");
  const scoreElement = document.createElement("h2");
  scoreElement.textContent = `Your Score: ${score}/${currentQuestion}`;
  containerElement.innerHTML = "";
  containerElement.appendChild(scoreElement);

  if (score < currentQuestion * 0.5) {
    const retryButton = document.createElement("button");
    retryButton.textContent = "Try Again";
    retryButton.addEventListener("click", retryQuiz);
    containerElement.appendChild(retryButton);
  }
   const goToAppButton = document.createElement("button");
  goToAppButton.textContent = "Go to Quiz App";
  goToAppButton.addEventListener("click", goToQuizApp);
  containerElement.appendChild(goToAppButton);
}

// Retry the quiz
function goToQuizApp() {
  // Redirect to Quiz App HTML page
  window.location = "Quiz App.html";
}
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedTopic = "";
  topicSelect.disabled = false;
  startButton.style.display = "block";
  const scoreElement = document.querySelector(".container h2");
  const retryButton = document.querySelector(".container button");
  scoreElement.parentNode.removeChild(scoreElement);
  retryButton.parentNode.removeChild(retryButton);
  quizContainer.style.display = "none";

  // Redirect to Quiz App HTML page
  window.location = "Quiz App.html";
}

// Timer
let timerInterval;

function startTimer() {
  timeLeft = 15;
  timerElement.textContent = `Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  const options = document.querySelectorAll("#options button");
  const correctAnswer =
    getQuestionsByTopic(selectedTopic)[currentQuestion].answer;
  options[correctAnswer].classList.add("correct");

  disableOptions(options);

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < getQuestionsByTopic(selectedTopic).length) {
      displayQuestion(getQuestionsByTopic(selectedTopic));
      enableOptions(options);
      startTimer();
    } else {
      displayScore();
    }
  }, 2000);
}
