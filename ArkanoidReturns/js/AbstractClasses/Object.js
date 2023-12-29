class Object extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, ballPool, pad, animation, spriteTag){
                
        super(scene, positionX, positionY, spriteTag)
        .setScale(0.7);
        scene.physics.add.existing(this);
        this._scene = scene;
        this._ballPool = ballPool;
        this._pad = pad;

        this.SetColliders()

        this.anims.play(animation)
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);
    }

    SetColliders()
    {
        this._scene.physics.add.overlap(this, this._ballPool, this.ObjectAction, null, this)
    }

    ObjectAction(object, ball){
        this.destroy()
    }
}