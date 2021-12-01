class hunterroom extends Phaser.Scene {

    constructor() {
        super({ key: "hunterroom" });
        
        // Put global variable here
    }


    init(data) {
      this.playerPos = data.player;
    }

    preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("hunterroom","assets/hunter-room.json");


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

    
    this.dog = this.physics.add.sprite(368, 2180, 'dog2').play("dog");
    this.dog = this.physics.add.sprite(368, 2180, 'dog3').play("dog");
    this.dog = this.physics.add.sprite(368, 2180, 'dog4').play("dog");

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    this.wallLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    this.overlapfurnitureLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.overlapfurnitureLayer);

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
    // Function to jump to world
  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 510;
    playerPos.y = 1580;
    playerPos.dir = "down";
    this.scene.start("world");
    
    this.scene.start("world", {player: playerPos});
  }

}
