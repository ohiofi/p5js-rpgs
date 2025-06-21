/*global world,keyIsPressed,round,keyCode,abs,rect,ceil,scale,push,pop,frameCount,createCanvas,color,translate,triangle,frameRate,beginShape,endShape,curveVertex,shuffle,sin,cos,floor,rotate,textAlign,LEFT,RIGHT,CENTER,text,textSize,stroke,noStroke,strokeWeight,keyCode,keyIsDown,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,DOWN_ARROW,mouseIsPressed,fill,noFill,mouseX,mouseY,line,ellipse,background,displayWidth,displayHeight,windowWidth,windowHeight,height,width,dist,loadSound,loadImage,image,random,angleMode,RADIANS,DEGREES*/


let player = {
  x:1,
  y:1,
  newX:1,
  newY:1,
  direction:-1,
  state:"running",
  sword:false,
  //swordRotation:270
  swordRotation:0
}
let holdTime = 0;
let gridSize = 50
let img;
let lvl=0;
// let world = [];
// world[0] = {};
// world[0]["walls"] = [{x:7,y:5},{x:8,y:5},{x:9,y:5},{x:10,y:5},
//   {x:7,y:6},{x:8,y:6},{x:9,y:6},{x:10,y:6},
//              {x:7,y:7},{x:8,y:7},{x:10,y:7}];
// world[0]["trees"] = [{x:3,y:4},{x:4,y:5}];
// world[0]["doors"] = [{x:9,y:7,goto:1}];
// world[1] = {};
// world[1]["walls"] = [{x:7,y:4},{x:8,y:4},{x:9,y:4},{x:10,y:4},
//                      {x:6,y:5},{x:11,y:5},
//   {x:6,y:6},{x:11,y:6},
//                      {x:6,y:7},{x:11,y:7},
//              {x:7,y:8},{x:8,y:8},{x:10,y:8}];
// world[1]["trees"] = [];
// world[1]["doors"] = [{x:9,y:8,goto:0}];

function setup(){ // only when game loads
  createCanvas(windowWidth,windowHeight);
  img = {
    run1:loadImage("/images/mario1.png"),
    run2:loadImage("/images/mario2.png"),
    grass:loadImage("/images/grass.png"),
    tree:loadImage("/images/newtree01.png"),
    sword:loadImage("/images/sword.png"),
    wall:loadImage("/images/wall.jpg")
  }
}

function draw(){ // this is a built-in forever loop
  background("green");
  //ellipse(mouseX,mouseY,50,50);
  drawGrass();
  buildWalls();
  drawDoors();
  movePlayer();
  drawPlayer();
  drawTrees();
  hoverHighlight();
  // spin attack
  if(keyIsPressed && keyCode == 32){
    holdTime++;
    //player.swordRotation+=0.1;
    if(holdTime > 60){
      player.sword=true;
      player.swordRotation+=0.3;
      setTimeout(function(){
        player.sword=false;
        holdTime=0;
      },400);
      
      
    }
  }else{
    holdTime=0;
    //player.swordRotation = 200;
    player.swordRotation = 0;
  }
}

function drawDoors(){
  for(let i in world[lvl]["doors"]){
    fill(0)
    rect(world[lvl]["doors"][i].x*gridSize,world[lvl]["doors"][i].y*gridSize,gridSize,gridSize);
  
  }
}

function drawTrees(){
  for(let i in world[lvl]["trees"]){
    image(img.tree,world[lvl]["trees"][i].x*gridSize,world[lvl]["trees"][i].y*gridSize,gridSize,gridSize);
  
  }
}

function hoverHighlight(){
  noStroke();
  fill("rgba(255,255,255,0.3)");
  rect(floor(mouseX/gridSize)*gridSize,floor(mouseY/gridSize)*gridSize,50,50)
}

function buildWalls(){
  for(let i in world[lvl]["walls"]){
    image(img.wall,world[lvl]["walls"][i].x*gridSize,world[lvl]["walls"][i].y*gridSize,gridSize,gridSize)
  }
}


function movePlayer(){
  let raycastX = player.x + (player.newX - player.x) * 0.1;
  let raycastY = player.y + (player.newY- player.y)* 0.1;
  for(let i in world[lvl]["doors"]){
    if(dist(player.x,player.y,world[lvl]["doors"][i].x,world[lvl]["doors"][i].y) < 0.5){
      lvl = world[lvl]["doors"][i].goto;
      player.x = round(player.x);
      player.y = round(player.y);
      player.newX = player.x;
      player.newY = player.y;
      return
    }
  }
  // loop thru all the walls
  for(let i in world[lvl]["walls"]){
    // if distance from a wall is < 1
    if(dist(raycastX,raycastY,world[lvl]["walls"][i].x,world[lvl]["walls"][i].y) < 1){
      // then round off player.x and player.y
      player.x = round(player.x);
      player.y = round(player.y);
      player.newX = player.x;
      player.newY = player.y;
      return
    }
  }
  player.x = raycastX;
  player.y = raycastY;
  if( abs(player.x - player.newX) < 0.01 && abs(player.y - player.newY) < 0.01 ){
    player.state = "standing"
    player.x = player.newX
    player.y = player.newY
    
  }
}


function drawPlayer(){
  push()
  translate(player.x*gridSize,player.y*gridSize)
  scale(player.direction,1)
  if(frameCount % 20 >= 10 && player.state == "running"){
    image(img.run2,0,0,gridSize*player.direction,gridSize)
  }else{
    image(img.run1,0,0,gridSize*player.direction,gridSize)
  }
  if(player.sword){
    translate(gridSize/2*player.direction,gridSize*.7)
    ellipse(0,0,5,5)
    rotate(player.swordRotation);
    image(img.sword,0,-gridSize/2,gridSize,gridSize)
  }
  pop()
}


function drawGrass(){
  for(let row = 0; row < height/gridSize; row++){
    for(let column = 0; column < width/gridSize; column++){
      image(img.grass,column*gridSize,row*gridSize,gridSize-1,gridSize-1);
    }
  }
}


function keyPressed(){
  player.state="running"
  if(keyCode == 32){
    player.sword=true;
    setTimeout(function(){player.sword=false;},250);
  }
  if(keyCode === UP_ARROW || keyCode === 87 ){
    player.newY--
  }
  if(keyCode === DOWN_ARROW || keyCode === 83 ){
    player.newY++
  }
  if(keyCode === LEFT_ARROW || keyCode === 65 ){
    player.newX--
    player.direction = -1
  }
  if(keyCode === RIGHT_ARROW || keyCode === 68 ){
    player.newX++
    player.direction = 1
  }
}

function mousePressed(){
  player.state="running"
  player.newX = floor(mouseX/gridSize)
  player.newY = floor(mouseY/gridSize)
  if(floor(mouseX/gridSize) > player.x){
    player.direction = 1
  } else if(floor(mouseX/gridSize) < player.x){
    player.direction = -1
  }
}