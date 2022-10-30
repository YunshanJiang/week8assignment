function Pop(x, y,image,song,id){
    this.scale = 0;
    this.x = x;
    this.y = y;
    this.xSpeed = null;
    this.ySpeed = null;
    this.image = image;
    this.song = song;
    this.id = id;
    this.clicked = function(){
    if (mouseX < this.x + this.scale &&
        mouseX > this.x &&
        mouseY < this.y + this.scale &&
        mouseY > this.y){
      this.scale = Infinity;
      
      return true;
     // print(true);
    }
  }
  }
  