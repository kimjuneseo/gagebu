
let count = 0;

function slide(){
    function play(){
        count++;
        if(count >= 4){ 
            count = 0;
        }
        imgview();
    }
    setInterval(play, 7000)
}

function imgview(){
    switch(count) {
        case 0:
            animat();
            count_btm();
            break;
        case 1:
            animat();
            count_btm();
            break;
        case 2:
            animat(); 
            count_btm();
            break;
        case 3:
            animat(); 
            count_btm();
            break;
    }
}
function animat(){
    $('.photos ul').animate({
        marginTop: -100*count + 'vh'
    }, 700) 
}

function count_btm(){ 
    $('.btm1').css("transform","scale(1)");
    $('.btm2').css("transform","scale(1)");
    $('.btm3').css("transform","scale(1)");
    $('.btm4').css("transform","scale(1)");

    switch(count){
        case 0:
            $('.btm1').css("transform","scale(1.3)");
            break;
        case 1:
            $('.btm2').css("transform","scale(1.3)");
            break;
        case 2:
            $('.btm3').css("transform","scale(1.3)");
            break;
        case 3:
            $('.btm4').css("transform","scale(1.3)");
            break;
    }
}



$(document)
.on('ready', slide)
