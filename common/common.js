
String.format = function() {
    if( arguments.length == 0 )
        return null;

    var str = arguments[0]; 
    for( var i=1; i<arguments.length; i++ ) {
        var re = new RegExp('\\{' + (i-1) + '\\}','gm');
        str = str.replace(re, arguments[i]);
    }

    return str;
}

var cur_url_prefix = 'http://23.105.198.234';

var common = {
    url_prefix:         cur_url_prefix,
    login_url:          cur_url_prefix + '/api/account/sign-in',
    register_url:       cur_url_prefix + '/api/users',
    get_contents_url:   cur_url_prefix + '/api/contents',
    get_content_detail_url: cur_url_prefix + '/api/contents',

    request_error: '{"error":{"code":"HTTP_ERROR","message":"网络异常"}}',

    error_report: function( error_code, error_msg ) {
        alert( error_msg );
    },

    injected_js: `
        (function loop(){
            if( document.readyState === 'complete' ) {
                var height = document.documentElement.clientHeight;
                window.location.hash = '#' + height;
            } else {
                setTimeout( function() {
                    if( document.readyState === 'complete' ) {
                        var height = document.documentElement.clientHeight;
                        window.location.hash = '#' + height;
                    } else {
                        loop();
                    }
                }, 10);
            }
        })();
    `,

    test_html: '<h1 id=\"-\">获取手机验证码</h1>\n<pre><code>POST /api/sms\n</code></pre><p>返回实例</p>\n<pre><code>测试情况下返回：\n{\n    captcha: &#39;123456&#39;\n}\n\n* 正式情况下验证码由手机短信的形式返回\n</code></pre><h1 id=\"-\">注册用户</h1>\n<pre><code>POST /api/users[?mode=email|phone]\n</code></pre><h5 id=\"-\">参数说明</h5>\n<pre><code>username:必须，当mode为email时，username需为email格式，为phone时，需为手机号码格式\npassword:必须，密码\nnickname:必须，昵称\ncaptcha:手机验证码，mode为phone才需要\n</code></pre><h1 id=\"-\">登录</h1>\n<pre><code>PUT /api/account/sign-in\n</code></pre><h5 id=\"-\">参数说明</h5>\n<pre><code>格式为JSON\nusername:用户名\npassword:密码\n</code></pre><h1 id=\"-\">注销</h1>\n<pre><code>PUT /api/account/sign-out\n</code></pre>',

};

module.exports = common;
