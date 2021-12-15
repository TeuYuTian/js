class story extends Phaser.Scene {
  constructor() {
    super({
      key: "story",});
  }

  preload() {
    this.load.image('story', 'assets/story.png');

  }

  create() {
    console.log("*** story scene");

    this.add.image(0,0,'story').setOrigin(0,0);
    console.log("This is story Scene")

    // Check for spacebar or any key here
var spaceDown = this.input.keyboard.addKey("SPACE");
var enterDown = this.input.keyboard.addKey('enter');

// On spacebar event, call the world scene
spaceDown.on('down', function(){
  this.scene.start("task");
  }, this );

  enterDown.on('down', function(){
    
    console.log("Jump to world scene");
    let playerPos = {};
    playerPos.x = 1384;
    playerPos.y = 706;
    playerPos.dir = "down",
    

    this.scene.start("world", { playerPos: playerPos });
  },
  this);

  // Add any text in the main page
  this.add.text(100, 10, "Press 'spacebar' to continue,'enter' to skip", {
    font: "20px Courier",
    fill: "#FFFFFF",
  });
  }
}