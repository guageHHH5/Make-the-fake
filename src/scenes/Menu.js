class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }
    preload(){
        this.load.bitmapFont('pixel', './assets/pixel.png', './assets/pixel.xml');
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_start', 'assets/gameStart.mp3');
        this.load.audio('menu', 'assets/menubgm.mp3');
        
    }

    create(){
        console.log('press (z) to turn on debug mode');
        this.physics.world.drawDebug = false;
        this.toggleDebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);


        this.music = this.sound.add('menu');
        this.music.play();
        this.music.setLoop(true);
        
        this.add.bitmapText(game.config.width/2, game.config.height/2.5 - borderUISize - borderPadding,'pixel', 'Space Blaster').setScale(0.4).setOrigin(0.5);
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.add.bitmapText(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,'pixel', 'A project by Eric Wang').setScale(0.25).setOrigin(0.5);

        this.add.bitmapText(10, game.config.height/1.5 - borderUISize - borderPadding,'pixel', '[ENTER] to begin').setScale(0.25);
        this.add.bitmapText(10, game.config.height/1.395 - borderUISize - borderPadding,'pixel', '[RIGHT] to review tutorial').setScale(0.25);
        this.add.bitmapText(10, game.config.height/1.3 - borderUISize - borderPadding,'pixel', '[LEFT] to review credits').setScale(0.25);
        
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    getMusic(){
        return this.music;
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
            this.sound.play('sfx_start');
            this.scene.start('playScene');
            this.music.stop();
        }
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            this.sound.play('sfx_select');
            this.scene.start('creditScene');
            this.music.pause();
        }
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.sound.play('sfx_select');
            this.scene.start('tutorialScene');
            this.music.pause();
        }
    }
}