class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        //this.points = pointValue;
        this.x = x;
        this.y = y;
        this.enemy = this.scene.physics.add.sprite(x, y, 'enemy');
        this.enemy.body.velocity.y = Phaser.Math.Between(100, 250);

        this.shoot = this.scene.time.addEvent({
            delay: 850,
            callback: function() {
                this.bullet = this.scene.physics.add.image(this.enemy.x, this.enemy.y + 5, "eboolet").setScale(1.5);
                this.bullet.body.velocity.y = 300;
            },
            callbackScope: this,
            loop: true
        });
    }

    onDestroy(){
        if(this.shoot != undefined){
            if(this.shoot){
                this.shoot.remove(false);
            }
        }
    }
}