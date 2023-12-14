/*
    Star Rush, a game by Eric Wang
    Spent Approximately 30+ hours including initial structure, algorithms, as well as debugging
    As for the creative tilt, I dont know anymore, I'm tired, but I think I hit 85-90% of the criteria
*/
let config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    width: 640,
    height: 480,
    backgroundColor: '#0000FF',
    scene: [ Menu, Play, GameOver],
    pixelArt: true

}


let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3;

let keyEnter, keySpace, keyEsc, cursors, time, keyW, keyA, keyS, keyD;
