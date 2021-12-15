class main extends Phaser.Scene {
  constructor() {
    super({
      key: "main",
    });

    // Put global variable here
  }

  init(data) {
    this.playerPos = data.playerPos;
  }

  preload() {
    // Preload all the assets here
    // intro
    this.load.image('intro', 'assets/startScene.png');

    //mainCharacter
    this.load.atlas( 'left', 'assets/left.png', 'assets/left.json');
    this.load.atlas( 'right', 'assets/right.png', 'assets/right.json');
    this.load.atlas( 'up', 'assets/up.png', 'assets/up.json');
    this.load.atlas( 'down', 'assets/down.png', 'assets/down.json');
          
   // enemy ( dog/hunter )
   this.load.atlas('dog', 'assets/dog-left.png', 'assets/dog-left.json')
   this.load.atlas('hunter', 'assets/hunter-left.png', 'assets/hunter-left.json')

   //collectItem
   this.load.atlas('macaw', 'assets/macaw.png', 'assets/macaw.json');
   this.load.atlas('elephant', 'assets/elephant.png', 'assets/elephant.json');
   this.load.atlas('racoon1', 'assets/racoon.png', 'assets/racoon.json');
   this.load.image("boat", "assets/boat.png");

   //star
   this.load.image('star', 'assets/star.png');

   this.load.image('heart', 'assets/heart.png');


  //sound
   this.load.audio('bgm', 'assets/game-music.mp3');
   this.load.audio('fail', 'assets/gameover.mp3');
   this.load.audio('hurt', 'assets/hurt.wav');
   this.load.audio('collect', 'assets/collect.mp3');

  }

  create() {
    console.log("*** main scene");

    window.music = this.sound
      .add("bgm", {
        loop: true,
      })
      .setVolume(0.1);
      window.music.play();



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

    this.anims.create({
      key: 'hunter',
      frames: [
        { key: 'hunter', frame: 'hunter-16'},
        { key: 'hunter', frame: 'hunter-17'},
        { key: 'hunter', frame: 'hunter-18'},
        { key: 'hunter', frame: 'hunter-19'},
      ],
      
      frameRate: 10,
      repeat: -1

      
    })


    //// animal animation
    this.anims.create({
      key:'macaw',
      frames:[
      {key: 'macaw', frame: 'macaw-01'},
      {key: 'macaw', frame: 'macaw-02'},
      ],
  
      frameRate:5,
      repeat: -1
      });


    this.anims.create({
      key:'racoon1',
      frames:[
      {key: 'racoon1', frame: 'racoon-01'},
      {key: 'racoon1', frame: 'racoon-02'},
      ],
  
      frameRate:5,
      repeat: -1
      }); 
      
    this.anims.create({
      key:'elephant',
      frames:[
      {key: 'elephant', frame: 'elephant-01'},
      {key: 'elephant', frame: 'elephant-02'},
      ],
    
      frameRate:5,
      repeat: -1
      });     

      //stars
      this.star1 = this.add.sprite(30,30,"star").setScrollFactor(0).setVisible(false);
      this.star2 = this.add.sprite(70,30,"star").setScrollFactor(0).setVisible(false);
      this.star3 = this.add.sprite(110,30,"star").setScrollFactor(0).setVisible(false);
      this.star4 = this.add.sprite(150,30,"star").setScrollFactor(0).setVisible(false);

      if ( window.star=== 1) {
        this.star1.setVisible(true);
  
    } else if ( window.star === 2) {
        this.star1.setVisible(true);
        this.star2.setVisible(true);
  
    } else if ( window.star === 3) {
        this.star1.setVisible(true);
        this.star2.setVisible(true);
        this.star3.setVisible(true);
    } 
    else if ( window.star === 4) {
      this.star1.setVisible(true);
      this.star2.setVisible(true);
      this.star3.setVisible(true);
      this.star4.setVisible(true);
  
    }

// Check for spacebar or any key here
var spaceDown = this.input.keyboard.addKey("SPACE");
var enterDown = this.input.keyboard.addKey('enter');

// On spacebar event, call the world scene
spaceDown.on('down', function(){
  this.scene.start("story");
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
  }

}
