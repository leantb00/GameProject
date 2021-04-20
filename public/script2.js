const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  heigth: 640,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: false,
      debug:false,
    },
  }
};

// Create the game instance
const game = new Phaser.Game(config);

let player, ball, violetBricks, yellowBricks, redBricks, cursors;
let gameStarted = false;

function preload() { }
this.load.image('ball', 'assets/ball/ball0.png');
  this.load.image('paddle', 'assets/target.png');
  this.load.image('brick1', 'assets/ball/ball1.png');
  this.load.image('brick2', 'assets/ball/ball2.png');
  this.load.image('brick3', 'assets/ball/ball3.png');
function create() { 
player = this.physics.add.sprite(
  400, // x position
  600, // y position
  'paddle', // key of image for the sprite
);
ball = this.physics.add.sprite(
  400, // x position
  565, // y position
  'ball' // key of image for the sprite
);
violetBricks = this.physics.add.group({
  key: 'brick1',
  repeat: 9,
  immovable: true,
  setXY: {
    x: 80,
    y: 140,
    stepX: 70
  }
});
yellowBricks = this.physics.add.group({
  key: 'brick2',
  repeat: 9,
  immovable: true,
  setXY: {
    x: 80,
    y: 90,
    stepX: 70
  }
});

// Add red bricks
redBricks = this.physics.add.group({
  key: 'brick3',
  repeat: 9,
  immovable: true,
  setXY: {
    x: 80,
    y: 40,
    stepX: 70
  }
});
cursors = this.input.keyboard.createCursorKeys();
player.setCollideWorldBounds(true);
ball.setCollideWorldBounds(true);
ball.setBounce(1, 1);
this.physics.world.checkCollision.down = false;
this.physics.add.collider(ball, violetBricks, hitBrick, null, this);
this.physics.add.collider(ball, yellowBricks, hitBrick, null, this);
this.physics.add.collider(ball, redBricks, hitBrick, null, this);
player.setImmovable(true);
this.physics.add.collider(ball, player, hitPlayer, null, this);}

function update() {
  // Check if the ball left the scene i.e. game over
  if (isGameOver(this.physics.world)) {
    // TODO: Show "Game over" message to the player
  } else if (isWon()) {
    // TODO: Show "You won!" message to the player
  } else {
    // Put this in so that the player stays still if no key is being pressed
player.body.setVelocityX(0);

if (cursors.left.isDown) {
  player.body.setVelocityX(-350);
} else if (cursors.right.isDown) {
  player.body.setVelocityX(350);
}
if (!gameStarted) {
  ball.setX(player.x);

  if (cursors.space.isDown) {
    gameStarted = true;
    ball.setVelocityY(-200);
  }
}
  }
}
function isGameOver(world) {
  return ball.body.y > world.bounds.height;
}
function isWon() {
  return violetBricks.countActive() + yellowBricks.countActive() + redBricks.countActive() === 0;
}
function hitBrick(ball, brick) {
  brick.disableBody(true, true);

  if (ball.body.velocity.x === 0) {
    randNum = Math.random();
    if (randNum >= 0.5) {
      ball.body.setVelocityX(150);
    } else {
      ball.body.setVelocityX(-150);
    }
  }
}
function hitPlayer(ball, player) {
  // Increase the velocity of the ball after it bounces
  ball.setVelocityY(ball.body.velocity.y - 5);

  let newXVelocity = Math.abs(ball.body.velocity.x) + 5;
  // If the ball is to the left of the player, ensure the X-velocity is negative
  if (ball.x < player.x) {
    ball.setVelocityX(-newXVelocity);
  } else {
    ball.setVelocityX(newXVelocity);
  }
}