var climber,climberI;
var door,doorI;
var ghostJ, ghostS, ghostJI, ghostSI;
var sound;
var tower,towerI;

var InBl;

//groups
var doorGroup;
var climberGroup;
var blockGroup;

//GameStates
var PLAY=1;
var END=0;
var gameState=1;



function preload(){
  climberI = loadImage("climber.png");
  doorI = loadImage("door.png")
  ghostJI = loadImage("ghost-jumping.png")
  ghostSI = loadImage("ghost-standing.png")
  
  sound = loadSound("spooky.wav");
  
  towerI = loadImage("tower.png")
}

function setup(){
 createCanvas(600,600)  
  
  
  tower = createSprite(300,300,10,10)
  tower.addImage(towerI);
  tower.velocityY=3;
  
  
  
  
  
  ghost = createSprite(200,300,10,10);
  ghost.addImage(ghostSI)
  ghost.scale=0.4;
  
  doorGroup= new Group();
  climberGroup = new Group();
  blockGroup = new Group();
  
  sound.loop();
  
}

function draw(){
  
  background(0);
  
  if(gameState===PLAY){
    
  
    
  if(tower.y>600){
  tower.y=tower.width/2;
}
  
  //Jumping
  if(keyDown("SPACE")){
    ghost.velocityY=-4  ;
    
  }
  
  ghost.velocityY=ghost.velocityY+0.1;
  
  spawnDoor();
    
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }  
    
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }    
    
    
   if(climberGroup.isTouching(ghost)){
     ghost.velocityY=0;
     
   } 
    
    if(blockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState=0;
    }
    
    
    
  
  
  
  
  drawSprites();
  }
  
  
   if(gameState===0){
     
     
    
     
     
    fill("yellow");
     textSize(50);
    text("GAME OVER",100,300)
    
  }
}

function spawnDoor(){
  if(frameCount%250===0){
    door = createSprite(300,0,10,10);
    door.addImage(doorI);
    
    door.velocityY=4;
    
    door.x=random(100,500);
    
    climber=createSprite(300,50,10,10);
    climber.addImage(climberI);
    
    climber.x=door.x;
    
    climber.velocityY=4;       
    
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
    
    InBl = createSprite(300,55,10,10);
    
    InBl.width = climber.width;
    
    InBl.x=door.x;
    InBl.velocityY=4;
    
    InBl.visible=false;
    
    //lifetime
    door.lifetime=600/4;
    climber.lifetime=600/4;
    InBl.lifetime=climber.lifetime;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    blockGroup.add(InBl);
    
    
  }
}












