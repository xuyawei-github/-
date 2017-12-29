1.gulp-connect 搭建一个小型的服务端口
        2.gulp-sass用于进行scss，sass，less转换成css格式文件
        3. gulp-concat用于文件的合并。
        4. gulp-uglify  js的压缩混淆
        5.gulp-clean-css css文件的压缩
        6.gulp-autoprefixer 帮助你自动添加css兼容前缀（不常用）
        7.gulp-inagemin 用来进行图片的压缩
        8.gulp-htmlmin 整理hrml文件 （不常用）
        9.gulp- 
/**
 * Created by win7 on 2017/6/1.
 */
var b = new Base64();//base64加密
$(function(){

    $('.codeTxt').css('marginTop','10px')
    //$('.codeTxt').css('marginBotom','10px')
    $('.register').click(function(){
        var userName = $('.userName').val();
        var userPhone = $('.phoneNum input').val();
        var userCode = $('.code').val();
        var userPsw = $('.userPsw').val();
        var mobileInp = $('.codeTxt');
        if(!userName){
            $('.userTxt').text('请输入公司名称')
        }else{
            $('.userTxt').text('')
            var myReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0-1,3,6-8])|(18[0,1,2,3,4,5-9]))\d{8}$/;
            if(!myReg.test(userPhone)){
                $('.phoneTxt').text('请输入正确的手机号')
            }else{
                $('.phoneTxt').text('')
                //验证码非空验证
                if(!userCode){
                    $('.codeTxt').text('请先获取验证码')
                }else{
                    //校检验证码
                   /* $.ajax({
                        type:'post',
                        data:
                        url:''
                    })*/
                   /* if(){
                        $('.codeTxt').text('验证码不正确')
                    }*/
                }
            }
        }
    });


    $('.loginBtn').click(function(){
        var loginName = $('.loginName').val();
        var loginPsw = $('.loginPsw').val();
        if(!loginName){
            $('loginTxt').text('请输入用户名')
        }else{
            if(!loginPsw){
                $('.loginPsw').text('请输入密码')
            }else{
                var _data = {
                    loginId: loginName,
                    password:hex_md5(loginPsw).toLowerCase()
                };
                var data = {
                    _data: encodeURIComponent(b.encode(JSON.stringify(_data)))
                };
                $.ajax({
                    type:"post",
                    data:data,
                    url:baseUrl1+"/api/v1/ent/member/login.htm",
                    success:function(res){
                        console.log(res);
                        if(res.returnCode==200){
                            location.href = '../jobList/componIndex.html'
                            //记住密码
                            //var res =b.decode(res.data)
                            //console.log(JSON.parse(b.decode(res.data)))
                            if($('.remberPsw').addClass('checkon')){
                                var info = {
                                    loginName:loginName,
                                    loginPsw:loginPsw
                                };
                                localStorage.setItem('rem',JSON.stringify(info))
                            }
                        }

                    }
                });
            }
        }
    });
    //取出密码;
    getPsw()
    function getPsw(){
        if(localStorage.getItem('rem')){
            var getInfo = JSON.parse(localStorage.getItem('rem'));
            $('.loginName').val(getInfo.loginName)
            $('.loginPsw').val(getInfo.loginPsw)
            console.log(getInfo);
        }else{
            return false
        }
    }
})
//发送验证码判断
$(".pass-box .pssbtn").click(function () {
    var val = $(".phoneNum input").val()
    var mobileInp =$(".codeTxt")
    //var code = $(".passwords input").val();
    if(!phoneNum(val,mobileInp)){
        $('.codeTxt').html('请先输入正确的手机号')
        return false;
    }else{
        console.log('a')
        sendCode();
        //调用发信息接口；
        $.ajax({
            type:'post',
            data:{
                mobileTel:$('.phoneNum input').val(),
                path:'2000'
            },
            url:baseUrl1+'/api/authcode/getAuthCode.htm',
            success:function(res){
                console.log(res);
            }
        })
    };
});
//--倒计时--
function doLoop(){
    nums = getCookie("time");
    if(nums == null){
        nums = 60
    }
    nums--;
    setCookie("time", nums);
    if(nums > 0){
        $(".get-code").prop("disabled",true)
        $(".get-code").css('background','#a6a6a6')
        $(btn).html(nums+'秒后重发')
    }else{
        clearInterval(clock); //清除js定时器
        $(btn).html('重新发送')
        $(".get-code").prop("disabled",false)
        $(".get-code").css('background','#c0010a');
        nums = 60; //重置时间
        delCookie("time");
    }
}
//验证码倒计时
function sendCode(){
    nums = 60;
    btn = $(".get-code");
    btn.disabled = true; //将按钮置为不可点击
    clock = setInterval(doLoop, 10); //一秒执行一次
    $(btn).html(nums+'秒后重发')
}
getMsg();
function getMsg(){
    nums = getCookie("time");
    if(nums == null){
        $(".get-code").html("获取验证码")
        $(".get-code").css('background','#c0010a')
    }else{
        nums=getCookie("time")
        sendCode($(".get-code"))
        $(".get-code").prop("disabled",true)
        $(".get-code").css('background','#a6a6a6')
    }
}
//设置Cookie的值
function setCookie(name,value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//获取Cookie的值
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//删除Cookie中的值
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//手机号码正则表达式
function phoneNum(val, mobileInp) {
    var myReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0-1,3,6-8])|(18[0,1,2,3,4,5-9]))\d{8}$/;
    if (!val) {
        mobileInp.html("请输入手机号码！");
        mobileInp.addClass("warning-bor")
        return false;
    }
    if (!myReg.test(val)) {
        mobileInp.html("手机号码格式错误，请重新输入！");
        mobileInp.addClass("warning-bor")
        return false;
    }
    return true;
}
function getCode(type,val) {
    $.ajax({
        url:baseUrl+url.code,
        type:'post',
        data:{
            mobileTel:val,
            path:type
        },
        success:function (res) {
            console.log(res)
        }
    })
}




