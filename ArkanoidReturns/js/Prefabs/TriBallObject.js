class TriBallObject extends LevelObject
{
    constructor(scene, positionX, positionY, ballPool, pad, blockPool, walls, explosionSound, ballHitWallsSound, animation, spriteTag)
    {
        super(scene, positionX, positionY, ballPool, pad, blockPool, walls, explosionSound, animation, spriteTag)
        scene.add.existing(this);

        this._ballHitWallsSound = ballHitWallsSound
        this._explosionSound = explosionSound
    }

    ObjectAction(object, ball)
    {
        this._pad.UpdateScore(100)
        this.SpawnTriball()
        super.ObjectAction()
    }

    SpawnTriball(){
        this._scene._ballPool.add(new ExplosiveBall(this._scene, this.x, this.y, this._ballPool, this._pad, this._walls, this._ballHitWallsSound, this._explosionSound, "greenBall"))
        this._scene._ballPool.add(new ExplosiveBall(this._scene, this.x, this.y, this._ballPool, this._pad, this._walls, this._ballHitWallsSound, this._explosionSound, "redBall"))
        this._scene._ballPool.add(new ExplosiveBall(this._scene, this.x, this.y, this._ballPool, this._pad, this._walls, this._ballHitWallsSound, this._explosionSound, "blueBall"))
    }
}