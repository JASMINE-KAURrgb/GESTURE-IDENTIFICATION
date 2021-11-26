camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/kzUWwgxcj/model.json',modelLoaded);
function modelLoaded(){
    console.log('model loaded');
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The first prediction is "+prediction_1;
    speak_data2="The second prediction is "+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterthis);
}
function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture").innerHTML=results[0].label;
        document.getElementById("result_gesture2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="THUMBS UP"){
            document.getElementById("update_gesture_1").innerHTML="&#128077;";
        }
        else if(results[0].label=="OPEN HAND"){
            document.getElementById("update_gesture_1").innerHTML="&#128400;";
        }
        else if(results[0].label=="V SHAPE"){
            document.getElementById("update_gesture_1").innerHTML="&#9996;";
        }
        else if(results[0].label=="PUNCH"){
            document.getElementById("update_gesture_1").innerHTML="&#128074;";
        }
        else if(results[0].label=="PERFECT"){
            document.getElementById("update_gesture_1").innerHTML="&#128076;";
        }
        else{
            console.log(results);
        }


        
        if(results[1].label=="THUMBS UP"){
            document.getElementById("update_gesture_2").innerHTML="&#128077;";
        }
        else if(results[1].label=="OPEN HAND"){
            document.getElementById("update_gesture_2").innerHTML="&#128400;";
        }
        else if(results[1].label=="V SHAPE"){
            document.getElementById("update_gesture_2").innerHTML="&#9996;";
        }
        else if(results[1].label=="PUNCH"){
            document.getElementById("update_gesture_2").innerHTML="&#9994;";
        }
        else if(results[1].label=="PERFECT"){
            document.getElementById("update_gesture_2").innerHTML="&#128076;";
        }
        else{
            console.log(results);
        }
        
    }
}