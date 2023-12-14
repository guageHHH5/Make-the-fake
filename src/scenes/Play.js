class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
    }

    preload(){
        this.load.image('ship', './assets/player.png');
        this.load.image('boolet', './assets/bullet.png');
        this.load.image('eboolet', './assets/ebullet.png');
        this.load.image('enemy', './assets/enemy.png');
        this.load.image('fH', './assets/heart-filled.png');
        this.load.image('eH', './assets/heart-empty.png');
        this.load.image('ufo', './assets/ufo.png');
    }
    create(){
        this.dead = false;
        this.player = this.physics.add.image(320, 415, 'ship').setOrigin(0.5);
        this.player.body.setCollideWorldBounds(true);
        this.PLAYER_VELOCITY = 350;
        
        this.life = 4;
        //console.log(this.life);

        this.heart1 = this.physics.add.image(600, 50, 'fH').setOrigin(0.5);
        this.heart2 = this.physics.add.image(583, 50, 'fH').setOrigin(0.5);   
        this.heart3 = this.physics.add.image(566, 50, 'fH').setOrigin(0.5);
        this.heart4 = this.physics.add.image(549, 50, 'fH').setOrigin(0.5);

        this.moveSpeed = 480;

        cursors = this.input.keyboard.createCursorKeys();
        
        this.input.keyboard.on('keydown-SPACE', this.shoot, this);

        //this.enemy1 = this.physics.add.sprite(150, 0, 'enemy').setOrigin(0.5);

        this.enemies = this.add.group();
        this.enemyBullet = this.add.group();

        this.time.addEvent({
            delay: 850,
            callback: function() {
                this.enemy = new Enemy(
                    this,
                    Phaser.Math.Between(0, game.config.width),
                    0
                );
                this.enemies.add(this.enemy);
            },
            callbackScope: this,
            loop: true
        });
    }

    explode(player, enemy1){
        //this.dead = true;
        //this.player.disableBody(true, true);
        //
        this.life--;
        console.log(this.life);
        //player.scene.scene.start('endScene');
    }

    shoot(){
        this.bullet = this.physics.add.image(this.player.x, this.player.y, "boolet").setScale(1.5);
        this.bullet.setVelocityY(-600);
        //this.physics.add.collider(this.bullet, this.enemy1, this.destroyEnemy(this.bullet, this.enemy1),null, this);
        //this.physics.add.collider(this.bullet, this.enemy2, this.destroyEnemy(),null, this);
        //this.physics.add.collider(this.bullet, this.enemy3, this.destroyEnemy(),null, this);
    }

    destroyEnemy(){
        this.bullet.disableBody(true, true);
        this.enemies.disableBody(true, true)
    }

    update(){
        
        if(cursors.left.isDown){
            this.player.setVelocityX(-250);
        }
        else if(cursors.right.isDown){
            this.player.setVelocityX(250);
        }
        else{
            this.player.setVelocityX(0);
        }

        if(cursors.up.isDown){
            this.player.setVelocityY(-250);
        }
        else if(cursors.down.isDown){
            this.player.setVelocityY(250);
        }
        else{
            this.player.setVelocityY(0);
        }

        this.player.body.velocity.normalize().scale(250);

        //this.enemy1.y += 3.2;

        //wrap
        // if(this.enemy1.y >= 480){
        //     this.enemy1.y = 0;
        // }

        this.physics.overlap(this.player, this.enemies,this.explode);
    }
    
}


