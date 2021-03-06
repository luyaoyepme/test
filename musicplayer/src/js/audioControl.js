(function($,root){
     function audioControl(){
        this.audio = new Audio();
        this.status = "pause";

     }
     audioControl.prototype = {
         play:function(){
            this.audio.play();
            this.status = "play";
         },
         pause:function(){
            this.audio.pause();
            this.status = "pause";
         },
         getAudio:function(src){
            //  console.log(src);
            this.audio.src = src;
            this.audio.load();
         },
         playTo : function(time){
             this.audio.currentTime = time;
             this.audio.play();
             this.status = "play";
         }
     }

     root.audioControl = audioControl;

})(window.Zepto,window.player || (window.player ={}));