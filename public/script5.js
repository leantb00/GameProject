window.addEventListener('load', ()=>{
  const config = {
     type: Phaser.AUTO, // Canva ou WebGL
     width:800,
     height: 600,
     backgroundColor: '#f9f9f9',
     parent: 'game',
     autoCenter : Phaser.Scale.CENTER_BOTH,
     physics : {
         default : 'arcade',
         arcade : { 
         debug: false}
     },
     
     scene : [Scene0,Scene1,Scene2,Scene3] 
  }
  
     game = new Phaser.Game(config);
  })// fim load listener
  let dude
  let inicioDeJogo = false;
  let player, ball, violetBricks, yellowBricks, redBricks, cursors;

  let gameStarted = false;

  let openingText, gameOverText, playerWonText;
  
  
  class Scene0 extends Phaser.Scene {
     constructor(){
         super('scene0');
     }
      
     preload() {
         this.load.image('oi0', '../assets/photo0.jpg');
         
     }// fim preload
     
     create(){
         this.add.image(400,300,'oi0');
         this.input.keyboard.on('keydown-ENTER', ()=> 
         this.scene.start('scene1') )
   }// fim create
                 
  }//fim Scene0
  
  class Scene1 extends Phaser.Scene{
     constructor(){
         super('scene1');
     }
     preload() {
        
         this.load.image('oi1', '../assets/Texto0.png');
      }//fim preload 
     create(){
         this.add.image(400,300,'oi1');
        
         this.input.keyboard.on('keydown-ENTER', ()=> 
         
         this.scene.start('scene2') )
        
         
      
     }//fim create
    
  }//fim Scene1
  
  class Scene2 extends Phaser.Scene{
     constructor(){
         super('scene2');
     }
      preload() {
        
         this.load.image('oi3', '../assets/scene3.jpg');
      }//fim preload 
     create(){
         this.add.image(400,300,'oi3');
         this.input.keyboard.on('keydown-ENTER', ()=> 
         
         this.scene.start('scene3') )
        
         
         
     }//fim create
  }//fim Scene2
  
  class Scene3 extends Phaser.Scene{
     constructor(){
         super('scene3');
     }
     
     preload() {
      this.load.image('fundo', '../assets/Foto3.png');
      this.load.image('brick1', '../assets/ball/ball0copia.png');
      this.load.image('brick2', '../assets/ball/ball1copia.png');
      this.load.image('brick3', '../assets/ball/ball2copia.png');
      this.load.image('ball', '../assets/ball/ball7copia.png');
      this.load.image('paddle', '../assets/paleta0.png');
    }
  
     create() {
      this.add.image(400,300,'fundo');
      player = this.physics.add.sprite(
        400, 
        565, 
        'paddle', 
      );
    
     
      ball = this.physics.add.sprite(
        400, 
        565, 
        'ball' 
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
      
      this.physics.add.collider(ball, player, hitPlayer, null, this);
    
     
      openingText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Press SPACE to Start',
        {
          fontFamily: 'Monaco, Courier, monospace',
          fontSize: '50px',
          fill: '#fff'
        },
      );
    
      openingText.setOrigin(0.5);
    
      
      gameOverText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Game Over',
        {
          fontFamily: 'Monaco, Courier, monospace',
          fontSize: '50px',
          fill: '#fff'
        },
      );
    
      gameOverText.setOrigin(0.5);
    
      
      gameOverText.setVisible(false);
    
     
      playerWonText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'You won!',
        {
          fontFamily: 'Monaco, Courier, monospace',
          fontSize: '50px',
          fill: '#fff'
        },
      );
    
      playerWonText.setOrigin(0.5);
    
     
      playerWonText.setVisible(false);
    }
    
   
     update() {
     
      if (isGameOver(this.physics.world)) {
        gameOverText.setVisible(true);
        ball.disableBody(true, true);
      } else if (isWon()) {
        playerWonText.setVisible(true);
        ball.disableBody(true, true);
      } else {
       
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
            ball.setVelocityY(-280);
            openingText.setVisible(false);
          }
        }
      }
    }
    
  }
    function isGameOver(world) {
      return ball.body.y > world.bounds.height;
    }
    
    
    function isWon() {
      return violetBricks.countActive() + yellowBricks.countActive() + redBricks.countActive() == 0;
    }
    
   
    function hitBrick(ball, brick) {
      brick.disableBody(true, true);
    
      if (ball.body.velocity.x == 0) {
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
      ball.setVelocityY(ball.body.velocity.y - 0);
    
      let newXVelocity = Math.abs(ball.body.velocity.x) + 0;
      // If the ball is to the left of the player, ensure the x velocity is negative
      if (ball.x < player.x) {
        ball.setVelocityX(-newXVelocity);
      } else {
        ball.setVelocityX(newXVelocity);
      }
    }