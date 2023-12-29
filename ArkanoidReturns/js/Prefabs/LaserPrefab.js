class LaserPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY, _duration, _pad, _score)
    {
        super(_scene,_posX,_posY,"laser");

        _scene.add.existing(this);
        
        this.colliders = []
        this.scene = _scene;
        this.score = _score;
        this.pad = _pad;
        this.duration = _duration;

        this.anims.play("laserAnim");

        this.scale = 5.5;
        this.setOrigin(0.5, 1);

        this.scene.time.removeEvent(this.scene.laserTimer)

        this.scene.laserTimer = this.scene.time.addEvent(
            {
               delay: this.duration,
               callback: this.deActivate,
               callbackScope: this
            }
        )
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.x = this.pad.x
    }

    deActivate() {
        this.setActive(false);
        this.destroy();
    }
}