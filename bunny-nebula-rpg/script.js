/*global resizeCanvas,world,round,key,abs,rect,ceil,scale,push,pop,frameCount,createCanvas,color,translate,triangle,frameRate,beginShape,endShape,curveVertex,shuffle,sin,cos,floor,rotate,textAlign,LEFT,RIGHT,CENTER,text,textSize,stroke,noStroke,strokeWeight,keyCode,keyIsDown,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,DOWN_ARROW,mouseIsPressed,fill,noFill,mouseX,mouseY,line,ellipse,background,displayWidth,displayHeight,windowWidth,windowHeight,height,width,dist,loadSound,loadImage,image,random,angleMode,RADIANS,DEGREES*/
let lvl=0;

let player = {
  x:1,
  y:1,
  newX:1,
  newY:1,
  direction:-1,
  state:"running"
}
let camera = {
  x:0,
  y:0,
  newX:0,
  newY:0
}
let tree = {
  x:3,
  y:4
}
let gridSize = 100;
let treeSize = gridSize*1.2;
let img;
let walls = [{x:7,y:7},{x:8,y:7}];

function preload(){
    img = {
        run1:loadImage("/images/mario1.png"),
        run2:loadImage("/images/mario2.png"),
        grass:loadImage("/images/grass.png"),
        tree:loadImage("/images/newtree01.png"),
        brick:loadImage("/images/wall.jpg"),
        cave:loadImage("/images/cavetile.png"),
        sand:loadImage("/images/sandtile.png"),
        bigrock:loadImage("/images/bigrock01.png"),
        cliff:loadImage("/images/cliff02.png"),
        tallgrass:loadImage("/images/tallgrass01.png")
      }
}

function setup(){ // only when game loads
  createCanvas(windowWidth,windowHeight);
  gridSize=(windowWidth+windowHeight)/20;
  treeSize=gridSize*1.2;
  
  world[0].tile = img.grass;
  world[1].tile = img.sand;
  world[2].tile = img.cave;
}

function draw(){ // this is a built-in forever loop
  background("gray");
  //ellipse(mouseX,mouseY,50,50);
  drawBackgroundTile();
  drawDoors();
  drawWallsAndTreesBehindPlayer();
  drawPlayer();
  drawWallsAndTreesInFrontOfPlayer();
  hoverHighlight();
  centerTheCamera();
  movePlayer();
}

function centerTheCamera(){
  camera.newX = (player.x*gridSize-width/2)/gridSize;
  camera.newY = (player.y*gridSize-height/2)/gridSize;
  camera.x = camera.x + (camera.newX - camera.x) * 0.05;
  camera.y = camera.y + (camera.newY- camera.y)* 0.05;
}

function hoverHighlight(){
  noStroke()
  fill("rgba(0,0,255,0.2)")
  rect(round((mouseX+(camera.x*gridSize)%gridSize)/gridSize)*gridSize-(camera.x*gridSize)%gridSize-gridSize/2,ceil((mouseY+(camera.y*gridSize)%gridSize)/gridSize)*gridSize-(camera.y*gridSize)%gridSize-gridSize,gridSize,gridSize)
}


// function buildWalls(){
//   let currentSprite = img.wall;
//   for(let i in world[lvl].walls){
//     if(world[lvl].walls[i].sprite == "brick"){
//       image(img.brick,(world[lvl].walls[i].x-camera.x)*gridSize-gridSize/2,(world[lvl].walls[i].y-camera.y)*gridSize-gridSize,gridSize,gridSize)
//     }
//     if(world[lvl].walls[i].sprite == "bigrock"){
//       image(img.bigrock,(world[lvl].walls[i].x-camera.x)*gridSize-treeSize/2,(world[lvl].walls[i].y-camera.y)*gridSize-treeSize,treeSize,treeSize)
//     }
//     if(world[lvl].walls[i].sprite == "cliff"){
//             image(img.cliff,(world[lvl].walls[i].x-camera.x)*gridSize-gridSize/2,(world[lvl].walls[i].y-camera.y)*gridSize-gridSize,gridSize,gridSize)

//     }
    
//   }
// }

