//https://teachablemachine.withgoogle.com/models/dmdCXUILs/

prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:330,
    height:330,
    image_format:'png',
    png_quality:100
});

camera = document.getElementById("camera");
Webcam.attach('#camera');


function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("selfie").innerHTML = '<img id="captured_img" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/dmdCXUILs/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model loaded");
}

function predict(){
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult );
    
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_name").innerHTML = results[0].label;
        document.getElementById("result_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Thumbs Up"){
            document.getElementById("emoji_result").innerHTML = "&#128077";
            
        }
        if(results[0].label == "Victory"){
            document.getElementById("emoji_result").innerHTML = "&#9994";
        }
        if(results[0].label == "Amazing"){
            document.getElementById("emoji_result").innerHTML = "&#128076";
        }
        if(results[0].label == "Clapping"){
            document.getElementById("emoji_result").innerHTML = "&#128075";
        }

        if(results[1].label == "Thumbs Up"){
            document.getElementById("emoji_3").innerHTML = "&#128077";
        }
        if(results[1].label == "Victory"){
            document.getElementById("emoji_3").innerHTML = "&#9994";
        }
        if(results[1].label == "Amazing"){
            document.getElementById("emoji_3").innerHTML = "&#128076";
        }
        if(results[1].label == "Clapping"){
            document.getElementById("emoji_3").innerHTML = "&#128075";
        }
    }
    

}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediciton is"+prediction_1;
    speak_data_2 = "The second prediction is"+prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
    
}