/**
 * Created by win7 on 2017/5/12.
 */
$(function(){
    //更改密码
    var b = new Base64();//base64加密
    var url={
        checkUse:baseUrl1+'/api/v1/ent/member/login.htm',
        code:baseUrl1+'/api/authcode/getAuthCode.htm',//验证码
    };
    //核对账号
    $('#userBtn').click(function(){
        var userName = $('.userName').val();
        if(!userName){
            $('.userTxt').html('用户名不能为空')
        }else{
            $('#userName').hide().siblings('#checkPic').show();
            $('.changeA').eq(1).find('a').addClass('on')
            $('.changeA').eq(0).find('a').removeClass('on');
        }
    });
    $('#phoneBtn').click(function(){
        var phoneNum = $('.pho input').val();
        if(!phoneNum){
            $('.phoneNum').text('手机号不能为空')
        }else{
            //验证手机号码格式
            var myReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0-1,3,6-8])|(18[0,1,2,3,4,5-9]))\d{8}$/;
            if(!myReg.test(phoneNum)){
                $('.phoneNum').text('手机号码格式不正确，请重新输入')
            }else{
                //调用发送验证码接口
                $('.pssbtn').css('background','##c0010a')
            }
        }
    })
})
//发送验证码判断
$(".pass-box .pssbtn").click(function () {
    var val = $(".pho input").val()
    var mobileInp =$(".pho")
    var code = $(".passwords input").val();
    if (!phoneNum(val,mobileInp)){
        phoneNum(val,mobileInp)
    }else{
       // getCode(type,val)
        sendCode()
    }
})
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
    clock = setInterval(doLoop, 1000); //一秒执行一次
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
        mobileInp.next("p").html("请输入手机号码！");
        mobileInp.addClass("warning-bor")
        return false;
    }
    if (!myReg.test(val)) {
        mobileInp.next("p").html("手机号码格式错误，请重新输入！");
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
        },
        error:function (res) {
            console.log(res)
        }
    })
}
