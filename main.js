song = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;
volume = 0;


function preload() {
    song = loadSound("music.mp3")
}



function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + score_leftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X =" + leftWristX + "Left Wrist Y = " + leftWristY);

        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = " + score_rightWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X =" + rightWristX + "Right Wrist Y = " + rightWristY);
    }

}

function modelLoaded() {
    console.log("Posenet model is initialised");
}



function draw() {
    image(video, 0, 0, 600, 500);

    fill('#0E7C1E');
    stroke('black');

    if (score_leftWrist > 0.2) {

        circle(leftWristX - 20, leftWristY, 25);
        InNumberLeftWrist = Number(leftWristY);
        remove_decimals = floor(InNumberLeftWrist);
        volume = remove_decimals / 500;
        song.setVolume(volume);

        document.getElementsById("volume").innerHTML = "Volume = " + volume;
    }

    if (score_rightWrist > 0.2) {

        circle(rightWristX, rightWristY, 25);

        if (rightWristY > 0 && rightWristY <= 100) {

            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);

        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);

        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);

        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);

        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}



function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

