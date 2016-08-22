
import React, { Component } from 'react';

import {
    View,
        ListView,
        TouchableOpacity,
        Text,
        Image,
        StyleSheet
} from 'react-native';


var PersonalView = React.createClass({
    load() {
    },

    render(){
        return (
                <View style={styles.container} >
                    <Image style={styles.banner} source={require('./images/banner.png')} >
                        <Image style={styles.head_icon} source={require('./images/head.png')} />
                        <View style={styles.nick_name_sex} >
                            <Text style={styles.nick_name}>Charlie-The-Creator</Text>
                            <Image style={styles.sex} source={require('./images/female.png')} />
                        </View>
                        <Text style={styles.signature}>CTC-造物主，这是无法阻止的Charlie，你知道的...</Text>
                    </Image>
                    <Image style={styles.row_item} source={require('./images/item_bg.png')} >
                        <TouchableOpacity onPress={ () => { alert('attentions click!'); } }>
                            <View style={styles.item} >
                                <Text style={styles.item_count_text}>39</Text>
                                <Text style={styles.item_text}>我的关注</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={ () => { this.props.navigator.push({name: 'FansView'}); } }>
                            <View style={styles.item} >
                                <Text style={styles.item_count_text}>3724</Text>
                                <Text style={styles.item_text}>粉丝</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={ () => { alert('published click!'); } }>
                            <View style={styles.item} >
                                <Text style={styles.item_count_text}>68</Text>
                                <Text style={styles.item_text}>已发布</Text>
                            </View>
                        </TouchableOpacity>
                    </Image>
                    <View style={styles.separator} backgroundColor='#CCCCCC'/>
                    <TouchableOpacity onPress={ () => {
                        this.props.navigator.push({name: 'PersonalInformation'});
                    }}>
                        <View style={styles.settings}>
                            <Text style={styles.settings_text}>设置</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator} backgroundColor='#CCCCCC'/>
                </View>
            );
    }
});

var styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },

    banner: {
        width: 360,
        height: 204,
    },

    head_icon: {
        width: 54,
        height: 54,
        marginLeft: 153,
        marginTop: 40,
        marginBottom: 20,
    },

    nick_name_sex: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    nick_name: {
        height: 30,
        textAlign: 'center',
        color: 'white',
    },

    sex: {
        width: 16,
        height: 16,
        marginLeft: 5,
    },

    signature: {
        flex: 1,
        height: 30,
        textAlign: 'center',
        color: 'white',
    },

    row_item: {
        width:360,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    item: {
        width: 120,
        height: 60,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },

    item_count_text: {
        height: 30,
        textAlign: 'center',
        fontSize: 14,
        paddingTop: 10,
        color: 'black',
    },

    item_text: {
        height: 30,
        textAlign: 'center',
        fontSize: 14,
        color: 'black',
    },

    separator: {
        width: 360,
        height: 1,
        marginTop: 2,
        marginBottom: 2,
    },

    settings: {
        width: 360,
        height: 30,
    },

    settings_text: {
        height: 30,
        paddingTop: 5,
        paddingLeft: 10,
        textAlign: 'left',
        fontSize: 16,
        color: 'black',
    },

});

module.exports = PersonalView;
