class PowerupPrefab extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY,_spriteTag, _animTag, _ball, _pad, _effect)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        
        _scene.physics.world.enable(this);
        this.pad = _pad;
        this.ball = _ball;
        if (_animTag != null) {
            this.anims.play(_animTag);
        }

        this.effect = _effect

        this.SetColliders();

        this.body.setVelocity(0, gamePrefs.POWERUP_SPEED);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    SetColliders()
    {
        this.scene.physics.add.collider
        (
            this,
            this.pad,
            this.pad.ApplyUpgrade,
            null,
            this.pad
        );
    }

    deActivate() {
        this.setActive(false);
        this.destroy();
    }
}