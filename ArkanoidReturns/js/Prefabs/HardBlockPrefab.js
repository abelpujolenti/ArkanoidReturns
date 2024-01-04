class HardBlockPrefab extends BlockPrefab
{
    constructor(_scene,_posX,_posY,_spriteTag, _animTag, _health, _ball, _pad, _score, ballHitBrickSound)
    {
        super(_scene,_posX,_posY,_spriteTag, _animTag, _health, _ball, _pad, _score, ballHitBrickSound);
    }

    damage() {
        super.damage();
        if (this.health == 1) this.setTexture("brokenBlock");
    }

    break() {
        super.break();
    }
}