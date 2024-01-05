class FadePrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene,_posX,_posY)
    {
        super(_scene,_posX,_posY,"fade");
        _scene.add.existing(this);
    }
}