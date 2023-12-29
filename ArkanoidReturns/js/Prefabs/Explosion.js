class Explosion extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, blockPool, animation, spriteTag)
    {
        super(scene, positionX, positionY, spriteTag)
        scene.add.existing(this)
        scene.physics.world.enable(this);    

        this._scene = scene
        this._blockPool = blockPool

        this.anims.play(animation)

        this.SetColliders()
    }

    SetColliders()
    {
        this._scene.physics.add.overlap(this, this._blockPool, this.ObliterateNearBlocks, null, this)

        this._scene.time.addEvent
        (
            {
                delay: 200,
                callback: this.destroy,
                callbackScope: this
            }
        )
    }

    ObliterateNearBlocks(explosion, block)
    {
        block.break();
    }
}