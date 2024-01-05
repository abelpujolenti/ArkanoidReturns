class OpeningVerticalPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag, _animTag){
        
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.offset.x = -2;
        
        this.scene = _scene;

        this.SetColliders();

        if(_animTag != null)
        {
            this.anims.play(_animTag);
        }
    }

    SetColliders()
    {
        //this.scene.physics.add.collider(this, this.player);

        this.scene.physics.add.collider
        (
            this,
            this.scene.pad,
            this.scene.CrossOpening,
            null,
            this.scene
        );
    }

    ChangeAndPlayAnim(_newAnimTag)
    {
        this.anims.play(_newAnimTag)
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta); 
    }
}