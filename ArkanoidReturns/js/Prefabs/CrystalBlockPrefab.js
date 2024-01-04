class CrystalBlockPrefab extends BlockPrefab
{
    constructor(_scene,_posX,_posY,_spriteTag, _animTag, _health, _ball, _pad, _score, ballHitBrickSound)
    {
        super(_scene,_posX,_posY,_spriteTag, _animTag, _health, _ball, _pad, _score, ballHitBrickSound);
        this.powerUpTypes = ["E", "L", "B", "G", "D", "M", "T", "P", "S", "C"];
    }

    break() {
        //this.scene.SpawnPowerup(this, this.powerUpTypes[this.GetRandomPowerUpType()]);
        this.scene.SpawnPowerup(this, "E");
        super.break();
    }

    GetRandomPowerUpType()
    {
        let rand = Math.random();
        return Math.floor(rand * this.powerUpTypes.length);
    }
}