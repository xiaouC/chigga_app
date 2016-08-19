import React, { Component } from 'react';

import {
    View,
    TouchableHighlight,
    Text,
    TextInput,
    Image,
    StyleSheet
} from 'react-native';

var user = require('../user_info/user.js');
var common = require('../common/common.js');
var net_util = require('../common/NetUtil.js');

var common_views = require('../common/commonView.js');

var user_account = "";
var user_password = "";

var LoginView = React.createClass({
    render(){
        return (
                <View style={styles.container} >
                    <common_views.BackTitleView text={'登陆奇格'} navigator={this.props.navigator} />

                    <Text style={styles.login_title_text}>登陆奇格</Text>
                    <Text style={styles.login_desc_text}>登陆认证后才能成为一名真正的Chigga哦！</Text>

                    <Image style={styles.input_background}  source={require('./images/bg_Chart.png')}>
                        <View style={styles.input_phone_number}>
                            <Image style={styles.input_icon} source={require('./images/icon_shouji.png')} />
                            <TextInput style={styles.input_text} onChangeText={(text) => { user_account=text; }} keyboardType={'numeric'} placeholder={'手机号'} placeholderTextColor={'gray'}></TextInput>
                        </View>
                        <View style={styles.input_password}>
                            <Image style={styles.input_icon} source={require('./images/icon_mima.png')} />
                            <TextInput style={styles.input_text} onChangeText={(text) => { user_password=text; }} placeholder={'密码'} placeholderTextColor={'gray'} secureTextEntry={true} ></TextInput>
                        </View>
                    </Image>

                    <View style={styles.forgot_password_view}>
                        <Text style={styles.forgot_password_text_1}>忘记密码？点此</Text>
                        <Text style={styles.forgot_password_text_2} onPress={ () => {
                            this.props.navigator.push({name: 'Register'});
                        }}>找回密码</Text>
                        <Text style={styles.forgot_password_text_3}>吧...</Text>
                    </View>

                    <View style={styles.btn_item}>
                        <View style={styles.button_touchable_view}>
                            <TouchableHighlight onPress={()=>{this.props.navigator.push({name: 'Register'});}}>
                                <Image style={styles.button} source={require('./images/btn_zhuce.png')} />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.button_touchable_view}>
                            <TouchableHighlight onPress={()=>{user.login(user_account, user_password);}}>
                                <Image style={styles.button} source={require('./images/btn_denglu.png')} />
                            </TouchableHighlight>
                        </View>
                    </View>

                </View>
            );
    }
});

var styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    login_title_text: {
        fontSize: 30,
        color: '#FEC72E',
        marginTop: 80,
        marginBottom: 10,
    },

    login_desc_text: {
        fontSize: 16,
    },

    input_background: {
        width: 280,
        height: 90,
        resizeMode: 'contain',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        paddingBottom: 5,
    },

    input_phone_number: {
        width: 280,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    input_password: {
        width: 280,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    input_icon: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },

    input_text: {
        width: 240,
        height: 45,
        textAlign: 'left',
        color: 'black',
    },

    forgot_password_view: {
        width: 360,
        height: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    forgot_password_text_1: {
        fontSize: 14,
    },

    forgot_password_text_2: {
        fontSize: 14,
        color: '#FEC72E',
        marginLeft: 2,
        marginRight: 2,
    },

    forgot_password_text_3: {
        fontSize: 14,
    },

    btn_item: {
        width: 360,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 80,
    },

    button_touchable_view: {
        width: 109,
        height: 40,
    },

    button: {
        width: 109,
        height: 40,
        resizeMode: 'contain',
    },
});

module.exports = LoginView;
