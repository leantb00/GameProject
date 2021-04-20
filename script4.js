

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 600,
    height: 400,
    scene:  {
      preload: preload,
      create: create,
      update: create,
      render: render,
    }
};
var game = new Phaser.Game(config)
var sprite;
var bullets;

var fireRate = 100;
var nextFire = 0;



function preload() {

    this.load.image('arrow', 'assets/target.png');
    this.load.image('bullet', 'assets/bullet.png');
    
}



function create() {

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.stage.backgroundColor = '#313131';

    bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
    sprite = this.add.sprite(400, 300, 'arrow');
    sprite.anchor.set(0.5);

    this.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;

}

function update() {

    sprite.rotation = this.physics.arcade.angleToPointer(sprite);

    if (this.input.activePointer.isDown)
    {
        fire();
    }

}

function fire() {

    if (this.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = this.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }

}

function render() {

    this.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
    this.debug.spriteInfo(sprite, 32, 450);

}
