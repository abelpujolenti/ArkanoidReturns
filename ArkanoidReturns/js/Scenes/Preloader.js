class Preloader extends Phaser.Scene
{
    constructor()
    {
        super({key: "Preloader"});
    }

    preload()
    {        
        this.load.setPath("assets/img/projectile");
        this.load.image("normalBall", "cyan.png");
        
        this.load.setPath("assets/img/block");
        this.load.spritesheet("silverBlock", "silver_animated.png", {frameWidth: 44, frameHeight: 22});
        
        this.load.setPath("assets/img/pad");
        this.load.spritesheet("pad", "default.png", {frameWidth: 88, frameHeight:22});

        this.load.setPath("assets/img/border");
        this.load.image("verticalPipeTileset", "vertical.png");
        this.load.image("horizontalPipeTileset", "horizontal.png");

        this.load.setPath("assets/fonts");
        this.load.bitmapFont("arkanoidFont", "ArkanoidFont.png", "ArkanoidFont.xml");
        this.load.bitmapFont("arkanoidFontBruh", "ArkanoidFontBruh.png", "ArkanoidFontBruh.xml");

        this.load.on("complete", function()
        {
            this.scene.start("EndScene");
        }, this);
    }

}