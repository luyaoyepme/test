var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);


//console.log(window)

var index = 0;
var songList; 
var audio = new root.audioControl();
//console.log(audio);

function bindEvent(){
    $scope.on("play:change",function(e,index){
        // console.log(index);  
        // console.log(songList[index]);
        console.log(audio.status);
        audio.getAudio(songList[index].audiosrc);
        if(audio.status == "play"){
            audio.play();
            root.pro.start();
        }
        root.pro.renderAllTime(songList[index].duration);
        root.render(songList[index]);
    })
    $scope.on('click',".prev-btn",function(){
        var index =  controlManger.prev();
        root.pro.start(0);
         $scope.trigger("play:change",index);
    })
    $scope.on('click',".next-btn",function(){
       var index = controlManger.next();
       root.pro.start(0);
        $scope.trigger("play:change",index);
    })
    $scope.on("click",".play-btn",function(){
        if(audio.status == "play"){
            audio.pause();
            root.pro.stop();
           // audio.status = "pause";
        }else{
            audio.play();
            root.pro.start();
           // audio.status == "play"
        }
        $(this).toggleClass("pause");
    })
}

//实现拖拽
function bindTouch(){
    var $slider = $scope.find('.slider-pointer');
    var offset = $scope.find('.pro-bottom').offset();
    var left = offset.left;
    var width = offset.width;
    console.log($slider);
    $slider.on('touchstart',function(){
         root.pro.stop();
    }).on('touchmove',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per > 0 && per <= 1){
            root.pro.update(per);
        }
        
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per > 0 && per <= 1){
            var curTime = per * songList[controlManger.index].duration;
            console.log(curTime);
            audio.playTo(curTime);
            $scope.find('.play-btn').addClass('playing');
            root.pro.start(per);
        }
    })
}

function getData(url){
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
          //  console.log(data);
           root.render(data[0]);
           songList = data;
           bindEvent();
           bindTouch();
           controlManger =new root.controlManger(data.length);
           $scope.trigger("play:change",0);
        },
        error:function(){
            console.log(error);
        }
    })
}


getData("../mock/data.json");