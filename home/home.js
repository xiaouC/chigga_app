
import React, { Component } from 'react';

import {
    View,
    ListView,
    TouchableOpacity,
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
                <TouchableOpacity onPress={this.onclick.bind(this)} >
                    <View style={{width:120,height:60}} >
                        <Image style={styles.bottom_tab} source={state} >
                            <Image style={styles.bottom_tab_image} source={tc.src} />
                            <Text style={styles.bottom_tab_text}>{tc.text}</Text>
                        </Image>
                    </View>
                </TouchableOpacity>
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

        this.content_offset_y = 0;
        this.need_refresh = true;
        this.content_items = [];

        this.content_view_list = [];
        this.content_view_list.push( <HomeListView style={styles.hp_content} navigator={this.props.navigator} home_obj={this} ref={(ref)=>{if(ref)ref.load();}} /> );
        this.content_view_list.push( <HomeListView style={styles.hp_content} navigator={this.props.navigator} home_obj={this} ref={(ref)=>{if(ref)ref.load();}} /> );
        this.content_view_list.push( <PersonalView style={styles.hp_content} navigator={this.props.navigator} home_obj={this} ref={(ref)=>{if(ref)ref.load();}} /> );
    };

    render() {
        return (
                <View style = { styles.hp_container } >
                    <Image style = { styles.hp_top } source = { require('./images/title.png') } >
                        <Image style = { styles.top_title_image } source = { require('./images/chigga.png') } />
                    </Image>

                    {this.content_view_list[this.state.cur_sel]}

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

    top_title_image: {
        width: 80,
        height: 16,
        resizeMode: 'contain',
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
