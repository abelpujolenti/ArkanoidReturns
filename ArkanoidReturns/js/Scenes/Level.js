class Level extends Phaser.Scene
{
    constructor()
    {
        super({key:"Level"});
        
    }

    init(data) {
        this.currentLevel = data.level;

        if(this.currentLevel > 1)
            this.score = data.score;
        else
            this.score = 0;
    }

    preload()
    {
        this.load.setPath("assets/data/level");
        this.load.text("level1", "level1.txt");
        this.load.text("level2", "level2.txt");
        this.load.text("level3", "level3.txt");
        this.load.text("level4", "level4.txt");
        this.load.text("level5", "level5.txt");
        this.load.text("level6", "level6.txt");
        this.load.text("level7", "level7.txt");
        this.load.text("level8", "level8.txt");
        this.load.text("level9", "level9.txt");
        this.load.text("level10", "level10.txt");

        this.load.setPath("assets/map");
        this.load.tilemapTiledJSON("map", "map.json");

        this.highscore = highscoreSerializerInstance.getHighestScore();
    }

    create()
    {
        this.loadAnimations();

        this.LoadSounds();
        
        this.LoadPools();        
        
        this.LoadMap();

        this.CreateObjectMapFunctions();
        
        this.LoadUI();
        this.UpdateHighscoreUI(this.highscore);

        this.pad = new Pad(this, gamePrefs.INITIAL_PAD_POSITION_X, gamePrefs.INITIAL_PAD_POSITION_Y, 'pad', 'padAnim', this.score, 1, 
                            this.walls, this._ballHitPadSound, this._enlargeSound, this._extraLifeSound, this._gameOverSound).setScale(.75);

        this.ballsCounter = 0;
        
        this.ball = new NormalBall(this, this.pad.x, this.pad.getTopCenter().y, this.pad, this.walls, 
                                    this.ballsCounter, this._ballHitWallsSound).setScale(1);
        this._ballPool.add(this.ball);     
        
        this.powerups = [];

        this.time.addEvent(
            {
                delay: 15000,
                callback: this.SpawnObject,
                callbackScope: this,
                loop: true
            }
        )

        this.blockColors = ["magentaBlock", "redBlock", "orangeBlock", "yellowBlock", "greenBlock", "lightblueBlock", "blueBlock", "silverBlock", "goldBlock", "whiteBlock"]
        this.createLevel(40, config.width / 2, 80, "level" + this.currentLevel);
        

        this.fadeDuration = 600;
        this.fadein = new FadePrefab(this, config.width / 2, config.height / 2);
        this.tweens.add(
            {
                targets: this.fadein,
                alpha: { from: 1, to: 0},
                duration: this.fadeDuration
            }
        )
        this.time.addEvent(
            {
                delay: this.fadeDuration,
                callback: this.LevelStart,
                callbackScope: this,
                loop: false
            }
        )
    }

    LevelStart() {
        this._levelStartSound.play()
        this.fadein.destroy();

        //TODO: Remove test
        this.rightOpening0 = new OpeningVerticalPrefab(this, 633, 530, 'openingThingVertical', 'openingThingVerticalOpenAnimation')
        .setScale(0.71);

        this.rightOpening1 = new OpeningVerticalPrefab(this, 649, 530, 'openingThingVertical', 'openingThingVerticalOpenAnimation')
        .setScale(0.71);

        this.rightOpening2 = new OpeningVerticalPrefab(this, 665, 530, 'openingThingVertical', 'openingThingVerticalOpenAnimation')
        .setScale(0.71);

        this.rightOpening3 = new OpeningVerticalPrefab(this, 681, 530, 'openingThingVertical', 'openingThingVerticalOpenAnimation')
        .setScale(0.71);
    }

    LoadSounds()
    {
        this._ballHitBrickSound = this.sound.add("ballHitBrick")
        this._ballHitPadSound = this.sound.add("ballHitPad")
        this._ballHitWallsSound = this.sound.add("ballHitWalls")
        this._enlargeSound = this.sound.add("enlarge")
        this._explosionSound = this.sound.add("explosion")
        this._extraLifeSound = this.sound.add("extraLife")
        this._gameOverSound = this.sound.add("gameOver")
        this._levelStartSound = this.sound.add("levelStart")
        this._objectAppearsSound = this.sound.add("objectAppears")
        this._laserSound = this.sound.add("laser");
    }

    LoadPools()
    {
        this._ballPool = this.add.group();
        this._blockPool = this.add.group()
    }

    LoadNextLevel() {
        if(this.currentLevel < gamePrefs.NUM_LEVELS)
            this.scene.start("Level", {level: this.currentLevel + 1, score: this.pad.score});
        else
            this.scene.start("EndScene");
    }

    createLevel(size, rootX, rootY, level)
    {
        this.beatLevelThreshold = 0;

        this.blockAmountX = 11;
        var str = this.cache.text.get(level);
        var width = 44;
        this.blockScale = size / width;
        var x = 0;
        var y = 0;
        for (let i = 0; i < str.length; i++) { 
            var char = str.charCodeAt(i);
            if (char >= 33)
            {
                var posX = rootX + (x - 5) * size;
                var posY = rootY + y * size * 0.5;

                if (char == 67)
                {
                    this._blockPool.add(new CrystalBlockPrefab(this, posX, posY, 'crystalBlock', null, 1, this._ballPool, this.pad, 1, this._ballHitBrickSound).setScale(this.blockScale));
                }
                else if (char == 72) {
                    this._blockPool.add(new HardBlockPrefab(this, posX, posY, 'silverBlock', null, 2, this._ballPool, this.pad, 1, this._ballHitBrickSound).setScale(this.blockScale));
                }
                else if (char == 73 || char == 77) {
                    this._blockPool.add(new BlockPrefab(this, posX, posY, 'goldBlock', null, -1, this._ballPool, this.pad, 1, this._ballHitBrickSound).setScale(this.blockScale));
                    this.beatLevelThreshold++;
                }
                else {
                    let rand = Math.random();
                    if (rand < .15) {
                        this._blockPool.add(new CrystalBlockPrefab(this, posX, posY, this.blockColors[char - 48], null, 1, this._ballPool, this.pad, 1, this._ballHitBrickSound).setScale(this.blockScale));
                    }
                    else {
                        this._blockPool.add(new BlockPrefab(this, posX, posY, this.blockColors[char - 48], null, 1, this._ballPool, this.pad, 1, this._ballHitBrickSound).setScale(this.blockScale));
                    }
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

    UpdateRoundUI(round)
    {
        this.roundUI.text = round;
    }

    UpdateLivesUI()
    {
        this.livesDisplay.setText("x " + this.pad.lives);
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
        this._ballPool.getChildren().forEach(ball => {
            ball.ModifyBallsCounter(number)
        });
    }

    SlowDownBalls(){

        this._ballPool.getChildren().forEach(ball => {
            ball.MultiplyVelocity(.5)
        });

        this.slowDownTimer = this.time.addEvent(
            {
                delay: 5000,
                callback: this.SpeedUpBalls,
                callbackScope: this,
            }
        )
    }

    SpeedUpBalls(){
        
        this._ballPool.getChildren().forEach(ball => {
            ball.MultiplyVelocity(2)
        });
    }

    BreakEffect() {

        //Create opening thing vertical
        /*
        this.rightOpening0 = new OpeningVerticalPrefab(this, 633, 530, 'openingThingVertical', 'openingThingVerticalOpenAnimation')
        .setScale(0.71);

        this.rightOpening1 = new OpeningVerticalPrefab(this, 649, 530, 'openingThingVertical', 'openingThingVerticalOpenAnimation')
        .setScale(0.71);

        this.rightOpening2 = new OpeningVerticalPrefab(this, 665, 530, 'openingThingVertical', 'openingThingVerticalOpenAnimation')
        .setScale(0.71);

        this.rightOpening3 = new OpeningVerticalPrefab(this, 681, 530, 'openingThingVertical', 'openingThingVerticalOpenAnimation')
        .setScale(0.71);
        */
    }

    CloseOpening()
    {
        this.rightOpening0.ChangeAndPlayAnim('openingThingVerticalCloseAnimation');
        this.rightOpening1.ChangeAndPlayAnim('openingThingVerticalCloseAnimation');
        this.rightOpening2.ChangeAndPlayAnim('openingThingVerticalCloseAnimation');
        this.rightOpening3.ChangeAndPlayAnim('openingThingVerticalCloseAnimation');
    }

    CrossOpening()
    {
        console.log("Cross opening");
        this.pad.UpdateScoreDefault(10000);
        this.LoadNextLevel();
    }

    UpdateDestroyBlocks() {
        if (this._blockPool.children.size <= this.beatLevelThreshold) {
            this.LoadNextLevel();
        }
    }

    loadAnimations()
    {
        this.anims.create(
            {
                key: 'padAnim',
                frames:this.anims.generateFrameNumbers('pad', {start:0, end: 3}),
                frameRate: 15,
                repeat: -1
            });

        this.anims.create(
            {
                key: "longPadAnim",
                frames: this.anims.generateFrameNames("longPad", {start: 0, end: 3}),
                frameRate: 15,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: 'powerupAnimE',
                frames:this.anims.generateFrameNumbers('powerupE', {start:0, end: 7}),
                frameRate: 15,
                repeat: -1
            });

        this.anims.create(
            {
                key: 'powerupAnimL',
                frames:this.anims.generateFrameNumbers('powerupL', {start:0, end: 7}),
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
                key: 'powerupAnimG',
                frames:this.anims.generateFrameNumbers('powerupG', {start:0, end: 7}),
                frameRate: 15,
                repeat: -1
            });

        this.anims.create(
            {
                key: 'powerupAnimD',
                frames:this.anims.generateFrameNumbers('powerupD', {start:0, end: 7}),
                frameRate: 15,
                repeat: -1
            });
            

        this.anims.create(
            {
                key: 'powerupAnimM',
                frames:this.anims.generateFrameNumbers('powerupM', {start:0, end: 7}),
                frameRate: 15,
                repeat: -1
            });
            

        this.anims.create(
            {
                key: 'powerupAnimT',
                frames:this.anims.generateFrameNumbers('powerupT', {start:0, end: 7}),
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
            

        this.anims.create(
            {
                key: 'powerupAnimS',
                frames:this.anims.generateFrameNumbers('powerupS', {start:0, end: 7}),
                frameRate: 15,
                repeat: -1
            });
            

        this.anims.create(
            {
                key: 'powerupAnimC',
                frames:this.anims.generateFrameNumbers('powerupC', {start:0, end: 7}),
                frameRate: 15,
                repeat: -1
            });

        this.anims.create(
            {
                key: 'laserAnim',
                frames:this.anims.generateFrameNumbers('laser', {start:0, end: 8}),
                frameRate: 15,
                repeat: -1
            });

        this.anims.create(
            {
                key: "coneAnimation",
                frames: this.anims.generateFrameNumbers("cone", {start: 0, end: 24}),
                frameRate: 15,
                repeat: -1
            });     

        this.anims.create(
            {
                key: "saturninoAnimation",
                frames: this.anims.generateFrameNumbers("saturnino", {start: 0, end: 24}),
                frameRate: 15,
                repeat: -1
            });  

        this.anims.create(
            {
                key: "triBallAnimation",
                frames: this.anims.generateFrameNumbers("triBall", {start: 0, end: 24}),
                frameRate: 15,
                repeat: -1
            }); 
            
        this.anims.create(
            {
                key: "explosionAnimation",
                frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 4}),
                frameRate: 15
            });

        this.anims.create(
            {
                key: "openingThingVerticalOpenAnimation",
                frames: this.anims.generateFrameNumbers("openingThingVertical", {start: 0, end: 6}),
                frameRate: 15,
            });
        
            this.anims.create(
            {
                key: "openingThingVerticalCloseAnimation",
                frames: this.anims.generateFrameNumbers("openingThingVertical", {start: 6, end: 0}),
                frameRate: 15,
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
            this.score,
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
        this.powerups[this.powerups.length] = 
            new PowerupPrefab(this, _block.x, _block.y, "powerupB", "powerupAnimB", this.ball, this.pad, "xdd").setScale(this.blockScale);
    }

    SpawnPowerup(_block, _type)
    {
        this.powerups[this.powerups.length] = 
            new PowerupPrefab(this, _block.x, _block.y, "powerup"+ _type, "powerupAnim" + _type, this.ball, this.pad, _type).setScale(this.blockScale);
    }

    SpawnObject()
    {
        var randomNumber = Phaser.Math.Between(0, 2)
        this._objectAppearsSound.play()
        this.spawnObjects[randomNumber](this)
    }

    CreateObjectMapFunctions(){

        this.spawnObjects = {
            0: this.SpawnCone,
            1: this.SpawnSaturnino,
            2: this.SpawnTriBall,
        }
        
    }

    SpawnCone(scene)
    {
        new ConeObject(scene, 200, 500, scene._ballPool, scene.pad, scene._blockPool, scene.walls, scene._explosionSound, "coneAnimation", "cone")
    }

    SpawnSaturnino(scene)
    {
        new SaturninoObject(scene, 250, 180, scene._ballPool, scene.pad, scene._blockPool, scene.walls, scene._explosionSound, "saturninoAnimation", "saturnino")
    }

    SpawnTriBall(scene)
    {
        new TriBallObject(scene, 300, 500, scene._ballPool, scene.pad, scene._blockPool, scene.walls, scene._explosionSound, scene._ballHitWallsSound, "triBallAnimation", "triBall")
    }
}