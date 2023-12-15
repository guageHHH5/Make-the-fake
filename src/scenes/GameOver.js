class GameOver extends Phaser.Scene{
    constructor(){
        super('endScene');
    }
    preload(){
        this.load.bitmapFont('pixel', './assets/pixel.png', './assets/pixel.xml');
        this.load.audio('over', 'assets/gameOver.mp3');
    }

    create(){
        this.physics.world.drawDebug = false;
        this.toggleDebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        this.sfx = this.sound.add('over', {volume: 0.35});
        this.sfx.play();
        this.add.bitmapText(game.config.width/2, game.config.height/2.3 - borderUISize - borderPadding,'pixel', 'Game Over :(').setScale(0.4).setOrigin(0.5);
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.add.bitmapText(game.config.width/2.5, game.config.height/1.8 - borderUISize - borderPadding,'pixel', 'Your score is: ').setScale(0.27).setOrigin(0.5);
        this.scoreText = this.add.bitmapText(game.config.width/1.45, game.config.height/1.8 - borderUISize - borderPadding,'pixel', pScore).setScale(0.27).setOrigin(0.5);

        this.scoreText.textTween = this.tweens.add({
            targets: this.scoreText,
            duration: 50,
            repeat: -1,
            yoyo: true,
            alpha: 0,
        })

        this.add.bitmapText(game.config.width/1.4, game.config.height - borderUISize - borderPadding,'pixel', '[ENTER] => restart').setScale(0.13);
        this.add.bitmapText(10, game.config.height - borderUISize - borderPadding,'pixel', '[ESC] => Main Menu').setScale(0.13);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.toggleDebug)){
            if(this.physics.world.drawDebug){
                this.physics.world.drawDebug = false;
                this.physics.world.debugGraphic.clear();
            } else {
                this.physics.world.drawDebug = true;
            }
        }
        
        if(Phaser.Input.Keyboard.JustDown(keyEnter)){
            this.scene.start('playScene');
            this.sound.play('sfx_start');
        }
        if(Phaser.Input.Keyboard.JustDown(keyEsc)){
            this.scene.start('menuScene');
            this.sound.play('sfx_select');
        }
    }
}