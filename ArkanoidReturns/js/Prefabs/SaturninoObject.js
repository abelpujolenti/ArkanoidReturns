class SaturninoObject extends Object
{
    constructor(scene, positionX, positionY, ballPool, pad, blockPool, walls, animation, spriteTag)
    {
        super(scene, positionX, positionY, ballPool, pad, blockPool, walls, animation, spriteTag)
        scene.add.existing(this);
    }

    ObjectAction(object, ball)
    {
        this._pad.UpdateScore(100)
        new Explosion(this._scene, this.x, this.y, this._blockPool, "explosionAnimation", "explosion").setScale(7)
        super.ObjectAction()
    }
}