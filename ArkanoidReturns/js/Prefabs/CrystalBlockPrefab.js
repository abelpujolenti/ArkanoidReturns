class CrystalBlockPrefab extends BlockPrefab
{
    constructor(_scene,_posX,_posY,_spriteTag, _animTag, _health, _ball, _pad, _score)
    {
        super(_scene,_posX,_posY,_spriteTag, _animTag, _health, _ball, _pad, _score);
    }

    break() {
        this.scene.SpawnPowerup(this);
        super.break();
    }
}