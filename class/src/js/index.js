import '../css/reset.css';
import '../css/meituanIndex.css';
import '../plug/css/swiper.min.css';
import '../webfont/iconfont.css'

//获取数据渲染页面
//回到顶部的显示与隐藏
$(window).on('scroll', function () {
    var $scrollTop = $(window).scrollTop();
    if ($scrollTop >= 500) {
        $('#gotop').slideDown();
    } else if ($scrollTop < 500) {
        $('#gotop').slideUp();
    }
});
//回到顶部
$('#gotop').click(function () {
    $('html,body').animate({
        scrollTop: 0
    });
});

getData();
function getData(){
    var url = 'http://localhost:8080/api/list.json';
    $.ajax({
        type:'GET',
        url : url,
        dataType: 'json',
        success : addList,
        error : function(){
            alert('error');
        }
    })
}

function addList(data){
    // console.log(data.list);
    var str = '';
    var dataList = data.list;
    dataList.forEach(function(ele,index){
        console.log(ele);
         str += '<li class="foodspic">\
         <a href="http://localhost:8080/meituan.html?id='+ ele.id +'" class="clearfix">\
             <img src="'+ ele.info.imgurl +'" alt="">\
             <dl>\
                 <dt>'+ ele.info.name +'</dt>\
                 <dd>\
                     <p class="foodtitle">'+ ele.info.des +'</p>\
                     <p class="price">\
                         <span><strong>'+ ele.info.price +'</strong><i>元</i></span>\
                         <span>'+ ele.info.newUser +'</span>\
                         <span>'+ ele.info.sale +'</span>\
                     </p>\
                 </dd>\
             </dl>\
         </a>\
     </li> '
    });
    $('.guess-foodlist .list').html(str);
}