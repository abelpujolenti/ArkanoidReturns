class HighscoreScene extends Phaser.Scene
{
    constructor(_key)
    {
        super({key: _key});
        this.lightGrey = '#B9B9B7'
        this.darkYellow = '#D7AF29'
        this.lightYellow = '#EADA81'
        this.orange = '#D24E01'

        this.lightGreyHex = 0xB9B9B7;
        this.darkGreyHex = 0x6B6660;
        this.darkYellowHex = 0xD7AF29;
        this.lightYellowHex = 0xEADA81;
        this.orangeHex = 0xD24E01;
    }

    preload()
    {
        highscoreReaderInstance.getHighscoresFromLocalStorage();
        this.load.setPath('assets/img/backgrounds');
        this.load.image('bg_tile','end_background_tile.png');
    }

    create()
    {
        this.bg = this.add.tileSprite
        (0,0,config.width,config.height,'bg_tile').setOrigin(0).setScale(2);

        this.rankingTitleText = this.add.bitmapText(
            config.width / 2,
            25,
            "arkanoidFont",
            "BEST 5 RANKING",
            36
        ).setOrigin(0.5)
        .setTint(this.lightGreyHex, this.lightGreyHex, this.darkGreyHex, this.darkGreyHex);
        
        this.addScoreTexts();
    }
    
    update()
    {
        //Update stuff
    }

    addScoreTexts()
    {
        this.scoreArray = []
        highscoreReaderInstance.sortScores(this.scoreArray, this.highscoreArray);
        
        this.scoreNumberTexts = [];
        for(var i = 0; i < highscoreReaderInstance.scoreArray.length; i++)
        {
            this.scoreNumberTexts[i] = this.add.bitmapText(
                config.width / 2,
                105 + i * 30,
                "arkanoidFont",
                highscoreReaderInstance.scoreArray[i],
                24
            ).setOrigin(0.5)
            .setTint(this.lightYellowHex, this.lightYellowHex, this.orangeHex, this.orangeHex);
        }
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
        highscoreReaderInstance.scoreArray.push(_newValue);
        console.log(highscoreReaderInstance.scoreArray);
        this.saveToLocalStorage(highscoreReaderInstance.scoreArray);
    }

    changeScene(_nextScene)
    {
        this.scene.start(_nextScene);
    }
    
}