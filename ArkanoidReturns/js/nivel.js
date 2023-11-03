class nivel extends Phaser.Scene
{
    constructor()
    {
        super({key:'nivel'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("00F");      
        this.load.image('backG','assets/img/bg.jpg');
        this.load.image('pajaro','assets/img/bird.png');   
        this.load.spritesheet('birdAnim','assets/img/birdAnim.png',
        {frameWidth:17,frameHeight:12});
    }

    create()
    { //Pinta assets en pantalla
        //this.add.image(0,0,'backG');
        //this.add.image(config.width/2,config.height/2,'backG');
        //this.bg = this.add.image(0,0,'backG').setOrigin(0);
        this.bg = this.add.tileSprite(0,0,config.width, 
            config.height,'backG').setOrigin(0);
        this.pajaro = this.add.sprite(0,0,'pajaro').setScale(5);
        this.key_right = this.input.keyboard.addKey
        (Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.cursores = this.input.keyboard.createCursorKeys();
        this.birdAnim = this.add.sprite(config.width/2,config.height/2,'birdAnim').setOrigin(.5).setScale(10);

        this.loadAnimations();
        this.birdAnim.anims.play('fly');
    }

    loadAnimations()
    {
        this.anims.create(
            {
                key: 'fly',
                frames:this.anims.generateFrameNumbers('birdAnim',
                {start:0,end:2}),
                frameRate:1,
                yoyo:true,
                repeat:-1
            }
        )
    }

    update()
    { //Actualiza whatever  
        this.bg.tilePositionX +=1;
        //this.pajaro.angle +=10;
        //this.pajaro.scale *=.99;
        if(this.cursores.right.isDown)
        {
            this.pajaro.x +=1;
        }
        if(this.cursores.left.isDown)
        {
            this.pajaro.x -=1;
        }
        if(this.cursores.up.isDown)
        {
            this.pajaro.y -=1;
        }
        if(this.cursores.down.isDown)
        {
            this.pajaro.y +=1;
        }
    }
}