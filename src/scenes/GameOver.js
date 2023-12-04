class GameOver extends Phaser.Scene{
    constructor(){
        super('endScene');
    }
    preload(){
        this.load.bitmapFont('pixel', './assets/pixel.png', './assets/pixel.xml');
    }

    create(){
        this.add.bitmapText(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'pixel', 'Game Over').setOrigin(0.5);
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyEnter)){
            this.scene.start('menuScene');
            this.sound.play('sfx_select');
        }
    }
}