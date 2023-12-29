class ConeObject extends Object
{
    constructor(scene, positionX, positionY, ballPool, pad, blockPool, walls, animation, spriteTag)
    {
        super(scene, positionX, positionY, ballPool, pad, blockPool, walls, animation, spriteTag)
        scene.add.existing(this);
    }

    ObjectAction(object, ball)
    {
        this._pad.UpdateScore(100)
        ball.MultiplyVelocity(1.3)
        ball.RandomVelocity()
        super.ObjectAction()
    }
}