class gameover extends Phaser.Scene {
  constructor() {
    super({
      key: "gameover",});
  }

  preload() {
    // Preload all the assets here
    // Preload any images here
    this.load.image('gameover', 'assets/gameover.png');

  }

  create() {
    console.log("*** gameover scene");

    window.music.stop();

    this.music = this.sound
    .add("fail",{
      loop: false,
    })
    .setVolume(0.1)
    this.music.play();

    window.star = 0
    window.heart = 5
    this.add.image(0,0,'gameover').setOrigin(0,0);
    console.log("This is gameover Scene")

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on("down",
      function () {
        console.log("Jump to world scene");
        let playerPos = {};
        playerPos.x = 1384;
        playerPos.y = 706;
        playerPos.dir = "down",
        
   
        this.scene.start("world", { playerPos: playerPos });
        window.music.play();
      },
      this
    );

    // Create all the game animations here
  }
}