let windowSize;
let maxPopSize;
let sleep1img;
let sleep2img;
let popsImg = [];
let songs = [];
const scaleRate = 0.3;
let popsObj = [];
let snoreSound;

//pop figures
const popGRate = 2;
const maxPopNum = 15;
let timer = 0;


let popBreakCounter = 0;


//socket client
let socket = io();

socket.on("connect", ()=>{
    console.log("connect to the server");
    })
    
    socket.on("startValue", (startValue)=>{
        popBreakCounter = startValue;
    });
    socket.on("dataFromServer", (dataObj)=>{
       // console.log(dataObj.song);
      
        let tempPop = new Pop(windowSize*0.1,windowSize*0.56, dataObj.image,dataObj.song,dataObj.id);
        popsObj.push(tempPop);
        tempPop.xSpeed =dataObj.xSpeed;
        tempPop.ySpeed =dataObj.ySpeed;
        // console.log(dataObj);
         
     })


     socket.on("clickData", (data)=>{
        // console.log(dataObj.song);
         for (let i = 0; i < popsObj.length; i++)
         {
            if (popsObj[i].id == data.id){
                popsObj[i].scale = Infinity;
            }
         }
         popBreakCounter = data.count;
      })


function preload() {
  sleep1img = loadImage('assets/sleep1.jpg');
  sleep2img = loadImage('assets/sleep2.jpg');
  for (let i = 1; i < 5; i++){
    popsImg.push(loadImage(`assets/pop${i}.png`));
    songs.push(loadSound(`assets/song${i}.mp3`));
  // print(`assets/song${i}.mp3`);
  }
  snoreSound = loadSound("assets/snore.mp3");
}
function setup() {
 
  
  windowSize = windowHeight;
  maxPopSize = windowHeight/4;
  createCanvas(windowSize, windowSize);
   sleep1img.resize(windowSize, windowSize);
   sleep2img.resize(windowSize, windowSize);
  //image(sleep1img, 0, 0);
  /*
  for (let i = 0; i < 4; i++){
   let randomInt = int(random(4));
   
    popsObj.push(new Pop(windowSize*0.1,windowSize*0.56, popsImg[randomInt],songs[randomInt]));
   //print(popsObj[i].song);
   popsObj[i].xSpeed =random(-2,2);
     popsObj[i].ySpeed =random(-2);
    //popsObj[i].image.resize(10,10);
  }
  */
  snoreSound.loop();
  snoreSound.play();
  
}

function draw() {
 // print(popBreakCounter);
  //print(mouseX,mouseY);
  if (popBreakCounter > 30)
    {
      background(sleep2img);
      popsObj = [];
      snoreSound.stop();
      return;
    }
  background(sleep1img);
  
  //generatePop();
  popsObj = popsObj.filter(item=>item.scale< maxPopSize);
  //print(popsObj.length);
  for (let i = 0; i < popsObj.length; i++){
    
    
     popsObj[i].scale += scaleRate;
    image(popsImg[popsObj[i].image], popsObj[i].x, popsObj[i].y,popsObj[i].scale,popsObj[i].scale);
    popsObj[i].x += popsObj[i].xSpeed;
    popsObj[i].y += popsObj[i].ySpeed;
   
  }
  
}


function generatePop(){
  timer += deltaTime * popGRate;
  //print(timer);
  if (timer >= 1000){
    if (popsObj.length < maxPopNum)
    {
       let randomInt = int(random(4));
      let tempPop = new Pop(windowSize*0.1,windowSize*0.56, popsImg[randomInt], songs[randomInt]);
      popsObj.push(tempPop);
       tempPop.xSpeed =random(-2,2);
     tempPop.ySpeed =random(-2);
    }
      timer = 0;
    }
  
   
}

function mousePressed(){
  
  
  
}

function mouseReleased() {
  
  
  for (let i = 0; i < popsObj.length; i++){
    
    
    if (popsObj[i].clicked())
      {
        
        songs[popsObj[i].song].play();
      //popsObj[i].song.play();
      //popBreakCounter++;


      let dataObj = {
        id: popsObj[i].id,
        
    }

    socket.emit("data",dataObj);
      }
    
  }
}