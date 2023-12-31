class CrystalBlockPrefab extends BlockPrefab
{
    constructor(_scene,_posX,_posY,_spriteTag, _animTag, _health, _ball, _pad, _score, ballHitBrickSound)
    {
        super(_scene,_posX,_posY,_spriteTag, _animTag, _health, _ball, _pad, _score, ballHitBrickSound);
        this.powerUpTypes = ["E", "L", "B", "D", "P", "S", "C"];
    }

    break() {
        this.scene.SpawnPowerup(this, this.powerUpTypes[this.GetRandomPowerUpType()]);
        super.break();
    }

    GetRandomPowerUpType()
    {
        let rand = Math.random();
        return Math.floor(rand * this.powerUpTypes.length);
    }
}