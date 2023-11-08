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
        
        this.pad = new Pad(this, 10, 10, 'hero');
       
    }

    loadAnimations()
    {
        
    }

    update()
    { //Actualiza whatever  
        
    }
}