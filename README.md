# 客服IM
基于悟空IM定制客服系统

# 使用方法
* 调试: `npm run start`
* 编译: `npm run build`
* 引入SDK: 将编译后的`build/js/main.*.js`和`build/css/main.*.css`引入到自己的页面中，SDK 本身会在 window 下暴露__RunApp__方法，只需要调用`window.__RunApp__`即可，`__RunApp__`的 API 见下文。


# API
```
 window.__RunApp__({
    locale: 'zh',                   // 语言包 cn|ru
    username: 'hellojwt4',          // 用户名
    jwtToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",  // jwtToken
    companyInfo: {                              // 右侧企业信息
        uri: '...'                              // 企业头像
        account: '123123',                      // 账号
        enterpriseCode: '1234567891234536',     // 企业码
        name: '北京京東叁佰陸拾電子商務有限公司',    // 企业名称  
    },
    onVisibleChange: () => {},               // 隐藏显示回调函数
    onReady: (payload = {}) => {             //  im准备回调函数
        const { onCloseIm, onOpenIm } = payload || {};   //暴露open和close事件
        const button = document.getElementById('button');

        button.addEventListener('click', onOpenIm);
    }, 
    style: {                    // 聊天框的位置
        bottom: 150,            // 离页面底部的距离
        right: 100              // 离页面右侧的距离
    }
}); 
```
