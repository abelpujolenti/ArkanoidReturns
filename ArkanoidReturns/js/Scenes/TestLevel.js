class TestLevel extends Phaser.Scene
{
    constructor()
    {
        super({key:"TestLevel"});
    }

    preload()
    {
        this.load.setPath("assets/data/level");
        this.load.text("test", "test.txt")
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
        this.LoadPools();

        this.cameras.main.setBackgroundColor("003");
        this.scoreText = this.add.text(
            10,
            config.height / 2 - 40,
            "Score",
            {
                fontFamily: 'Arial',
                fill: '#FFFFFF',
                fontSize: 12,
                align: "right"
            }
        )
        this.scoreText.setTint(0x40ff80, 0x40ff80, 0xffb000, 0xffb000);

        this.scoreUI = this.add.text(
            30,
            config.height / 2 - 20,
            0,
            {
                fontFamily: 'Arial',
                fill: '#FFFFFF',
                fontSize: 12
            }
        )

        this.pad = new Pad(this, gamePrefs.INITIAL_PAD_POSITION_X, gamePrefs.INITIAL_PAD_POSITION_Y, 'pad', 'padAnim', 0, 1).setScale(0.5);

        this.ballsCounter = 0;
        
        this.ball = new NormalBall(this, this.pad.x, this.pad.getTopCenter().y, this.pad, this.ballsCounter).setScale(.75);
        this.ballPool.add(this.ball);
        

        this.blocks = [];
        this.createLevel(20, 44, 40, "test");

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

    LoadPools()
    {
        this.ballPool = this.add.group();
    }

    createLevel(size, rootX, rootY, level)
    {
        var str = this.cache.text.get(level);
        var width = 44;
        var x = 0;
        var y = 0;
        for (let i = 0; i < str.length; i++) { 
            var char = str.charCodeAt(i);
            if (char >= 65)
            {
                var posX = rootX + x * size;
                var posY = rootY + y * size * 0.5;
                this.blocks[i] = new BlockPrefab(this, posX, posY, 'silverBlock', null, 2, this.ball, this.pad, 1).setScale(size / width);
                x++;
            }
            else if (char == 32)
            {
                x++;
            }
            else if (char == 10)
            {
                x = 0;
                y++;
            }
        }
    }

    update()
    {

    }

    UpdateLivesUI()
    {
        this.livesDisplay.setText("x "+this.pad.lives);
    }

    UpdateScoreUI(score)
    {
        this.scoreUI.setText(score);
    }

    UpdateBallsCounter(number)
    {
        this.ballsCounter += number;
        for (let index = 0; index < this.ballPool.getLength(); index++) {
            this.ballPool[i].ModifyBallsCounter(number);
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

    LoadGameOver()
    {
        this.scene.start("GameOver", {score: this.scoreUI.text})
    }
}