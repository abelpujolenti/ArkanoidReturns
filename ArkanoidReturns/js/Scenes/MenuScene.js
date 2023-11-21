class MenuScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'MenuScene'});
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
        this.bg = this.add.image(0,0,'bg').setOrigin(0);

        //Button
        this.playButton = this.add.text(config.width/2, 150, 'PLAY', {
            fontFamily: 'retro_stereo_wide',
            fill: '#8282BA'
        })
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
        this.playButton.setStyle({ fill: '#7777ED'});
    }

    enterButtonRestState()
    {
        this.playButton.setStyle({ fill: '#8282BA' });
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