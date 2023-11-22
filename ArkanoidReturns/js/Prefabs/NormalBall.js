class NormalBall extends Ball
{
    constructor(scene, positionX, positionY, pad, ballsCounter)
    {
        super(scene, positionX, positionY, pad, ballsCounter, "normalBall");
        scene.add.existing(this);

        this.idle = true;
    }    

    StartMoving()
    {
        this.idle = false;

        this.velocityX = Math.random() * (gamePrefs.INITIAL_NORMAL_BALL_MAX_VELOCITY_X - (gamePrefs.INITIAL_NORMAL_BALL_MIN_VELOCITY_X))
        + (gamePrefs.INITIAL_NORMAL_BALL_MIN_VELOCITY_X);
        this.velocityY = gamePrefs.INITIAL_NORMAL_BALL_VELOCITY_Y;

        this.normalizedVelocity = Math.sqrt(Math.pow(this.velocityX, 2) + Math.pow(this.velocityY, 2));

        this.normalizedVelocity /= gamePrefs.BALL_SPEED;

        this.velocityX /= this.normalizedVelocity;
        this.velocityY /= this.normalizedVelocity;

        this.body.setVelocity(this.velocityX, this.velocityY);
    }

    UpdateVelocityX(_velocityX)
    {
        this.body.setVelocity(_velocityX, 0);
    }

    ResetPosition(_positionX, _positionY)
    {
        this.body.setVelocity(0, 0);
        this.setPosition(_positionX, _positionY);
        Phaser.Display.Bounds.SetBottom(this, _positionY);
    }

    Reset(_positionX, _positionY)
    {
        this.idle = true;
        this.body.setVelocity(0, 0);
        this.setPosition(_positionX, _positionY);
    }

}