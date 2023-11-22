class Pad extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag, _animTag, _score, _multiplier){
        
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.body.setBounce(1, 1);
        this.body.setImmovable(true);
        this._scene = _scene;
        this.score = _score;
        this.multiplier = _multiplier
        this.lives = gamePrefs.PLAYER_LIVES;
        this.cursors = _scene.input.keyboard.createCursorKeys();

        if(_animTag != null)
        {
            this.anims.play(_animTag);
        }
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta); 

        if(this.lives > 0)
        {
            this.CheckInput();
            return;
        }        
        this._scene.LoadGameOver();
    }

    UpdateScore(blockScore)
    {
        this.score += (blockScore * this.multiplier);
        this._scene.UpdateScoreUI(this.score);
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
            if(this._scene.ball.idle)
            {
                this._scene.ball.StartMoving();
            }
        }
    }

    DecrementLives()
    {
        this.lives--;
    }

    Reset(_positionX, _positionY)
    {
        this.idle = true;
        this.body.setVelocity(0, 0);
        this.setPosition(_positionX, _positionY);
    }
}