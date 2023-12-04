class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        //this.points = pointValue;
        this.moveSpeed = 550;
    }
    update(){
        //move spaceship left
        this.y = this.moveSpeed;

        //wrap
        if(this.y <= 0 - this.height){
            this.y = game.config.height;
        }
    }

    reset(){
        this.x = game.config.height;
    }
}