class OpeningVerticalPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag, _animTag){
        
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        
        this.scene = _scene;
        this.player = _scene.player;

        this.SetColliders();

        if(_animTag != null)
        {
            this.anims.play(_animTag);
        }
    }

    SetColliders()
    {
        //this.scene.physics.add.collider(this, this.walls);
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta); 
    }
}