class room2 extends Phaser.Scene {

    constructor() {
        super({ key: "room2" });
        // Put global variable here
    }

    init(data) {
        this.playerPos = data.player;
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

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

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
    this.scene.start("world", { player: playerPos });
  }

}

