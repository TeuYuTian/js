class hunterroom extends Phaser.Scene {

    constructor() {
        super({ key: "hunterroom" });
        
        // Put global variable here
    }


    init(data) {
      this.playerPos = data.playerPos;
    }

    preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("hunterroom","assets/hunter-room.json");

    console.log("life: ", window.heart);
    this.hurtSound = this.sound.add("hurt");

    this.collectSound = this.sound.add("collect");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("pipoyaset", "assets/pipoya-set.png");
    this.load.image("grassdirtset", "assets/grassdirt.png");
    this.load.image("elementset", "assets/elements.png");

  }


    create() {
      console.log('*** hunterroom scene');
      let map = this.make.tilemap({ key: "hunterroom" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let pipoyaTiles = map.addTilesetImage("pipoya-set", "pipoyaset");
    let grassdirtTiles = map.addTilesetImage("grassdirt", "grassdirtset");
    let elementTiles = map.addTilesetImage("elements", "elementset");
        
    let tileArray = [pipoyaTiles, grassdirtTiles, elementTiles];
    
    this.grassLayer = map.createLayer("grassLayer", 
    tileArray, 0, 0);
    this.floorLayer = map.createLayer("floorLayer", 
    tileArray, 0, 0);
    this.furnitureLayer = map.createLayer("furnitureLayer", 
    tileArray, 0, 0);
    this.overlapfurnitureLayer = map.createLayer("overlapfurnitureLayer", 
    tileArray, 0, 0);
    this.wallLayer = map.createLayer("wallLayer", 
    tileArray, 0, 0);


    this.physics.world.bounds.width = this.grassLayer.width;
    this.physics.world.bounds.height = this.grassLayer.height;

    this.player = this.physics.add.sprite(220,1100 , 'down');

    // enable debug
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

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

    this.dog5 = this.physics.add.sprite(733, 433, 'dog5').play("dog");
    this.dog6 = this.physics.add.sprite(420, 878, 'dog6').play("dog");
    this.dog7 = this.physics.add.sprite(370, 658, 'dog7').play("dog");
    this.hunter1 = this.physics.add.sprite(870, 625, 'hunter').play("hunter");

    this.time.addEvent({
      delay: 1000,
      callback: this.moveDownUp5,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveLeftRight6,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveLeftRight7,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveLeftRight8,
      callbackScope: this,
      loop: false,
    });

   

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    this.boat = this.physics.add.sprite(900, 820,'boat')
    this.physics.add.overlap(this.player, this.boat, this.collectBoat, null, this );


    this.wallLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    this.overlapfurnitureLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.overlapfurnitureLayer);

    this.physics.add.overlap(this.player, this.dog5, this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.dog6, this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.dog7, this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.hunter1, this.enemyOverlap, null, this);
    
    
    }

  moveDownUp5() {
    console.log("moveDownUp5");
    this.tweens.timeline({
      targets: this.dog5,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 1000,
      tweens: [
        {
          y: 579,
        },
        {
          y: 433, //must same with add sprite x
        },
      ],
    });
  }

  moveLeftRight6() {
    console.log("moveLeftRight6");
    this.tweens.timeline({
      targets: this.dog6,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 1000,
      tweens: [
        {
          x: 615,
        },
        {
          x: 420, //must same with add sprite x
        },
      ],
    });
  }


    moveLeftRight7() {
      console.log("moveLeftRight7");
      this.tweens.timeline({
        targets: this.dog7,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 3000,
        tweens: [
          {
            x: 604,
          },
          {
            x: 370, //must same with add sprite x
          },
        ],
      });
    }

  moveLeftRight8() {
    console.log("moveLeftRight8");
    this.tweens.timeline({
      targets: this.hunter1,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 1000,
      tweens: [
        {
          x: 977,
        },
        {
          x: 870, //must same with add sprite x
        },
      ],
    });
  }


    update() {
    // check for forest1 exit
    if (this.player.x > 200 && this.player.x < 250 && this.player.y > 1150) {
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

collectBoat(player, boat){
  console.log("boat collected");
  boat.disableBody (true, true);
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

    // Function to jump to world
  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 510;
    playerPos.y = 1580;
    playerPos.dir = "down";
    this.scene.start("world");
    
    this.scene.start("world", {playerPos: playerPos});
  }



}
