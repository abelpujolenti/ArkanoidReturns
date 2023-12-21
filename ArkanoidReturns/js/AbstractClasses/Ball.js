class Ball extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, pad, walls, ballsCounter, spriteTag){
        
        super(scene, positionX, positionY, spriteTag);
        scene.physics.add.existing(this);
        this._scene = scene;
        this.body.setBounce(1, 1);
        this._ballsCounter = ballsCounter;
        this._walls = walls;
        this._pad = pad;

        this.scene.UpdateBallsCounter(1);

        this.SetColliders();
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
                return;
            }
            this._pad.DecrementLives();
            this.scene.UpdateLivesUI();            
            this.body.setVelocity(0, 0);
            this.idle = true;
        }
    }

    SetColliders()
    {
        this._scene.physics.add.collider(this, this._walls)

        this._scene.physics.add.collider
        (
            this,
            this._pad,
            this._pad.ApplyBounce,
            null,
            this._pad
        );
    }

    ChangeVelocity(velocityMultiplier)
    {   
        var velocity = this.body.velocity;
        this.velocityX = velocity.x * velocityMultiplier;
        this.velocityY = velocity.y * velocityMultiplier;        

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