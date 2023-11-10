class TestLevel extends Phaser.Scene
{
    constructor()
    {
        super({key:"TestLevel"});
    }

    preload()
    {
        this.load.spritesheet("pad", "assets/img/pad/default.png", {frameWidth: 88, frameHeight: 22});
        this.load.setPath("assets/img/projectile");
        this.load.image("normalBall", "cyan.png");
        this.load.setPath("assets/img/block");
        this.load.spritesheet("silverBlock", "silver_animated.png", {frameWidth: 44, frameHeight: 22});
    }

    create()
    {
        this.loadAnimations();

        this.cameras.main.setBackgroundColor("003");
        this.ball = new NormalBall(this, config.width / 2, 2* config.height / 3);

        this.block1 = new BlockPrefab(this, config.width/2, config.height/4, 'silverBlock', 'silverBlockAnim', 2, this.ball).setScale(0.5);
        this.block2 = new BlockPrefab(this, config.width/2 + 22, config.height/4, 'silverBlock', null, 1, this.ball).setScale(0.5);

        this.livesIcon = this.add.sprite(22, config.width / 2 - 35, 'pad', 0).setScale(.3);
        this.livesDisplay = this.add.text(
            this.livesIcon.width * this.livesIcon.scale + this.livesIcon.x - 5,
            config.height / 2,
            "x 4",
            {
                fontFamily: 'Arial',
                fill: '#FFFFFF',
                fontSize: 12
            }
        )
        this.livesDisplay.setTint(0x40ff80, 0x40ff80, 0xffb000, 0xffb000);

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
            frames:this.anims.generateFrameNumbers('pad', {start:0, end: 4}),
            frameRate: 15,
            repeat: -1
        });
    }
}