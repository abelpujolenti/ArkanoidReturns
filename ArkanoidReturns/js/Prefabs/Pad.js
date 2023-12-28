class Pad extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag, _animTag, _score, _multiplier, _walls){
        
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);        
        this.body.setBounce(1, 1);
        this.body.setImmovable(true);
        this.scene = _scene;
        this.score = _score;
        this.multiplier = _multiplier;
        this.streak = 0;
        this.walls = _walls;
        this.lives = gamePrefs.PLAYER_LIVES;
        this.cursors = _scene.input.keyboard.createCursorKeys();

        this.catching = false;
        this.catchedBalls = [];

        this.SetColliders();
        this.InitPowerUpEffects();

        if(_animTag != null)
        {
            this.anims.play(_animTag);
        }
    }

    SetColliders()
    {
        this.scene.physics.add.collider(this, this.walls);
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta); 

        if(this.lives > 0)
        {
            this.CheckInput();
            return;
        }        
        this.scene.LoadGameOver();
    }

    UpdateScore(blockScore)
    {
        this.score += (blockScore * this.multiplier);
        this.scene.UpdateScoreUI(this.score);
    }

    ApplyBounce(_ball)
    {
        if(!this.catching)
        {
            return
        }

        this.catchedBalls[this.catchedBalls.length] = _ball
        _ball.idle = true;
        //_ball.body.setVelocity(10)
        /*var rel = (this.positionX + this.width / 2) - (_ball.x + gamePrefs.SIZE / 2);
		var norm = rel / (this.width / 2);
		var bounce = norm * (5 * gamePrefs.PI / 12);
		var velocityMultiplierY = Math.cos(bounce);
		var velocityMultiplierX = -Math.sin(bounce);

        _ball.ChangeVelocity(velocityMultiplierX, velocityMultiplierY);*/
    }

    ApplyUpgrade(_upgrade) {
        _upgrade.deActivate();
        this.ApplyPowerUpEffect[_upgrade.effect](this);
    }

    CheckInput()
    {
        if(this.cursors.left.isDown)
        {
            this.body.setVelocityX(-gamePrefs.PAD_SPEED);
        }
        else if(this.cursors.right.isDown)
        {
            this.body.setVelocityX(gamePrefs.PAD_SPEED);
        }
        else
        {
            this.body.setVelocityX(0);
        }

        if(this.cursors.up.isDown)
        {
            if(this.scene.ball.idle)
            {
                this.scene.ball.StartMoving();
            }            
            this.catchedBalls.length = 0
        }
    }

    DecrementLives()
    {
        this.lives--;
        this.scene.UpdateLivesUI();
    }

    IncreaseStreak()
    {
        this.streak++;
        this.multiplier = 1 + (0.25 * Math.floor(this.streak / 5));
    }

    Reset(_positionX, _positionY)
    {
        this.idle = true;
        this.body.setVelocity(0, 0);
        this.setPosition(_positionX, _positionY);
    }

    InitPowerUpEffects()
    {
        this.ApplyPowerUpEffect = { 
            "E": this.SpeedDown, //placeholder
            "B": this.SpeedDown, //placeholder
            "L": this.Laser, //placeholder
            "G": this.SpeedDown, //placeholder
            "D": this.ApplyDisruption, //placeholder
            "M": this.SpeedDown, //placeholder
            "T": this.SpeedDown, //placeholder
            "P": this.ApplyPlayerExtend,
            "S": this.SpeedDown,
            "C": this.Catch,
        };
    }

    ApplyPlayerExtend(_player)
    {
        //This no és la pad sinó la "posició" del diccionari
        _player.lives++;
        _player.scene.UpdateLivesUI();
    }

    ApplyDisruption(_player)
    {
        for(var i = 0; i < 3; i++)
        {
            var ball = new NormalBall(_player.scene, _player.scene.pad.x, _player.scene.pad.getTopCenter().y, _player.scene.pad, _player.scene.walls, _player.scene.ballsCounter).setScale(.75);
            _player.scene.ballPool.add(ball);
            
            for(let i = 0; i < _player.scene.blocks.length; i++)
            {
                if(_player.scene.blocks[i] != undefined && _player.scene.blocks[i].scene != undefined)
                {
                    _player.scene.blocks[i].addCollider(_player.scene.blocks[i], ball);
                }
            }
            
            ball.StartMoving();
        }

        console.log("balls count after disruption: " + _player.scene.ballsCounter);

    }

    Laser(player) {
        this.laser = new LaserPrefab(player.scene, player.x, player.y, 3000, player, this.score);
    }

    SpeedDown(player){
        player.scene.SlowDownBalls();
    }

    Catch(player){

        player.catching = true;

        player.scene.time.removeEvent(player.scene.catchingTimer)

        player.scene.catchingTimer = player.scene.time.addEvent(
            {
               delay: 10000,
               callback: player.EnoughCatch,
               callbackScope: player
            }
        )
    }

    EnoughCatch(){
        this.catching = false
        this.catchedBalls.forEach(ball => {
            ball.StartMoving()
        });
        this.catchedBalls.length = 0
    }
}