var monkey, monkey_running;
var banana, bananaImage, bananagroup;
var obstacle, obstacleImage, obstaclegroup;
var FoodGroup;
var score = 0;
var ground,groindImage;
var survivaltime = 0;
var invisibleGround;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("jungle.jpg");

}



function setup() {
  createCanvas(600, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.12;

  ground = createSprite(400, 347, 600, 10);
  ground.velocityX = -4
  ground.addImage("move",groundImage)
  ground.scale=1.2
  ground.x = ground.width /2;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();

  invisibleGround = createSprite(200,355,400,10);
  invisibleGround.visible = false;

}


function draw() {
  background("lightBlue");

  food();
    spawnObstacles();
    scale2();
    
 
  console.log(ground.x)
    
  if (keyDown("space") && monkey.y >= 200) {
    monkey.velocityY = -18;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  

  if (monkey.isTouching(bananaGroup)) {
    score = score + 2;
    bananaGroup.destroyEach();
  }
  if (ground.x < 0){
      ground.x = ground.width/2;
   }
  
    monkey.depth = ground.depth;
    monkey.depth = monkey  .depth + 1;
    monkey.collide(invisibleGround);
    
    
  
    
    
    
  

  drawSprites();
  
  stroke("purple");
  textSize(20);
  fill("white");
  text("Score:" + score, 400, 50);

  stroke("white");
  textSize(20);
  fill("black");
  survivaltime = survivaltime + Math.ceil(getFrameRate() / 60);
  text("SurvivalTime=" + survivaltime, 100, 50)

}

function food() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 140, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = banana.depth + 1;

    banana.setCollider("circle", 10, 10, 5);
    monkey.debug = true;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 335, 10, 40);

    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6
    obstacleGroup.add(obstacle);
  }

}

function scale2(){
  if (monkey.isTouching(obstacleGroup)){
    
    monkey.scale=0.1;
    score=0;
    }
  else{
  switch (score){
    case 10: monkey.scale = 0.14;
      break;
    case 20: monkey.scale = 0.16;
      break;
    case 30: monkey.scale = 0.18;
      break;
    case 40: monkey.scale = 0.20;
    default: break;
  } 
  }
 
}



