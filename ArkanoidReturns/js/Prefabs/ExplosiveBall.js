class ExplosiveBall extends Ball
{
    constructor(scene, positionX, positionY, ballPool, pad, walls, ballHitWallsSound, explosionSound, spriteTag)
    {
        super(scene, positionX, positionY, pad, walls, ballHitWallsSound, spriteTag);
        scene.add.existing(this).setScale(0.6);
        this._ballPool = ballPool
        this._explosionSound = explosionSound

        this.RandomVelocity()
    }

    SetColliders(){

        super.SetColliders()

        this._scene.time.addEvent(
            {
                delay: 500,
                callback: this.EnableColliders,
                callbackScope: this
            }
        )        
        
    }

    EnableColliders(){
        this._scene.physics.add.overlap(this, this._ballPool, this.Explode, null, this)
        this._scene.physics.add.overlap(this, this._pad, this.Explode, null, this)
    }

    Explode(){
        this._explosionSound.play()
        this._pad.UpdateScore(100)
        this.destroy()
    }
}