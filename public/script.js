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
  let dude,cursors, player, ball, alvo0, alvo1, alvo2,alvo3,texto,texto1,texto2,music
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
        this.load.image('oi3', '../assets/Scene3.png');
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
    this.load.audio('audio','assets/myaudio0.mp3');   
    this.load.image('fundo', 'assets/Foto3.png');
    this.load.image('bolinhaVermelha0', 'assets/ball/ball0copia.png');
    this.load.image('bolinhaVermelha1', 'assets/ball/ball1copia.png');
    this.load.image('bolinhaVermelha2', 'assets/ball/ball2copia.png');
    this.load.image('bolinhaVermelha3', 'assets/ball/ball3copia.png');
    this.load.image('ball', 'assets/ball/ball7copia.png');
    this.load.image('paddle', 'assets/paleta0.png');
    }
   create() { 
    music=game.sound.add('audio', {volume: 5.0});
    
    
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
  
  cursors = this.input.keyboard.createCursorKeys();
  player.setCollideWorldBounds(true);
  ball.setCollideWorldBounds(true);
  ball.setBounce(1, 1);
  this.physics.world.checkCollision.down = false;
  this.physics.add.collider(ball, alvo0, bater0, null, this);
  this.physics.add.collider(ball, alvo1, bater0, null, this);
  this.physics.add.collider(ball, alvo2, bater0, null, this);
  this.physics.add.collider(ball, alvo3, bater0, null, this);
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
  
  texto.setOrigin(0.5);
  texto1 = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'O MUNDO FOI DESTRUÍDO!',
    {
      fontFamily: 'times roman',
      fontSize: '50px',
      fill: '#fff'
    }
  );
  
  texto1.setOrigin(0.5);
  
  texto1.setVisible(false);
  
  texto2 = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'O MUNDO FOI SALVO!',
    {
      fontFamily: 'times roman',
      fontSize: '50px',
      fill: '#fff'
    }
  );
  texto2.setOrigin(0.5);
  texto2.setVisible(false);
  music.once('complete',function(){
    
    texto1.setVisible(true);
    ball.disableBody(true, true);
    player.setActive(false).setVisible(false);
  });  
}


  update (){
    
     if (jogoEncerrado(this.physics.world)){
          texto1.setVisible(true);
          player.destroy();
          music.stop();
          
     }else if (jogoConcluido()) {
             texto2.setVisible(true);
             ball.disableBody(true, true);
             player.destroy();
             music.stop();
    } else  {
      
      player.body.setVelocityX(0);
  
      if (cursors.left.isDown) {
        player.body.setVelocityX(-720);
      } else if (cursors.right.isDown) {
        player.body.setVelocityX(720);
      }
      if (!inicioDeJogo) {
        ball.setX(player.x);
      
        if (cursors.space.isDown) {
           inicioDeJogo = true;
           ball.setVelocityY(-280);
           texto.setVisible(false);
           music.play()
          } } } }
  }//fim Scene3
   function jogoEncerrado(mundo) {
  
    return ball.body.y > mundo.bounds.height }
   
  function jogoConcluido() {
      return  alvo0.countActive() + alvo1.countActive() + alvo2.countActive() + alvo3.countActive()  === 0;
    }
  function bater0(bolinha0, bolinha1) {
      bolinha1.disableBody(true, true);
    
      if (bolinha0.body.velocity.x === 0) {
        randNum = Math.random();
        if (randNum >= 0.5) {
          bolinha0.body.setVelocityX(420);
        } else {
          bolinha0.body.setVelocityX(-420);
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
  
    function contagemRegressiva(duracao, tela) {
      var tempo = duracao, minutos, segundos;
      setInterval(function () {
          minutos = parseInt(tempo/ 60, 10);
          segundos = parseInt(tempo % 60, 10);
          minutos = minutos < 10 ? "0" + minutos : minutos;
          segundos = minutos < 10 ? "0" + segundos : segundos;
          tela.textContent = minutos + ":" + segundos;
          if (--tempo < 0) {
              tempo = duracao;
          }
      }, 1000);
  }
  window.onload = function () {
      var duracao = 60 * 5; // Converter para segundos
          
      contagemRegressiva(duracao, tela); // iniciando o timer
  };
    