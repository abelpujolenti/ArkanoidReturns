var config = 
{
    type: Phaser.AUTO,
    width: 800,
    height: 560, 
    scene:[Preloader, MenuScene, RankingScene, Level, EndScene, CongratsScene], 
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
    
    GAME_WIDTH: config.width,
    GAME_HEIGHT: config.height,
    LEVEL_WIDTH: config.width,
    LEVEL_HEIGHT: config.height + 28,
    PAD_SPEED: 200,
    BALL_SPEED: 200,
    OBJECT_CONTAINER_MIN_X_COORDINATE: 190,
    OBJECT_CONTAINER_MAX_X_COORDINATE: 610,
    OBJECT_CONTAINER_MIN_Y_COORDINATE: 50,
    OBJECT_CONTAINER_MAX_Y_COORDINATE: 400,
    OBJECT_SPEED: 40,
    POWERUP_SPEED: 80,
    INITIAL_NORMAL_BALL_MAX_VELOCITY_X: 1,
    INITIAL_NORMAL_BALL_MIN_VELOCITY_X: -1,
    INITIAL_NORMAL_BALL_VELOCITY_Y: -1,
    PLAYER_LIVES: 3,
    INITIAL_PAD_POSITION_X: config.width / 2,
    INITIAL_PAD_POSITION_Y: config.height - 16,
    INITIAL_NORMAL_BALL_POSITION_X: config.width / 2,
    INITIAL_NORMAL_BALL_POSITION_Y: config.height - 26,
    NUM_LEVELS: 10

}

var game = new Phaser.Game(config);