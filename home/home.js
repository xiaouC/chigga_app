
import React, { Component } from 'react';

import {
    View,
    ListView,
    TouchableHighlight,
    Text,
    Image,
    StyleSheet
} from 'react-native';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// bottom tab 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var tab_normal = require( './images/tab_normal.png' );
var tab_selected = require( './images/tab_selected.png' );

var tab_struct = function( src, text, onclick )   {
    this.src = src;
    this.text = text;
    this.onclick = onclick;
    this.obj = null;
};

var home_view = null;
var tab_config = new Array(
        new tab_struct( require( './images/tab_1.png' ), '嘻哈圈', function() {
            tab_config[0].obj.setState( { selected: true } );
            tab_config[1].obj.setState( { selected: false } );
            tab_config[2].obj.setState( { selected: false } );

            home_view.setState( { cur_sel: 0 } );
        }),
        new tab_struct( require( './images/tab_2.png' ), '奇格镇', function() {
            tab_config[0].obj.setState( { selected: false } );
            tab_config[1].obj.setState( { selected: true } );
            tab_config[2].obj.setState( { selected: false } );

            home_view.setState( { cur_sel: 1 } );
        }),
        new tab_struct( require( './images/tab_3.png' ), '黄  鬼', function() {
            tab_config[0].obj.setState( { selected: false } );
            tab_config[1].obj.setState( { selected: false } );
            tab_config[2].obj.setState( { selected: true } );

            home_view.setState( { cur_sel: 2 } );
        })
        );

// 
class NavigationButton extends React.Component {
    static defaultProps = {
        selected: false
    }; 

    static propTypes={
        selected: React.PropTypes.bool,
    };

    constructor(props){
        super(props);

        this.state = { selected: props.cur_sel == props.tab_index, };

        tab_config[props.tab_index].obj = this;
    }

    onclick() {
        tab_config[this.props.tab_index].onclick();
    }

    render() {
        var tc = tab_config[this.props.tab_index];
        var state = this.state.selected ? tab_selected : tab_normal;
        return (
                <TouchableHighlight onPress={this.onclick.bind(this)} >
                    <View style={{width:120,height:60}} >
                        <Image style={styles.bottom_tab} source={state} >
                            <Image style={styles.bottom_tab_image} source={tc.src} />
                            <Text style={styles.bottom_tab_text}>{tc.text}</Text>
                        </Image>
                    </View>
                </TouchableHighlight>
               );
        }
};

// 
var HomeListView = require('./homeListView.js');
var PersonalView = require('./PersonalView.js');
class HomeView extends Component {
    static defaultProps = {
        cur_sel: 0
    }; 

    static propTypes={
        cur_sel: React.PropTypes.number,
    };

    constructor(props){
        super(props);

        this.state = { cur_sel: props.index, };

        home_view = this;
    };

    render() {
        var content_view = <HomeListView style={styles.hp_content} navigator={this.props.navigator} />;
        switch(this.state.cur_sel) {
            case 0: content_view = <HomeListView style={styles.hp_content} navigator={this.props.navigator} />; break;
            case 1: content_view = <HomeListView style={styles.hp_content} navigator={this.props.navigator} />; break;
            case 2: content_view = <PersonalView style={styles.hp_content} navigator={this.props.navigator} />; break;
        }

        return (
                <View style = { styles.hp_container } >
                    <Image style = { styles.hp_top } source = { require('./images/title.png') } >
                        <Image style = { { width:84, height:25 } } source = { require('./images/chigga.png') } />
                    </Image>

                    {content_view}

                    <View style={ styles.hp_bottom } >
                        <NavigationButton tab_index={0} cur_sel={this.state.cur_sel} />
                        <NavigationButton tab_index={1} cur_sel={this.state.cur_sel} />
                        <NavigationButton tab_index={2} cur_sel={this.state.cur_sel} />
                    </View>
                </View>
            );
    };
};

var styles = StyleSheet.create({
    hp_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    hp_top: {
        width: 360,
        height: 53,
        justifyContent: 'center',
        alignItems: 'center',
    },

    hp_content: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },

    hp_bottom: {
        width: 360,
        height: 60,
        flexDirection: 'row',
    },

    bottom_tab: {
        width: 120,
        height: 60,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottom_tab_image: {
        width: 30,
        height: 30,
    },

    bottom_tab_text: {
        width: 120,
        height: 30,
        textAlign: 'center',
    },
});


module.exports = HomeView;