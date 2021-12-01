class main extends Phaser.Scene {
  constructor() {
    super({
      key: "main",
    });

    // Put global variable here
  }

  preload() {
    // Preload all the assets here
      // intro
      this.load.image('intro', 'assets/startScene.png');
  
  // enemy ( dog/hunter )
  this.load.atlas('dog', 'assets/dog-left.png', 'assets/dog-left.json')
  // this.load.atlas('hunter-left', 'assets/hunter-left.png', 'assets/hunter-left.json')


  this.load.atlas( 'left', 'assets/left.png', 'assets/left.json');
  this.load.atlas( 'right', 'assets/right.png', 'assets/right.json');
  this.load.atlas( 'up', 'assets/up.png', 'assets/up.json');
  this.load.atlas( 'down', 'assets/down.png', 'assets/down.json');


  }

  create() {
    console.log("*** main scene");

    this.add.image(0,0,'intro').setOrigin(0,0);
    console.log("This is introScene")

    this.anims.create({
      key: 'left',
      frames: [
        { key: 'left', frame: 'left_13'},
        { key: 'left', frame: 'left_14'},
        { key: 'left', frame: 'left_15'},
        { key: 'left', frame: 'left_16'},
        { key: 'left', frame: 'left_17'},
        { key: 'left', frame: 'left_18'},
        { key: 'left', frame: 'left_19'},
        { key: 'left', frame: 'left_20'},
        { key: 'left', frame: 'left_21'},
      ],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: [
        { key: 'right', frame: 'right_13'},
        { key: 'right', frame: 'right_14'},
        { key: 'right', frame: 'right_15'},
        { key: 'right', frame: 'right_16'},
        { key: 'right', frame: 'right_17'},
        { key: 'right', frame: 'right_18'},
        { key: 'right', frame: 'right_19'},
        { key: 'right', frame: 'right_20'},
        { key: 'right', frame: 'right_21'}, 
      ],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'up',
      frames: [
        { key: 'up', frame: 'up-07'},
        { key: 'up', frame: 'up-08'},
        { key: 'up', frame: 'up-09'},
        { key: 'up', frame: 'up-10'},
        { key: 'up', frame: 'up-11'},
        { key: 'up', frame: 'up-12'},
      ],
      frameRate: 10,
      repeat: -1
    })

     this.anims.create({
      key: 'down',
      frames: [
        { key: 'down', frame: 'down-01'},
        { key: 'down', frame: 'down-02'},
        { key: 'down', frame: 'down-03'},
        { key: 'down', frame: 'down-04'},
        { key: 'down', frame: 'down-05'},
        { key: 'down', frame: 'down-06'},
      ],
      frameRate: 10,
      repeat: -1
    })
    
    this.anims.create({
      key: 'dog',
      frames: [
        { key: 'dog', frame: 'dog-21'},
        { key: 'dog', frame: 'dog-22'},
        { key: 'dog', frame: 'dog-24'},
        { key: 'dog', frame: 'dog-23'},
      ],
      
      frameRate: 10,
      repeat: -1
    })

    // this.anims.create({
    //   key: 'hunter',
    //   frames: [
    //     { key: 'hunter', frame: 'hunter-16'},
    //     { key: 'hunter', frame: 'hunter-17'},
    //     { key: 'hunter', frame: 'hunter-18'},
    //     { key: 'hunter', frame: 'hunter-19'},
    //   ],
      
    //   frameRate: 10,
    //   repeat: -1
    // })


    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music

    // Add image and detect spacebar keypress
    //this.add.image(0, 0, 'main').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");
        let player = {};
        player.x = 1384;
        player.y = 706;
        player.dir = "down";
        this.scene.start("world", { player: player });
      },
      this
    );

    // Add any text in the main page
    // this.add.text(90, 600, "Press spacebar to continue", {
    //   font: "30px Courier",
    //   fill: "#FFFFFF",
    // });

    // Create all the game animations here
  }
}
