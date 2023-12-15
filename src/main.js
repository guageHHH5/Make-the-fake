/*
    CMPM 120 Final Project - Make the Fake
    Game Title: Space Blaster
    Developer: Eric Wang

    Criteria Covered:
    1. Physics Systems (Arcade Physics)
    2. Text Objects (Bitmap Texts)
    3. Animation Manager (Explosion Animation)
    4. Tween Manager (Blinking Text)
    5. Timer (Timed Event to Add Enemies)
*/
let config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    width: 640,
    height: 480,
    backgroundColor: '#0000FF',
    scene: [ Menu, Credit, Tutorial, Play, GameOver],
    pixelArt: true
}


let game = new Phaser.Game(config);



//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3;

let keyEnter, keySpace, keyEsc, cursors, time, keyW, keyA, keyS, keyD, pScore;
