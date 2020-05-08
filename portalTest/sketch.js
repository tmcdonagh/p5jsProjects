let numBalls = 13;
//let spring = 0.05;
let spring = 0.01;
//let gravity = 0.01;
let gravity = 0.01;
//let friction = -0.9;
let friction = -1.0;
let balls = [];

var images = [];
var jsonImages = [];
var jsonData;
var testImage;
var userCount = 0;

function preload() {
  // Test Server
  //let url='https://discordapp.com/api/guilds/708095318591406080/widget.json';


  // Tux Server
  let url='https://discordapp.com/api/guilds/349352685239271429/widget.json';
  jsonData = loadJSON(url);
  console.log(jsonData);
  //console.log(jsonData.name[0]);
  /*
  jsonData.members.forEach(function loadJson(item, index){
    console.log(index);
  });
   */
  
  // Local storage images used for testing
  /*
  for(var i = 0; i < 3; i++){
    images[i] = loadImage('img/image' + i + '.png');
  }
  */


}

function setup() {
  console.log(jsonData.members[0].avatar_url);
  /*
  console.log(jsonData.members);
  jsonData.members.forEach(function loadJson(item, index, avatar_url){
    console.log(index);
    jsonImages[index] = createImage('https://cdn.discordapp.com/widget-avatars/YEr39nypC8Keh6AaGXOK2oPtKRS1k3EppC6ie6Z3ecU/80Oj2U2UDSutpp9rst3DBL6BVptj7mXchBYprLdhD0pXdQPDZVMidBvQ8JyrPCeYTUNrvRoz5fmogZVXv9l041e6s0jXdHAJRCuuWVM_4tRmbjV_EUDDQt9NElloljOUu4qajhJZr0PD6w');
  });
   */
  createCanvas(1366, 768);
  numBalls = 0;
  for(var i = 0; i < jsonData.members.length; i++){
    userCount++;
    numBalls++;
    jsonImages[i] = loadImage(jsonData.members[i].avatar_url);
  }
  console.log(userCount);
  //testImage = loadImage(jsonData.members[0].avatar_url);
  testImage = jsonImages[0];
  //console.log(testImage);
  //testImage = loadImage('10.0.0.63/secondPortalTest/img/image0.png');
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      //random(30,70),
      170,
      i,
      balls
    );
  }
  noStroke();
  fill(255, 204);

}

function draw() {
  background(255);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
  //image(testImage , 100, 100);
}

class Ball {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    //this.imgNum = floor(random(0,images.length));
    //this.imgNum = floor(random(0,jsonImages.length));
    this.imgNum = this.id;
    //console.log(this.imgNum);
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

  display() {
    imageMode(CENTER);
    //image(images[this.imgNum], this.x, this.y);
    image(jsonImages[this.imgNum], this.x, this.y);
    //ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

