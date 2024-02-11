var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function() {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    },100);
    
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else {
        var wrong = "wrong";
        playSound(wrong);
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("level "+level);
    var randomNumber = Math.round(Math.random() * 3);
    var randomchoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomchoosenColor);
    $("#"+ randomchoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomchoosenColor);

}

$(document).keypress(function(event) {
    if(!started) {
       $("h1").text("level "+level); 
       nextSequence();
    }
    started = true;  
});

