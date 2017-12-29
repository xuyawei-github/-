mate标签属于辅助型的标签 一般有name 和 http- ivequive

<meta http-equiv="refresh" content="4,URL=http://www.baidu.com"/>
<!--移动端的三个-->
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1" />
<!--兼容ios消息栏-->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">

   1  name 是用来辅助浏览器兼容一些终端 或者修改一些兼容的样式一般和 content 配合使用
    http-equiv 是赋值浏览器的一些功能 或者获取一些参数 存在于http请求头当中进行传递 和content 属性一起配合使用
    2 name中有viewport(视口) / apple-mobile-web-app-capale （是否全屏） / apple-mobile-web-app-status-bar-style （信息栏的背景颜色）
    3  content 中device-width/height 设备的宽高  width/height渲染的宽高。  initial -scale初始化是放大还是缩小（0-10）   mininum-scale（0-10）最小时 放大倍数 userScalable 是否允许用户缩放  mannum-scale（）
