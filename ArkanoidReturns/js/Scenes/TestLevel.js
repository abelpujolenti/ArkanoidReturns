class TestLevel extends Phaser.Scene
{
    constructor()
    {
        super({key:"TestLevel"});
    }

    preload()
    {
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

        this.cameras.main.setBackgroundColor("003");
        this.ball = new NormalBall(this, config.width / 2, config.height / 2);
        this.pad = new Pad(this, config.width/2, config.height, 'pad', 'padAnim').setScale(0.5);

        this.block1 = new blockPrefab(this, config.width/2, config.height/3, 'silverBlock', 'silverBlockAnim', 1).setScale(0.5);
        this.block2 = new blockPrefab(this, config.width/2 + 22, config.height/3, 'silverBlock', null, 1).setScale(0.5);

        /*this.time.addEvent
        (
            {
                delay: 1000,
                callback: this.ball.ChangeVelocity,
                args: [1.5],
                callbackScope: this.ball,
                loop: true
            }
        )*/
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
}