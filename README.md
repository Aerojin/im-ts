# 客服IM
基于悟空IM定制客服系统

# 使用方法
* 调试: `npm run start`
* 编译: `npm run build`
* 引入SDK: 将编译后的`build/js/main.*.js`和`build/js/main.*.css`引入到自己的页面中，SDK 本身会在 window 下暴露__RunApp__方法，只需要调用`window.__RunApp__`即可，`__RunApp__`的 API 见下文。


# API
```
 window.__RunApp__({
    locale: 'zh',                   // 语言包 zh|ru
    username: 'hellojwt4',          // 用户名
    jwtToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",  // jwtToken
    onVisibleChange: () => {},               // 隐藏显示回调函数
    buttonProps: {              // 客服按钮属性
        bottom: 50,             // 按钮定位，离页面底部的距离
        right: 50,              // 按钮定位，离页面右侧的距离
        offsetBottom: 100,      // 按钮悬浮的位置
        icon = "https://cdn.wuhuxianmai.cn/deltrix/im_kefu.jpeg", // 客服Icon
    },
    style: {                    // 聊天框的位置
        bottom: 150,            // 离页面底部的距离
        right: 100              // 离页面右侧的距离
    }
}); 
```
