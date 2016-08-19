
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

var common = {
    login_url: 'http://23.105.198.234/api/account/sign-in',
    register_url: 'http://23.105.198.234/api/users',

    request_error: '{"error":{"code":"HTTP_ERROR","message":"网络异常"}}',

    error_report: function( error_code, error_msg ) {
        alert( error_msg );
    },
};

module.exports = common;
