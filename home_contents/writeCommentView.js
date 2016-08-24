
import React, { Component } from 'react';

import {
    View,
    WebView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Text,
    Image,
    StyleSheet
} from 'react-native';

var user = require('../user_info/user.js');
var common_views = require('../common/commonView.js');

var comment_text = '';

class WriteCommentView extends React.Component {

    _open_photos() {
    };

    _cancel() {
        this.props.navigator.pop();
    };

    _send() {
        var _this_self = this;
        user.write_comment( this.props.item_id, null, comment_text, function() {
            _this_self.props.navigator.pop();
        });
    };

    render(){
        return (
                <View style={styles.container} >
                    <common_views.BackTitleView text={'嘻哈圈'} navigator={this.props.navigator} />

                    <Image style={styles.content_area} source={require('./images/write_comment_bg.png')}>
                        <TextInput style={styles.input_text} multiline={true} onChangeText={(text) => { comment_text=text; }} placeholder={'随便说点奇格的'} placeholderTextColor={'gray'}></TextInput>

                        <View style={styles.op_area}>
                            <TouchableOpacity onPress={this._open_photos.bind(this)}>
                                <Image style={styles.photo_icon} source={require('./images/picture.png')} />
                            </TouchableOpacity>
                            <View style={{flex: 1}} />
                            <View style={styles.btn_area}>
                                <Text style={styles.cancel_btn} onPress={this._cancel.bind(this)}>取消</Text>
                                <TouchableOpacity onPress={this._send.bind(this)}>
                                    <Image style={styles.send_icon} source={require('./images/reply.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Image>
                    <View style={{flex: 1, backgroundColor: 'transparent'}}/>
                    <Text style={{width: 360, height: 30}}>HAHAHA</Text>
                </View>
            );
    }
};

var styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
    },

    content_area: {
        width: 360,
        height: 195,
        resizeMode: 'contain',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    input_text: {
        width: 340,
        height: 150,
        textAlign: 'left',
        textAlignVertical: 'top',
        color: 'black',
    },

    op_area: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    photo_icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },

    btn_area: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    cancel_btn: {
        width: 60,
        height: 38,
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#AAAAAA',
    },

    send_icon: {
        width: 60,
        height: 38,
        resizeMode: 'contain',
    },

});

module.exports = WriteCommentView;
