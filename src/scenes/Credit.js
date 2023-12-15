class Credit extends Phaser.Scene{
    constructor(){
        super('creditScene');
    }
    preload(){
        this.load.bitmapFont('pixel', './assets/pixel.png', './assets/pixel.xml');
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_start', 'assets/gameStart.mp3');
        this.load.audio('menu', 'assets/menubgm.mp3');
        
    }

    create(){
        this.physics.world.drawDebug = false;
        this.toggleDebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        
        const Menu = this.scene.get('menuScene');

        this.music = Menu.getMusic();
        this.music.resume();
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.add.bitmapText(game.config.width/2, game.config.height/6.5 - borderUISize - borderPadding,'pixel', 'Credits').setScale(0.4).setOrigin(0.5);
        this.add.bitmapText(10, game.config.height/4.5 - borderUISize - borderPadding,'pixel', '- Player, enemy, health, font assets created by Eric Wang').setScale(0.13);
        this.add.bitmapText(10, game.config.height/3.5 - borderUISize - borderPadding,'pixel', '- Sound effect + music are royalty free from Pixabay').setScale(0.13);
        this.add.bitmapText(10, game.config.height/2.8 - borderUISize - borderPadding,'pixel', '- Particle asset from Kenny\'s particle pack').setScale(0.13);
        this.add.bitmapText(10, game.config.height/2.3 - borderUISize - borderPadding,'pixel', '- Explosion effect found on google \n(I do not remember the exact place)').setScale(0.13);

        this.add.bitmapText(game.config.width/1.3, game.config.height - borderUISize - borderPadding,'pixel', 'Eric Wang, 2023').setScale(0.13);
        this.add.bitmapText(10, game.config.height - borderUISize - borderPadding,'pixel', '[ESC] to return to Main Menu').setScale(0.13);
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

        if(Phaser.Input.Keyboard.JustDown(keyEsc)){
            this.sound.play('sfx_select');
            this.scene.start('menuScene');
            this.music.pause();
        }
    }
}