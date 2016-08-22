
import React, { Component } from 'react';

import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';

var common = require('../common/common.js');
var common_views = require('../common/commonView.js');
var net_util = require('../common/NetUtil.js');

class AttentionsView extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            all_attentions: [],
        };

        has_inited = false;
        setTimeout( this._load.bind( this ), 1500 );
    };

    _load() {
        var _this_self = this;
        //net_util.get( common.get_attentions_url, true, function(rsp_json_data) {

            for( var i=0; i < 20; ++i ) {
                _this_self.state.all_attentions.push( {
                    relation: 1,
                    src: require('./images/attention_head_icon.png'),
                    nick_name: '如果没有你',
                    signature: '才发现你没离开，在等我',
                    desc: '@小泽玛利亚 等28万人关注了',
                });
            }

            _this_self.has_inited = true;
            _this_self.setState( { all_attentions: _this_self.state.all_attentions } );
        //});
    };

    render(){
        if( !this.has_inited ) {
            return (
                <View style={{flex:1}}>
                    <common_views.BackTitleView text={'我的关注'} navigator={this.props.navigator} />
                    <common_views.Playground/>
                </View>
                   );
        } else {
        return (
            <View style={styles.container} >
                <common_views.BackTitleView text={'我的关注'} navigator={this.props.navigator} />

                <ScrollView contentContainerStyle={{backgroundColor:'white'}}>
                    <common_views.FanItemView index={0} fans_list={this.state.all_attentions}/>
                </ScrollView>
            </View>
            );
        }
    }
};

var styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

});

module.exports = AttentionsView;
