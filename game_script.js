var beams = document.querySelectorAll(".lazer-beam");
var danceFloor = document.querySelector(".dance-floor-container");

var alphaPattern =  function (patterns){
    console.log("loading alpha pattern");
    patterns.push("1010100000");
    patterns.push("0101000000");
    patterns.push("1010100000");
    patterns.push("0101000000");
    patterns.push("1010100000");
    patterns.push("0101000000");
    return;
}
 var betaPattern = function (patterns){
    console.log("loading beta pattern");
    patterns.push("0000010101");
    patterns.push("0000001010");
    patterns.push("0000010101");
    patterns.push("0000001010");
    patterns.push("0000010101");
    patterns.push("0000001010");
    return;
}
var rightWavePattern = function(patterns){
    
    patterns.push("1111000000");
    patterns.push("1110000000");
    patterns.push("1100000000");
    patterns.push("1000000000");
    return;
}
var upWavePattern = function(patterns){
    patterns.push("0000001111");
    patterns.push("0000000111");
    patterns.push("0000000011");
    patterns.push("0000000001");
    return;
}
var leftWavePattern = function(patterns){
    patterns.push("0111100000");
    patterns.push("0011100000");
    patterns.push("0001100000");
    patterns.push("0000100000");
    return;
}
var downWavePattern = function(patterns){
    patterns.push("0000011110");
    patterns.push("0000011100");
    patterns.push("0000011000");
    patterns.push("0000010000");
    return;
}




var lazerManager = {
    patternsToFire: [],
    patternsForReload: [alphaPattern, betaPattern, rightWavePattern, upWavePattern, leftWavePattern, downWavePattern],
    gameActive: false,

    beginGame: function(){
        this.gameActive = true;
        console.log("manager activated")
        this.activateTimer();
    },

    activateTimer: function(){
        var patternTimer = setInterval(function(){
            lazerManager.displayPattern();
        },1000);
    },

    displayPattern: function(){
        if(this.patternsToFire.length == 0){
            this.reloadPatterns();
        }
        this.activateBeams(this.patternsToFire.pop());
        
    },

    reloadPatterns: function(){
        var randIndex = Math.floor(Math.random() * this.patternsForReload.length);
        this.patternsForReload[randIndex](this.patternsToFire);
    },

    activateBeams: function(patternToActivate){
        for(var i = 0; i<10; i++){
            if(patternToActivate.charAt(i) === '1'){
                this.activateBeam(beams[i]);
            } else {
                beams[i].style.visibility = "hidden";
                beams[i].style.backgroundColor = "rgba(255,0,0,0.5)";
            }
        }
    },

    activateBeam: function(beamToActivate){
        beamToActivate.style.visibility = "visible";
        beamToActivate.style.backgroundColor = "rgba(255,0,0,0.1)";
        var beamTimea = setInterval(function(){
            beamToActivate.style.backgroundColor = "rgba(255,0,0,0.2)";
            clearInterval(beamTimea);
        },100);
        var beamTimeb = setInterval(function(){
            beamToActivate.style.backgroundColor = "rgba(255,0,0,0.3)";
            clearInterval(beamTimeb);
        },200);
        var beamTimec = setInterval(function(){
            beamToActivate.style.backgroundColor = "rgba(255,0,0,0.4)";
            clearInterval(beamTimec);
        },300);
        var beamTime = setInterval(function(){
            beamToActivate.style.backgroundColor = "rgba(255,0,0)";
            clearInterval(beamTime);
        },400);
    }
}


danceFloor.addEventListener("click", function(){
    if(!lazerManager.gameActive)
    {
        console.log("game started");
        lazerManager.beginGame();
    }
    
});
