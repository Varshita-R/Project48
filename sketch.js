var jet;
var jetImg;
var bullet;
var bulletImg;
var dice;
var diceImg;
var score = 0;
var diceGroup;
var bulletGroup;
var gamestate=0;
var form;
var playerName;
var reset;
var resetImg;

function preload(){
  jetImg = loadImage("Jet.png");
  bulletImg = loadImage("Bullet.png");
  diceImg = loadImage("Dice.png");
  resetImg = loadImage("Reset.png");
}

function setup() {
  createCanvas(800,600);

  jet = createSprite(400,500,50,50);
  jet.addImage("jetImg",jetImg);
  jet.scale = 0.3;
  jet.visible=false;

  edges = createEdgeSprites();

  diceGroup = new Group();
  bulletGroup = new Group();

  form = new Form();
}

function draw() {
  background("#C8A2C8");  

  if(gamestate === 0){
    form.display();
    //gamestate = 1;
    console.log(gamestate);
  }

  if(gamestate === 1){
    
  spawnBullets();
  spawnDice();

  jet.visible=true;  

  }

  if(keyDown("LEFT_ARROW")){
    jet.x = jet.x-20;
  }

  if(keyDown("RIGHT_ARROW")){
    jet.x = jet.x+20;
  }

  jet.bounce(edges[0]);
  jet.bounce(edges[1]);


  for(var i=0; i<diceGroup.length; i++){
    if(diceGroup.get(i).isTouching(bulletGroup)){
      diceGroup.get(i).destroy();
      bulletGroup.destroyEach();
      score = score+2;
    }
  }
 
  fill("#A020F0")
  textSize(20);
  text("score: "+score,700,50);

  for(var i=0; i<diceGroup.length; i++){
    if(diceGroup.get(i).isTouching(jet)){
      diceGroup.get(i).destroy();
      diceGroup.destroyEach();
      bulletGroup.destroyEach();
      jet.destroy();
      gamestate=2;
    }
  }

  if(gamestate === 2){
    background("#157b9a");
    fill("white");
    textSize(20)
    text("Well Done "+playerName,300,250)
    text("Final Score: "+score,300,300);
    text("Game Ended",300,350);
    Reset();
  }

  drawSprites();

}


function spawnDice(){
  if(frameCount % 75 === 0){
  dice = createSprite(random(100,700),0,10,10);
  dice.addImage("diceImg",diceImg);
  dice.scale = 0.2;
  dice.velocityY = 3;
  dice.lifetime = 315;
  diceGroup.add(dice);
  }

}

function spawnBullets(){
  if(keyDown("space")){
    bullet = createSprite(jet.x,500,10,10);
    bullet.addImage("bulletImg",bulletImg);
    bullet.scale = 0.1;
    bullet.velocityY = -5; 
    bulletGroup.add(bullet);
  }
}

function Reset(){
  reset = createSprite(350,400,20,20);
  reset.addImage("resetImg",resetImg);
  reset.scale=0.1;
}

if(mousePressedOver(reset)){
  gamestate=0;
  reset.destroy();
}
