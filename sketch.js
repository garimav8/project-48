var backgroundImg
var unicornImg
var unicorn
var unicornJump
var unicornDown
var branch1
var branch2
var branch3
var unicorn5
var life = 3
var score = 0
var gold1
var coin = 0
var gameState = "start"
var PLAY 
var END
var xPos = 1000
var uniornRunning 

function preload(){
  backgroundImg = loadImage("images/bg image.png")
  unicornImg = loadAnimation("images/unicorn1.png","images/unicorn3.png")
  unicornStanding = loadAnimation("images/unicorn1.png")
  unicornJump = loadAnimation("images/unicorn2.png")
  unicornDown = loadAnimation("images/unicorn4.png")
  gold1Img = loadImage("images/gold1.png")
  branch1Img = loadImage("images/branch1.png")
  branch2Img = loadImage("images/branch2.png")
  branch3Img = loadImage("images/branch3.png")
  flowerImg = loadImage("images/flower.png")
  cloudImg = loadImage("images/cloud.png")
  unicorn5Img = loadImage("images/unicorn5.png");
  unicornRunning = loadSound("images/unicorn running.mp3")
}

function setup(){
    createCanvas(1280,600)

    unicorn = createSprite(150,400,10,10)
    unicorn.addAnimation("unicornStanding", unicornStanding)
    unicorn.addAnimation("unicorn",unicornImg)
    unicorn.addAnimation("unicornUp",unicornJump)
    unicorn.addAnimation("unicornDown",unicornDown)
    unicorn.scale = 0.5
  
    cloud = createSprite(60,80,10,10)
    cloud.addImage("cloud",cloudImg)
    cloud.scale = 0.8

    cloud = createSprite(480,80,10,10)
    cloud.addImage("cloud",cloudImg)
    cloud.scale = 0.8

    cloud = createSprite(1100,100,10,10)
    cloud.addImage("cloud",cloudImg)
    cloud.scale = 1.5

    unicorn1 = createSprite(1000,60,10,10)
    unicorn1.addImage("unicorn5",unicorn5Img)
    unicorn1.scale = 0.3

    unicorn2 = createSprite(1100,60,10,10)
    unicorn2.addImage("unicorn5",unicorn5Img)
    unicorn2.scale = 0.3

    unicorn3 = createSprite(1200,60,10,10)
    unicorn3.addImage("unicorn5",unicorn5Img)
    unicorn3.scale = 0.3

    branchGroup = new Group();
    goldGroup = new Group();
    flowerGroup = new Group();
}

function draw(){
  background(backgroundImg)
   unicornRunning.loop();
  
  if(gameState === "start"){
    
    fill('Black')
    textSize(30)
    text(" *Press Space To Start*" ,500,200)
    unicorn.y = 400
    unicorn.x = 150
    unicorn.changeAnimation("unicornStanding",unicornStanding)
    if(keyDown("SPACE")){
      gameState = "play"
  
    }
  }

  if(gameState === "play"){
    score = score + Math.round(getFrameRate()/10)
    if(keyDown("SPACE")){
      unicorn.velocityY  = -8
      unicorn.velocityX = 0
      unicorn.changeAnimation("unicornUp",unicornJump)
    }

  if(unicorn.velocityY>0){
   unicorn.changeAnimation("unicornDown",unicornDown)
  }

 
  unicorn.velocityY = unicorn.velocityY +1
  unicorn.collide(branchGroup)
  unicorn.x = 150

  if (unicorn.isTouching(branchGroup)){
    unicorn.changeAnimation("unicorn",unicornImg)
   }


   if(unicorn.isTouching(goldGroup)){
      coin = coin + 2
      goldGroup[0].destroy() 
    }

  
  spawnlogs()

  if(unicorn.isTouching(flowerGroup) || unicorn.y > height){
    life = life-1
    gameState = "start"
    goldGroup.destroyEach()
    branchGroup.destroyEach()
    flowerGroup.destroyEach()

  }

  if (life === 2){
    unicorn1.destroy()
  }
  
  if (life === 1){
    unicorn2.destroy()
  }
  if (life === 0){
    unicorn3.destroy()
  
    gameState = "end"
  }


// unicorn to be displayed 3 times
/*for(var i=life ; i>0; i--){
  
  unicorn5 = createSprite(xPos,60,10,10)
  unicorn5.addImage("unicorn5",unicorn5Img)
  unicorn5.scale = 0.3
  xPos = xPos+120
  
}*/
  
  }
  if (gameState === "end"){
   goldGroup.destroyEach()
   flowerGroup.destroyEach()
   branchGroup.destroyEach()
   fill('Black')
   textSize(30)
   text("GAME HAS ENDED!!",500,200)
   
  }


   
   drawSprites();
   stroke(20)
   stroke("black")
   fill('purple')
   textSize(40)
   text("SCORE ~" + score ,50,60)
   text("COINS ~"+ coin, 450, 60)
   
}

function spawnlogs(){
 if(frameCount%120 === 0){

  var y = Math.round(random(450,550)) 
   branch = createSprite(1500,y,150,50)
   branch.scale = 3
   branch.velocityX = -10
   branch.lifetime = 300
   branch.setCollider('rectangle',0,0,200,35)
   var num = Math.round(random(1,3))
   
   switch(num){
    case 1 : branch.addImage("branch1",branch1Img)
    branch.setCollider('rectangle',0,0,240,20)
    break;

    case 2 :  branch.addImage("branch2",branch2Img)
    branch.setCollider('rectangle',0,0,200,35)
    break;

    case 3 :  branch.addImage("branch3",branch3Img)
    branch.setCollider('rectangle',0,0,200,35)
    break;
    default: break
   }
    
  var angle = Math.round(random(-5,5))
    branch.rotation = angle
  // branch.debug = true
branchGroup.add(branch)
var flow= Math.round(random(1,5))

if(flow===1){
var x = Math.round(random(-50,50))
    var flower = createSprite(branch.x + x, branch.y - 160,10,10)
    flower.addImage("flower",flowerImg)
    flower.scale = 0.5
    flower.velocityX = branch.velocityX
    flower.depth= branch.depth
    flower.depth++
    flower.lifetime = 300
    flowerGroup.add(flower)

    //flower.debug = true
    flower.setCollider("rectangle",0,0,200,280)

}   

   
 }

 if(frameCount%60 === 0){
  var y = Math.round(random(30,400))
  gold1 = createSprite(1300,y,10,10)
  gold1.addImage("gold1",gold1Img)
  gold1.velocityX = -5
  gold1.scale = 0.1
  gold1.lifetime = 300
  
   goldGroup.add(gold1)
}
     
}