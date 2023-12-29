class TriBallObject extends Object
{
    constructor(scene, positionX, positionY, ballPool, pad, walls, animation, spriteTag)
    {
        super(scene, positionX, positionY, ballPool, pad, animation, spriteTag)
        scene.add.existing(this);
        this._walls = walls;
    }

    ObjectAction(object, ball)
    {
        this._pad.UpdateScore(100)
        this.SpawnTriball()
        super.ObjectAction()
    }

    SpawnTriball(){
        this._scene._ballPool.add(new ExplosiveBall(this._scene, this.x, this.y, this._ballPool, this._pad, this._walls, "greenBall"))
        this._scene._ballPool.add(new ExplosiveBall(this._scene, this.x, this.y, this._ballPool, this._pad, this._walls, "redBall"))
        this._scene._ballPool.add(new ExplosiveBall(this._scene, this.x, this.y, this._ballPool, this._pad, this._walls, "blueBall"))
    }
}