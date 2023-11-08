class Pad extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, spriteTag){
        
        super(scene, positionX, positionY, spriteTag);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.body.setBounce(1, 1);


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

    /*
    setColliders()
    {
        this.scene.physics.add.collider
        (
            this,
            this.scene.ball
        )
    }
    */
}