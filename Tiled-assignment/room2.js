class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room2' });
        
        // Put global variable here
    }


    init(data) {}

    preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("room2","assets/hunter-room.json");


    // Step 2 : Preload any images here, nickname, filename
    this.load.image("pipoyaset", "assets/pipoya-set.png");
    this.load.image("grassdirtset", "assets/grassdirt.png");
    this.load.image("elementset", "assets/elements.png");
    }

    create() {
        console.log('*** room2 scene');
        let map = this.make.tilemap({ key: "room2" });

        // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let pipoyaTiles = map.addTilesetImage("pipoya-set", "pipoyaset");
    let grassdirtTiles = map.addTilesetImage("grassdirt", "grassdirtset");
    let elementTiles = map.addTilesetImage("elements", "elementset");
        
    let tileArray = [pipoyaTiles, grassdirtTiles, elementTiles, housesetTiles];
    
    this.grassLayer = map.createLayer("grassLayer", 
    tileArray, 0, 0);
    this.floorLayer = map.createLayer("floorLayer", 
    tileArray, 0, 0);
    this.wallLayer = map.createLayer("wallLayer", 
    tileArray, 0, 0);
    this.furnitureLayer = map.createLayer("furnitureLayer", 
    tileArray, 0, 0);
    this.overlapfurnitureLayer = map.createLayer("overlapfurnitureLayer", 
    tileArray, 0, 0);

    this.physics.world.bounds.width = this.grassLayer.width;
    this.physics.world.bounds.height = this.grassLayer.height;

    this.player = this.physics.add.sprite(220,1100 , 'down');

    // enable debug
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    }

    
    update() {
    // check for exit
    if (this.player.x > 484 && this.player.x < 544 && this.player.y > 820) {
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
    // Function to jump to room1
  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 338;
    playerPos.y = 1130;

    this.scene.start("world", { player: playerPos });
  }

}
