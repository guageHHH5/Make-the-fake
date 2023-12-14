class playerBullet extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.x = x;
        this.y = y;
        this.bullet = this.scene.physics.add.sprite(x, y, 'boolet').setScale(1.5);
        this.bullet.body.velocity.y = -600;
    }
}