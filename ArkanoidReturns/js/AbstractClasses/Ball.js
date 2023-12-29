class Ball extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, pad, walls, spriteTag){
        
        super(scene, positionX, positionY, spriteTag);
        scene.physics.add.existing(this);
        this._scene = scene;
        this.body.setBounce(1, 1);
        this._walls = walls;
        this._pad = pad;

        this.SetColliders();
    }

    SetColliders()
    {
        this._scene.physics.add.collider(this, this._walls)
    }

    MultiplyVelocity(velocityMultiplier)
    {   
        var velocity = this.body.velocity;
        this.velocityX = velocity.x * velocityMultiplier;
        this.velocityY = velocity.y * velocityMultiplier;        

        this.body.setVelocity(this.velocityX, this.velocityY);
    }

    SetVelocity(velocityX, velocityY){
        this.body.setVelocity(velocityX, velocityY)
    }    

    RandomVelocity(){

        var speed = this.body.speed

        if(speed == 0){
            speed = gamePrefs.BALL_SPEED
        }

        var randomVectorX = Math.random() * (1 - (-1)) + (-1)
        var randomVectorY = Math.random() * (1 - (-1)) + (-1)

        var randomVector = new Phaser.Math.Vector2(randomVectorX, randomVectorY)

        var randomVelocityNormalized = randomVector.normalize()

        var randomVelocity = new Phaser.Math.Vector2(randomVelocityNormalized.x * speed, randomVelocityNormalized.y * speed)

        this.SetVelocity(randomVelocity.x, randomVelocity.y)
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