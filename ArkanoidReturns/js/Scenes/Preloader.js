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
        this.load.image("greenBall", "green.png");
        this.load.image("blueBall", "blue.png");
        this.load.image("redBall", "red.png");
        
        this.load.setPath("assets/img/block");
        this.load.spritesheet("silverBlock", "silver_animated.png", {frameWidth: 44, frameHeight: 22});
        this.load.image("crystalBlock", "crystal.png");  

        this.load.setPath("assets/img/item");
        this.load.spritesheet("saturnino", "Saturnino.png", {frameWidth: 44, frameHeight: 44});
        this.load.spritesheet("cone", "Cone.png", {frameWidth: 44, frameHeight: 44});
        this.load.spritesheet("triBall", "Triball.png", {frameWidth: 44, frameHeight: 44});

        this.load.setPath("assets/img/powerup");
        this.load.spritesheet("powerupE", "E.png", {frameWidth: 44, frameHeight: 22});
        this.load.spritesheet("powerupL", "L.png", {frameWidth: 44, frameHeight: 22});
        this.load.spritesheet("powerupB", "B.png", {frameWidth: 44, frameHeight: 22});
        this.load.spritesheet("powerupG", "G.png", {frameWidth: 44, frameHeight: 22});
        this.load.spritesheet("powerupD", "D.png", {frameWidth: 44, frameHeight: 22});
        this.load.spritesheet("powerupM", "M.png", {frameWidth: 44, frameHeight: 22});
        this.load.spritesheet("powerupT", "T.png", {frameWidth: 44, frameHeight: 22});
        this.load.spritesheet("powerupP", "P.png", {frameWidth: 44, frameHeight: 22});
        this.load.spritesheet("powerupS", "S.png", {frameWidth: 44, frameHeight: 22});
        this.load.spritesheet("powerupC", "C.png", {frameWidth: 44, frameHeight: 22});

        this.load.setPath("assets/img/effect");
        this.load.spritesheet("laser", "laser.png", {frameWidth: 22, frameHeight: 86});
        this.load.spritesheet("explosion", "explosion.png", {frameWidth: 16, frameHeight: 16});

        this.load.setPath("assets/img/pad");
        this.load.spritesheet("pad", "default.png", {frameWidth: 88, frameHeight:22});
        this.load.spritesheet("longPad", "long_2.png", {frameWidth: 132, frameHeight:22});

        this.load.setPath("assets/img/border");
        this.load.image("verticalPipeTileset", "vertical.png");
        this.load.image("horizontalPipeTileset", "horizontal.png");

        this.load.setPath("assets/fonts");
        this.load.bitmapFont("arkanoidFont", "ArkanoidFont.png", "ArkanoidFont.xml");
        this.load.bitmapFont("arkanoidFontBruh", "ArkanoidFontBruh.png", "ArkanoidFontBruh.xml");

        this.load.on("complete", function()
        {
            this.scene.start("MenuScene");
        }, this);
    }
}