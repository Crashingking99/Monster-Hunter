var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg
var skeleton, skeletonImg
var bullet, bulletImg
var invisibleground
var zombiegroup, bulletgroup, skeletongroup
var gunshot
var lose
var win
var gameState="play"
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  skeletonImg = loadImage("assets/skeleton.png")
  bgImg = loadImage("assets/bg.jpeg")
bulletImg = loadImage("assets/Bullet.png")
gunshot = loadSound("assets/explosion.mp3")
lose = loadSound("assets/lose.mp3")
win  = loadSound("assets/win.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
 
  player.debug = true
   invisibleground=createSprite(displayWidth/2,displayHeight-200,displayWidth,10)
  invisibleground.visible=false
   player.setCollider("rectangle",0,0,300,300)
 zombiegroup=new Group()
bulletgroup=new Group()
skeletongroup= new Group()
}

function draw() {
  background(0); 


if (gameState==="play"){


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
player.velocityY= -10;
}
player.velocityY=player.velocityY+1
player.collide(invisibleground)



//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 bullet=createSprite(player.x,player.y,10,10)
 bullet.addImage(bulletImg)
 bullet.scale = 0.1;
 bullet.velocityX = 3;
 bulletgroup.add(bullet)
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyDown("space")){
  //player.addImage( shooter_shooting )
 // player.addImage()
 player.addImage(shooterImg)
 //player.addImage(shooter_1.png)

}
spawnZombie()
if (zombiegroup.isTouching(bulletgroup)){
gunshot.play()
zombiegroup[0].destroy()
bulletgroup[0].destroy()
}
spawnSkeleton()
if (skeletongroup.isTouching(bulletgroup)){
gunshot.play()
skeletongroup[0].destroy()
bulletgroup[0].destroy()
}
if (zombiegroup.isTouching(player)){
  gameState="end"
}
if (gameState==="end"){
  zombiegroup[0].destroy()
  player.destroy()
  lose.play()
}
} 
drawSprites();
if (gameState==="end"){
  textSize(40)
  fill("red")
  text("Game Over Hunter!",displayWidth/2,displayHeight/2)  
  zombiegroup.setVelocityXEach(0)
  skeletongroup.setVelocityYEach(0)
}
}
function spawnZombie() {
  if (frameCount % 60 === 0) {
    var zombie = createSprite(displayWidth,displayHeight-300,50,50);
    zombie.addImage(zombieImg);
    zombie.scale = 0.2;
    zombie.velocityX = -3;
    zombie.y=random(displayHeight-200,displayHeight-500)
    zombiegroup.add(zombie)
  }}
  function spawnSkeleton() {
    if (frameCount % 60 === 0) {
      var skeleton = createSprite(random(displayWidth/2-300,displayWidth),50,50,50);
      skeleton.addImage(skeletonImg);
      skeleton.scale = 0.2;
      skeleton.velocityY = 3;
      skeletongroup.add(skeleton)
    }}