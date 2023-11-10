class Pad extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag){
        
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.body.setBounce(1, 1);
        this.scene = _scene;

        this.cursors = scene.input.keyboard.createCursorKeys();
        
        //this.Start();
    }

    preUpdate(time, delta)
    {
        if(this.cursors.left.isDown)
        {
            this.body.setVelocityX(-gamePrefs.PAD_VELOCITY);
        }
        else if(this.cursors.right.isDown)
        {
            this.body.setVelocityX(gamePrefs.PAD_VELOCITY);
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

        distanceLeftToCenter = Phaser.Math.Distance(this.getTopLeft(), this.getTopCenter);
        distanceCenterToRight = Phaser.Math.Distance(this.getTopCenter(), this.getTopRight());

        leftBound.x = this.getTopLeft().x + distanceLeftToCenter/2;
        leftBound.y = this.getTopLeft().y;
        
        centerBound_left.x = this.getTopCenter().x - distanceLeftToCenter/2;
        centerBound_left.y = this.getTopCenter().y; 
        centerBound_right.x = this.getTopCenter().x + distanceCenterToRight/2;
        centerBound_right.y = this.getTopCenter().y;

        rightBound.x = this.getTopRight().x - distanceCenterToRight/2;
        rightBound.y = this.getTopRight().y;

        this.leftZone = [
            this.getTopLeft(),
            leftBound
        ];

        this.centerZone = [
            centerBound_left,
            centerBound_right
        ];

        this.rightZone = [
            rightBound,
            this.getTopRight()
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

        this.physics.add.overlap(
            this,
            this.scene.ball,
            function overlap(pad, ball) {
              //ball.setFrame(5).disableBody();
              var { x, y } = ball.body.center;                   
              ballLocalPoint = ball.getLocalPoint(x, y, localPoint);

                //Compare ballLocalPoint to pad thresholds
                //Apply bounce with multiplier according to comparison

                if(ballLocalPoint.x >= leftZone[0] && ballLocalPoint < leftZone[1])
                {
                    ball.ApplyBounce('diagonal to up left')
                }

                else if(ballLocalPoint.x >= centerZone[0] && ballLocalPoint < centerZone[1])
                {
                    ball.ApplyBounce('up')
                }

                else if(ballLocalPoint.x >= rightZone[0] && ballLocalPoint < rightZone[1])
                {
                    ball.ApplyBounce('diagonal to up right')
                }

            },
            null,
            this
          );

    }

    ApplyBounce(_ball)
    {
        ball.ChangeVelocity(2);
    }

    CheckInput()
    {

    }
    
}