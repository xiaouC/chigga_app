
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
    login_url:          cur_url_prefix + '/api/account/sign-in',
    register_url:       cur_url_prefix + '/api/users',
    get_contents_url:   cur_url_prefix + '/api/contents',

    request_error: '{"error":{"code":"HTTP_ERROR","message":"网络异常"}}',

    error_report: function( error_code, error_msg ) {
        alert( error_msg );
    },
};

module.exports = common;
