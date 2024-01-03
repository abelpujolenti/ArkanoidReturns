class LaserPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY, _duration, _pad, _score, _laserSound)
    {
        super(_scene,_posX,_posY,"laser");

        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        
        this.blockColliders = []
        this.scene = _scene;
        this.score = _score;
        this.pad = _pad;
        this.duration = _duration;
        this.laserSound = _laserSound;

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

        this.soundTimer = 0;
    }

    SetColliders()
    {
        this.scene.physics.add.collider
        (
            this,
            this.scene._blockPool,
            this.HitBlock,
            null,
            this
        );
    }

    HitBlock(lmao, block) {
        if (Math.abs(block.x - this.x) < 30) {
            this.blockColliders[this.blockColliders.length] = block;
        }
    }

    damage() {}

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.x = this.pad.x
        if (this.blockColliders.length > 0) {
            this.CollidersUpdate();
        }

        this.soundTimer++;
        if (this.soundTimer > 60) {
            this.laserSound.play();
            this.soundTimer = 0;
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
        this.blockColliders[lowest].AddLaserBuildup();

        var y = ((lowestY) / 20.0 - 1.0) / 25.0;

        this.setCrop(0, 87.0 * y, this.displayWidth, this.displayHeight)

        this.blockColliders = [];
    }

    deActivate() {
        this.scene.physics.world.disable(this);
        this.setActive(false);
        this.destroy();
    }
}