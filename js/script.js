let QuesNoContainer = document.querySelector(".quesNo");
let next = document.querySelector("#next");
let prev = document.querySelector("#prev");
let Submit = document.querySelector("#Submit");
let ham = document.querySelector("#ham");
let details = document.querySelector(".details");
let questionContainer = document.querySelector(".question");
let closeBtn = document.querySelector(".closeBtn");
let warningContainer = document.querySelector(".warningContainer");
let message = document.querySelector("#message");
let leaveCount = 0;

let i = 0;
let questions = [];
let questionButtons = [];
let userAnswers = {};

// Fetch questions from the API
fetch('http://localhost:3000/api/questions')
  .then(res => res.json())
  .then(data => {
    questions = data;  // Store fetched questions
    generateQuestionButtons();  // Generate question number buttons dynamically
    displayQuestion(i);  // Display the first question
  })
  .catch(err => console.error('Error fetching:', err));

// Function to display the current question
function displayQuestion(index) {
    const question = questions[index];  // Get the current question

    document.querySelector(".question-text").innerHTML = '';
    document.querySelector(".options").innerHTML = '';

    const questionText = document.querySelector(".question-text");
    questionText.innerHTML = `<h3>Q${question.questionNumber}: ${question.question}</h3>`;

    const optionsContainer = document.querySelector(".options");

    for (const [key, value] of Object.entries(question.options)) {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question${question.questionNumber}`;
        input.value = key;

        // If the user has already selected an answer, mark it
        if (userAnswers[question.questionNumber] === key) {
            input.checked = true;
        }

        // Update the userAnswers object on change
        input.addEventListener('change', () => {
            userAnswers[question.questionNumber] = key;
            updateQuestionButtonColors(); // Update colors immediately
        });

        const span = document.createElement('span');
        span.innerHTML = value.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        optionElement.appendChild(input);
        optionElement.appendChild(span);
        optionsContainer.appendChild(optionElement);
    }

    updateNavigationButtons();
    updateQuestionButtonColors();
}

// Generate the question number buttons
function generateQuestionButtons() {
  QuesNoContainer.innerHTML = '';  // Clear previous buttons

  questions.forEach((question, index) => {
    const button = document.createElement('button');
    button.classList.add('QuesNo');
    button.innerText = question.questionNumber;

    button.addEventListener('click', () => {
      i = index;
      displayQuestion(i);
    });

    QuesNoContainer.appendChild(button);
    questionButtons.push(button);
  });

  updateQuestionButtonColors();  // Set initial colors
}

// Set background color of each question number button
function updateQuestionButtonColors() {
  questions.forEach((question, index) => {
    const btn = questionButtons[index];
    const qNum = question.questionNumber;

    if (i === index) {
      btn.style.backgroundColor = 'yellow';  // Current question
    } else if (userAnswers[qNum]) {
      btn.style.backgroundColor = 'green';  // Attempted
    } else {
      btn.style.backgroundColor = 'orange';  // Not attempted
    }
  });
}

// Update navigation button visibility
function updateNavigationButtons() {
  prev.style.display = i === 0 ? "none" : "block";
  if (i === questions.length - 1) {
    Submit.style.display = "block";
    next.style.display = "none";
  } else {
    Submit.style.display = "none";
    next.style.display = "block";
  }
}

updateNavigationButtons();

// Handle next and previous button clicks
next.addEventListener("click", () => {
  if (i < questions.length - 1) {
    i++;
    displayQuestion(i);
  }
});

prev.addEventListener("click", () => {
  if (i > 0) {
    i--;
    displayQuestion(i);
  }
});

ham.addEventListener("click", () => {
  if (details.style.display == "flex") {
    details.style.display = "none";
    ham.src = "../images/hambirger.png";
  } else {
    details.style.display = "flex";
    details.style.position = "absolute";
    details.style.right = "1px";
    details.style.height = "90%";
    details.style.width = "43%";
    ham.src = "../images/close.png";
  }
});

// Form submission event handler
const form = document.querySelector(".Ques");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Calculate user score
function calculateScore() {
  let score = 0;

  questions.forEach(question => {
    const correctAnswer = question.answer;  // Correct answer from API
    const userAnswer = userAnswers[question.questionNumber];

    if (userAnswer === correctAnswer) {
      score++;  // Increase score if the answer is correct
    }
  });

  return score;
}

// Show the score to the user
function showScore(score) {
  const totalQuestions = questions.length;
  const scoreMessage = `You scored ${score} out of ${totalQuestions}`;
  alert(scoreMessage);  // Display score to the user
  console.log(scoreMessage);  // Log score to the console
}

// Handle the "Submit" button click
Submit.addEventListener("click", () => {
  const score = calculateScore();
  showScore(score);
  console.log("User answers:", userAnswers);
  document.removeEventListener("visibilitychange", visiChange);
  form.submit();
});

// Handle visibility change event for disqualification
function visiChange() {
  if (document.visibilityState === "hidden") {
    leaveCount++;
    if (leaveCount == 2) {
      warningContainer.style.display = "flex";
      message.innerHTML = "You've been disqualified";
      prev.style.display = "none";
      next.style.display = "none";
      Submit.style.display = "block";
    } else {
      warningContainer.style.display = "flex";
      closeBtn.addEventListener('click', () => {
        warningContainer.style.display = "none";
      });
    }
  }
}

document.addEventListener("visibilitychange", visiChange);
