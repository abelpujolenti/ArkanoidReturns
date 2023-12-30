class LevelObject extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, ballPool, pad, blockPool, walls, explosionSound, animation, spriteTag){

        super(scene, positionX, positionY, spriteTag).setScale(0.7);
        scene.physics.add.existing(this);
        this.body.setBounce(1, 1);
        this._scene = scene;
        this._ballPool = ballPool;
        this._pad = pad;
        this._blockPool = blockPool
        this._walls = walls
        this._explosionSound = explosionSound

        this.CalculateNewPosition()

        this.SetColliders()

        this.RandomVelocity()

        this.randomVelocityTimer = this._scene.time.addEvent(
            {
                delay: 5000,
                callback: this.RandomVelocity,
                callbackScope: this,
                loop: true
            }
        )

        this.anims.play(animation)
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        if(this.y > gamePrefs.OBJECT_CONTAINER_MAX_Y_COORDINATE && this.body.velocity.y > 0)
        {
            var velocity = this.body.velocity
            this.body.setVelocity(velocity.x, velocity.y * -1)
        }
    }

    CalculateNewPosition()
    {
        var positionX = 
            Math.random() * (gamePrefs.OBJECT_CONTAINER_MAX_X_COORDINATE - gamePrefs.OBJECT_CONTAINER_MIN_X_COORDINATE) + gamePrefs.OBJECT_CONTAINER_MIN_X_COORDINATE

        this.x = positionX
        this.y = gamePrefs.OBJECT_CONTAINER_MIN_Y_COORDINATE
    }

    RandomVelocity(){

        var speed = gamePrefs.OBJECT_SPEED

        var randomVectorX = Math.random() * (1 - (-1)) + (-1)
        var randomVectorY = Math.random() * (1 - (-1)) + (-1)

        var randomVector = new Phaser.Math.Vector2(randomVectorX, randomVectorY)

        var randomVelocityNormalized = randomVector.normalize()

        var randomVelocity = new Phaser.Math.Vector2(randomVelocityNormalized.x * speed, randomVelocityNormalized.y * speed)

        this.body.setVelocity(randomVelocity.x, randomVelocity.y)
    }

    SetColliders()
    {
        this._scene.physics.add.overlap(this, this._ballPool, this.ObjectAction, null, this)
        this._scene.physics.add.collider(this, this._blockPool)
        this._scene.physics.add.collider(this, this._walls)
    }

    ObjectAction(object, ball){
        this._explosionSound.play()
        this._scene.time.removeEvent(this.randomVelocityTimer)
        this.destroy()
    }
}