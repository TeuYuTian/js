class room1 extends Phaser.Scene {

    constructor() {
        super({ key: "room1" });
    }


    init(data) {
      this.playerPos = data.playerPos;
    }

    preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("room1","assets/empty-room.json");


    // Step 2 : Preload any images here, nickname, filename
    this.load.image("pipoyaset", "assets/pipoya-set.png");
    this.load.image("grassdirtset", "assets/grassdirt.png");
    this.load.image("houseser", "assets/house.png");
    }

    create() {
        console.log('*** room1 scene');
        let map = this.make.tilemap({ key: "room1" });

        console.log("life: ", window.heart);
        this.hurtSound = this.sound.add("hurt");

        // Step 4 Load the game tiles
    let pipoyaTiles = map.addTilesetImage("pipoya-set", "pipoyaset");
    let grassdirtTiles = map.addTilesetImage("grassdirt", "grassdirtset");
    let housesetTiles = map.addTilesetImage("house", "houseset");
        
    let tileArray = [pipoyaTiles, grassdirtTiles, housesetTiles];
    
    this.grassLayer = map.createLayer("grassLayer", tileArray, 0, 0);
    this.floorLayer = map.createLayer("floorLayer", tileArray, 0, 0);
    this.treesLayer = map.createLayer("treesLayer", tileArray, 0, 0);
    this.decorationLayer = map.createLayer("decorationLayer", tileArray, 0, 0);


    this.physics.world.bounds.width = this.grassLayer.width;
    this.physics.world.bounds.height = this.grassLayer.height;

    this.player = this.physics.add.sprite(513,777 , 'up');

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

  this.dog9 = this.physics.add.sprite(370, 508, 'dog9').play("dog");

  this.time.addEvent({
    delay: 1000,
    callback: this.moveLeftRight9,
    callbackScope: this,
    loop: false,
  });

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    this.treesLayer.setCollisionByExclusion(-1, true)
    this.decorationLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.treesLayer);
    this.physics.add.collider(this.player, this.decorationLayer);

    this.physics.add.overlap(this.player, this.dog9, this.enemyOverlap, null, this);


    }

    moveLeftRight9() {
      console.log("moveLeftRight9");
      this.tweens.timeline({
        targets: this.dog9,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 1000,
        tweens: [
          {
            x: 615,
          },
          {
            x: 370, //must same with add sprite x
          },
        ],
      });
    }

    
    update() {
    // check for forest1 exit
    if (this.player.x > 484 && this.player.x < 544 && this.player.y > 900) {
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

enemyOverlap(player,enemy) {
  console.log( "deduct life");
  console.log( "hunter overlap player");
  window.heart--;

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
  enemy.disableBody (true, true);
  this.hurtSound.play();
  this.cameras.main.shake(200);
}

    // Function to jump to world
  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 613;
    playerPos.y = 480;
    playerPos.dir = "down";
    
    this.scene.start("world", { playerPos: playerPos });
  }

}
