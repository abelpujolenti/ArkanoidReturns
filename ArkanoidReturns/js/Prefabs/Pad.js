class Pad extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag, _animTag){
        
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.body.setBounce(1, 1);
        this.scene = _scene;

        this.cursors = _scene.input.keyboard.createCursorKeys();

        this.localPoint = new Phaser.Math.Vector2();

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

        super.preUpdate(time, delta); 
    }

    SetPadZones()
    {
        this.getTopLeft();   // -> go left-up (diagonal) -> affect velocity.x & velocity.y
        this.getTopCenter(); // -> go up (straight) -> affect only velocity.y
        this.getTopRight();  // -> go right-up (diagonal) -> affect velocity.x & velocity.y

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
        /*
        this.scene.physics.add.overlap
        (
            this,
            this.scene.ball,
            this.ApplyBounce,
            null,
            this
        );
        */

        this.scene.physics.add.collider(
            this,
            this.scene.ball    
        );
    }

    ApplyBounce(_ball, velocityMultiplier)
    {
        _ball.ChangeVelocity(velocityMultiplier);
        console.log("bounce");
    }

    CheckInput()
    {

    }
    
}

function CalculateDistance (x1, y1, x2, y2) {

    var dx = x1 - x2;
    var dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);

}