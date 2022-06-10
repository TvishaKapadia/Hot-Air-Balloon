var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstaclesGroup, obstacleBottom1, obstacleBottom2, obstacleBottom3, obstacleTop1, obstacleTop2;
var gameOver;
var gameState=PLAY;
var PLAY=1;
var END=0;




function preload(){
bgImg = loadImage("assets/bg.png")
obstacleBottom1= loadImage("assets/obsBottom1.png")
obstacleBottom2= loadImage("assets/obsBottom2.png")
obstacleBottom3= loadImage("assets/obsBottom3.png")
obstacleTop1= loadImage("assets/obsTop1.png")
obstacleTop2= loadImage("assets/obsTop2.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

gameOverImg=loadImage("assets/gameOver.png");
dieSound=loadSound("assets/die.mp3");

}

function setup(){

  createCanvas(600,600);

//background image
//bg = createSprite(165,485,1,1);
//bg.addImage(bgImg);


bg = createSprite(165,485,1,1);
  bg.addImage(bgImg);
  bg.scale = 1.3
 // bg.x = bg.width /2;
  bg.velocityX = -6

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

gameOver= createSprite(300,300);
gameOver.addImage(gameOverImg);
gameOver.visible=false;

obstaclesGroup = new Group();


}

function draw() {


  
  background("black");
         
          //if(gameState===PLAY){
        
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;

           if (bg.x < 0){
            bg.x = bg.width/2;
          }

          spawnObstacles();
        

          if(obstaclesGroup.isTouching(balloon)){
            gameState=END
            dieSound.play();
          }
        //}
          else if (gameState === END) {
            gameOver.visible = true;
            bg.velocityX = 0;
            balloon.velocityY = 0;
            obstaclesGroup.setVelocityXEach(0);
          }
        
          
   
        drawSprites();
      }
        


function spawnObstacles(){
if(frameCount % 60 === 0){
  var obstacle= createSprite(600,165,10,40);
  obstacle.y =random(50,500)
  //obstacle.addImage(obstacleBottom1);
  obstacle.velocityX = -6;

  var rand= Math.round(random(1,5));
  switch(rand){
    case 1: obstacle.addImage(obstacleBottom1);
    break;
case 2: obstacle.addImage(obstacleBottom2);
    break;
case 3: obstacle.addImage(obstacleBottom3);
    break;
case 4: obstacle.addImage(obstacleTop1);
    break;
case 5: obstacle.addImage(obstacleTop2);
    break;
default: break;
  }
  obstacle.scale = 0.09;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
}
}