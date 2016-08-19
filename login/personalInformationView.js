
import React, { Component } from 'react';

import {
    View,
    TouchableHighlight,
    Text,
    TextInput,
    Image,
    StyleSheet
} from 'react-native';

var user = require('../user_info/user.js');
var common_views = require('../common/commonView.js');

var sex_view_list = new Array();

var sex_selected = require('./images/btn_sex_selected.png');
var sex_normal = require('./images/btn_sex_normal.png');
class SexView extends React.Component {
    static defaultProps = {
        selected: false
    }; 

    static propTypes={
        selected: React.PropTypes.bool,
    };

    constructor(props){
        super(props);
        this.state = { selected: false, };

        sex_view_list.push( this );
    }

    onclick() {
        for( var i=0; i < sex_view_list.length; ++i ) {
            var sv = sex_view_list[i];

            if( i == this.props.sex_index ) {
                sv.setState( { selected: true } );
            } else {
                sv.setState( { selected: false } );
            }
        }
    }

    render(){
        var sex_bg = this.state.selected ? sex_selected : sex_normal;
        return (
                <TouchableHighlight onPress={this.onclick.bind(this)} >
                    <View style={styles.sex_item} >
                        <Image style={styles.sex_image} source={this.props.sex_src} />
                        <Image style={styles.sex_text_bg} source={sex_bg} >
                            <Text style={styles.sex_text}>{this.props.text}</Text>
                        </Image>
                    </View>
                </TouchableHighlight>
            );
    }
};

var PersonalInformationView = React.createClass({
    render() {
        return (
                <View style={styles.container} >
                    <common_views.BackTitleView text={'填写用户信息'} popToTop={this.props.popToTop} navigator={this.props.navigator} />

                    <View style={styles.item_row} >
                        <View style={styles.item_row_line} backgroundColor='#FEC72E'/>
                        <Text style={styles.item_section_text}>头像</Text>
                        <TouchableHighlight onPress={ () => {
                            alert( 'settings click' );
                        }}>
                            <Image style={styles.item_head_icon} source={require('./images/Icon_upload.png')} />
                        </TouchableHighlight>
                    </View>

                    <View style={styles.item_row} >
                        <View style={styles.item_row_line} backgroundColor='#FEC72E'/>
                        <Text style={styles.item_section_text}>昵称</Text>
                        <TextInput style={styles.item_nick_name_input}
                        />
                    </View>

                    <View style={styles.item_row} >
                        <View style={styles.item_row_line} backgroundColor='#FEC72E'/>
                        <Text style={styles.item_section_text}>性别</Text>
                        <SexView sex_index={0} sex_src={require('./images/Icon_male.png')} text={'男'} />
                        <SexView sex_index={1} sex_src={require('./images/icon_female.png')} text={'女'} />
                        <SexView sex_index={2} sex_src={require('./images/icon_mix.png')} text={'其他'} />
                    </View>

                    <View style={{flex: 1}} />

                    <View style={styles.btn_config_view}>
                        <TouchableHighlight onPress={ () => {
                            user.update_user_info();
                        }} >
                            <Image style={styles.btn_confirm} source={require('./images/btn_confirm.png')} />
                        </TouchableHighlight>
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
    },

    item_row: {
        width: 360,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
    },

    item_row_line: {
        width: 1,
        height: 20,
        marginTop: 15,
        marginBottom: 2,
        marginLeft: 20,
    },

    item_section_text: {
        height: 50,
        textAlign: 'left',
        fontSize: 16,
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },

    item_head_icon: {
        width: 50,
        height: 50,
    },

    item_nick_name_input: {
        width: 250,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
    },

    sex_item: {
        width: 80,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    sex_image: {
        width: 20,
        height: 20,
        marginLeft: 5,
        marginRight: 5,
    },

    sex_text_bg: {
        width: 35,
        height: 20,
        alignItems: 'center',
    },

    sex_text: {
        width: 30,
        height: 20,
        textAlign: 'center',
        fontSize: 12,
    },

    btn_config_view: {
        width: 280,
        height: 40,
        marginLeft: 40,
        marginBottom: 40,
    },

    btn_confirm: {
        width: 280,
        height: 40,
    },
});

module.exports = PersonalInformationView;
