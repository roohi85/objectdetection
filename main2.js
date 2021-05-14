video = "";
status = "";
objects = [];

function preload() {
    alarm = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function modelLoaded() {
    console.log("Model Loaded");
    status = true;

}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }

    else {
        console.log(results);
        objects = results;
    }
}


function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            if (objects[i].label == "person") {

                document.getElementById("status").innerHTML = "Status: Person Detected";
                document.getElementById("person_found").innerHTML = "Person Found";
                alarm.stop();
            }

            else {
                document.getElementById("person_found").innerHTML = "Person Not Found";
                alarm.play();
            }
        }
    }
}
