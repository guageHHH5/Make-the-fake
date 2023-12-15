class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
    }
    
    preload(){
        this.load.spritesheet('ship', './assets/playerSprite.png',{
            frameWidth: 27.5,
            frameHeight: 26
        });
        this.load.bitmapFont('pixel', './assets/pixel.png', './assets/pixel.xml');
        this.load.image('boolet', './assets/bullet.png');
        this.load.image('eboolet', './assets/ebullet.png');
        this.load.image('sprEnemy', './assets/enemy.png');
        this.load.image('fH', './assets/heart-filled.png');
        this.load.image('eH', './assets/heart-empty.png');
        this.load.image('sprUfo', './assets/ufo.png');
        this.load.audio('pSh', 'assets/pSh.mp3');
        this.load.audio('eSh', 'assets/eSh.mp3');
        this.load.audio('eDie', 'assets/eDie.mp3');
        this.load.audio('pDie', 'assets/pDie.mp3');
        this.load.audio('bgm', 'assets/bgm.mp3');
        this.load.spritesheet('sprExplosion', 'assets/spritesheets/sprExplosion.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.image('smoke', 'assets/whitePuff00.png' );
    }
    create(){
        this.physics.world.drawDebug = false;
        this.toggleDebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        //add sound effects
        let eHit = this.sound.add('eDie', {volume: 0.15});
        this.sfx = {
            eBullet: this.sound.add('eSh', {volume: 0.25}),
            pBullet: this.sound.add('pSh')
        };
        
        let pHit = this.sound.add('pDie', {volume: 0.65});
        
        //initialize score
        pScore = 0;
        
        //add music and play
        this.music = this.sound.add('bgm');
        this.music.play();
        this.music.setLoop(true);

        this.music.setVolume(0.45);
        
        //initialize game object groups
        this.enemies = this.add.group();
        this.enemyBullet = this.add.group();
        this.pBullet = this.add.group();
        
        //initialize player
        this.player = this.physics.add.sprite(320, 415, 'ship', 1).setOrigin(0.5);
        this.player.body.setCollideWorldBounds(true);
        
        //create explosion animation
        this.anims.create({
            key: 'spriteExplode',
            frames: this.anims.generateFrameNumbers('sprExplosion', {start: 0, end: 16}),
            frameRate: 20,
            repeat: -1
        });

        //initialize misc variables
        var health = 4;
        this.health = health;
        this.lifeGauge();
        let isPlayerHurt = false;
        let dead = false;
        this.dead = dead;
        this.moveSpeed = 480;

        //add score and life texts
        let lifetext = this.add.bitmapText(520, 50, 'pixel', health).setScale(0.2).setOrigin(0.5);
        let scoreText = this.add.bitmapText(160, 50, 'pixel', pScore).setScale(0.2).setOrigin(0.5);
        this.score = this.add.bitmapText(50, 50, 'pixel', 'Score:').setScale(0.2).setOrigin(0.5);

        //create keys
        cursors = this.input.keyboard.createCursorKeys();
        
        //shoot
        this.input.keyboard.on('keydown-SPACE', function(){
            let bullet = new playerBullet(
                this,
                this.player.x,
                this.player.y
            );
            this.sfx.pBullet.play();
            this.pBullet.add(bullet);
        }, this);
        
        //create normal enemies
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

        //create UFO
        this.time.addEvent({
            delay: 5000,
            callback: function() {
                var ufo = new UFO(
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

        
        //collider for hitting enemies
        this.physics.add.collider(this.pBullet, this.enemies, function(bullet, enemy){
            if(enemy){
                if(enemy.onDestroy !== undefined){
                    enemy.onDestroy();
                }
                eHit.play();
                //this.onHit();
                if(enemy.data.values.type == 'ufo'){
                    pScore += 300;
                } else {
                    pScore += 100;
                }
    
                
                enemy.anims.play('spriteExplode');
                
                scoreText.setText(pScore);
                
                enemy.once('animationcomplete', ()=>{
                    
                    enemy.destroy();
                    
                });
                
                bullet.destroy();
            }
        }, null, this);

        //collider for enemies hitting the player
        this.physics.add.overlap(this.player, this.enemies,function(player, enemy){
            
            if(!isPlayerHurt){
                health -= 1;
                isPlayerHurt = true;
                pHit.play();
                
                
                this.time.delayedCall(950, function() {
                    isPlayerHurt = false;
                }, null, this);
                this.updatelifeGauge(health);
                
                if(health == 0){
                    this.dead = true;
                }
            }
            lifetext.setText(health);
            enemy.setVisible(false);
            
        },null, this);

        //collider for enemy bullets hitting the player
        this.physics.add.overlap(this.player, this.enemyBullet,function(player, bullet){
            
            if(!isPlayerHurt){
                health -= 1;
                isPlayerHurt = true;
                
                pHit.play();
                this.time.delayedCall(500, function() {
                    isPlayerHurt = false;
                }, null, this);
                this.updatelifeGauge(health);
                
                if(health == 0){
                    this.dead = true;
                }
                lifetext.setText(health);
            }
            
            

            bullet.setVisible(false);
        },null, this);

        //another text
        this.Ltext = this.add.bitmapText(475, 50, 'pixel', 'Life:').setScale(0.2).setOrigin(0.5);
        
    }



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
        } else {
            this.heart1.setTexture('eH');
            this.heart2.setTexture('eH');
            this.heart3.setTexture('eH');
            this.heart4.setTexture('eH');
        }
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

        for(var i = 0; i < this.enemies.getChildren().length; i++){
            var enemy = this.enemies.getChildren()[i];
            enemy.update();

            if(enemy.x < -enemy.displayWidth || 
                enemy.x > this.game.config.width + enemy.displayWidth || 
                enemy.y < -enemy.displayHeight * 4 || 
                enemy.y > this.game.config.height + enemy.displayHeight) {
                    if(enemy){
                        if(enemy.onDestroy != undefined){
                            enemy.onDestroy();
                        }

                        enemy.destroy();
                    }
            }
        }
        for(var i = 0; i < this.enemyBullet.getChildren().length; i++){
            var bullet = this.enemyBullet.getChildren()[i];
            bullet.update();

            if(bullet.x < -bullet.displayWidth ||
                bullet.x > this.game.config.width + bullet.displayWidth ||
                bullet.y < -bullet.displayHeight * 4 ||
                bullet.y > this.game.config.height + bullet.displayHeight) {
                    if (bullet) {
                        bullet.destroy();
                    }
                }
        }

        for (var i = 0; i < this.pBullet.getChildren().length; i++) {
            var bullet = this.pBullet.getChildren()[i];
            bullet.update();
            if (bullet.x < -bullet.displayWidth ||
              bullet.x > this.game.config.width + bullet.displayWidth ||
              bullet.y < -bullet.displayHeight * 4 ||
              bullet.y > this.game.config.height + bullet.displayHeight) {
              if (bullet) {
                bullet.destroy();
              }
            }
          }
        
        if(this.dead == true){
            this.music.stop();
            this.scene.start('endScene');
        }
    }
    
}


