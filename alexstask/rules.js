class rules extends Phaser.Scene {
  constructor() {
    super({
      key: "rules",});
  }

  preload() {
    this.load.image('rules', 'assets/rules.png');

  }

  create() {
    console.log("*** rules scene");

    this.add.image(0,0,'rules').setOrigin(0,0);
    console.log("This is rules Scene")

   // Check for spacebar or any key here
var spaceDown = this.input.keyboard.addKey("SPACE");
var enterDown = this.input.keyboard.addKey('enter');

// On spacebar event, call the world scene
spaceDown.on('down', function(){
  this.scene.start("control");
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

  //add text
  this.add.text(100, 10, "Press 'spacebar' to continue,'enter' to skip", {
    font: "20px Courier",
    fill: "#FFFFFF",
  });
  }
}