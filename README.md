# 客服 IM

基于悟空 IM 定制客服系统

# 使用方法

- 调试: `npm run start`
- 编译: `npm run build`
- 引入 SDK: 将编译后的`build/js/main.*.js`和`build/css/main.*.css`引入到自己的页面中，SDK 本身会在 window 下暴露**RunApp**方法，只需要调用`window.__RunApp__`即可，`__RunApp__`的 API 见下文。

# API

```

const button = document.getElementById('button');
const btnLang = document.getElementById('btnLang');
const events = {};

 window.__RunApp__({
    locale: 'zh',                   // 语言包 cn|ru
    username: 'hellojwt4',          // 用户名
    api: "http://106.15.250.63:8090/v1/",  //  im服务器api接口配置
    jwtToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",  // jwtToken
    companyInfo: {                              // 右侧企业信息
        uri: '...'                              // 企业头像
        account: '123123',                      // 账号
        enterpriseCode: '1234567891234536',     // 企业码
        name: '北京京東叁佰陸拾電子商務有限公司',    // 企业名称
    },
    unmounted: () => {
        // 组件卸载时，删除事件
        button.removeEventListener('click', events['open']);
        btnLang.removeEventListener('click', events['changeLang']);
    },
    onVisibleChange: () => {},               // 隐藏显示回调函数
    getQuestion: () => {                    // 获取对话框右边问答列表
        return Promise.resolve({ success: true, data: [] });
    },
    onConversationListener: (res) => {          // 监听消息回调，用于小红点逻辑
        console.log(222, res);
    },
    onReady: (payload = {}) => {             //  im准备回调函数
        const { onCloseIm, onOpenIm， onChangeLanguage, getUnread  } = payload || {};   //暴露open，close，onChangeLanguage事件

        events['open'] = onOpenIm
        events['changeLang'] = () => {
            onChangeLanguage('ru');
        }

        button.addEventListener('click', events['open']);
        btnLang.addEventListener('click', events['changeLang']);

        getUnread().then((res) => {
            console.log(888, res.count);
        });
    },
    style: {                    // 聊天框的位置
        bottom: 150,            // 离页面底部的距离
        right: 100              // 离页面右侧的距离
    }
});
```
