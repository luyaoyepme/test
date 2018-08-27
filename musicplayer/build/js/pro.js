//进度条模块

(function($,root){
 //渲染总时间 duration
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var startTime = 0;
    var lastPer = 0;
    function renderAllTime(time){
        lastPer = 0;
        curDuration = time;
        time = formatTime(time);
        $scope.find(".all-time").html(time);
    }

    function formatTime(time){
        time = Math.round(time);
        var m = Math.floor( time / 60);
        var s = time - m * 60;
        if(m < 10){
            m = '0' + m;
        }
        if(s < 10){
            s = '0' + s; 
        }
        return m + ':' + s;
    }
    //开始时间
    function start(p){
       lastPer = p == undefined ? lastPer : p;
        startTime = new Date().getTime();
        function frame(){
            var curTime =  new Date().getTime();
            var percent = (curTime - startTime) / (curDuration * 1000) + lastPer;
            if(percent <= 1){
                update(percent);
                frameId = requestAnimationFrame(frame); 
                // console.log(percent);
                //
            }else{
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    }
    //停止计时
    function stop(){
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }

    //左侧时间更新
    function update(per){
        var curTime = curDuration * per;
        curTime = formatTime(curTime);
        $scope.find('.cur-time').html(curTime);

        var perX = (per -1) * 100 + '%';
        $scope.find('.pro-top').css({
            transform:'translateX(' + perX + ')'
        })
    }

    root.pro = {
        renderAllTime : renderAllTime,
        start : start,
        stop : stop,
        update : update
    }


})(window.Zepto,window.player || (window.player = {}));