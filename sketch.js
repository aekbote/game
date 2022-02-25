var END = 0;
var PLAY = 1;
var gameState = PLAY;
var dragonImg, dragonGroup;
var forestImg, forest;
var knightImg, knight;
var invisibleGround;
var score;
var bg;


function preload(){
// adding images to variable names
    forestImg = loadImage("forest.png");
    knightImg = loadImage("knight.png");
    dragonImg = loadImage("dragon.png");
}
  
function setup() {
 createCanvas(600,400);
    //displaying score
    text("Score: "+ score, 550,50);
 
    

    //creating knight
    knight = createSprite(80,320);
    knight.addImage(knightImg);
    knight.scale = 0.25;

    //creating invisible ground so knight won't fall
    invisibleGround = createSprite(300,390,600,20);
    invisibleGround.visible = true;

    score = 0;

    dragonGroup = new Group();

   knight.setCollider("rectangle",0,0,knight.width - 100, knight.height - 5);

    knight.debug = false;
    
}

function draw() {
    background(forestImg);
 

    if(gameState === PLAY){

        //jump when the space key is pressed
       if(keyDown("space") && knight.y >= 50 ) {
            knight.velocityY = -10;}

      if(dragonGroup.isTouching(knight)){
             gameState = END;
        
        }
        score = score + Math.round(getFrameRate()/60);
        //add gravity
        knight.velocityY = knight.velocityY + .8;

        
      SpawnDragons();
    }

    else if (gameState === END) {
    
         invisibleGround.velocityX = 0;
         knight.velocityY = 0
        

       dragonGroup.destroyEach();

       knight.destroy();

       textSize(50);
       text("Game Over!", 200,200);
       
   
    }

    knight.collide(invisibleGround);


    textSize(15);
    text("score: "+score,530,20);

    drawSprites();
}

function SpawnDragons(){
    //creating dragon
    if(frameCount % 150 == 0){
        var dragon = createSprite(620,350);
        dragon.addImage(dragonImg);
        dragon.scale = 0.3;
        dragon.velocityX = -2;
        dragon.lifetime = 300;

        //add each dragon to the group
        dragonGroup.add(dragon);

        dragon.debug = false;
        dragon.setCollider("rectangle",0,0,dragon.width - 150, dragon.height - 100);
    }

}
