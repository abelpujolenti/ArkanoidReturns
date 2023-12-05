class MenuScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'MenuScene'});
        this.defaultColor = '#2E29D6'
        this.hoverColor = '#D632DC'
    }

    preload()
    {
        //Load assets in memory
        this.load.setPath('assets/img/backgrounds');
        this.load.image('bg','menu_background.png');
       
        //Button
    }

    create()
    {
        //Show assets on screen
        this.bg = this.add.image(0,0,'bg').setOrigin(0).setScale(2.5);

        //Button
        this.playButton = this.add.text(config.width/2, config.height / 2 + 100, 'PLAY', {
            fontFamily: 'ARCADEPI',
            fill: this.defaultColor
        })
        .setFontSize(32)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.enterButtonClickState())
        .on('pointerover', () => this.enterButtonHoverState())
        .on('pointerout', () => this.enterButtonRestState() );
    }

    update()
    {
       
    }

    //Non-inherited functions
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
        this.playButton.setStyle({ fill: this.hoverColor});
    }

    enterButtonRestState()
    {
        this.playButton.setStyle({ fill: this.defaultColor });
    }

    
    fadeOutText()
    {
        this.tweens.add({
            targets: [this.bg, this.playButton],
            alpha: 0,
            duration: 300,
            ease: 'Power2'
          }, this);
    }

    changeScene()
    {
        this.scene.start('TestLevel');
    }
}