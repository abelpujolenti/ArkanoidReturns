class Pad extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag, _animTag){
        
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.body.setBounce(1, 1);
        this.scene = _scene;
        this.lives = gamePrefs.PLAYER_LIVES;
        this.cursors = _scene.input.keyboard.createCursorKeys();

        if(_animTag != null)
        {
            this.anims.play(_animTag);
        }

        this.SetPadZones();
        this.SetColliders();

        //this.Start();
    }

    preUpdate(time, delta)
    {
        if(this.lives > 0)
        {
            this.CheckInput();
        }

        super.preUpdate(time, delta); 
    }

    SetPadZones()
    {
        //TODO: Reconsider pad zones
        //Comment
        var distanceLeftToCenter = CalculateDistance(this.getTopLeft().x, this.getTopLeft().y, this.getTopCenter().x, this.getTopCenter().y);
        var distanceCenterToRight = CalculateDistance(this.getTopCenter().x, this.getTopCenter().y, this.getTopRight().x, this.getTopRight().y);

        var leftBound = this.getTopLeft().x + distanceLeftToCenter/2;
        
        var centerBound_left = this.getTopCenter().x - distanceLeftToCenter/2; 

        var centerBound_right =this.getTopCenter().x + distanceCenterToRight/2;

        var rightBound = this.getTopRight().x - distanceCenterToRight/2;

        this.leftZone = [
            this.getTopLeft().x,
            leftBound.x
        ];

        this.centerZone = [
            centerBound_left,
            centerBound_right
        ];

        this.rightZone = [
            rightBound,
            this.getTopRight().x
        ];
    }
    
    SetColliders()
    {
        
        this.scene.physics.add.collider
        (
            this,
            this.scene.ball,
            this.ApplyBounce(this.scene.ball),
            null,
            this
        );
        
        /*
        this.scene.physics.add.collider(
            this,
            this.scene.ball    
        );
        */
    }

    ApplyBounce(_ball)
    {
        var rel=(this.positionX +(this.width/2))-(_ball.x+(gamePrefs.SIZE/2));
		var norm=rel/(this.width/2);
		var bounce = norm * (5*gamePrefs.PI/12);
		var velocityMultiplierY = Math.cos(bounce);
		var velocityMultiplierX = -Math.sin(bounce);

        _ball.ChangeVelocity(velocityMultiplierX, velocityMultiplierY);
        console.log("bounce");
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
    }

    Reset(_positionX, _positionY)
    {
        this.idle = true;
        this.body.setVelocity(0, 0);
        this.setPosition(_positionX, _positionY);
    }
}

function CalculateDistance (x1, y1, x2, y2) {

    var dx = x1 - x2;
    var dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);

}