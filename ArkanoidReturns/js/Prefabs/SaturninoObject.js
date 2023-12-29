class SaturninoObject extends Object
{
    constructor(scene, positionX, positionY, ballPool, pad, blockPool, animation, spriteTag)
    {
        super(scene, positionX, positionY, ballPool, pad, animation, spriteTag)
        scene.add.existing(this);

        this._blockPool = blockPool
    }

    ObjectAction(object, ball)
    {
        this._pad.UpdateScore(100)
        new Explosion(this._scene, this.x, this.y, this._blockPool, "explosionAnimation", "explosion").setScale(7)
        super.ObjectAction()
    }
}