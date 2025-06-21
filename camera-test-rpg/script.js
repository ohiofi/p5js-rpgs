/*global round,rect,ceil,scale,push,pop,frameCount,createCanvas,color,translate,triangle,frameRate,beginShape,endShape,curveVertex,shuffle,sin,cos,floor,rotate,textAlign,LEFT,RIGHT,CENTER,text,textSize,stroke,noStroke,strokeWeight,keyCode,keyIsDown,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,DOWN_ARROW,mouseIsPressed,fill,noFill,mouseX,mouseY,line,ellipse,background,displayWidth,displayHeight,windowWidth,windowHeight,height,width,dist,loadSound,loadImage,image,random,angleMode,RADIANS,DEGREES*/

// create variables up here
// let foobar = 500;
// let username ="text";
// let array = ["apple","banana"];
let player = {
  x:1,
  y:1,
  newX:9,
  newY:9,
  direction:1,
  state:"running"
}
let camera = {
  x:0,
  y:0,
  newX:0,
  newY:0
}

let blocks = []
blocks.push({x:5,y:5})

let gridSize = 50
let img;

function preload(){
    img = {
        run1:loadImage("/images/megamanRun1.png"),
        run2:loadImage("/images/megamanRun2.png"),
        grass:loadImage("/images/pixelgrass.png"),
        tree:loadImage("/images/newtree01.png")
      }
}

function setup(){ // only when game loads
  createCanvas(windowWidth,windowHeight);
  player.newX = round(width/2/gridSize);
  player.newY = floor(height/2/gridSize);
  
  for(let i = 0; i<400;i++){
    blocks.push({x:round(random(-100,100)),y:round(random(-100,100))})
  }
}

function draw(){ // this is a built-in forever loop
  background("yellowgreen");
  drawGrass();
  fill(250);
  drawPlayer();
  drawTrees();
  hoverHighlight();
  movePlayer();
}


function drawTrees(){
  for(let i = 0; i < blocks.length; i++){
    //rect((blocks[i].x-camera.x)*gridSize,(blocks[i].y-camera.y)*gridSize,gridSize,gridSize);
    image(img.tree,(blocks[i].x-camera.x)*gridSize-gridSize,(blocks[i].y-camera.y)*gridSize-gridSize*2,gridSize*2,gridSize*2);
    
  }
}

function movePlayer(){
  player.x += (player.newX - player.x)*0.05;
  player.y += (player.newY - player.y)*0.05;
  if (Math.abs(player.x-player.newX)<.1 && Math.abs(player.y-player.newY)<.1){
      player.state="idle";
      player.x=player.newX;
      player.y=player.newY
  }
  camera.x += (camera.newX - camera.x)*0.02;
  camera.y += (camera.newY - camera.y)*0.02;
  if (Math.abs(camera.x-camera.newX)<.05 && Math.abs(camera.y-camera.newY)<.05){
      camera.x=camera.newX;
      camera.y=camera.newY
  }
}

function drawPlayer(){
  push();
  translate((player.x-camera.x)*gridSize+gridSize/2,(player.y-camera.y)*gridSize+gridSize);
  // draw shadow
  fill(0,0,0,150)
  ellipse(0,-5,gridSize/2,3)
  scale(player.direction,1);
  if(frameCount % 20 >= 10 && player.state == "running"){
    image(img.run1,-gridSize/2*player.direction,-gridSize, gridSize*player.direction, gridSize)
  }else{
    image(img.run2,-gridSize/2*player.direction,-gridSize, gridSize*player.direction, gridSize)
  }
  pop();
}

function drawGrass(){
  stroke(125);
  for(let row= -1-camera.y%1; row <= height/gridSize; row++){
    for(let column= -1-camera.x%1; column <= width/gridSize; column++){
      //fill(Math.abs(column*column)%255,Math.abs(row*row)%255,Math.abs(column*row)%255)
      // fill("lightgreen")
      // rect(column*gridSize,row*gridSize,gridSize,gridSize)
      image(img.grass,column*gridSize,row*gridSize,gridSize-1,gridSize-1)
    }
  }
}

function keyPressed(){
  player.state="running";
  if (keyCode === LEFT_ARROW) {
    player.newX--;
    camera.newX--;
    player.direction = -1;
  }
  if (keyCode === RIGHT_ARROW) {
    player.newX++;
    camera.newX++;
    player.direction = 1;
  }
  if (keyCode === UP_ARROW) {
    player.newY--;
    camera.newY--;
  }
  if (keyCode === DOWN_ARROW) {
    player.newY++;
    camera.newY++;
  }
}

function hoverHighlight(){
  noStroke();
  fill("rgba(0,0,0,0.1)");
  rect(floor((mouseX+(camera.x*gridSize)%gridSize)/gridSize)*gridSize-(camera.x*gridSize)%gridSize,floor((mouseY+(camera.y*gridSize)%gridSize)/gridSize)*gridSize-(camera.y*gridSize)%gridSize,gridSize,gridSize)
}

function mousePressed(){
  player.state="running";
  player.newX = floor(mouseX/gridSize+camera.x);
  camera.newX = round(((player.newX*gridSize)-width/2)/gridSize);
  player.newY = floor(mouseY/gridSize+camera.y);
  camera.newY = floor(((player.newY*gridSize)-height/2)/gridSize);
  if(player.newX > player.x){
    player.direction = 1
  } else if(player.newX < player.x){
    player.direction = -1
  }
}