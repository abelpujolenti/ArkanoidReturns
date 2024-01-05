class EndScene extends HighscoreScene
{
    constructor()
    {
        super('EndScene');
    }

    init(data)
    {
        this.score = data.score;
        this.round = data.round;
        highscoreSerializerInstance.pushToScoreArrayAndSave(this.score)
    }

    preload()
    {
        super.preload();
    }

    create()
    {
        super.create();

        this.playerScoreTitle = this.add.bitmapText(
            config.width / 2, 
            config.height - 170,
            "arkanoidFont",
            "YOUR SCORE: " + this.score,
            24
        ).setOrigin(0.5)
        .setTint(this.lightGreyHex, this.lightGreyHex, this.darkGreyHex, this.darkGreyHex);

        this.roundScoreTitle = this.add.bitmapText(
            config.width / 2, 
            config.height - 120,
            "arkanoidFont",
            "ROUND: " + this.round,
            24
        ).setOrigin(0.5)
        .setTint(this.lightGreyHex, this.lightGreyHex, this.darkGreyHex, this.darkGreyHex);

        /*this.playAgainButton = this.add.bitmapText(
            config.width / 2,
            config.height - 68,
            "arkanoidFont",
            "PLAY AGAIN",
            24
        ).setOrigin(0.5)
        .setTint(this.lightGreyHex, this.lightGreyHex, this.darkGreyHex, this.darkGreyHex)

        var buttonBounds = this.playAgainButton.getBounds();

        var debug = this.add.graphics();

        debug.lineStyle(1, 0x00ff00);
        debug.strokeRect(buttonBounds.x, buttonBounds.y, buttonBounds.width, buttonBounds.height);*/

        //Button
        this.playAgainButton = this.add.text(config.width/2, config.height - 50, 'PLAY AGAIN', {
            fontFamily: 'RoundBold',
            fill: this.lightGrey,
        })
        .setOrigin(0.5)
        .setFontSize(32)
        .setInteractive()
        .on('pointerdown', () => this.enterButtonClickState())
        .on('pointerover', () => this.enterButtonHoverState())
        .on('pointerout', () => this.enterButtonRestState());

        /*var buttonBounds = this.playAgainButton.getBounds();

        var debug = this.add.graphics();

        debug.lineStyle(1, 0x00ff00);
        debug.strokeRect(buttonBounds.x, buttonBounds.y, buttonBounds.width, buttonBounds.height);*/
    }
    
    update()
    {
        //Update stuff
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
        super.fadeOutText();

        this.tweens.add({
            targets: [this.playAgainButton, this.roundScoreTitle],
            alpha: 0,
            duration: 300,
            ease: 'Power2'
          }, this);
    }

    changeScene()
    {
        highscoreSerializerInstance.pushToScoreArrayAndSave(this.score);

        if(this.round < gamePrefs.NUM_LEVELS)
            super.changeScene('Level');
        else
            this.scene.start('Level', {level: 1, score: 0})
    }
}