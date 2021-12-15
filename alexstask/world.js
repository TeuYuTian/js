class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {
    this.playerPos = data.playerPos;
    this.inventory = data.inventory;
  }

  preload() {
    //JSON
    this.load.tilemapTiledJSON("world1","assets/big-map.json");

    //images, nickname, filename
    this.load.image("houseset", "assets/house.png");
    this.load.image("pipoyaset", "assets/pipoya-set.png");
    this.load.image("grassdirtset", "assets/grassdirt.png");
    this.load.image("elementset", "assets/elements.png");
    this.load.image("waterset", "assets/water2.png");
    this.load.image("exitsign", "assets/exit.png");
  }


  create() {
    console.log("*** world scene");
    console.log("life: ", window.heart);
    console.log("score: ", window.star);
    this.hurtSound = this.sound.add("hurt");

    //Create the map
    let map = this.make.tilemap({key:"world1"});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,2nd parameter is key in Preload
    let housesetTiles = map.addTilesetImage("house", "houseset");
    let pipoyaTiles = map.addTilesetImage("pipoya-set", "pipoyaset");
    let grassdirtTiles = map.addTilesetImage("grassdirt", "grassdirtset");
    let elementTiles = map.addTilesetImage("elements", "elementset");
    let waterTiles = map.addTilesetImage("water2", "waterset");

    // Step 5  Load in layers by layers
    let tilesArray = [ housesetTiles, pipoyaTiles, grassdirtTiles, elementTiles, waterTiles];

    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.overlapgrassLayer = map.createLayer("overlapgrassLayer", tilesArray, 0, 0);
    this.riverLayer = map.createLayer("riverLayer", tilesArray, 0, 0);
    this.roadLayer = map.createLayer("roadLayer", tilesArray, 0, 0);
    this.roomLayer = map.createLayer("roomLayer", tilesArray, 0, 0);
    this.river2Layer = map.createLayer("river2Layer", tilesArray, 0, 0);
    this.bridgeLayer = map.createLayer("bridgeLayer", tilesArray, 0, 0);
    this.decorationLayer = map.createLayer("decorationLayer", tilesArray, 0, 0);

    this.exit = this.add.image(1780,1830,"exitsign");

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

    // Add time event / movement here
    this.dog1 = this.physics.add.sprite(1738, 646, 'dog').play("dog");
    this.dog2 = this.physics.add.sprite(1796, 1319, 'dog').play("dog");
    this.dog3 = this.physics.add.sprite(825, 524, 'dog').play("dog");
    this.dog4 = this.physics.add.sprite(1539, 1353, 'dog').play("dog");

    this.time.addEvent({
      delay: 1000,
      callback: this.moveDownUp1,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveLeftRight2,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveDownUp3,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveDownUp4,
      callbackScope: this,
      loop: false,
    });

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    // What will collider witg what layers
    this.roomLayer.setCollisionByExclusion(-1, true)
    this.riverLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.roomLayer);
    this.physics.add.collider(this.player, this.riverLayer);

    this.physics.add.overlap(this.player, this.dog1, this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.dog2, this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.dog3, this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.dog4, this.enemyOverlap, null, this);
    
  } /////////////////// end of create //////////////////////////////

  //enemies movement
  moveDownUp1() {
    console.log("moveDownUp1");
    this.tweens.timeline({
      targets: this.dog1,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 1000,
      tweens: [
        {
          y: 785,
        },
        {
          y: 646,
        },
      ],
    });
  }

  moveLeftRight2() {
    console.log("moveLeftRight2");
    this.tweens.timeline({
      targets: this.dog2,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
        {
          x: 1943,
        },
        {
          x: 1796, //must same with add sprite x
        },
      ],
    });
  }

  moveDownUp3() {
    console.log("moveDownUp3");
    this.tweens.timeline({
      targets: this.dog3,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 4000,
      tweens: [
        {
          y: 657,
        },
        {
          y: 524,
        },
      ],
    });
  }

  moveDownUp4() {
    console.log("moveDownUp4");
    this.tweens.timeline({
      targets: this.dog4,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 10000,
      tweens: [
        {
          y: 1493,
        },
        {
          y: 1353,
        },
      ],
    });
  }
  

  update() {

    //win scene and condition
    if ( this.player.x > 1820 && this.player.x < 1900 &&
      this.player.y > 1880 && window.star >= 4) {
        this.winScene();
      }

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
      this.player.x < 350 &&
      this.player.y > 900 &&
      this.player.y < 920
    ) {
      this.room2();
    }


    if (
      this.player.x >  1570 &&
      this.player.x < 1600 &&
      this.player.y > 530 &&
      this.player.y < 580
    ) {
      this.room3();
    }

    if (
      this.player.x >  2110 &&
      this.player.x < 2170&&
      this.player.y > 390 &&
      this.player.y < 420
    ) {
      this.room4();
    }

    if (
      this.player.x >  1500 &&
      this.player.x < 1560 &&
      this.player.y > 1060 &&
      this.player.y < 1090
    ) {
      this.room5();
    }
    if (
      this.player.x >  2110 &&
      this.player.x < 2180 &&
      this.player.y > 1500 &&
      this.player.y < 1530
    ) {
      this.room6();
    }
    if (
      this.player.x >  470 &&
      this.player.x < 520 &&
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

  // Function hit dog & deduct life
  enemyOverlap(player,enemy) {
    console.log( "deduct life");
    console.log( "enemy overlap player");
    window.heart--;
    // this.scene.start("gameover");
    enemy.disableBody (true, true);
    this.hurtSound.play();
    this.cameras.main.shake(200);

    if (window.heart == 4) {
      this.heart5.setVisible(false);
    } else if (window.heart == 3) {
      this.heart4.setVisible(false);
    } else if (window.heart == 2) {
      this.heart3.setVisible(false);
    } else if (window.heart == 1) {
      this.heart2.setVisible(false);
    } else if (window.heart == 0) {
      this.heart1.setVisible(false);
      console.log("you are dead");
      this.scene.start("gameover");
    }
  }

  collectAnimal(player,animal){

    window.star++;
    console.log( "get 1 star");

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
  room2(player, tile){
    console.log("room2 function");
    let playerPos = {};
    playerPos.x = 311;
    playerPos.y = 940;
    playerPos.dir = "down";
    this.scene.start("room2");
  }

  // Function to jump to room3
  room3(player, tile) {
    console.log("room3 function");
    let playerPos = {};
    playerPos.x = 1604;
    playerPos.y = 600;
    playerPos.dir = "down";
    this.scene.start("room3");
  }

  // Function to jump to room4
  room4(player, tile) {
    console.log("room4 function");
    let playerPos = {};
    playerPos.x = 2140;
    playerPos.y = 450;
    playerPos.dir = "down";
    this.scene.start("room4");
  }

  // Function to jump to room4
  room5(player, tile) {
    console.log("room5 function");
    let playerPos = {};
    playerPos.x = 1138;
    playerPos.y = 1538;
    playerPos.dir = "down";
    this.scene.start("room5");
  }

  // Function to jump to room6
  room6(player, tile) {
    console.log("room6 function");
    let playerPos = {};
    playerPos.x = 2141;
    playerPos.y = 1593;
    playerPos.dir = "down";
    this.scene.start("room6");
  }

    hunterroom(player, tile) {
      console.log("hunterroom function");
      let playerPos = {};
      playerPos.x = 510;
      playerPos.y = 1580;
      playerPos.dir = "down";
      this.scene.start("hunterroom");
    }
   
    //win scene
  winScene() {
    console.log("player win")
    this.scene.start("winscene")
  }

} //////////// end of class world ////////////////////////
