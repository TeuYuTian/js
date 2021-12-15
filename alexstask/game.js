var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 25,
    height: 32 * 17,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [main, story, task, rules, control, world, room1 ,room2 ,room3, room4, room5, room6, hunterroom, gameover, winscene]
};

var game = new Phaser.Game(config);
window.heart = 5;
window.star = 0;
