class UFO extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, pointValue = 300){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.points = pointValue;
        this.x = x;
        this.y = y;
        this.enemy = this.scene.physics.add.sprite(x, y, 'ufo');
        this.enemy.body.velocity.x = 200;

        this.shoot = this.scene.time.addEvent({
            delay: 1005,
            callback: function() {
                let bullet = new EnemyBullet(
                    this.scene,
                    this.enemy.x,
                    this.enemy.y
                );
                scene.enemyBullet.add(bullet);
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