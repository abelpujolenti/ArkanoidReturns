class TestLevel extends Phaser.Scene
{
    constructor()
    {
        super({key:"TestLevel"});
    }

    preload()
    {
        this.load.setPath("assets/img");
        this.load.image("normalBall", "bird.png");
    }

    create()
    {
        this.cameras.main.setBackgroundColor("003");
        this.ball = new NormalBall(this, config.width / 2, config.height / 2);
        

        /*this.time.addEvent
        (
            {
                delay: 1000,
                callback: this.ball.ChangeVelocity,
                args: [1.5],
                callbackScope: this.ball,
                loop: true
            }
        )*/
    }
}