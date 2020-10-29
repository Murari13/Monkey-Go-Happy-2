var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var SurvivalTime=0;
var play=0;
var end=1;
var gamestates=play;

function preload(){
  backgroundImage=loadImage("jungle.jpg");
   
  monkey_running =         loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas (600,400);

  monkey=createSprite(50,340,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.setcollider=("circle",0,0,40);
  monkey.debug=false;
  monkey.scale=0.1;

  ground=createSprite(300,400,1200,10);
  ground.x = ground.width /2;

  Background=createSprite(600,400);
  Background.addImage("jungle",backgroundImage);
  Background.x=Background.width/2;
  Background.scale=4.1;
  Background.depth=

  FoodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  
  background("white");
  textSize(30);
  text("Survival Time:"+SurvivalTime,300,30);


  if(gamestates==play){
  createFood();
  createObstacle();
  SurvivalTime = SurvivalTime + Math.round(getFrameRate()/60);
  ground.velocityX = -(4 + 3* SurvivalTime/100);
  //Background.velocityX=-(4 + 3*SurvivalTime/100);

  if (ground.x < 0){
      ground.x = ground.width/2;
  } 

  if(keyDown("space") &&monkey.y>300){
    monkey.velocityY = -15;
  }

  monkey.velocityY = monkey.velocityY + 0.5;

    if(obstacleGroup.isTouching(monkey)){
    gamestates=end;

  }
    
    if(monkey.isTouching(obstacleGroup)){
      monkey.scale=0.2;
    }
  }

  if(gamestates===end){
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setVelocityXEach(0);
  FoodGroup.setLifetimeEach(-1);
  ground.velocityX=0;
  monkey.velocityY=0;
  }
  console.log(monkey.y)
  monkey.collide(ground);
  drawSprites();
}

function createFood(){
  if(frameCount%80===0){
  food=createSprite(300,200);
  food.addImage("food",bananaImage);
  food.y=Math.round(random(120,200));
  food.velocityX=-3;
  food.scale=0.1;
  food.lifetime=100;
  FoodGroup.add(food);
  }
}

function createObstacle(){
  if(frameCount%100===0){
  obstacle=createSprite(480,360);
  obstacle.addImage("Rock",obstacleImage);
  var Rock=Math.round(random(1,4));
  switch(Rock){
    case 1: monkey.scale=0.12;
            break;
    case 2: monkey.scale=0.14;
            break;
    case 3: monkey.scale=0.16;
            break;
    case 4: monkey.scale=0.18;
            break;
    default:break;
  }
  obstacle.velocityX=-5;
  obstacle.scale=0.2;
  obstacle.lifetime=100;
  obstacleGroup.add(obstacle);
  }
  }

  function reset(){
  gamestate=play;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  SurvivalTime=0;
}



