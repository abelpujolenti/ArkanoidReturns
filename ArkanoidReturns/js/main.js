var gamePrefs = 
{
    PAD_SPEED: 150,
    BALL_SPEED: 120,
    INITIAL_NORMAL_BALL_MAX_VELOCITY_X: 1,
    INITIAL_NORMAL_BALL_MIN_VELOCITY_X: -1,
    INITIAL_NORMAL_BALL_VELOCITY_Y: -1

}

var config = 
{
    type: Phaser.AUTO,
    width: 320,
    height: 232,
    scene:[TestLevel], 
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

var game = new Phaser.Game(config);