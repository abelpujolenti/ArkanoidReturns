class TestLevel extends Phaser.Scene
{
    constructor()
    {
        super({key:"TestLevel"});
    }

    preload()
    {
        this.load.setPath("assets/img/projectile");
        this.load.image("normalBall", "cyan.png");
        this.load.setPath("assets/img/block");
        this.load.spritesheet("silverBlock", "silver_animated.png", {frameWidth: 44, frameHeight: 22});
        this.load.setPath("assets/img/pad")
        this.load.spritesheet("pad", "default.png", {frameWidth: 88, frameHeight:22});
    }

    create()
    {
        this.loadAnimations();

        this.cameras.main.setBackgroundColor("003");
        this.ball = new NormalBall(this, gamePrefs.INITIAL_NORMAL_BALL_POSITION_X, gamePrefs.INITIAL_NORMAL_BALL_POSITION_Y).setScale(.75);
        this.pad = new Pad(this, gamePrefs.INITIAL_PAD_POSITION_X, gamePrefs.INITIAL_PAD_POSITION_Y, 'pad', 'padAnim').setScale(0.5);

        var numBlocks = 11
        this.blocks = [];
        for (var i = 0 ; i < numBlocks; i++) {
            this.blocks[i] = new BlockPrefab(this, 50 + i * 22, config.height/4, 'silverBlock', null, 1, this.ball).setScale(0.5);
        }
        this.blocks[11] = new BlockPrefab(this, config.width/2, config.height/4 - 12, 'silverBlock', 'silverBlockAnim', 2, this.ball).setScale(0.5);
        //this.block1 = new BlockPrefab(this, config.width/2, config.height/4, 'silverBlock', 'silverBlockAnim', 2, this.ball).setScale(0.5);
        //this.block2 = new BlockPrefab(this, config.width/2 + 22, config.height/4, 'silverBlock', null, 1, this.ball).setScale(0.5);

        this.livesIcon = this.add.sprite(22, config.width / 2 - 35, 'pad', 0).setScale(.3);
        this.livesDisplay = this.add.text(
            this.livesIcon.width * this.livesIcon.scale + this.livesIcon.x - 5,
            config.height / 2,
            "x " + gamePrefs.PLAYER_LIVES,
            {
                fontFamily: 'Arial',
                fill: '#FFFFFF',
                fontSize: 12
            }
        )
        this.livesDisplay.setTint(0x40ff80, 0x40ff80, 0xffb000, 0xffb000);
    }

    update()
    {
        if(this.ball.idle)
        {
            this.ball.UpdatePositionX(this.pad.getBottomCenter().x);
        }
        else if(this.ball.getBottomCenter().y == config.height)
        {
            this.pad.DecrementLives();
            this.livesDisplay.setText("x "+this.pad.lives);
            this.pad.Reset(gamePrefs.INITIAL_PAD_POSITION_X, gamePrefs.INITIAL_PAD_POSITION_Y);
            this.ball.Reset(gamePrefs.INITIAL_NORMAL_BALL_POSITION_X, gamePrefs.INITIAL_NORMAL_BALL_POSITION_Y);

            if(this.pad.lives <= 0)
            {
                console.log("Game over. Please refresh the page.");
                this.ball.idle = true;
            }
        }
    }

    loadAnimations()
    {
        this.anims.create(
        {
            key: 'silverBlockAnim',
            frames:this.anims.generateFrameNumbers('silverBlock', {start:0, end: 9}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create(
        {
            key: 'padAnim',
            frames:this.anims.generateFrameNumbers('pad', {start:0, end: 3}),
            frameRate: 15,
            repeat: -1
        });
    }
}