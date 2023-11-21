class EndScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'EndScene'});
        this.lightGrey = '#B9B9B7'
        this.darkYellow = '#D7AF29'
    }

    preload()
    {
        this.load.setPath('assets/img/backgrounds');
        this.load.image('bg_tile','end_background_tile.png');
    }

    create()
    {
        this.bg = this.add.tileSprite
        (0,0,config.width,config.height,'bg_tile').setOrigin(0);

        this.rankingTitleText = this.add.text(config.width/2, 20, 'BEST 5 RANKING', {
            fontFamily: 'RoundBold',
            fill: this.lightGrey
        })
        .setOrigin(0.5)
        .setFontSize(24);

        /*
        this.playerScoreTitle = this.add.text(37, 60, 'Your score: ', {
            fontFamily: 'zekton',
        }).setFontSize(11);

        this.score = this.scene.get('gameState').score;
        this.playerScoreValue = this.add.text(config.width/2, 80, this.score, {
            fontFamily: 'zekton',
            fill: '#8282BA'
        }).setFontSize(11)
        .setOrigin(0.5);

        this.scoreArray = []
        this.sortScores(this.scoreArray, this.highscoreArray);
        //this.highscoresToJson(scoreArray);
        
        for(var i = 0; i < this.scoreArray.length; i++)
        {
            this.add.text
            (config.width/2, 125 + i * 10, this.scoreArray[i], {
                fontFamily: 'zekton',
            }).setFontSize(11)
            .setOrigin(0.5);
        }
        */

        //Button
        this.playAgainButton = this.add.text(config.width/2, 215, 'PLAY AGAIN', {
            fontFamily: 'RoundBold',
            fill: this.lightGrey
        })
        .setOrigin(0.5)
        .setFontSize(16)
        .setInteractive()
        .on('pointerdown', () => this.enterButtonClickState())
        .on('pointerover', () => this.enterButtonHoverState())
        .on('pointerout', () => this.enterButtonRestState() );
    }
    
    update()
    {
        //Update stuff
    }



    ////////////////////////////
    //Non-inherited functions //
    ////////////////////////////

    sortScores(scoreArray,array)
    {
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

    enterButtonClickState()
    {
        this.fadeOutText();

        this.time.addEvent
        (
            {
                delay: 350,
                callback: this.changeScene,
                callbackScope: this,
                loop: false
            }
            
        )
    }

    enterButtonHoverState()
    {
        this.playAgainButton.setStyle({ fill: this.darkYellow});
    }

    enterButtonRestState()
    {
        this.playAgainButton.setStyle({ fill: this.lightGrey });
    }

    fadeOutText()
    {
        this.tweens.add({
            targets: [this.bg, this.rankingTitleText, this.playAgainButton],
            alpha: 0,
            duration: 300,
            ease: 'Power2'
          }, this);
    }

    changeScene()
    {
        //this.scoreArray.push(this.score);
        //console.log(this.scoreArray);
        //this.saveToLocalStorage(this.scoreArray);
        this.scene.start('TestLevel');
    }

    
}

function compareNumbers(a, b) {
    return b - a;
  }