
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,candy,ground;
var candy_con;
var candy_con_2;

var bg_img;
var food;
var om_nella;

var button,blower;
var om_nella,sad,happy;
var blink,upset,happy;
var mute_btn;


var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

function preload()
{
  bg_img = loadImage('bluebg.jpg');
  sad = loadImage('omnellaupset.png');
  happy = loadImage('omnellahappy.png');
  candyImg = loadImage('candy.png')

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("f1.png","f2.png","f3.png","f4.png","f5.png","f6.png","f7.png","f8.png","f9.png","f10.png","f11.png","f12.png","f13.png","f14.png","f15.png");
  eat = loadAnimation("e1.png" , "e2.png","e3.png","e4.png","e5.png","e6.png","e7.png","e8.png","e9.png","e10.png","e11.png","e12.png","e13.png","e14.png");

  
  
}

function setup() {
  createCanvas(500,700);
 
  frameRate(80);

 // bk_song.play();
  //bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

om_nella = createSprite(350,620,100,100);
 om_nella.scale = 0.3;

  om_nella.addAnimation('blinking',blink);
  om_nella.addAnimation('eating',eat);
  om_nella.addAnimation('crying',sad);
  om_nella.changeAnimation('blinking');
  
  candy = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,candy);
  fruit_con=new Link(rope,candy       )
}
 
function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(candy!=null){
    image(candyImg,candy.position.x,candy.position.y,70,70);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();
  

  if(collide(candy,om_nella)==true)
  {
    om_nella.changeAnimation('eating');
    eating_sound.play();
  }


  if(candy!=null && candy.position.y>=650)
  {
    om_nella.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    candy=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  //rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,body);
               body = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


