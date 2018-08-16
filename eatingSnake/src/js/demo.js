/**
 * 项目名称：贪吃蛇
 * 项目负责人：陈璐瑶
 * 时间2018年5月14日 
 */


//思路： 点击开始游戏 ---> startpage消失 
//游戏开始 ： 随机出现食物 ---> 出现三节蛇 -->开始运动
//按上下左右键 ：改变方向运动--
//判断是否吃到食物 ：蛇身变长 （蛇+1） 食物消失
//判断游戏结束： 弹出框 获得score
var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var scoreBox = document.getElementById('score');
var loser = document.getElementById('loser');
var loserScore = document.getElementById('loserscore')
var close = document.getElementById('close');
var startP = document.getElementById('startP');
var startBtn = document.getElementById('startBtn');
var startGameBool = true;
var startPaushBool = true;
var speed = 200;
init();
function init(){
     //地图
     this.mapW = parseInt(getComputedStyle(content).width);
     this.mapH = parseInt(getComputedStyle(content).height);
     this.mapDiv = content;
     //food
     this.foodW = 20;
     this.foodH = 20;
     this.foodX = 0;
     this.foodY = 0;
     //snake 
     //把这条蛇看成一个数组，第一位存着蛇身、第二第三位存着蛇身
     this.snakeW = 20;
     this.snakeH = 20;
     this.snakeBody = [[4,1,'head'],[3,1,'body'],[2,1,'body']];
     //
     //游戏属性
     this.direct = 'right';
     this.left = false;
     this.right = false;
     this.up = true;
     this.down = true;
    //分数属性
    this.score = 0;
    bindEvent();
}
function startGame(){
    //点击开始游戏
    //startpage --> null 
    startPage.style.display = 'none'; 
    startP.style.display = 'block';
    food();
    snake();
}
function food(){
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW/20));
    this.foodY = Math.floor(Math.random() * (this.mapH/20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 +'px';
    this.mapDiv.appendChild(food).setAttribute('class','food');
    // console.log(this.foodX +' ' + this.foodY)
}
function snake(){
    for(var i = 0; i < this.snakeBody.length;i++ ){
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch(this.direct){
            case 'right' :
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'left' :
                snake.style.transform = 'rotate(90deg)';
                break;
            case 'up' :
            snake.style.transform = 'rotate(180deg)';
                break;  
            case 'down' :
                break; 
         }
    }
    // console.log(snake.style.left+' '+ snake.style.top);
}
function move(){
    for(var i = this.snakeBody.length - 1 ; i > 0;i--){
        this.snakeBody[i][0] = this.snakeBody[i-1][0];
        this.snakeBody[i][1] = this.snakeBody[i-1][1];  
    }
    switch(this.direct){
        case 'right' :
            this.snakeBody[0][0] += 1;
            break;
        case 'left' :
            this.snakeBody[0][0] -= 1;

            break;
        case 'up' :
            this.snakeBody[0][1] -= 1;
            break;  
        case 'down' :
            this.snakeBody[0][1] += 1;
            break;

     }  
     removeClass('snake');
    snake();
    if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch(this.direct){
            case 'right' :
                this.snakeBody.push([snakeEndX + 1,snakeEndY,'body'])
                break;
            case 'left' :
            this.snakeBody.push([snakeEndX - 1,snakeEndY,'body'])
                break;
            case 'up' :
            this.snakeBody.push([snakeEndX,snakeEndY - 1,'body'])
                break;  
            case 'down' :
            this.snakeBody.push([snakeEndX,snakeEndY + 1,'body'])
                break;
         } 
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    if(this.snakeBody[0][0] < 0 ||this.snakeBody[0][0] >= this.mapW / 20){
        relodGame();
    } 
    if(this.snakeBody[0][1] < 0 ||this.snakeBody[0][1] >= this.mapH / 20){
        relodGame();
    } 
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for(var i = 1; i < this.snakeBody.length; i++){
        if(snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]){
            relodGame();
        }
    }
}
function relodGame(){
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    //
    startP.setAttribute('src', 'src/img/start.png');
    this.snakeBody = [[3, 2, 'head'], [2, 2, 'body'], [1, 2, 'body']];
    //游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    loser.style.display = 'block';
    loserScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;
    startGameBool = true;
    startPaushBool = true;

}
function removeClass(className){
     var ele = document.getElementsByClassName(className);
     while(ele.length > 0){
         ele[0].parentNode.removeChild(ele[0]);
     }
}

function setDirect(code){
    switch(code){
        case 37:
        if(this.left){
            this.direct = 'left';
            this.left = false;
            this.right = false;
            this.up = true;
            this.down = true;
        }
        break;
        case 38:
        if(this.up){
            this.direct = 'up';
            this.left = true;
            this.right = true;
            this.up = false;
            this.down = false;
        }
        break;
        case 39 : 
        if(this.right){
            this.direct = 'right';
            this.left = false;
            this.right = false;
            this.up = true;
            this.down = true;
        }
        break;
        case 40:
        if(this.down){
            this.direct = 'down';
            this.left = true;
            this.right = true;
            this.up = false;
            this.down = false;
        }
        default:
        break;
    }
}

function bindEvent(){
    close.onclick = function (){
        loser.style.display = 'none';
    }
    startBtn.onclick = function () {
        startAndPaush();
    }
    startP.onclick = function(){
        startAndPaush();
    }
}
function startAndPaush(){
    if(startPaushBool){
        if(startGameBool){
            startGame();
            startGameBool = false;   
        }
        startP.setAttribute('src','src/img/stop.png');
        snakeMove = setInterval(function () {
            move();
        }, speed);
        document.onkeydown = function(e){

            var code = e.keyCode;
            setDirect(code); 
            // console.log(code);
            return false;
        };
        startPaushBool = false;
    } else{
        startP.setAttribute('src','src/img/start.png');
        clearInterval(snakeMove);
        document.onkeydown = function(e){
            e.returnValue = false;
            return false;
            // console.log(code);
        };
        startPaushBool = true;
    }
}

var keys = [37, 38, 39, 40];

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
    preventDefault(e);
}

function disable_scroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}
