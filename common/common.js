
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
    get_comment_url:    cur_url_prefix + '/api/comments',
    get_zan_url:        cur_url_prefix + '/api/likes',
    get_fans_url:       cur_url_prefix + '/api/fans',
    get_attentions_url: cur_url_prefix + '/api/attentions',

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

    get_publish_time: function( time: string ) {
        var now_time = new Date();
        var publish_time = new Date( time );

        var ms = now_time.getTime() - publish_time.getTime();

        var day = Math.floor( ms / ( 1000 * 60 * 60 * 24 ) );
        if( day > 0 ) {
            return day + '天前';
        }

        var hour = Math.floor( ms / ( 1000 * 60 * 60 ) );
        if( hour > 0 ) {
            return day + '小时前';
        }

        var minute = Math.floor( ms / ( 1000 * 60 ) );
        if( minute > 0 ) {
            return day + '分钟前';
        }

        return '刚刚';
    },

    get_comment_time: function( time: string ) {
        var now_time = new Date();
        var dt = new Date( time );

        var year = now_time.getFullYear() - dt.getFullYear();
        if( year > 0 ) {
            return year + '年前'
        }

        var month = dt.getMonth();
        var date = dt.getDate();
        var hour = dt.getHours();
        var min = dt.getMinutes();

        return month + '月' + date + '日 ' + hour + ':' + min;
    },
};

module.exports = common;
