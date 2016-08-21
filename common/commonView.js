
import React, { Component } from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Animated,
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

class Playground extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            line_values: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0), new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)],
        };

        this.anim_time = 0;
        this.anim_amplitude = 50;
        this.anim_offset = 150;
    }

    render() {
        return (
                <View style={styles.square}>
                    <Animated.View style={[styles.line, {height: this.state.line_values[0]}]} />
                    <Animated.View style={[styles.line, {height: this.state.line_values[1]}]} />
                    <Animated.View style={[styles.line, {height: this.state.line_values[2]}]} />
                    <Animated.View style={[styles.line, {height: this.state.line_values[3]}]} />
                    <Animated.View style={[styles.line, {height: this.state.line_values[4]}]} />
                    <Animated.View style={[styles.line, {height: this.state.line_values[5]}]} />
                </View>
               );
    }

    componentDidMount() {
        this.loopAnimation();
    }

    componentWillUnmount() {
        cancelAnimationFrame( this.anim_handle );
    }

    loopAnimation() {
        for( var i=0; i < 6; ++i ) {
            var time = this.anim_time + i * 0.5;
            this.state.line_values[i] = Number( Math.cos( time ).toFixed( 2 ) ) * this.anim_amplitude + this.anim_offset;
        }

        this.anim_time += 0.35;
        this.setState( { line_values: this.state.line_values } );

        this.anim_handle = requestAnimationFrame( this.loopAnimation.bind( this ) );
    }
}

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

    square: {
        flex: 1,
        backgroundColor: '#7f7f7f',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    line: {
        width: 10,
        height: 100,
        backgroundColor: 'white',
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 5,
    },
});

module.exports = {
    'BackTitleView': BackTitleView,
    'Playground': Playground,
};
