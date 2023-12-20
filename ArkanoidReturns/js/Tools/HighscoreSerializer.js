class HighscoreSerializer
{
    constructor()
    {
        this.highscoreArray = [];
        this.scoreArray = [];
    }

    getHighscoresFromLocalStorage()
    {
        for(let i = 0; i <= localStorage.getItem("ScoreTableLength"); i++){
            this.highscoreArray[i] = localStorage.getItem("score" + i)
        }
        
        this.highscoreArray.sort(compareNumbers)

        this.highscoreArray.length = 5;
    }

    sortScores()
    {
        this.scoreArray = [];

        for(var i = 0; i < this.highscoreArray.length; i++)
        {
            this.scoreArray.push(this.highscoreArray[i])
        }

        this.scoreArray.sort(compareNumbers);

        this.scoreArray.length = 5;
    }

    getSortedHighscores()
    {
        this.getHighscoresFromLocalStorage();
    }

    getHighestScore()
    {
        this.getHighscoresFromLocalStorage();
        return this.highscoreArray[0];
    }

    saveToLocalStorage(array)
    {   
        localStorage.setItem('highscores', JSON.stringify(array));
    }

    pushToScoreArrayAndSave(_newValue)
    {       
        if(!localStorage.hasOwnProperty("ScoreTableLength"))
        {
            localStorage.setItem("ScoreTableLength", 0);
        }
        else
        {
            localStorage.setItem("ScoreTableLength", parseInt(localStorage.getItem("ScoreTableLength")) + 1);
        }
        var scoreId = "score" + localStorage.getItem("ScoreTableLength");

        localStorage.setItem(scoreId, _newValue)
    }
}

function compareNumbers(a, b) {
    return b - a;
  }

const highscoreSerializerInstance = new HighscoreSerializer();
