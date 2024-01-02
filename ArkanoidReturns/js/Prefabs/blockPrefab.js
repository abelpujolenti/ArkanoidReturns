class BlockPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag, _animTag, _health, _ballPool, _pad, _score, ballHitBrickSound)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        
        _scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.colliders = []
        this.colliders[0] = this.scene.physics.add.collider(this, _ballPool, this.damage, null, this)
        //this.addCollider(_ball);
        this.scene = _scene;
        this.health = _health;
        this.score = _score;
        this.pad = _pad;
        this._ballHitBrickSound = ballHitBrickSound
        this.laserBuildup = 0;
        if (_animTag != null) {
            this.anims.play(_animTag);
        }
        this.damaged = false;
    }

    damage() {
        if (this.damaged) return;
        this.damaged = true;
        this.health--;
        this._ballHitBrickSound.play()
        if (this.health == 0) {
            this.break();
        }
    }

    AddLaserBuildup() {
        this.laserBuildup++;
        if (this.laserBuildup > 50) {
            this.damage();
            this.laserBuildup = 0;
        }
    }

    break() {
        if (this.health < 0) return;
        this.deActivate();
        this.pad.UpdateScore(this.score);
        this.pad.IncreaseStreak();
        this.pad.scene.UpdateDestroyBlocks();
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.damaged = false;
    }

    deActivate() {
        this.setActive(false);
        this.destroy();
    }

    addCollider(_block, _object) {
        this.colliders.push(this.scene.physics.add.collider(_block, _object));
    }

}