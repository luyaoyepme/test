//点击开始游戏--- 动态生成100个div
//鼠标左键  没有雷  --点击其中一个位置，显示数字n，则表示该位置周围8个位置有n个雷
//          有雷 ---GAMEOVER
//扩散  --- 当前周围八个格子没有雷,直到边界
//鼠标右键-->没有标记且没有数字---标记----有标记 --- 取消标记 --->标记是否正确 -->10个标记正确 提示成功了

//已经出现数字--->无效果
var startBtn = document.getElementById('btn');
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var alertBox = document.getElementById('alertBox');
var alertImg = document.getElementById('alertImg');
var closeBtn = document.getElementById('closeBtn');
var score = document.getElementById('score');
var minesNum;
var mineOver;
var block;
var mineMap = [];
var key = true;

bindEvent();
//点击事件
function bindEvent(){
    startBtn.onclick = function () {
        if(key){
            box.style.display = 'block';
            flagBox.style.display = 'block';
            init();
            key = false;
        } 
       
    }
    //在雷盘部分取消鼠标默认事件
    box.oncontextmenu = function () {
        return false;
    }
    alertBox.oncontextmenu = function (){
        return false;
    }
    box.onmousedown= function (e){
        var event = e.target;
        if(e.which == 1){  //返回按键码  为则为左键
             leftClick(event) ;  
        }else if(e.which == 3){
            rightClick(event);
        }

    }
    closeBtn.onclick = function () {
        alertBox.style.display = 'none';
        flagBox.style.display = 'none';
         box.style.display = 'none';
         box.innerHTML = null;
         key = true;
    }
} 
//生成雷盘
function init () {
    minesNum = 10;
    mineOver = 10;
    for(var i = 0;i < 10;i++){
        for(var j  = 0; j < 10;j++){
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id',i + '-' + j);
            box.appendChild(con);      
            mineMap.push({mine:0});    
        }

    }
  //随机生成雷
    block = document.getElementsByClassName('block');
    while(minesNum){
        var mineIndex = Math.floor(Math.random()*100);
        if(mineMap[mineIndex].mine === 0){
            mineMap[mineIndex].mine = 1;
            block[mineIndex].classList.add('isLei');
            minesNum --;
        }  
    }
}
function leftClick(dom){
    if(dom.classList.contains('flag')){
        return;
    }
    var isLei = document.getElementsByClassName('isLei');
    if(dom && dom.classList.contains('isLei')){
        console.log('game over');
        for(var i = 0;i < isLei.length;i++){
            //如果点到雷 就显示其他所有的雷
            isLei[i].classList.add('show');
        }
        setTimeout(function (){
            console.log('1');
            alertBox.style.display = 'block';
            alertImg.style.display = 'block';
            alertImg.style.backgroundImage = 'url("E:/网页设计/perfect/HTML5学习笔记/经典扫雷/src/img/gover.jpg")';
            console.log('2');
        },400);
    }else {
        //不是雷则显示数字。根据该方块四周八个方块雷数确定数字
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX =posArr && +posArr[0];
        var posY =posArr && +posArr[1];
        dom && dom.classList.add('num');
        for(var i = posX -1;i <= posX + 1;i++){
            for(var j = posY - 1;j <= posY + 1;j++){
               var aroundBox = document.getElementById(i + '-' + j);
               if(aroundBox && aroundBox.classList.contains('isLei')){
                   n++;
               }
            }
        }
        dom && (dom.innerHTML = n);
        if(n == 0){
            dom.innerHTML = null;
            for(var i = posX -1;i <= posX + 1;i++){
                for(var j = posY - 1;j <= posY + 1;j++){
                   var nearBox = document.getElementById(i + '-' + j);
                   if(nearBox && nearBox.length != 0){
                       if(!nearBox.classList.contains('check')){
                        nearBox.classList.add('check');
                        leftClick(nearBox);
                       }
                       
                   }
                }
            }
        }
    //    [i-1,j-1] [i-1,j] [i-1,j+1]
    //    [i,j-1]   [i,j]   [i,j+1]
    //    [i+1,j-1]   [i+1,j] [i+1,j+1] 

         
    }
}

function rightClick(dom){
    if(dom.classList.contains('num')){
        return;
    }
    dom.classList.toggle('flag'); //有该类名就删除 没有就加 翻转操作
    if(dom.classList.contains('isLei')&& dom.classList.contains('flag')){
        mineOver --;
    }
    if(dom.classList.contains('isLei')&& !dom.classList.contains('flag')){
        mineOver ++;
    }
    score.innerHTML = mineOver;
    if(mineOver == 0){
        alertBox.style.display = 'block';
        alertImg.style.backgroundImage = 'url("src/img/youwin.jpg")'
    }
}