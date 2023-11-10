class Ball extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, spriteTag){
        
        super(scene, positionX, positionY, spriteTag);
        scene.physics.add.existing(this);
        this.body.setBounce(1, 1);
        this.body.collideWorldBounds = true;

        this.Start();
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

    /*
    UpdatePositionX(positionX)
    {
        console.log("func param: " + positionX);
        this.positionX = positionX;
        console.log("Updated position x " + this.positionX);
    }
    */
}