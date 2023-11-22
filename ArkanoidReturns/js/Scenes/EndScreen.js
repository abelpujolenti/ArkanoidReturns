class EndScreen extends Phaser.Scene
{
    
    constructor()
    {
        super({key:"GameOver"});
    }

    init(data)
    {
        this.score = data.score;
    }

}