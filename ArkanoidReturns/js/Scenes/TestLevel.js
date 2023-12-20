class TestLevel extends Phaser.Scene
{
    constructor()
    {
        super({key:"TestLevel"});
    }

    preload()
    {
        this.load.setPath("assets/data/level");
        this.load.text("test", "test.txt");

        this.load.setPath("assets/map");
        this.load.tilemapTiledJSON("map", "map.json");

        this.highscore = highscoreSerializerInstance.getHighestScore();
    }

    create()
    {
        this.loadAnimations();
        
        this.LoadPools();
        
        this.LoadMap();
        
        this.LoadUI();
        this.UpdateHighscoreUI(this.highscore);

        this.pad = new Pad(this, gamePrefs.INITIAL_PAD_POSITION_X, gamePrefs.INITIAL_PAD_POSITION_Y, 'pad', 'padAnim', 0, 1, this.walls).setScale(0.5);

        this.ballsCounter = 0;
        
        this.ball = new NormalBall(this, this.pad.x, this.pad.getTopCenter().y, this.pad, this.walls, this.ballsCounter).setScale(.75);
        this.ballPool.add(this.ball);        

        
        this.powerups = [];
        this.blocks = [];

        this.createLevel(40, config.width / 2, 80, "test");
    }

    LoadPools()
    {
        this.ballPool = this.add.group();
    }

    createLevel(size, rootX, rootY, level)
    {
        this.blockAmountX = 11;
        var str = this.cache.text.get(level);
        var width = 44;
        this.blockScale = size / width;
        var x = 0;
        var y = 0;
        for (let i = 0; i < str.length; i++) { 
            var char = str.charCodeAt(i);
            if (char >= 65)
            {
                var posX = rootX + (x - 5) * size;
                var posY = rootY + y * size * 0.5;

                if (char == 67)
                {
                    this.blocks[i] = new CrystalBlockPrefab(this, posX, posY, 'crystalBlock', null, 1, this.ball, this.pad, 1).setScale(this.blockScale);
                }
                else
                {
                    this.blocks[i] = new BlockPrefab(this, posX, posY, 'silverBlock', null, 1, this.ball, this.pad, 1).setScale(this.blockScale);
                }

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

    UpdateRoundUI(round)
    {
        this.roundUI.text = round;
    }

    UpdateLivesUI()
    {
        this.livesDisplay.setText("x "+this.pad.lives);
    }

    UpdateLivesUI(_lives)
    {
        this.livesDisplay.setText("x "+ _lives);
    }

    UpdateScoreUI(score)
    {
        this.scoreUI.text = score;
    }

    UpdateHighscoreUI(score)
    {
        this.highscoreUI.text = score;
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
        this.anims.create(
        {
            key: 'powerupAnimB',
            frames:this.anims.generateFrameNumbers('powerupB', {start:0, end: 7}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create(
            {
                key: 'powerupAnimP',
                frames:this.anims.generateFrameNumbers('powerupP', {start:0, end: 7}),
                frameRate: 15,
                repeat: -1
            });
    }

    LoadMap()
    {
        this.map = this.add.tilemap("map");

        this.map.addTilesetImage("verticalPipeTileset");
        this.map.addTilesetImage("horizontalPipeTileset");

        var tilesets = ["verticalPipeTileset", "horizontalPipeTileset"]

        this.walls = this.map.createLayer("layer_walls", tilesets);
        this.map.createLayer("layer_outer_walls", tilesets);

        var indexToCollide = [3, 26]

        this.map.setCollision(indexToCollide, true, true, "layer_walls");
    }

    LoadUI()
    {
        this.cameras.main.setBackgroundColor("003");

        this.roundText = this.add.bitmapText(
            40, 
            20,
            "arkanoidFontBruh",
            "ROUND",
            24
        )
        
        this.roundUI = this.add.bitmapText(
            105,
            60, 
            "arkanoidFontBruh",
            1,
            24
        ).setOrigin(1);

        this.scoreText = this.add.bitmapText(
            30, 
            config.height / 2 - 90,
            "arkanoidFont",
            "SCORE",
            20
        )
        .setTint(0x40ff80, 0x40ff80, 0xffb000, 0xffb000);

        this.scoreUI = this.add.bitmapText(
            143,
            config.height / 2 - 30,
            "arkanoidFont",
            0,
            24
        ).setOrigin(1)
        .setTint(0xe755b0, 0xe755b0, 0xe7e5f2,  0xe7e5f2);

        this.livesIcon = this.add.sprite(60, config.height / 2 + 18, 'pad', 0).setScale(.7);

        this.livesDisplay = this.add.bitmapText(
            100, 
            config.height / 2 - 10,
            "arkanoidFont",
            "x " + gamePrefs.PLAYER_LIVES,
            24
        ).setTint(0x40ff80, 0x40ff80, 0xffb000, 0xffb000);

        this.highscoreText = this.add.bitmapText(
            config.width - config.width / 5 + 5, 
            config.height / 7.7,
            "arkanoidFont",
            "HIGHSCORE",
            20
        ).setTint(0x40ff80, 0x40ff80, 0xffb000, 0xffb000);

        this.highscoreUI = this.add.bitmapText(
            config.width - 20, 
            config.height / 4.5,
            "arkanoidFont",
            0,
            24
        ).setOrigin(1)
        .setTint(0xa71f52, 0xa71f52, 0xe4c11b, 0xe4c11b);

        this.pointlessText = this.add.bitmapText(
            655, 
            config.height / 2,
            "arkanoidFontBruh",
            "Insert coin\nto play",
            18
        )
        this.tweens.add(
            {
                targets: this.pointlessText,
                alpha: { from: 1, to: 0},
                duration: 1000,
                yoyo: true,
                loop: -1

            }
        )
    }

    LoadGameOver()
    {
        this.scene.start("EndScene", {score: this.scoreUI.text, round: this.roundUI.text})
    }

    SpawnPowerup(_block)
    {
        this.powerups[this.powerups.length] = new PowerupPrefab(this, _block.x, _block.y, "powerupB", "powerupAnimB", this.ball, this.pad, "xdd").setScale(this.blockScale);
    }

    SpawnPowerup(_block, _type)
    {
        this.powerups[this.powerups.length] = new PowerupPrefab(this, _block.x, _block.y, "powerup"+ _type, "powerupAnim" + _type, this.ball, this.pad, _type).setScale(this.blockScale);
    }
}