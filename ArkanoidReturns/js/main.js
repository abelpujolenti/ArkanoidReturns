var gamePrefs=
{
    PAD_VELOCITY: 500
}

var config = 
{
    type: Phaser.AUTO,
    width: 370,
    height: 550,
    scene:[gameState], //array con las escenas
    render:
    {
        pixelArt:true
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            gravity:{y:gamePrefs.HERO_GRAVITY},
            debug:true      //Pinta los box colliders...
        }
    }
};

var juego = new Phaser.Game(config);