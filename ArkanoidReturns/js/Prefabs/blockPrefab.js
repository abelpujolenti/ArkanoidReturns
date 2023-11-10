class BlockPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag, _animTag, _health, _ball)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        
        _scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.collider = _scene.physics.add.collider(this, _ball);
        this.health = _health;
        if (_animTag != null) {
            this.anims.play(_animTag);
        }
        
        this.body.onCollide = true;
        _scene.physics.world.on('collide', (gameObject1, gameObject2, body1, body2) => {
            gameObject1.damage();
        })
        this.damaged = false;
    }

    damage() {
        if (this.damaged) return;
        this.damaged = true;
        this.health--;
        if (this.health <= 0) {
            this.deActivate();
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.damaged = false;
    }

    deActivate() {
        this.setActive(false);
        this.x = -200;
    }

}