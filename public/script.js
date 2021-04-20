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
let dude,cursors,ball0,ball1,ball2,ball3,ball4,ball5,ball6,ball7,ball8,ball9,ball10,ball11,ball12,ball13,
ball14,ball15,ball16,ball17,ball18,ball19,ball20,ball21,ball22,ball23,ball24,ball25,ball26,ball27,
ball28,ball29,ball30,ball31,ball32,ball33,ball34, player, ball, alvo0, alvo1, alvo2,alvo3,alvo4,alvo5,alvo6,texto
let inicioDeJogo = false;

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
               
}//fim Scene1

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
  
}//fim Scene2

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
}//fim Scene3

class Scene3 extends Phaser.Scene{
   constructor(){
       super('scene3');
   }
   
    preload() { 

  this.load.image('fundo', 'assets/Foto3.png');
  this.load.image('bolinhaVermelha0', 'assets/ball/ball0copia.png');
  this.load.image('bolinhaVermelha1', 'assets/ball/ball1copia.png');
  this.load.image('bolinhaVermelha2', 'assets/ball/ball2copia.png');
  this.load.image('bolinhaVermelha3', 'assets/ball/ball3copia.png');
  this.load.image('bolinhaVermelha4', 'assets/ball/ball4copia.png');
  this.load.image('bolinhaVermelha5', 'assets/ball/ball5copia.png');
  this.load.image('bolinhaVermelha6', 'assets/ball/ball6copia.png');
  this.load.image('ball', 'assets/ball/ball7copia.png');
  this.load.image('paddle', 'assets/paleta0.png');}
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

alvo0 = this.physics.add.group({
  key: 'bolinhaVermelha0',
  repeat: 9,
  immovable: true,
  setXY: {
    x: 80,
    y: 50,
    stepX: 70
  }
});



alvo1 = this.physics.add.group({
  key: 'bolinhaVermelha1',
  repeat: 9,
  immovable: true,
  setXY: {
    x: 80,
    y: 100,
    stepX: 70
  }
});
alvo2 = this.physics.add.group({
  key: 'bolinhaVermelha2',
  repeat: 9,
  immovable: true,
  setXY: {
    x: 80,
    y: 150,
    stepX: 70
  }
});


alvo3 = this.physics.add.group({
  key: 'bolinhaVermelha3',
  repeat: 9,
  immovable: true,
  setXY: {
    x: 80,
    y: 200,
    stepX: 70
  }
});
alvo4 = this.physics.add.group({
  key: 'bolinhaVermelha4',
  repeat: 9,
  immovable: true,
  setXY: {
    x: 80,
    y: 250,
    stepX: 70
  }
});
alvo5 = this.physics.add.group({
  key: 'bolinhaVermelha5',
  repeat: 9,
  immovable: true,
  setXY: {
    x: 80,
    y: 300,
    stepX: 70
  }
});
alvo6 = this.physics.add.group({
  key: 'bolinhaVermelha6',
  repeat: 9,
  immovable: true,
  setXY: {
    x: 80,
    y: 350,
    stepX: 70
  }
});

cursors = this.input.keyboard.createCursorKeys();
player.setCollideWorldBounds(true);
ball.setCollideWorldBounds(true);
ball.setBounce(1, 1);
this.physics.world.checkCollision.down = false;
this.physics.add.collider(ball, alvo0, bater0, null, this);
this.physics.add.collider(ball, alvo1, bater0, null, this);
this.physics.add.collider(ball, alvo2, bater0, null, this);
this.physics.add.collider(ball, alvo3, bater0, null, this);
this.physics.add.collider(ball, alvo4, bater0, null, this);
this.physics.add.collider(ball, alvo5, bater0, null, this);
this.physics.add.collider(ball, alvo6, bater0, null, this);



player.setImmovable(true);
this.physics.add.collider(ball, player, bater1, null, this);
texto = this.add.text(
  this.physics.world.bounds.width / 2,
  this.height= 400,
  'PRESSIONE A TECLA SPACE PARA INICIAR O JOGO E DISPARAR CONTRA O VÍRUS'
  ,
  {
    fontFamily: 'times roman',
    fontSize: '20px',
    fill: '#fff'
    
  }
  
);

texto.setOrigin(0.5);}
update (){
      
  if (jogoEncerrado(this.physics.world)) {
    
    
  } else if (jogoConcluido()) {
    
  } else {
    


    player.body.setVelocityX(0);

    if (cursors.left.isDown) {
      player.body.setVelocityX(-350);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(350);
    }
    if (!inicioDeJogo) {
      ball.setX(player.x);
    
      if (cursors.space.isDown) {
        inicioDeJogo = true;
        ball.setVelocityY(-230);
        texto.setVisible(false);
        
        
      }
    }
      }
    }
}//fim Scene4
 function jogoEncerrado(mundo) {
    return ball.body.y > mundo.bounds.height;
    
       
         
   
          

 }
  function jogoConcluido() {
    return alvo0.countActive() + alvo1.countActive() + alvo2.countActive() + alvo3.countActive() + alvo4.countActive() 
    + alvo5.countActive() + alvo6.countActive() === 0;
  }
  function bater0(bolinha0, bolinha1) {
    bolinha1.disableBody(false, true);
  
    if (bolinha0.body.velocity.x === 0) {
      randNum = Math.random();
      if (randNum >= 0.5) {
        bolinha0.body.setVelocityX(150);
      } else {
        bolinha0.body.setVelocityX(-150);
      }
    }
  }
  function bater1(bolinha, jogador) {
    
    bolinha.setVelocityY(bolinha.body.velocity.y -0);
  
    let newXVelocity = Math.abs(bolinha.body.velocity.x) +0;
    
    if (bolinha.x < jogador.x) {
      bolinha.setVelocityX(-newXVelocity);
    } else {
      bolinha.setVelocityX(newXVelocity);
    }
  }