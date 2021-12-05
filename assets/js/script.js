//array for storing/saving scores
var scoresArray = [];
var pageLocation = "";
var timeLeft = "";

var mainBody = document.querySelector("#mainBody");
var navSection = document.querySelector("#pageNav");
var timerCount = document.querySelector("#timer");

initialLoad();
//loads scores and preQuiz screen
function initialLoad()
{
    setNav();
    loadScores();
}

function setNav()
{
    navSection.innerHTML = "";
    timerCount.innerHTML = "";
    var navBar = document.createElement("div");
    var timerArea = document.createElement("div");
    timerArea.innerHTML = "";

    navBar.className = "buttonNav";

    if (pageLocation === "" || pageLocation === "Scores")
    {
        pageLocation = "Home";
        navBar.id = "scoresNav";
        navBar.innerHTML = `<button type="click">Scores</button>`
        mainBodyPreQuiz();
    } else
    {
        mainBody.innerHTML = "";
        pageLocation = "Scores";
        navBar.id = "homeNav";
        navBar.innerHTML = `<button type="click">Home</button>`
    }
    navSection.appendChild(navBar);
    timerCount.appendChild(timerArea);
}

//generates the main body
function mainBodyPreQuiz()
{

    var preQuiz = document.createElement("div");
    preQuiz.className = "preQuiz";
    preQuiz.innerHTML = `<p>Click the button below to begin</p><button type="click">Start!</button>`;
    mainBody.appendChild(preQuiz);
}

function startQuiz()
{
    startCountDown(30);
}

//countdown timer
function startCountDown(remainingTime)
{
    timeLeft = remainingTime;
    var timerArea = document.createElement("div");
    timerArea.innerHTML = "";
    timerCount.appendChild(timerArea);

    var t = setInterval(function ()
    {
        timerArea.innerHTML =`<p>Time Left: ${timeLeft}</p>`;
        timerCount.appendChild(timerArea);
    }, 1000);
    
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
    var newDateTime = new Date();
    var newScore = {
        DateTime: `${newDateTime.getMonth}-${newDateTime.getDate}-${newDateTime.getFullYear}  ${newDateTime.getHours}:${newDateTime.getMinutes}`,
        Name: "Save score Name",
        Score: 'Some score'
    }

    scoresArray.push(newScore);
    localStorage.setItem("scores", JSON.stringify(scoresArray));
}

function showScores(scoresArray)
{

}

//button even handlers
mainBody.addEventListener("click", startQuiz);
navSection.addEventListener("click", setNav);