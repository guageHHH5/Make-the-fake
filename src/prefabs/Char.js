class Char extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, type){
        super(scene, x, y, key);
        
        //let body = Phaser.Physics.Arcade.Body;
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData('type', type);
        this.setData('dead', false);

    }
}

class EnemyBullet extends Char{
    constructor(scene, x, y){
        super(scene, x, y + 5, 'eboolet');
        this.body.velocity.y = 300;
    }
}

class Explosion extends Char{
    constructor(scene, x, y){
        super(scene, x, y, 'explosion');
        scene.add.existing(this);
        this.play('spriteExplode');
    }
}

class playerBullet extends Char{
    constructor(scene, x, y){
        super(scene, x, y, 'boolet');
        this.body.velocity.y = -600;
    }
}

class Enemy extends Char{
    constructor(scene, x, y, pointValue = 100){
        super(scene, x, y, 'sprEnemy', 'enemy');
        //scene.add.existing(this);
        this.points = pointValue;
        //this.enemy = this.scene.physics.add.sprite(x, y, 'enemy');
        this.body.velocity.y = Phaser.Math.Between(100, 250);

        this.shoot = this.scene.time.addEvent({
            delay: 850,
            callback: function() {
                let bullet = new EnemyBullet(
                    this.scene,
                    this.x,
                    this.y
                );
                //this.shooting.play();
                bullet.setScale(1.5);
                this.scene.sfx.eBullet.play();
                this.scene.enemyBullet.add(bullet);
            },
            callbackScope: this,
            loop: true
        });
    }

    onDestroy(){
        if(this.shoot !== undefined){
            if(this.shoot){
                this.shoot.remove(false);
            }
        }
    }
}

class UFO extends Char{
    constructor(scene, x, y, pointValue = 300){
        super(scene, x, y, 'sprUfo', 'ufo');
        this.points = pointValue;
        //this.x = x;
        //this.y = y;
        //this.enemy = this.scene.physics.add.sprite(x, y, 'ufo');
        this.body.velocity.x = 200;

        this.shoot = this.scene.time.addEvent({
            delay: 1005,
            callback: function() {
                var bullet = new EnemyBullet(
                    this.scene,
                    this.x,
                    this.y
                );
                this.scene.sfx.eBullet.play();
                bullet.setScale(1.5);
                this.scene.enemyBullet.add(bullet);
            },
            callbackScope: this,
            loop: true
        });
    }

    onDestroy(){
        if(this.shoot !== undefined){
            if(this.shoot){
                this.shoot.remove(false);
            }
        }
    }
}