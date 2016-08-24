
import React, { Component } from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Animated,
    ScrollView,
    TextInput,
} from 'react-native';

var BackTitleView = React.createClass({
    render(){
        var back_text = this.props.popToTop ? "跳过" : "返回";
        return (
                <Image style={BackTitleStyles.title_background} source={require('./images/title.png')} >
                    <TouchableOpacity onPress={ () => {
                        if( this.props.popToTop ) {
                            this.props.navigator.popToTop();
                        } else {
                            this.props.navigator.pop(); 
                        }
                    }}>
                        <View style={BackTitleStyles.back_item}>
                            <Image style={BackTitleStyles.back_arrow} source={require('./images/back_arrow.png')} />
                            <Text style={BackTitleStyles.title_back_text}>{back_text}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={BackTitleStyles.title_text}>{this.props.text}</Text>
                    <View style={BackTitleStyles.back_item} />
                </Image>
            );
    }
});

var BackTitleStyles = StyleSheet.create({
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
                <View style={PlaygroundStyles.square}>
                    <Animated.View style={[PlaygroundStyles.line, {height: this.state.line_values[0]}]} />
                    <Animated.View style={[PlaygroundStyles.line, {height: this.state.line_values[1]}]} />
                    <Animated.View style={[PlaygroundStyles.line, {height: this.state.line_values[2]}]} />
                    <Animated.View style={[PlaygroundStyles.line, {height: this.state.line_values[3]}]} />
                    <Animated.View style={[PlaygroundStyles.line, {height: this.state.line_values[4]}]} />
                    <Animated.View style={[PlaygroundStyles.line, {height: this.state.line_values[5]}]} />
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

var PlaygroundStyles = StyleSheet.create({

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

var relationship_src = [require('./images/attention_add.png'), require('./images/attention_each_other.png'), require('./images/attention_single.png')];
class FanItemView extends React.Component {
    render() {
        if( this.props.index < this.props.fans_list.length ) {
            var fan_info = this.props.fans_list[this.props.index];
            var relation = relationship_src[fan_info.relation];
            return (
                    <View>
                        <View style={FanItemStyles.item_fan}>
                            <View style={FanItemStyles.fan_image}>
                                <Image style={FanItemStyles.fan_image_icon} source={fan_info.src}/>
                            </View>
                            <View style={FanItemStyles.fan_summary}>
                                <Text style={FanItemStyles.fan_name}>{fan_info.nick_name}</Text>
                                <Text style={FanItemStyles.fan_signature}>{fan_info.signature}</Text>
                                <Text style={FanItemStyles.fan_desc}>{fan_info.desc}</Text>
                            </View>
                            <TouchableOpacity onPress={ () => { alert('relationship click!'); } }>
                                <View style={FanItemStyles.fan_relationship}>
                                    <Image style={FanItemStyles.fan_relationship_icon} source={relation}/>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Image style={FanItemStyles.line_fans} source={require('./images/line_fans.png')}/>

                        <FanItemView fans_list={this.props.fans_list} index={this.props.index+1}/>
                    </View>
                   );
        } else {
            return null;
        }
    }
};

var FanItemStyles = StyleSheet.create({

    item_fan: {
        width: 360,
        height: 90,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    fan_image: {
        width: 72,
        height: 72,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        marginRight: 12,
    },

    fan_image_icon: {
        width: 72,
        height: 72,
        resizeMode: 'contain',
    },

    fan_summary: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    fan_name: {
        fontSize: 14,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#868686',
    },

    fan_signature: {
        fontSize: 10,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#868686',
        marginTop: 8,
        marginBottom: 8,
    },

    fan_desc: {
        fontSize: 10,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#868686',
    },

    fan_relationship: {
        width: 72,
        height: 72,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    fan_relationship_icon: {
        width: 40,
        height: 40,
        alignSelf: 'center',
    },

    line_fans: {
        width: 360,
        height: 1,
        resizeMode: 'contain',
    },

});

class QuickInputView extends React.Component {
    _on_change_text(text) {
        this.props.main_view.reply_info.text = text;
    }

    render() {
        return (
                <View style={QuickInputStyles.quick_input_view}>
                    <View style={QuickInputStyles.quick_input_content_view}>
                        <TextInput style={QuickInputStyles.input_text} autoFocus={true} onChangeText={this._on_change_text.bind(this)}/>
                        <TouchableOpacity onPress={this.props.onPress}>
                            <Image style={QuickInputStyles.submit_button} source={require('./images/reply.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
               );
    }
};

var QuickInputStyles = StyleSheet.create({

    quick_input_view: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    quick_input_content_view: {
        width: 360,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    input_text: {
        width: 280,
        height: 40,
        textAlign: 'left',
        color: 'black',
    },

    submit_button: {
        width: 70,
        height: 40,
        resizeMode: 'contain',
    },
});

module.exports = {
    'BackTitleView': BackTitleView,
    'Playground': Playground,
    'FanItemView': FanItemView,
    'QuickInputView': QuickInputView,
};
