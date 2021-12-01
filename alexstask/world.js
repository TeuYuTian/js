class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {
    this.playerPos = data.player;
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world1","assets/big-map.json");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("houseset", "assets/house.png");
    this.load.image("pipoyaset", "assets/pipoya-set.png");
    this.load.image("grassdirtset", "assets/grassdirt.png");
    this.load.image("elementset", "assets/elements.png");
    this.load.image("waterset", "assets/water2.png");
    this.load.image("animals", "assets/animals-26.png");

    

  
    //collectitem
    // this.load.atlas('macaw', 'assets/macaw.png', 'assets/macaw.json');
    // this.load.atlas('elephant', 'assets/elephant.png', 'assets/elephant.json');
    // this.load.atlas('racoon', 'assets/racoon.png', 'assets/racoon.json');

    // this.load.image('racoon', 'assets/racoon.png');

  }


  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:"world1"});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let housesetTiles = map.addTilesetImage("house", "houseset");
    let pipoyaTiles = map.addTilesetImage("pipoya-set", "pipoyaset");
    let grassdirtTiles = map.addTilesetImage("grassdirt", "grassdirtset");
    let elementTiles = map.addTilesetImage("elements", "elementset");
    let waterTiles = map.addTilesetImage("water2", "waterset");
    let animalsTiles = map.addTilesetImage("animals-26", "animals");

    // Step 5  Load in layers by layers

    this.groundLayer = map.createLayer("groundLayer", 
    [housesetTiles, pipoyaTiles], 0, 0);
    this.overlapgrassLayer = map.createLayer("overlapgrassLayer", 
    [housesetTiles, pipoyaTiles, grassdirtTiles,elementTiles,waterTiles], 0, 0);
    this.riverLayer = map.createLayer("riverLayer", 
    [housesetTiles, pipoyaTiles, grassdirtTiles,elementTiles,waterTiles], 0, 0);
    this.roadLayer = map.createLayer("roadLayer", 
    [housesetTiles, pipoyaTiles, grassdirtTiles,elementTiles,waterTiles], 0, 0);
    this.roomLayer = map.createLayer("roomLayer", 
    [housesetTiles, pipoyaTiles, grassdirtTiles,elementTiles,waterTiles], 0, 0);
    this.river2Layer = map.createLayer("river2Layer", 
    [housesetTiles, pipoyaTiles, grassdirtTiles,elementTiles,waterTiles], 0, 0);
    this.bridgeLayer = map.createLayer("bridgeLayer", 
    [housesetTiles, pipoyaTiles, grassdirtTiles,elementTiles,waterTiles], 0, 0);

    this.decorationLayer = map.createLayer("decorationLayer", 
    [housesetTiles, pipoyaTiles, grassdirtTiles,elementTiles,waterTiles], 0, 0);
    this.collectLayer = map.createLayer("collectLayer", 
    [animalsTiles], 0, 0);

    

    ////// animal animation
    // this.anims.create({
    //   key:'macaw',
    //   frames:[
    //   {key: 'macaw', frame: 'macaw-01'},
    //   {key: 'macaw', frame: 'macaw-02'},
    //   ],
  
    //   frameRate:5,
    //   repeat: -1
    //   });



        // // Set starting and ending position using name
        // this.start = map.findObject("objectLayer", obj => obj.name === "start");
        // this.end = map.findObject("objectLayer", obj => obj.name === "end");    
    // this.sapling1 = this.physics.add.sprite(200, 200, 'macaw').play('macaw');

                // // Collide platform with animal
    //  this.physics.add.collider(this.roomLayer, this.macaw);
    // this.physics.add.collider(this.riverLayer, this.macaw);

    // this.physics.add.overlap(this.player, this.macaw, this.collectMacaw, null, this );   

    // // this text will show the score
    // this.macawText = this.add.text(650, 50, this.score, {
    //   fontSize: '30px',
    //   fill: '#221C48'
    //   });

    //   // fix the text to the camera
    //   this.macawText.setScrollFactor(0);
    //   this.macawText.visible = true;
    
    
    //  // this text will show the score
    //  this.animalText = this.add.text(650, 50, this.score, {
    //   fontSize: '30px',
    //   fill: '#221C48'
    //   });


    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(
      this.playerPos.x,
      this.playerPos.y,
      this.playerPos.dir,
      );

    // enable debug
    window.player = this.player;      
    
    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    // Add main player here with physics.add.sprite

    // Add time event / movement here
    this.dog = this.physics.add.sprite(1738, 646, 'dog').play("dog");

    this.time.addEvent({
      delay: 1000,
      callback: this.moveDownUp,
      callbackScope: this,
      loop: false,
    });



    // get the tileIndex number in json, +1
    this.collectLayer.setTileIndexCallback(1, this.removeItem, this);

    // Add custom properties in Tiled called "mouintain" as bool


    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    this.roomLayer.setCollisionByExclusion(-1, true)
    this.riverLayer.setCollisionByExclusion(-1, true)


    // What will collider witg what layers
       // this.physics.add.collider(groundLayer, this.player);
    this.physics.add.collider(this.player, this.roomLayer);
    this.physics.add.collider(this.player, this.riverLayer);
    this.physics.add.collider(this.collectLayer, this.player);

    this.physics.add.overlap(
      this.player,
      this.dog,
      this.dogOverlap,
      null,
      this
    );
    
  } /////////////////// end of create //////////////////////////////

  // moveLeftRight() {
  //   console.log("moveDownUp");
  //   this.tweens.timeline({
  //     targets: this.deer,
  //     loop: -1, // loop forever
  //     ease: "Linear",
  //     duration: 3000,
  //     tweens: [
  //       {
  //         x: 272,
  //       },
  //       {
  //         x: 368, //must same with add sprite x
  //       },
  //     ],
  //   });
  // }

  moveDownUp() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.dog,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 1000,
      tweens: [
        {
          y: 646,
        },
        {
          y: 785,
        },
      ],
    });
  }


  update() {
    // check for room1
    if (
      this.player.x > 592 &&
      this.player.x < 624 &&
      this.player.y > 430 &&
      this.player.y < 440
    ) {
      this.room1();
    }

    // // check for room2
    if (
      this.player.x > 300 &&
      this.player.x < 330 &&
      this.player.y > 900 &&
      this.player.y < 920
    ) {
      this.room2();
    }

    if (
      this.player.x >  1560 &&
      this.player.x < 1620 &&
      this.player.y > 530 &&
      this.player.y < 580
    ) {
      this.room3();
    }

    if (
      this.player.x >  470 &&
      this.player.x < 500 &&
      this.player.y > 1500 &&
      this.player.y < 1530
    ) {
      this.hunterroom();
    }

    

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-400);
      this.player.anims.play("left", true); // walk left
    } 
    else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(400);
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-400);
      this.player.anims.play("up", true);
      //console.log('up');
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(400);
      this.player.anims.play("down", true);
      //console.log('down');
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
    }
      
      
  } /////////////////// end of update //////////////////////////////

  // Function hit dog
  dogOverlap() {
    console.log( "dog overlap player");
    this.scene.start("gameover");
  }

  removeitem(player,tile){
  console.log("remove item",tile.index)
  this.collectLayer.removeTileAt(tile.x, tile.y);
  return false;
  }


  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    let playerPos = {};
    playerPos.x = 613;
    playerPos.y = 480;
    playerPos.dir = "down";
    this.scene.start("room1");
  }


    // Function to jump to room2
    room2(player, tile) {
      console.log("room2 function");
      let playerPos = {};
      playerPos.x = 311;
      playerPos.y = 940;
      playerPos.dir = "down";
      this.scene.start("room2");
    }

    room3(player, tile) {
      console.log("room3 function");
      let playerPos = {};
      playerPos.x = 1604;
      playerPos.y = 600;
      playerPos.dir = "down";
      this.scene.start("room3");
    }

    hunterroom(player, tile) {
      console.log("hunterroom function");
      let playerPos = {};
      playerPos.x = 510;
      playerPos.y = 1580;
      playerPos.dir = "down";
      this.scene.start("hunterroom");
    }
    
} //////////// end of class world ////////////////////////
