//array for storing/saving scores
var scoresArray = [];

loadScores();

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