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
            fill: this.lightGrey
        })
        .setOrigin(0.5)
        .setFontSize(32);
    }
    
    update()
    {
        //Update stuff
    }
}