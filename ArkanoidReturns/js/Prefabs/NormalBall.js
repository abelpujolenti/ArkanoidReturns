class NormalBall extends Ball
{
    constructor(scene, positionX, positionY, pad, walls, ballsCounter, ballHitWallsSound)
    {
        super(scene, positionX, positionY, pad, walls, ballHitWallsSound, "normalBall");
        scene.add.existing(this);

        this._ballsCounter = ballsCounter

        this.scene.UpdateBallsCounter(1);

        this.idle = true;
    }        

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta); 

        if(this.idle)
        {
            this.ResetPosition(this._pad.x, this._pad.getTopCenter().y);
        }
        else if(this.getTopCenter().y > config.height)
        {
            if(this._ballsCounter > 1)        
            {
                this.scene.UpdateBallsCounter(-1);
                this.active = false;
                return;
            }
            this._pad.DecrementLives();
            this.scene.UpdateLivesUI();            
            this.body.setVelocity(0, 0);
            this.idle = true;
            this.scene.ball = this;
        }
    }    

    ModifyBallsCounter(number)
    {
        this._ballsCounter += number;
    }

    SetColliders()
    {
        super.SetColliders()        

        this._scene.physics.add.collider
        (
            this,
            this._pad,
            this._pad.ApplyBounce,
            null,
            this._pad
        );
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