class CrystalBlockPrefab extends BlockPrefab
{
    constructor(_scene,_posX,_posY,_spriteTag, _animTag, _health, _ball, _pad, _score)
    {
        super(_scene,_posX,_posY,_spriteTag, _animTag, _health, _ball, _pad, _score);
        this.powerUpTypes = ["E", "L", "B", "G", "D", "M", "T", "P", "S", "C"];
    }

    break() {
        //this.scene.SpawnPowerup(this, this.GetRandomPowerUpType());
        this.scene.SpawnPowerup(this, this.powerUpTypes[this.GetRandomPowerUpType()]);
        super.break();
    }

    GetRandomPowerUpType()
    {
        let rand = Math.random();
        return Math.floor(rand * this.powerUpTypes.length);
    }
}