class EndScene extends HighscoreScene
{
    constructor()
    {
        super('EndScene');
    }

    init(data)
    {
        this.score = data.score;
    }

    preload()
    {
      super.preload();
    }

    create()
    {
        super.create();

        this.playerScoreTitle = this.add.text(config.width / 2, config.height - 100, 'YOUR SCORE: ' + this.score, {
            fontFamily: 'RoundBold',
            fill: '#FFFFFF'
        })
        .setOrigin(0.5)
        .setFontSize(32);

        this.playerScoreTitle.setTint(this.lightGreyHex, this.lightGreyHex, this.darkGreyHex, this.darkGreyHex);

        //Button
        this.playAgainButton = this.add.text(config.width/2, config.height - 50, 'PLAY AGAIN', {
            fontFamily: 'RoundBold',
            fill: this.lightGrey
        })
        .setOrigin(0.5)
        .setFontSize(32)
        .setInteractive()
        .on('pointerdown', () => this.enterButtonClickState())
        .on('pointerover', () => this.enterButtonHoverState())
        .on('pointerout', () => this.enterButtonRestState());
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
            targets: [this.playAgainButton],
            alpha: 0,
            duration: 300,
            ease: 'Power2'
          }, this);
    }

    changeScene()
    {
        super.pushToScoreArrayAndSave(this.score);
        super.changeScene('TestLevel');
    }
}