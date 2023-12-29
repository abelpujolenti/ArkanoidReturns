class LaserPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY, _duration, _pad, _score)
    {
        super(_scene,_posX,_posY,"laser");

        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        
        this.blockColliders = []
        this.scene = _scene;
        this.score = _score;
        this.pad = _pad;
        this.duration = _duration;

        this.anims.play("laserAnim");

        this.scale = 6;
        this.setOrigin(0.5, 1);

        this.scene.time.removeEvent(this.scene.laserTimer)

        this.scene.laserTimer = this.scene.time.addEvent(
            {
               delay: this.duration,
               callback: this.deActivate,
               callbackScope: this
            }
        )

        this.SetColliders();
    }

    SetColliders()
    {
        for (var i = 0; i < this.scene.blocks.length; i++) {
            this.scene.physics.add.collider
            (
                this,
                this.scene.blocks[i],
                this.HitBlock,
                null,
                this
            );
        }
    }

    HitBlock(lmao, block) {
        this.blockColliders[this.blockColliders.length] = block;
    }

    damage() {}

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.x = this.pad.x
        if (this.blockColliders.length > 0) {
            this.CollidersUpdate();
        }
    }

    CollidersUpdate() {
        var lowest = 0;
        for (var i = 0; i < this.blockColliders.length; i++) {
            if (this.blockColliders[i].y > this.blockColliders[lowest].y) {
                lowest = i;
            }
        }
        var lowestY = this.blockColliders[lowest].y;
        //this.blockColliders[lowest].damage();

        var y = ((lowestY - 80.0) / 20.0) / 25.0;
        console.log(y);

        this.setCrop(0, 88.0 * y, this.displayWidth, this.displayHeight)

        this.blockColliders = [];
    }

    deActivate() {
        this.scene.physics.world.disable(this);
        this.setActive(false);
        this.destroy();
    }
}