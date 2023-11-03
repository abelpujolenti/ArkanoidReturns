class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key:'gameState'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("0F0");      
        this.load.image('backG','assets/img/grass.png');
        this.load.spritesheet('hero','assets/img/link.png',
        {frameWidth:120,frameHeight:130});
    }

    create()
    { //Pinta assets en pantalla
        this.bg = this.add.tileSprite(0,0,config.width, 
            config.height,'backG').setOrigin(0);
        this.cursores = this.input.keyboard.createCursorKeys();
        this.hero = this.add.sprite(config.width/2,config.height/2,
        'hero').setOrigin(.5);

        this.loadAnimations();        
    }

    loadAnimations()
    {
        this.anims.create(
            {
                key: 'link_down',
                frames:this.anims.generateFrameNumbers('hero', {start:0, end: 9}),
                frameRate: 10,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'link_left',
                frames:this.anims.generateFrameNumbers('hero', {start:10, end: 19}),
                frameRate: 10,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'link_up',
                frames:this.anims.generateFrameNumbers('hero', {start:20, end: 29}),
                frameRate: 10,
                repeat: -1
            });  
        this.anims.create(
            {
                key: 'link_right',
                frames:this.anims.generateFrameNumbers('hero', {start:30, end: 39}),
                frameRate: 10,
                repeat: -1
            });  
    }

    update()
    { //Actualiza whatever  
        //OPCION 1
        /*
        if(this.cursores.right.isDown)
        {
            this.hero.anims.play('link_right',true);
            this.bg.tilePositionX +=config.HEROSPEED;
        }else
        if(this.cursores.left.isDown)
        {
            this.hero.anims.play('link_left',true);
            this.bg.tilePositionX -=config.HEROSPEED;
        } else
        if(this.cursores.up.isDown)
        {
            this.hero.anims.play('link_up',true);        
            this.bg.tilePositionY -=config.HEROSPEED;
        }else
        if(this.cursores.down.isDown)
        {
            this.hero.anims.play('link_down',true);            
            this.bg.tilePositionY +=config.HEROSPEED;
        }else
        {
            this.hero.setFrame(0);
        }
        */
        //OPCION 2
        if(this.cursores.right.isDown)
        {
            this.hero.anims.play('link_right',true);
            this.hero.x +=config.HEROSPEED;
        }else
        if(this.cursores.left.isDown)
        {
            this.hero.anims.play('link_left',true);
            this.hero.x -=config.HEROSPEED;
        } else
        if(this.cursores.up.isDown)
        {
            this.hero.anims.play('link_up',true);        
            this.hero.y -=config.HEROSPEED;
        }else
        if(this.cursores.down.isDown)
        {
            this.hero.anims.play('link_down',true);            
            this.hero.y +=config.HEROSPEED;
        }else
        {
            this.hero.setFrame(0);
        }
        
    }
}