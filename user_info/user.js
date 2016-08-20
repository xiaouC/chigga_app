
var common = require('../common/common.js');
var net_util = require('../common/NetUtil.js');

var user = {
    navigator: null,

    session: null,

    user_id: null,
    nick_name: "",
    sex: 0,

    // 是否已经登录
    has_login: function() {
        if( this.user_id != null )
            return true;

        return false;
    },

    register: function( user_account, user_email, user_password_1, user_password_2 ) {
        if( user_account.replace( /(^s*)|(s*$)/g, "" ).length ==0 ) {
            alert( '账号不能为空！' );

            return;
        }

        if( user_email.replace( /(^s*)|(s*$)/g, "" ).length ==0 ) {
            alert( '邮箱不能为空！' );

            return;
        }

        if( user_password_1.replace( /(^s*)|(s*$)/g, "" ).length ==0 ) {
            alert( '密码不能为空！' );

            return;
        }

        if( user_password_2.replace( /(^s*)|(s*$)/g, "" ) != user_password_1 ) {
            alert( '两次输入的密码不一致！' );

            return;
        }

        var data = {
            'username': user_account,
            'phone': user_account,
            'email': user_email,
            'password': user_password_1,
        };

        var _this_self = this;
        net_util.postJson( common.register_url + "?mode=usual", data, true, function(rsp_json_data) {
            if( rsp_json_data['error'] != 0 ) {
                common.error_report( rsp_json_data['error'], rsp_json_data['message'] );
            } else {
                this.navigator.push({name: "PersonalInformation", passProps: {popToTop: true}});
            }
        } );
    },

    login: function( user_account, user_password ) {
        if( user_account.replace( /(^s*)|(s*$)/g, "" ).length ==0 ) {
            alert( '账号不能为空！' );

            return;
        }

        if( user_password.replace( /(^s*)|(s*$)/g, "" ).length ==0 ) {
            alert( '密码不能为空！' );

            return;
        }

        var data = {
            'username': user_account,
            'password': user_password,
        };

        var _this_self = this;
        net_util.putJson( common.login_url, data, true, function(rsp_json_data) {
            if( rsp_json_data['error'] != 0 ) {
                common.error_report( rsp_json_data['error'], rsp_json_data['message'] );
            } else {
                _this_self.navigator.pop();
            }
        } );
    },

    update_user_info: function() {
        this.navigator.popToTop();
    },

    // 点赞
    dian_zan: function(id: string) {
        // 如果没有登录的话，弹出登录界面
        if( !this.has_login() ) {
            this.navigator.push({name: 'Login'});
            return;
        }
    },

    is_zan: function(id: string) {
        return false;
    },
};

module.exports = user;
