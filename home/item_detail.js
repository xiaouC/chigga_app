
import React, { Component } from 'react';

import {
    View,
    WebView,
    ScrollView,
    TouchableHighlight,
    Text,
    Image,
    StyleSheet
} from 'react-native';

var common_views = require('../common/commonView.js');

// tag 
class ItemTagView extends React.Component {
    render() {
        return (
                <View style={styles.tag_item}>
                    <Image style={styles.tag_image} source={require('./images/tag_bg.png')}>
                        <Text style={styles.tag_text}>{this.props.text}</Text>
                    </Image>
                </View>
               );
        }
};

class HomeItemDetailView extends Component {
    render() {
        return (
                <View style={{flex:1}}>
                    <common_views.BackTitleView text={'嘻哈圈'} navigator={this.props.navigator} />

                    <ScrollView style={{height:100, backgroundColor: 'red'}}>
                    <View style={styles.summary}>
                        <View style={styles.user_info}>
                            <Image style={styles.user_head_icon} source={require('./images/head.png')} />
                            <Text style={styles.user_name}>DJ Jennies</Text>
                            <View style={{flex:1}}/>
                            <TouchableHighlight onPress={ () => {
                            }}>
                                <Image style={styles.user_attention} source={require('./images/attention_action_1.png')} />
                            </TouchableHighlight>
                        </View>
                        <Image style={styles.item_banner} source={require('./images/banner.png')} >
                            <View style={styles.tag_row}>
                                <ItemTagView text={'#街头'}/>
                                <ItemTagView text={'#涂鸦'}/>
                                <ItemTagView text={'#SWAG'}/>
                            </View>
                            <View style={{flex:1}}/>
                            <Text style={styles.item_title}>XXXXXX</Text>
                            <View style={styles.read_publish}>
                                <View style={styles.read_count}>
                                    <Image style={styles.read_icon} source={require('./images/read.png')}/>
                                    <Text style={styles.read_count_text}>8642</Text>
                                </View>
                                <View style={styles.publish_time}>
                                    <Image style={styles.publish_icon} source={require('./images/clock.png')}/>
                                    <Text style={styles.publish_time_text}>两天前</Text>
                                </View>
                            </View>
                        </Image>
                    </View>

                    <WebView style={{marginTop: 0, backgroundColor: 'white'}} source={{uri: 'https://github.com/facebook/react-native'}} />
                    </ScrollView>
                </View>
            );
    };
};

var styles = StyleSheet.create({

    summary: {
        width: 360,
        height: 230,
    },

    item_banner: {
        width: 340,
        height: 180,
        justifyContent: 'center',
        resizeMode: 'contain',
        alignSelf: 'center',
    },

    user_info: {
        width: 360,
        height: 25,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
    },

    user_head_icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginLeft: 12,
        marginRight: 14,
    },

    user_name: {
        height: 25,
        textAlign: 'left',
        color: '#323232',
    },

    user_attention: {
        width: 70,
        height: 20,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        marginRight: 15,
    },

    tag_row: {
        width: 360,
        height: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 12,
        marginLeft: 18,
    },

    tag_item: {
        width: 40,
        height: 21,
        marginRight: 5,
    },

    tag_image: {
        width: 40,
        height: 20,
        justifyContent: 'center',
    },

    tag_text: {
        width: 40,
        height: 20,
        fontSize: 10,
        paddingTop: 3,
        textAlign: 'center',
    },

    item_title: {
        flex: 1,
        width: 340,
        textAlign: 'left',
        fontSize: 30,
        color: 'white',
        marginLeft: 20,
    },

    read_publish: {
        width: 320,
        height: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 30,
    },

    read_count: {
        width: 50,
        height: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    read_icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },

    read_count_text: {
        fontSize: 10,
        textAlign: 'left',
        color: 'white',
        marginLeft: 5,
        paddingTop: 3,
    },

    publish_time: {
        width: 50,
        height: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 10,
    },

    publish_icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },

    publish_time_text: {
        fontSize: 10,
        textAlign: 'justify',
        color: 'white',
        marginLeft: 5,
        paddingTop: 3,
    },

    webview_style: {
       height: 300,
    },

});

module.exports = HomeItemDetailView;
