class NormalBall extends Ball
{
    constructor(scene, positionX, positionY)
    {
        super(scene, positionX, positionY, "normalBall");
        scene.add.existing(this);

        this.idle = true;
    }    

    Start(){

        
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);
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

    UpdatePositionX(_positionX)
    {
        this.body.setVelocity(0, 0);
        this.setPosition(_positionX, gamePrefs.INITIAL_NORMAL_BALL_POSITION_Y);
    }

    Reset(_positionX, _positionY)
    {
        this.idle = true;
        this.body.setVelocity(0, 0);
        this.setPosition(_positionX, _positionY);
    }

}