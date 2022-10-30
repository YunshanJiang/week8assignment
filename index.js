let express = require('express');
let app = express();

app.use("/", express.static("public"));

let http = require("http");
let server = http.createServer(app);
let io = require("socket.io");
io = new io.Server(server); 
let myInterval;
const popGRate = 0.5;
let popBreakCounter = 0;

let popsImg = [];
let songs = [];
let popsObj = [];
let popCount = 0;

io.sockets.on("connection",(socket)=>{
    console.log("we ahve a new client", socket.id);

    socket.on("data", (data)=>{
        console.log(data);

        let dataObj = {
            id: data.id,
            count: ++popBreakCounter,
        }

        
        io.sockets.emit("clickData", dataObj);
    })
    socket.on("disconnect", ()=>{
        console.log("client disconnected: ",socket.id);
    })
});
let port = process.env.PORT || 3000;
server.listen(port,()=>{
    console.log("server on port 3000");
    for (let i = 1; i < 5; i++){
        popsImg.push(`assets/pop${i}.png`);
        songs.push(`assets/song${i}.mp3`);
      // print(`assets/song${i}.mp3`);
      }

      io.sockets.emit("startValue", popBreakCounter);
      myInterval = setInterval(function () {
        generatePop();
        io.sockets.emit("dataFromServer", generatePop());
    }, 1000*popGRate);

});

//clearInterval(myInterval);




function Pop(image,song, id, counter){
    this.xSpeed = null;
    this.ySpeed = null;
    this.image = image;
    this.song = song;
    this.id = id;
    
  }


function generatePop(){
    
    //print(timer);
   
     // if (popsObj.length < maxPopNum)
      //{
       // console.log(true);
         let randomInt = getRandomInt(4);
        
        let tempPop = new Pop(randomInt, randomInt,popCount);
      //  popsObj.push(tempPop);
       //console.log(tempPop.image);
         tempPop.xSpeed =getRandomIntInRange(-2, 2);
       tempPop.ySpeed =getRandomIntInRange(-2,0);
       popCount++;
       return tempPop;
     // }
  }






function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  function getRandomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }