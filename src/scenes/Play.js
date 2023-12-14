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
        this.load.audio('pSh', 'assets/pSh.mp3');
        this.load.audio('eSh', 'assets/eSh.mp3');
        this.load.audio('eDie', 'assets/eDie.mp3');
    }
    create(){
        this.sfx = {
            explosion: this.sound.add('eDie', {volume: 0.6}),
            eBullet: this.sound.add('eSh'),
            pBullet: this.sound.add('pSh')
        };

        let pScore = 0;
         
        this.enemies = this.add.group();
        //this.enemies = enemies;
        this.enemyBullet = this.add.group();
        let pBullet = this.add.group();

        this.dead = false;
        // this.player = new Player(
        //     this, 
        //     320, 
        //     415,
        //     'ship'
        // );
        this.player = this.physics.add.image(320, 415, 'ship').setOrigin(0.5);
        this.player.body.setCollideWorldBounds(true);
        this.PLAYER_VELOCITY = 350;
        
        let health = 4;
        this.health = health;
        console.log(health);
        this.lifeGauge();
        let isPlayerHurt = false;
        

        this.moveSpeed = 480;

        cursors = this.input.keyboard.createCursorKeys();
        
        this.input.keyboard.on('keydown-SPACE', function(){
            let bullet = new playerBullet(
                this,
                this.player.x,
                this.player.y
            );
            this.sfx.pBullet.play();
            pBullet.add(bullet);
        //     this.physics.add.collider(bullet, enemies, function(){
        //         if(enemies){
        //             if(enemies.onDestroy !== undefined){
        //                 enemies.onDestroy();
        //             }
    
        //             enemies.destroy();
        //             bullet.destroy();
        //         }
        //     }
        // );
        }, this);

        //this.enemy1 = this.physics.add.sprite(150, 0, 'enemy').setOrigin(0.5);

       

        this.time.addEvent({
            delay: 850,
            callback: function() {
                let enemy = new Enemy(
                    this,
                    Phaser.Math.Between(0, game.config.width),
                    0,
                    //100
                );
                this.enemies.add(enemy);
            },
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 5000,
            callback: function() {
                let ufo = new UFO(
                    this,
                    null,
                    100,
                    //300
                );
                this.enemies.add(ufo);
            },
            callbackScope: this,
            loop: true
        });



        // this.physics.add.collider(pBullet, enemies, function(/*bullet, enemy*/){
        //     if(enemies){
        //         if(enemies.onDestroy() !== undefined){
        //             enemies.onDestroy();
        //         }

        //         enemies.destroy(true);
        //         pBullet.destroy(true);
        //     }
        // }, null, this);

        this.physics.add.overlap(this.player, this.enemies,function(enemy){
            //this.health = health;
            if(!isPlayerHurt){
                health -= 1;
                isPlayerHurt = true;
                console.log(health);
                
                this.time.delayedCall(1000, function() {
                    isPlayerHurt = false;
                }, null, this);
                this.updatelifeGauge(health);
            }
            enemy.destroy()
        },null, this);
        
    }


    // explode(player, enemy1){
    //     //this.dead = true;
    //     //this.player.disableBody(true, true);
    //     //
    //     this.life--;
    //     console.log(this.life);
    //     //player.scene.scene.start('endScene');
    // }

    shoot(){
        this.bullet = this.physics.add.image(this.player.x, this.player.y, "boolet").setScale(1.5);
        this.bullet.setVelocityY(-600);
        //this.physics.add.collider(this.bullet, this.enemy1, this.destroyEnemy(this.bullet, this.enemy1),null, this);
        //this.physics.add.collider(this.bullet, this.enemy2, this.destroyEnemy(),null, this);
        //this.physics.add.collider(this.bullet, this.enemy3, this.destroyEnemy(),null, this);
    }

    // destroyEnemy(){
    //     this.bullet.disableBody(true, true);
    //     this.enemies.disableBody(true, true)
    // }

    lifeGauge(){
        this.heart1 = this.physics.add.image(600, 50, 'fH').setOrigin(0.5);
        this.heart2 = this.physics.add.image(583, 50, 'fH').setOrigin(0.5);   
        this.heart3 = this.physics.add.image(566, 50, 'fH').setOrigin(0.5);
        this.heart4 = this.physics.add.image(549, 50, 'fH').setOrigin(0.5);
    }

    updatelifeGauge(health){
        if(health === 3){
            this.heart1.setTexture('eH');
        }
        else if(health === 2){
            this.heart1.setTexture('eH');
            this.heart2.setTexture('eH');
        } else if(health === 1){
            this.heart1.setTexture('eH');
            this.heart2.setTexture('eH');
            this.heart3.setTexture('eH');
            //this.heart4.setTexture('eH');
        } else {
            this.heart1.setTexture('eH');
            this.heart2.setTexture('eH');
            this.heart3.setTexture('eH');
            this.heart4.setTexture('eH');
        }
    }

    update(){
        //this.player.update();

        if(cursors.left.isDown){
            this.player.setVelocityX(-250);
        }
        else if(cursors.right.isDown){
            this.player.setVelocityX(250);
        } else{
            this.player.setVelocityX(0);
        }

        if(cursors.up.isDown){
            this.player.setVelocityY(-250);
        }
        else if(cursors.down.isDown){
            this.player.setVelocityY(250);

        } else {
            this.player.setVelocityY(0);
        }

        this.player.body.velocity.normalize().scale(250);
        //this.enemy1.body.velocity.y = 250;

        //this.enemy1.y += 3.2;

        //wrap
        // if(this.enemy1.y >= 480){
        //     this.enemy1.y = 0;
        // }

        // if(this.enemies.x < -this.enemies.displayWidth || 
        //     this.enemies.x > this.game.config.width + this.enemies.displayWidth || 
        //     this.enemies.y < -this.enemies.displayHeight * 4 || 
        //     this.enemies.y > this.game.config.height + this.enemies.displayHeight) {
        //         if(this.enemies){
        //             if(this.enemies.onDestroy != undefined){
        //                 enemies.onDestroy();
        //             }

        //             this.enemies.destroy();
        //         }
        // }

        for(var i = 0; i < this.enemyBullet.getChildren().length; i++){
            this.bullet = this.enemyBullet.getChildren()[i];
            this.bullet.update();

            if(this.enemyBullet.x < -this.enemyBullet.displayWidth ||
                this.enemyBullet.x > this.game.config.width + this.enemyBullet.displayWidth ||
                this.enemyBullet.y < -this.enemyBullet.displayHeight * 4 ||
                this.enemyBullet.y > this.game.config.height + this.enemyBullet.displayHeight) {
                    if (this.bullet) {
                        this.bullet.destroy();
                    }
                }
        }
        
        
        // this.enemies.children.iterate(function (enemy) {
        //     console.log(enemy); // Output each enemy in the console
        // });
        
        // console.log(this.enemies.getLength());
    }
    
}


