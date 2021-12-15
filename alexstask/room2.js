class room2 extends Phaser.Scene {

    constructor() {
        super({ key: "room2" });
        // Put global variable here
    }

    init(data) {
        this.playerPos = data.playerPos;
    }

    preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("room2","assets/empty-room2.json");


    // Step 2 : Preload any images here, nickname, filename
    this.load.image("pipoyaset", "assets/pipoya-set.png");
    this.load.image("grassdirtset", "assets/grassdirt.png");
    this.load.image("houseser", "assets/house.png");
    }

    create() {
        console.log('*** room2 scene');
        let map = this.make.tilemap({ key: "room2"});

        this.collectSound = this.sound.add("collect");

        // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let pipoyaTiles = map.addTilesetImage("pipoya-set", "pipoyaset");
    let grassdirtTiles = map.addTilesetImage("grassdirt", "grassdirtset");
    let housesetTiles = map.addTilesetImage("house", "houseset");
        
    let tileArray = [pipoyaTiles, grassdirtTiles, housesetTiles];
    
    this.grassLayer = map.createLayer("grassLayer", 
    tileArray, 0, 0);
    this.floorLayer = map.createLayer("floorLayer", 
    tileArray, 0, 0);
    this.treesLayer = map.createLayer("treesLayer", 
    tileArray, 0, 0);
    this.decorationLayer = map.createLayer("decorationLayer", 
    tileArray, 0, 0);


    this.physics.world.bounds.width = this.grassLayer.width;
    this.physics.world.bounds.height = this.grassLayer.height;

    this.player = this.physics.add.sprite(512,777 , 'up');

    // enable debug
    window.player = this.player;

    //health hearts
this.heart1 = this.add
.image(600, 25, "heart")
.setScrollFactor(0)
.setVisible(false);
this.heart2 = this.add
.image(640, 25, "heart")
.setScrollFactor(0)
.setVisible(false);
this.heart3 = this.add
.image(680, 25, "heart")
.setScrollFactor(0)
.setVisible(false);
this.heart4 = this.add
.image(720, 25, "heart")
.setScrollFactor(0)
.setVisible(false);
this.heart5 = this.add
.image(760, 25, "heart")
.setScrollFactor(0)
.setVisible(false);

if (window.heart == 5) {
this.heart1.setVisible(true);
this.heart2.setVisible(true);
this.heart3.setVisible(true);
this.heart4.setVisible(true);
this.heart5.setVisible(true);
} else if (window.heart == 4) {
this.heart1.setVisible(true);
this.heart2.setVisible(true);
this.heart3.setVisible(true);
this.heart4.setVisible(true);
} else if (window.heart == 3) {
this.heart1.setVisible(true);
this.heart2.setVisible(true);
this.heart3.setVisible(true);
} else if (window.heart == 2) {
this.heart1.setVisible(true);
this.heart2.setVisible(true);
} else if (window.heart == 1) {
this.heart1.setVisible(true);
}

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

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
  
    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    this.treesLayer.setCollisionByExclusion(-1, true)
    this.decorationLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.treesLayer);
    this.physics.add.collider(this.player, this.decorationLayer);

    this.elephant = this.physics.add.sprite(700, 300, 'elephant').play('elephant');
    this.physics.add.overlap(this.player, this.elephant, this.collectAnimal, null, this );


    }

    
    update() {
    // check for forest2 exit
    if (this.player.x > 484 && this.player.x < 544 && this.player.y > 890) {
      this.world();
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
}
    // Function to jump to room2
  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 311;
    playerPos.y = 940;
    playerPos.dir = "down";
    this.scene.start("world", { playerPos: playerPos });
  }

  collectAnimal(player, animal){
    console.log("animal collected");
    animal.disableBody (true, true);
    window.star = window.star + 1
    this.collectSound.play();

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
    return false;
  }
}


