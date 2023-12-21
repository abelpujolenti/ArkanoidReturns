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
        /*var rel = (this.positionX + this.width / 2) - (_ball.x + gamePrefs.SIZE / 2);
		var norm = rel / (this.width / 2);
		var bounce = norm * (5 * gamePrefs.PI / 12);
		var velocityMultiplierY = Math.cos(bounce);
		var velocityMultiplierX = -Math.sin(bounce);

        _ball.ChangeVelocity(velocityMultiplierX, velocityMultiplierY);*/
    }

    ApplyUpgrade(_upgrade) {
        _upgrade.deActivate();
        console.log(_upgrade.effect);
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
        this.ApplyPowerUpEffect = { "P": this.ApplyPlayerExtend};
        this.ApplyPowerUpEffect = { "D": this.ApplyDisruption};
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
            console.log(_player.scene);
            var ball = new NormalBall(_player.scene, _player.scene.pad.x, _player.scene.pad.getTopCenter().y, _player.scene.pad, _player.scene.walls, _player.scene.ballsCounter).setScale(.75);
            _player.scene.ballPool.add(ball);
            for(let i = 0; i < _player.scene.blocks.length; i++)
            {
                _player.scene.blocks[i].addCollider(ball);
            }
            ball.StartMoving();
        }

        console.log("Disruption");
    }
}