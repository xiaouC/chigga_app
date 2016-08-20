
import React, { Component } from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';

var BackTitleView = React.createClass({
    render(){
        var back_text = this.props.popToTop ? "跳过" : "返回";
        return (
                <Image style={styles.title_background} source={require('./images/title.png')} >
                    <TouchableOpacity onPress={ () => {
                        if( this.props.popToTop ) {
                            this.props.navigator.popToTop();
                        } else {
                            this.props.navigator.pop(); 
                        }
                    }}>
                        <View style={styles.back_item}>
                            <Image style={styles.back_arrow} source={require('./images/back_arrow.png')} />
                            <Text style={styles.title_back_text}>{back_text}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title_text}>{this.props.text}</Text>
                    <View style={styles.back_item} />
                </Image>
            );
    }
});

var styles = StyleSheet.create({
    title_background: {
        width: 360,
        height: 53,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    back_item: {
        width: 60,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    back_arrow: {
        width: 10,
        height: 14,
        marginLeft: 10,
        marginRight: 5,
    },

    title_back_text: {
        width: 30,
        height: 50,
        fontSize: 14,
        textAlign: 'center',
        color: 'white',
        paddingTop: 15,
    },

    title_text: {
        flex: 1,
        height: 50,
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        paddingTop: 15,
    },

});

module.exports = {
    'BackTitleView': BackTitleView,
};
