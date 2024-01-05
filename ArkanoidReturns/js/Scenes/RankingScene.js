class RankingScene extends HighscoreScene
{
    constructor()
    {
        super('RankingScene')
    }

    preload()
    {
        super.preload();
    }

    create()
    {
        super.create();
        
        //Button
        this.backToMenuButton = this.add.text(config.width/2, config.height - 50, 'BACK TO MENU', {
            fontFamily: 'RoundBold',
            fill: this.lightGrey
        })
        .setOrigin(0.5)
        .setFontSize(32)
        .setInteractive()
        .on('pointerdown', () => this.enterButtonClickState())
        .on('pointerover', () => this.enterButtonHoverState())
        .on('pointerout', () => this.enterButtonRestState());
    
        this.clickSound = this.sound.add("click");
    }
    
    update()
    {
        //Update stuff
    }

    enterButtonClickState()
    {
        this.clickSound.play();
        
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
        this.backToMenuButton.setStyle({ fill: this.darkYellow});
    }

    enterButtonRestState()
    {
        this.backToMenuButton.setStyle({ fill: this.lightGrey });
    }

    fadeOutText()
    {
        super.fadeOutText();

        this.tweens.add({
            targets: [this.backToMenuButton],
            alpha: 0,
            duration: 300,
            ease: 'Power2'
          }, this);
    }

    changeScene()
    {
        super.changeScene('MenuScene');
    }

    
}