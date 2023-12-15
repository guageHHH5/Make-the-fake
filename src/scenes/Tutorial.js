class Tutorial extends Phaser.Scene{
    constructor(){
        super('tutorialScene');
    }
    preload(){
        this.load.bitmapFont('pixel', './assets/pixel.png', './assets/pixel.xml');
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_start', 'assets/gameStart.mp3');
        this.load.audio('menu', 'assets/menubgm.mp3');
        this.load.image('sprEnemy', './assets/enemy.png');
        this.load.image('sprUfo', './assets/ufo.png');
        
    }

    create(){
        this.physics.world.drawDebug = false;
        this.toggleDebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        const Menu = this.scene.get('menuScene');

        this.music = Menu.getMusic();
        this.music.resume();

        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.add.bitmapText(game.config.width/2, game.config.height/6.5 - borderUISize - borderPadding,'pixel', 'Tutorial').setScale(0.4).setOrigin(0.5);

        this.enemy = this.physics.add.sprite(150, 140, 'sprEnemy').setScale(1.7);
        this.ufo = this.physics.add.sprite(470, 140, 'sprUfo').setScale(1.7);

        this.add.bitmapText(150, 175,'pixel', 'A normal enemy gives \nyou 100 points!').setScale(0.11).setOrigin(0.5);
        this.add.bitmapText(470, 175,'pixel', 'An UFO gives \nyou 300 points!').setScale(0.11).setOrigin(0.5);

        this.add.bitmapText(10, game.config.height/1.5 - borderUISize - borderPadding,'pixel', 'Arrow keys to move\n[SPACE] to shoot\nDodge the bullets\nGet as high of a score as you can\nBefore life depletes!').setScale(0.25);



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
            this.music.stop();
        }
    }
}