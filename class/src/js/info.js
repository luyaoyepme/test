import '../css/reset.css';
import '../webfont/iconfont.css';
import '../css/meituanDetail.css';

console.log('here');


function getId(){
   var idList = window.location.search.slice('1').split(';');
   var idNum;
   idList.forEach(function(ele,index){
       if(ele.indexOf('id')!== -1){
           idNum = ele.slice(3);
       }
   })
   return idNum;
}

getList();
function getList(){
    var _url = 'http://localhost:8080/api/list.json';
    $.ajax({
        type: 'GET',
        url : _url,
        dataType : 'json',
        success: getData,
        error: function(){
            alert('error');
        }
    })
}
function getData(data){
    var dataList = data.list;
    var idNum = getId(),
        len = dataList.length,
        str = '';
    for(var i = 0;i < len ;i++){
        if(dataList[i].id == idNum){
            addDom(dataList[i]);
            return;
        }
    }
}
function addDom(data){
    var infoList = data.info
    console.log(infoList);
    $('.bigimg').find('img').attr('src',infoList.imgurl);
    $('.bigimg').find('.name').text(infoList.name);
    $('.bigimg').find('.des').text(infoList.des);
    $('.price-box .price').find('strong').text(infoList.price);
    $('.seller .address').find('h4').text(infoList.receive);
    $('.seller .address').find('p').text(infoList.adderess);

    var comment = infoList.comment
    var str = '';
    comment.forEach(function(ele,index){
        console.log(ele);
       
        str += '<li class="item-evaluate">\
        <div class="foot-user clearfix">\
            <img src="'+ ele.pic+'" alt="">\
            <div class="user-strart">\
                <h5>'+ele.user +'</h5>\
            </div>\
            <p class="evaluate-date">'+ ele.date +'</p>\
        </div>\
        <div class="evaluate-content">\
            <p>'+ele.content +'</p>\
            <p>\
                <span><img src="'+ele.img +'" alt=""></span>\
            </p>\
        </div>\
        <div class="locale">\
            <a href="###">'+ infoList.receive +'</a>\
        </div>\
     </li>';
    })
    $('.food-evaluate').find('ul').html(str);
    // console.log(infoList.price)
}