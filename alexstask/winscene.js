class winscene extends Phaser.Scene {
  constructor() {
    super({
      key: "winscene",});
  }

  preload() {
    // Preload all the assets here
    // Preload any images here
    this.load.image('winscene', 'assets/winscene.png');

  }

  create() {
    console.log("*** winscene scene");

    window.star = 0
    window.heart = 5
    this.add.image(0,0,'winscene').setOrigin(0,0);
    console.log("This is win Scene")


    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music


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
        
   
        this.scene.start("main", { playerPos: playerPos });
      },
      this
    );

    // Create all the game animations here
  }
}