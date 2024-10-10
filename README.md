# 客服IM
基于悟空IM定制客服系统


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