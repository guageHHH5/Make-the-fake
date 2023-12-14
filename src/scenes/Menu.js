class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }
    preload(){
        this.load.bitmapFont('pixel', './assets/pixel.png', './assets/pixel.xml');
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_start', 'assets/gameStart.mp3');
        
    }

    create(){
        this.add.bitmapText(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'pixel', 'Space Blaster').setOrigin(0.5);
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyEnter)){
            this.sound.play('sfx_start');
            this.scene.start('playScene');
        }
    }
}