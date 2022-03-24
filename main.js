song = "";
left_wrist_X = 0;
left_wrist_Y = 0;
right_wrist_X = 0;
right_wrist_Y = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
	song = loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.position(550,200);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
    
}

function draw(){
    image(video,0,0,400,400);

    fill("#FF0000");
    stroke("#FF0000");
    circle(right_wrist_X,right_wrist_Y,20);
    if(right_wrist_Y>0 && right_wrist_Y<=100)
    {
        document.getElementById("speed").innerHTML = "Speed: 0.5x";
        song.rate(0.5);
    }

    else if(right_wrist_Y>100 && right_wrist_Y<=200)
    {
        document.getElementById("speed").innerHTML = "Speed: 1x";
        song.rate(1);
    }

    else if(right_wrist_Y>200 && right_wrist_Y<=300)
    {
        document.getElementById("speed").innerHTML = "Speed: 1.5x";
        song.rate(1.5);
    }

    else if(right_wrist_Y>300 && right_wrist_Y<=400)
    {
        document.getElementById("speed").innerHTML = "Speed: 2x";
        song.rate(2);
    }

   
}

function playMusic()
{
	song.play();
	song.setVolume(1);
    song.rate(1);

}

function modelLoaded(){
    console.log("PoseNet is initialized!");
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
       
        left_wrist_X = results[0].pose.leftWrist.x;
        left_wrist_Y = results[0].pose.leftWrist.y;
        console.log("Left wrist x = "+left_wrist_X+" Left wrist y = "+left_wrist_Y);
        
        right_wrist_X = results[0].pose.rightWrist.x;
        right_wrist_Y = results[0].pose.rightWrist.y;
        console.log("Right wrist x = "+right_wrist_X+" Right wrist y = "+right_wrist_Y);
        
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of left wrist is " +scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of right wrist is " +scoreRightWrist);



    }
}