var scoresArray = [];
var pageLocation = "";
var timeLeft = "";
var currentQuestionIndex = 0;
var currentScore = 0;
var stopInterval = false;
var mainBody = document.querySelector("#mainBody");
var navSection = document.querySelector("#pageNav");
var timerCount = document.getElementById("timer");
var quizSection = document.querySelector("#quizSection");

var quizQuestions = [
    {
        question: "What is your name?",
        answers: ["John Doe", "Monty Python", "Jane Doe", "Bob"],
        correctAnswer: "Monty Python"
    },
    {
        question: "What is your quest?",
        answers: ["Defeat evil", "Help the poor", "Find Excalibur", "Find the holy grail"],
        correctAnswer: "Find the holy grail"
    },
    {
        question: "What is your favorite color?",
        answers: ["Blue", "Yellow", "Green", "Red"],
        correctAnswer: "Blue"
    }
];

initialLoad();
//loads scores and preQuiz screen
function initialLoad()
{
    setNav();
    loadScores();
}

//sets the nav bar based on whether it's on 'home' or 'scores' screen
function setNav()
{
    navSection.innerHTML = "";
    timerCount.innerHTML = "";
    mainBody.innerHTML = ""
    var navBar = document.createElement("div");
    var timerArea = document.createElement("div");
    timerArea.innerHTML = "";

    navBar.className = "buttonNav";

    if (pageLocation === "" || pageLocation === "Scores")
    {
        pageLocation = "Home";
        navBar.id = "scoresNav";
        navBar.innerHTML = `<button onClick="setNav()">Scores</button>`
        currentQuestionIndex = 0;
        mainBodyPreQuiz();
    } else
    {
        mainBody.innerHTML = "";
        pageLocation = "Scores";
        navBar.id = "homeNav";
        navBar.innerHTML = `<button onClick="setNav()">Home</button>`
        showScores();
    }
    navSection.appendChild(navBar);
    timerCount.appendChild(timerArea);
}

//generates the main body
function mainBodyPreQuiz()
{
    var preQuiz = document.createElement("div");
    preQuiz.className = "preQuiz";
    preQuiz.innerHTML = `<p>Click the button below to begin</p><button onClick="startQuiz()">Start!</button>`;
    mainBody.appendChild(preQuiz);
}

function startQuiz()
{
    mainBody.innerHTML = "";
    correctAnswers = 0;
    setCountDown(30);
    displayQuestion();
}

//countdown timer
function setCountDown(remainingTime)
{
    timeLeft = remainingTime;

    var timerInterval = setInterval(function ()
    {
        //stops any running time intervals
        if (stopInterval)
        {
            clearInterval(timerInterval);
            stopInterval = false;
            timerCount.textContent = `Time Left: ${timeLeft}`;
            return;
        }
        else if (timeLeft > 1)
        {
            timeLeft = timeLeft - 1;
            timerCount.textContent = `Time Left: ${timeLeft}`;
        }
        else
        {
            clearInterval(timerInterval);
            timerCount.textContent = `Times Up!`;
            timesUp();
        }
    }, 1000);
};

//displays questions and adds buttons for answers
function displayQuestion()
{
    quizSection.innerHTML = "";
    var quizQuestion = document.createElement("div");
    var questionsHTML = `<p>${quizQuestions[currentQuestionIndex].question}</p>`;

    quizQuestions[currentQuestionIndex].answers.forEach(answer =>
    {
        if (answer === quizQuestions[currentQuestionIndex].correctAnswer)
        {
            questionsHTML += `<button onClick="scorePoint()">${answer}</button>`
        } else
        {
            questionsHTML += `<button onClick="minusTime()">${answer}</button>`
        }
    });

    quizQuestion.innerHTML = questionsHTML;
    quizSection.appendChild(quizQuestion);
    currentQuestionIndex++;
}

//if answered correctly
function scorePoint()
{
    if (currentQuestionIndex < quizQuestions.length)
    {
        currentScore++;
        displayQuestion()
    }
    else
    {
        currentScore++;
        setCountDown(0);
    }
}

//if answered incorrectly
function minusTime()
{
    stopInterval = true;
    if (timeLeft <= 5 || currentQuestionIndex >= quizQuestions.length)
    {
        setCountDown(0);
    } else
    {
        setCountDown(timeLeft - 5);
        displayQuestion()
    }
}

//once time is up handles calling save function and input
function timesUp()
{
    quizSection.innerHTML = "";
    var saveNewScore = document.createElement("div");

    saveNewScore.innerHTML = `<div>You scored ${currentScore} points, enter your name below to save the score</div>
    <textarea id="savedScoreName"></textarea>
    <button onClick="saveScore()">SaveScore</button>`;
    quizSection.appendChild(saveNewScore);
}

// load in saved scores, if any exist
function loadScores()
{
    var savedScores = localStorage.getItem("scores")
    if (savedScores)
    {
        savedScoresParsed = JSON.parse(savedScores);
        savedScoresParsed.forEach(score =>
        {
            scoresArray.push(score);
        });
    }
}

//saves score
function saveScore()
{
    var newScore = {
        Name: document.getElementById("savedScoreName").value,
        Score: currentScore
    }

    scoresArray.push(newScore);
    localStorage.setItem("scores", JSON.stringify(scoresArray));
    currentScore = 0;
    quizSection.innerHTML = "";
    setNav();
}

function showScores()
{
    var listOfScores = document.createElement("ul");
    listHTML = "";

    scoresArray.forEach(savedScore =>
    {
        listHTML += `<li>Name = ${savedScore.Name}  |  Score = ${savedScore.Score}</li>`;
    });

    listOfScores.innerHTML = listHTML;
    mainBody.appendChild(listOfScores);
}