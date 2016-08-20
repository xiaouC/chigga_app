import React, { Component } from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
    StyleSheet
} from 'react-native';

var user = require('../user_info/user.js');
var common_views = require('../common/commonView.js');

var user_account = "";
var user_email = "";
var user_password_1 = "";
var user_password_2 = "";

var RegisterView = React.createClass({
    render(){
        return (
                <View style={styles.container} >
                    <common_views.BackTitleView text={'账号注册'} navigator={this.props.navigator} />

                    <Image style={styles.input_background}  source={require('./images/Form.png')}>
                        <View style={styles.input_phone_number}>
                            <Image style={styles.input_icon} source={require('./images/icon_shouji.png')} />
                            <TextInput style={styles.input_text} onChangeText={(text) => { user_account=text; }} keyboardType={'numeric'} placeholder={'手机号'} placeholderTextColor={'gray'}></TextInput>
                        </View>
                        <View style={styles.input_email}>
                            <Image style={styles.input_icon} source={require('./images/icon_youxiang.png')} />
                            <TextInput style={styles.input_text} onChangeText={(text) => { user_email=text; }} keyboardType={'email-address'} placeholder={'邮箱'} placeholderTextColor={'gray'}></TextInput>
                        </View>
                        <View style={styles.input_password}>
                            <Image style={styles.input_icon} source={require('./images/icon_mima.png')} />
                            <TextInput style={styles.input_text} onChangeText={(text) => { user_password_1=text; }} placeholder={'密码'} placeholderTextColor={'gray'} secureTextEntry={true} ></TextInput>
                        </View>
                        <View style={styles.input_password_2}>
                            <Image style={styles.input_icon} source={require('./images/icon_mimaqueren.png')} />
                            <TextInput style={styles.input_text} onChangeText={(text) => { user_password_2=text; }} placeholder={'密码确认'} placeholderTextColor={'gray'} secureTextEntry={true} ></TextInput>
                        </View>
                    </Image>

                    <View style={{flex: 1}}/>

                    <View style={styles.user_agreement_view}>
                        <Text style={styles.user_agreement_text_1}>验证后意味着你已同意奇格的</Text>
                        <Text style={styles.user_agreement_text_2} onPress={ () => {
                            alert('user agreement click!');
                        }}>《使用协议》</Text>
                    </View>

                    <View style={styles.btn_item}>
                        <View style={styles.button_touchable_view}>
                            <TouchableOpacity onPress={ () => { user.register( user_account, user_email, user_password_1, user_password_2 ) }} >
                                <Image style={styles.btn_register} source={require('./images/btn_register.png')} />
                            </TouchableOpacity>
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

    input_background: {
        width: 300,
        height: 240,
        resizeMode: 'contain',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },

    input_phone_number: {
        width: 300,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    input_email: {
        width: 300,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    input_password: {
        width: 300,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    input_password_2: {
        width: 300,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    input_icon: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        resizeMode: 'contain',
    },

    input_text: {
        width: 240,
        height: 60,
        textAlign: 'left',
        color: 'black',
    },

    user_agreement_view: {
        width: 360,
        height: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    user_agreement_text_1: {
        fontSize: 14,
    },

    user_agreement_text_2: {
        fontSize: 14,
        color: '#FEC72E',
        marginLeft: 2,
        marginRight: 2,
    },

    btn_item: {
        width: 360,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 40,
    },

    button_touchable_view: {
        width: 280,
        height: 40,
    },

    btn_register: {
        width: 280,
        height: 40,
        resizeMode: 'contain',
    },
});

module.exports = RegisterView;