function buildAWall(myWallPiece){
    if(myWallPiece.sprite == "brick"){
      image(img.brick,(myWallPiece.x-camera.x)*gridSize-gridSize/2,(myWallPiece.y-camera.y)*gridSize-gridSize,gridSize,gridSize)
    }
    if(myWallPiece.sprite == "bigrock"){
      image(img.bigrock,(myWallPiece.x-camera.x)*gridSize-treeSize/2,(myWallPiece.y-camera.y)*gridSize-treeSize,treeSize,treeSize)
    }
    if(myWallPiece.sprite == "cliff"){
      image(img.cliff,(myWallPiece.x-camera.x)*gridSize-gridSize/2,(myWallPiece.y-camera.y)*gridSize-gridSize,gridSize,gridSize)
    }
}

function drawWallsAndTreesBehindPlayer(){
  for(let i in world[lvl].walls){
    if(world[lvl].walls[i].y < player.y)
      buildAWall(world[lvl].walls[i])
  }
  for(let i in world[lvl].trees){
    if(world[lvl].trees[i].y < player.y)
      drawTreeOrTallGrass(world[lvl].trees[i]);
  }
}

function drawTreeOrTallGrass(myTree){
  if(myTree.sprite == "tree")
        image(img.tree,(myTree.x-camera.x)*gridSize-treeSize/2,(myTree.y-camera.y)*gridSize-treeSize,treeSize,treeSize)
      if(myTree.sprite == "tallgrass")
        image(img.tallgrass,(myTree.x-camera.x)*gridSize-treeSize/2,(myTree.y-camera.y)*gridSize-treeSize,treeSize,treeSize)
}

function drawWallsAndTreesInFrontOfPlayer(){
  for(let i in world[lvl].walls){
    if(world[lvl].walls[i].y >= player.y)
      buildAWall(world[lvl].walls[i]);
  }
  for(let i in world[lvl].trees){
    if(world[lvl].trees[i].y >= player.y)
      drawTreeOrTallGrass(world[lvl].trees[i]);
  }
}

function drawDoors(){
  for(let i in world[lvl].doors){
    fill(0);
    rect((world[lvl].doors[i].x-camera.x)*gridSize-gridSize/2,(world[lvl].doors[i].y-camera.y)*gridSize-gridSize,gridSize,gridSize)
  }
}


function movePlayer(){
  let raycast = {
    x: player.x + (player.newX - player.x) * 0.1,
    y: player.y + (player.newY- player.y)* 0.1
  }
  
  // loop thru all the doors
  for(let i in world[lvl].doors){
    // if distance from a door is < 1
    if(dist(raycast.x,raycast.y,world[lvl].doors[i].x,world[lvl].doors[i].y) < 0.4){
      lvl = world[lvl].doors[i].goto;
      return
    }
  }
  
  
  // loop thru all the walls
  for(let i in world[lvl].walls){
    // if distance from a wall is < 1
    if(dist(raycast.x,raycast.y,world[lvl].walls[i].x,world[lvl].walls[i].y) < 1){
      player.x = round(player.x)
      player.y = round(player.y)
      player.newX = player.x
      player.newY = player.y
      return
    }
  }
  player.x = raycast.x;
  player.y = raycast.y;
  if( abs(player.x - player.newX) < 0.01 && abs(player.y - player.newY) < 0.01 ){
    player.state = "standing"
    player.x = player.newX
    player.y = player.newY
  }
  
}


function drawPlayer(){
  push()
  translate((player.x-camera.x)*gridSize-gridSize/2,(player.y-camera.y)*gridSize-gridSize)
  scale(player.direction,1)
  if(frameCount % 20 >= 10 && player.state == "running"){
    image(img.run2,0,0,gridSize*player.direction,gridSize)
  }else{
    image(img.run1,0,0,gridSize*player.direction,gridSize)
  }
  pop()
}


function drawBackgroundTile(){
  for(let row = -2-camera.y%1; row < height/gridSize; row++){
    for(let column = -2-camera.x%1; column < width/gridSize; column++){
      image(world[lvl].tile,column*gridSize,row*gridSize,gridSize,gridSize);
    }
  }
}


function keyPressed(){
  player.state="running";
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
  player.state = "running";
  player.newX = round(mouseX/gridSize+camera.x);
  player.newY = ceil(mouseY/gridSize+camera.y);
  if(player.newX > player.x){
    player.direction = 1
  }
  if(player.newX < player.x){
    player.direction = -1
  }
  
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
  gridSize=(windowWidth+windowHeight)/20;
  treeSize=gridSize*1.2;
}