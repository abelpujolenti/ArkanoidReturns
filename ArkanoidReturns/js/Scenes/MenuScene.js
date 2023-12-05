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

        this.createButtons();
        
    }

    update()
    {
       
    }

    //Non-inherited functions
    createButtons()
    {
        //Play
        this.playButton = this.add.text(config.width/2, config.height / 2 + 75, 'PLAY', {
            fontFamily: 'ARCADEPI',
            fill: this.defaultColor
        })
        .setFontSize(32)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.playButtonClickState())
        .on('pointerover', () => this.playButtonHoverState())
        .on('pointerout', () => this.playButtonRestState() );

        //Ranking
        this.rankingButton = this.add.text(config.width/2, config.height / 2 + 120, 'RANKING', {
            fontFamily: 'ARCADEPI',
            fill: this.defaultColor
        })
        .setFontSize(32)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.rankingButtonClickState())
        .on('pointerover', () => this.rankingButtonHoverState())
        .on('pointerout', () => this.rankingButtonRestState() );
    }

    playButtonClickState()
    {
        this.fadeOutText();

        this.time.addEvent
        (
            {
                delay: 350,
                callback: this.changeScene('TestLevel'),
                callbackScope: this,
                loop: false
            }
            
        )
    }

    playButtonHoverState()
    {
        this.playButton.setStyle({ fill: this.hoverColor});
    }

    playButtonRestState()
    {
        this.playButton.setStyle({ fill: this.defaultColor });
    }

    rankingButtonClickState()
    {
        this.fadeOutText();

        this.time.addEvent
        (
            {
                delay: 350,
                callback: this.changeScene('RankingScene'),
                callbackScope: this,
                loop: false
            }
            
        )
    }

    rankingButtonHoverState()
    {
        this.rankingButton.setStyle({ fill: this.hoverColor});
    }

    rankingButtonRestState()
    {
        this.rankingButton.setStyle({ fill: this.defaultColor });
    }

    
    fadeOutText()
    {
        this.tweens.add({
            targets: [this.bg, this.playButton, this.rankingButton],
            alpha: 0,
            duration: 300,
            ease: 'Power2'
          }, this);
    }

    changeScene(_nextScene)
    {
        this.scene.start(_nextScene);
    }
}