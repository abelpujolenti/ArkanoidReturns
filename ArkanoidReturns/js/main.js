var config = 
{
    type: Phaser.AUTO,
    width: 800,
    height: 560, 
    scene:[MenuScene, TestLevel, EndScene], 
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
            gravity:{y: 0},
            debug: true
        }
    }
};

var gamePrefs = 
{
    PI: 3.1416,
    SIZE: 16,
    
    GAME_WIDTH: config.width,
    GAME_HEIGHT: config.height,
    LEVEL_WIDTH: config.width,
    LEVEL_HEIGHT: config.height + 28,
    PAD_SPEED: 150,
    BALL_SPEED: 200,
    INITIAL_NORMAL_BALL_MAX_VELOCITY_X: 1,
    INITIAL_NORMAL_BALL_MIN_VELOCITY_X: -1,
    INITIAL_NORMAL_BALL_VELOCITY_Y: -1,
    PLAYER_LIVES: 4,
    INITIAL_PAD_POSITION_X: config.width / 2,
    INITIAL_PAD_POSITION_Y: config.height - 16,
    INITIAL_NORMAL_BALL_POSITION_X: config.width / 2,
    INITIAL_NORMAL_BALL_POSITION_Y: config.height - 26

}

var game = new Phaser.Game(config);