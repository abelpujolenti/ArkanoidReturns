class blockPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag, health)
    {
        //this.nave = Scene.physics.add.sprite(posX,posY,spriteTag);
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);

        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.body.setImmovable(true);
        this.health = health;
    }

    damage(_block, _damageAgent) {
        this.health--;
        if (this.health < 0) {
            this.deActivate();
        }
    }

    deActivate() {
        this.setActive(false);
        this.x = -200;
    }

}