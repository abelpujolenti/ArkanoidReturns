class Ball extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, spriteTag, pad, ballsCounter){
        
        super(scene, positionX, positionY, spriteTag);
        scene.physics.add.existing(this);
        this._scene = scene;
        this.body.setBounce(1, 1);
        this.body.collideWorldBounds = true;
        this._ballsCounter = ballsCounter;
        this._pad = pad;
        console.log(pad)

        this.scene.UpdateBallsCounter(1);

        this.SetColliders();
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta); 

        /*if(this.idle)
        {
            this.UpdatePositionX(this._pad.getBottomCenter.x);
        }
        else if(this.getTopCenter().y > config.height)
        {    
            if(_ballsCounter > 1)        
            {
                return;
            }
            this._pad.DecrementLives();
            this.scene.UpdateLivesUI();
            
            this._pad.Reset(gamePrefs.INITIAL_PAD_POSITION_X, gamePrefs.INITIAL_PAD_POSITION_Y);
            this.Reset(gamePrefs.INITIAL_NORMAL_BALL_POSITION_X, gamePrefs.INITIAL_NORMAL_BALL_POSITION_Y);
        }*/
    }

    SetColliders()
    {
        /*this._scene.physics.add.collider
        (
            this,
            this._pad,
            this._pad.ApplyBounce,
            null,
            this._pad
        );*/
    }

    ChangeVelocity(velocityMultiplier)
    {        
        var velocity = this.body.velocity;
        this.velocityX = velocity.x * velocityMultiplier;
        this.velocityY = velocity.y * velocityMultiplier;        

        this.body.setVelocity(this.velocityX, this.velocityY);
    }

    ChangeVelocity(velocityMultiplierX, velocityMultiplierY)
    {
        var velocity = this.body.velocity;
        this.velocityX = velocity.x * velocityMultiplierX;
        this.velocityY = velocity.y * velocityMultiplierY;        

        this.body.setVelocity(this.velocityX, this.velocityY);
    }

    ModifyBallsCounter(number)
    {
        this._ballsCounter += number;
        console.log(this._ballsCounter)
    }

    /*
    UpdatePositionX(positionX)
    {
        console.log("func param: " + positionX);
        this.positionX = positionX;
        console.log("Updated position x " + this.positionX);
    }
    */
}