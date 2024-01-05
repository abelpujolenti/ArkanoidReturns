class CongratsScene extends Phaser.Scene
{
    constructor()
    {
        super('CongratsScene')

        this.defaultColor = '#2E29D6'
        this.hoverColor = '#D632DC'
    }

    init(data)
    {
        this.score = data.score;
        this.round = data.round;
    }

    preload()
    {
        this.load.setPath('assets/img/backgrounds');
        this.load.image('bg_congrats','congrats_background.png');
    }

    create()
    {
        this.bg = this.add.image(0, 0, 'bg_congrats').setOrigin(0).setScale(2.5);
        this.nextButton = this.add.text(config.width/2, config.height / 2 + 200, 'NEXT', {
            fontFamily: 'ARCADEPI',
            fill: this.defaultColor
        })
        .setFontSize(32)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.nextButtonClickState())
        .on('pointerover', () => this.nextButtonHoverState())
        .on('pointerout', () => this.nextButtonRestState() );

    }

    nextButtonClickState()
    {
        this.scene.start("EndScene", {score: this.score, round: this.round})
    }

    nextButtonHoverState()
    {
        this.nextButton.setStyle({ fill: this.hoverColor });
    }

    nextButtonRestState()
    {
        this.nextButton.setStyle({fill: this.defaultColor});
    }
}