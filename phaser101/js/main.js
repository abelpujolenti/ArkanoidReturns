var config = 
{
    type: Phaser.AUTO,
    width: 370,
    height: 550,
    scene:[gameState,nivel], //array con las escenas
    render:
    {
        pixelArt:true
    },
    HEROSPEED:5
};

var juego = new Phaser.Game(config);