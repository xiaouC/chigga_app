
import React, { Component } from 'react';

import {
    View,
        ListView,
        TouchableHighlight,
        Text,
        Image,
        StyleSheet
} from 'react-native';

var user = require('../user_info/user.js');
var YYListView = require('../common/YYListView.js');

// tag 
class TagView extends React.Component {
    render() {
        return (
                <View style={styles.tag_item}>
                    <Image style={styles.tag_image} source={require('./images/tag.png')}>
                        <Text style={styles.tag_text}>{this.props.text}</Text>
                    </Image>
                </View>
               );
        }
};

// 
var count_src = new Array( require('./images/read.png'), require('./images/comment.png') );
class CountView extends React.Component {
    render() {
        var ci = count_src[this.props.index];
        return (
                <View style={styles.count_item}>
                    <Image style={styles.count_image} source={ci} />
                    <Text style={styles.count_text}>{this.props.count}</Text>
                </View>
               );
        }
};

// 
var zan_src_1 = require('./images/zan_1.png');
var zan_src_2 = require('./images/zan_2.png');
class ZanView extends React.Component {
    render() {
        var zan_src = user.is_zan( 'id_1' ) ? zan_src_2 : zan_src_1;
        return (
                <TouchableHighlight onPress={ () => { user.dian_zan( 'id_1' ); } } >
                    <View style={styles.count_item}>
                        <Image style={styles.count_image} source={zan_src} />
                        <Text style={styles.count_text}>{this.props.count}</Text>
                    </View>
                </TouchableHighlight>
               );
        }
};

var HomeListView = React.createClass({
    render(){
        return (
                <YYListView style={{flex:1}}
                    renderSeparator={ (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
                        return (
                            <View
                                key={`${sectionID}-${rowID}`}
                                style={{height: adjacentRowHighlighted ? 4 : 1, backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',}}
                            />
                        );
                    } }
                    renderRow={ (rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) => {
                        return (
                            <TouchableHighlight onPress={ () => { this.props.navigator.push({name: 'HomeItemDetailView'}); } } >
                                <View style={styles.list_item_row}>
                                    <Image style={styles.list_item_image} source={require('./images/hp_banner.png')} />
                                    <View style={{flex:1}} >
                                        <Text style={styles.list_item_title_text}> {rowData} </Text>
                                    </View>
                                    <View style={styles.list_item_summary}>
                                        <TagView text='#街头' />
                                        <TagView text='#涂鸦' />
                                        <TagView text='#SWAG' />
                                        <View style={{width:30}} />
                                        <CountView index={0} count={8642} />
                                        <CountView index={1} count={36} />
                                        <ZanView count={698} />
                                    </View>
                                </View>
                            </TouchableHighlight>
                        );
                    }}
                />
        )
    },
});

var styles = StyleSheet.create({

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

    count_item: {
        height: 21,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 5,
    },

    count_image: {
        width: 18,
        height: 16,
    },

    count_text: {
        height: 21,
        fontSize: 10,
        textAlign: 'left',
        paddingTop: 3,
        marginLeft: 5,
        marginRight: 5,
    },

    list_item_row: {
        width: 340,
        height: 273,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
    },

    list_item_image: {
        width: 340,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },

    list_item_title_text: {
        flex: 1,
        width: 340,
        textAlign: 'left',
        fontSize: 30,
    },

    list_item_summary: {
        width: 340,
        height: 40,
        paddingTop: 20,
        paddingLeft: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },

});

module.exports = HomeListView;
