var config = 
{
    type: Phaser.AUTO,
    width: 320,
    height: 232,
    scene:[TestLevel, EndScreen], 
    render:
    {
        pixelArt : true
    },
    scale:
    {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default: "arcade",
        arcade:
        {
            gravity:{y: 0}
        }
    }
};

var gamePrefs = 
{
    PI: 3.1416,
    SIZE: 16,
    
    PAD_SPEED: 150,
    BALL_SPEED: 200,
    INITIAL_NORMAL_BALL_MAX_VELOCITY_X: 1,
    INITIAL_NORMAL_BALL_MIN_VELOCITY_X: -1,
    INITIAL_NORMAL_BALL_VELOCITY_Y: -1,
    PLAYER_LIVES: 4,
    INITIAL_PAD_POSITION_X: config.width/2,
    INITIAL_PAD_POSITION_Y: config.height,
    INITIAL_NORMAL_BALL_POSITION_X: config.width/2,
    INITIAL_NORMAL_BALL_POSITION_Y: config.height - 16

}

var game = new Phaser.Game(config);