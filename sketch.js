var waterDrop, waterGroup;
var bucket;
var time;
var dangerImg, bucketImg, dropImg, boostImg;
var backgroundSound, collectSound, boostSound;
var danger;
var boost;
var score=0;
var gameState=1;
var count=0;
var startTime;
var speed=10;
var restart;

function preload(){
    dangerImg=loadImage('images/danger.png');
    bucketImg=loadImage('images/bucket.png');
    dropImg=loadImage('images/drop.png');
    boostImg=loadImage('images/thunder.png');
    backgroundSound=loadSound('sounds/rain_2.wav');
    collectSound=loadSound('sounds/collided.wav');
    boostSound=loadSound('sounds/boost.ogg');
}


function setup(){
    createCanvas(600,600);

    waterGroup=createGroup();
    dangerGroup=createGroup();
    boostGroup=createGroup(); 
    bucket=createSprite(300,550,50,100);
    bucket.addImage(bucketImg);
    bucket.scale=0.5
    bucket.debug=true;
   // backgroundSound.loop();
}


function draw(){
    background("yellow");
    textSize(18);
    text("Score: "+score,15,25);

    if(gameState===1){
        spawnWater();
        spawnDanger();
        spawnBoost();
        
        if(keyDown(RIGHT_ARROW)){
            bucket.x+=speed
        }
        
        if(keyDown(LEFT_ARROW)){
            bucket.x-=speed;
        }
    
        if(bucket.isTouching(waterGroup)){
           // waterGroup[0].velocityY=0;
            waterGroup[0].destroy();
            score+=10;
            collectSound.play();
        }

        if(bucket.isTouching(dangerGroup)){
            dangerGroup[0].destroy();
            gameState=0;
        }

        if(bucket.isTouching(boostGroup)){
            boostGroup[0].destroy();
            boostSound.play();
            startTime=time;
        }

        if(time===0){
            gameState=0;
        }

        if(startTime<=time+10){
            speed=15;
        }
        else{
            speed=10;
        }
        time=60-Math.round(count/frameRate());
        text("Time Left: "+time,490,25)
        count=count+1;
    }
    else{
        textSize(30);
        fill("red")
        text("Game Over!!",220,300);
        restart=createButton("Reset");
        restart.position(240,320);
        restart.size(50,20);
        restart.style("background","green");
        restart.mousePressed(function(){
            reset();
            restart.hide();
        })

    }

    drawSprites();
}


function spawnWater(){
    
    if(frameCount%50===0){
        waterDrop=createSprite(random(10,590),-20,10,10);
        waterDrop.velocityY=4+4*score/30;
        waterDrop.addImage(dropImg);
        waterDrop.scale=0.3
        waterDrop.debug=true;
        waterGroup.add(waterDrop);
        waterDrop.lifetime=150;
    }
}

function spawnDanger(){
    
    if(frameCount%550===0){
        danger=createSprite(random(10,590),-20,10,10);
        danger.velocityY=4+4*score/30;
        danger.addImage(dangerImg);
        danger.scale=0.4
        dangerGroup.add(danger);
        danger.lifetime=150;
    }
}

function spawnBoost(){
    if(frameCount%580===0){
        boost=createSprite(random(10,590),-20,10,10);
        boost.velocityY=4+4*score/30;
        boost.addImage(boostImg);
        boost.scale=0.4
        boostGroup.add(boost);
        boost.lifetime=150;
    }
}

function reset(){
    gameState=1;
    waterGroup.destroyEach();
    boostGroup.destroyEach();
    dangerGroup.destroyEach();
    score=0;
    time=60;
    count=0;
}






    



