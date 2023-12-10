class HighscoreSerializer
{
  constructor()
  {
    this.highscoreArray = [];
    this.scoreArray = [];
  }

  getHighscoresFromLocalStorage()
    {
        if(!localStorage.hasOwnProperty('highscores'))
        {
            var emptyArray = [];
            JSON.stringify(emptyArray);
            localStorage.setItem('highscores', emptyArray);
            this.highscoreArray = [];
        }
        else
        {
            this.highscoreArray = JSON.parse(localStorage.getItem('highscores'))
            console.log(this.highscoreArray);
        }
    }

    sortScores()
    {
        this.scoreArray = [];

        console.log(this.highscoreArray);
        for(var i = 0; i < this.highscoreArray.length; i++)
        {
            this.scoreArray.push(this.highscoreArray[i])
            console.log(this.scoreArray[i]);
        }

        this.scoreArray.sort(compareNumbers);
        console.log('sorted');
        for(var i = 0; i < this.scoreArray.length; i++)
        {
            console.log(this.scoreArray[i]);
        }

        this.scoreArray.length = 5;
    }

    getSortedHighscores()
    {
        this.getHighscoresFromLocalStorage();
        this.sortScores();
    }

    getHighestScore()
    {
        this.getHighscoresFromLocalStorage();
        this.sortScores();
        return this.scoreArray[0];
    }

    saveToLocalStorage(array)
    {   
        localStorage.setItem('highscores', JSON.stringify(array));
    }

    pushToScoreArrayAndSave(_newValue)
    {
        this.scoreArray.push(_newValue);
        console.log(this.scoreArray);
        this.saveToLocalStorage(this.scoreArray);
    }
}

function compareNumbers(a, b) {
    return b - a;
  }

const highscoreSerializerInstance = new HighscoreSerializer();
