
var common = require('../common/common.js');
var net_util = require('../common/NetUtil.js');

var user = {
    navigator: null,

    user_id: null,
    nick_name: "",
    sex: 0,

    // 是否已经登录
    has_login: function() {
        if( this.user_id != null )
            return true;

        return false;
    },

    check_login: function() {
        if( !this.has_login() ) {
            this.navigator.push({name: 'Login'});

            return false;
        }

        return true;
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
            _this_self.user_id = 'me',
            _this_self.navigator.push({name: "PersonalInformation", passProps: {popToTop: true}});
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
            _this_self.user_id = 'me',
            _this_self.navigator.pop();
        } );
    },

    update_user_info: function() {
        this.navigator.popToTop();
    },

    // 点赞
    dian_zan: function(id: string, is_zan: bool, callback) {
        // 如果没有登录的话，弹出登录界面
        if( !this.has_login() ) {
            this.navigator.push({name: 'Login'});
            return;
        }

        net_util.postJson( common.get_zan_url, { 'content': id }, true, function(rsp_json_data) {
            callback();
        });
    },

    attention: function(id: string, has_attention: bool, callback) {
        callback();
        //// 如果没有登录的话，弹出登录界面
        //if( !this.has_login() ) {
        //    this.navigator.push({name: 'Login'});
        //    return;
        //}

        //net_util.postJson( common.get_attentions_url, { 'content': id }, true, function(rsp_json_data) {
        //    callback();
        //});
    },

    write_comment: function(id: string, parent_id: string, comment: string, callback) {
        // 如果没有登录的话，弹出登录界面
        if( !this.has_login() ) {
            this.navigator.push({name: 'Login'});
            return;
        }

        var tt = 'url: ' + common.get_comment_url + ', id: ' + id + ', comment:' + comment;
        alert( tt );
        net_util.postJson( common.get_comment_url, { 'content': id, 'comment': comment, 'parent': parent_id }, false, function(rsp_json_data) {
            //alert(rsp_json_data);
            callback();
        });
    },
};

module.exports = user;
