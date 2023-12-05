class HighscoreScene extends Phaser.Scene
{
    constructor(_key)
    {
        super({key: _key});
        this.lightGrey = '#B9B9B7'
        this.darkYellow = '#D7AF29'
        this.lightYellow = '#EADA81'
    }

    preload()
    {
        this.getHighscoresFromLocalStorage();
        this.load.setPath('assets/img/backgrounds');
        this.load.image('bg_tile','end_background_tile.png');
    }

    create()
    {
        this.bg = this.add.tileSprite
        (0,0,config.width,config.height,'bg_tile').setOrigin(0).setScale(2);

        this.rankingTitleText = this.add.text(config.width / 2, 50, 'BEST 5 RANKING', {
            fontFamily: 'RoundBold',
            fill: this.lightGrey
        })
        .setOrigin(0.5)
        .setFontSize(48);  
        
        this.addScoreTexts();
    }
    
    update()
    {
        //Update stuff
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

    addScoreTexts()
    {
        this.scoreArray = []
        this.sortScores(this.scoreArray, this.highscoreArray);
        
        this.scoreNumberTexts = [];
        for(var i = 0; i < this.scoreArray.length; i++)
        {
            this.scoreNumberTexts[i] = this.add.text
            (config.width/2, 125 + i * 30, this.scoreArray[i], {
                fontFamily: 'RoundBold',
                fill: this.lightYellow
            }).setFontSize(32)
            .setOrigin(0.5);
        }
    }

    sortScores(scoreArray,array)
    {
        console.log(array);
        for(var i = 0; i < array.length; i++)
        {
            scoreArray.push(array[i])
            console.log(scoreArray[i]);
        }

        scoreArray.sort(compareNumbers);
        console.log('sorted');
        for(var i = 0; i < scoreArray.length; i++)
        {
            console.log(scoreArray[i]);
        }

        scoreArray.length = 10;
    }

    saveToLocalStorage(array)
    {   
        localStorage.setItem('highscores', JSON.stringify(array));
    }

    fadeOutText()
    {
        this.tweens.add({
            targets: [this.bg, this.rankingTitleText, this.playerScoreTitle, this.playAgainButton, this.scoreNumberTexts],
            alpha: 0,
            duration: 300,
            ease: 'Power2'
          }, this);

          for(var i = 0; i < this.scoreNumberTexts.length; i++)
          {
            this.tweens.add({
                targets: [this.scoreNumberTexts[i]],
                alpha: 0,
                duration: 300,
                ease: 'Power2'
              }, this);
          }
    }

    pushToScoreArrayAndSave(_newValue)
    {
        this.scoreArray.push(_newValue);
        console.log(this.scoreArray);
        this.saveToLocalStorage(this.scoreArray);
    }

    changeScene(_nextScene)
    {
        this.scene.start(_nextScene);
    }
    
}

function compareNumbers(a, b) {
    return b - a;
  }