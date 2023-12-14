class EnemyBullet extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.x = x;
        this.y = y;
        this.bullet = this.scene.physics.add.sprite(x, y + 5, 'eboolet').setScale(1.5);
        this.bullet.body.velocity.y = 300;
    }
}