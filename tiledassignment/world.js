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

    this.load.atlas( 'left', 'assets/left.png', 'assets/left.json');
    this.load.atlas( 'right', 'assets/right.png', 'assets/right.json');
    this.load.atlas( 'up', 'assets/up.png', 'assets/up.json');
    this.load.atlas( 'down', 'assets/down.png', 'assets/down.json');
  }


  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:'world1'});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let housesetTiles = map.addTilesetImage("house", "houseset");
    let pipoyaTiles = map.addTilesetImage("pipoya-set", "pipoyaset");
    let grassdirtTiles = map.addTilesetImage("grassdirt", "grassdirtset");
    let elementTiles = map.addTilesetImage("elements", "elementset");
    let waterTiles = map.addTilesetImage("water2", "waterset");

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

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(200, 200, 'down');

    // enable debug
    window.player = this.player;      
    
    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    // Add main player here with physics.add.sprite

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    this.roomLayer.setCollisionByExclusion(-1, true)
    this.riverLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.roomLayer);
    this.physics.add.collider(this.player, this.riverLayer);

  } /////////////////// end of create //////////////////////////////

  update() {
    // check for room1
    if (
      this.player.x > 592 &&
      this.player.x < 624 &&
      this.player.y > 430 &&
      this.player.y < 450
    ) {
      this.room1();
    }

    // // check for room2
    // if (
    //   this.player.x > 486 &&
    //   this.player.x < 506 &&
    //   this.player.y > 1515 &&
    //   this.player.y < 1535
    // ) {
    //   this.room2();
    // }

    

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

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("room1");
  }

    // // Function to jump to room2
    // room1(player, tile) {
    //   console.log("room2 function");
    //   this.scene.start("room2");
    // }
} //////////// end of class world ////////////////////////
