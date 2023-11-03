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
}