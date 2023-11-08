class nivel extends Phaser.Scene
{
    constructor()
    {
        super({key:'nivel'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("00F");      
        this.load.image('pajaro','assets/img/bird.png');   
    }

    create()
    { //Pinta assets en pantalla

        this.pad = new Pad(this, 10, 10, 'pajaro');
    }

    update()
    {
    }
}