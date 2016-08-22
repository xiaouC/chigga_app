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

var relationship_src = [require('./images/attention_add.png'), require('./images/attention_each_other.png'), require('./images/attention_single.png')];
class FanItemView extends React.Component {
    render() {
        if( this.props.index < this.props.fans_list.length ) {
            var fan_info = this.props.fans_list[this.props.index];
            var relation = relationship_src[fan_info.relation];
            return (
                    <View>
                        <View style={styles.item_fan}>
                            <View style={styles.fan_image}>
                                <Image style={styles.fan_image_icon} source={fan_info.src}/>
                            </View>
                            <View style={styles.fan_summary}>
                                <Text style={styles.fan_name}>{fan_info.nick_name}</Text>
                                <Text style={styles.fan_signature}>{fan_info.signature}</Text>
                                <Text style={styles.fan_desc}>{fan_info.desc}</Text>
                            </View>
                            <TouchableOpacity onPress={ () => { alert('relationship click!'); } }>
                                <View style={styles.fan_relationship}>
                                    <Image style={styles.fan_relationship_icon} source={relation}/>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Image style={styles.line_fans} source={require('./images/line_fans.png')}/>

                        <FanItemView fans_list={this.props.fans_list} index={this.props.index+1}/>
                    </View>
                   );
        } else {
            return null;
        }
    }
};


class FansView extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            all_fans: {
                all_fans: [],
                interested_in_fans: [],
            },
        };

        has_inited = false;
        setTimeout( this._load.bind( this ), 1500 );
    };

    _load() {
        var _this_self = this;
        //net_util.get( common.get_fans_url, true, function(rsp_json_data) {

            for( var i=0; i < 20; ++i ) {
                _this_self.state.all_fans.all_fans.push( {
                    relation: 1,
                    src: require('./images/attention_head_icon.png'),
                    nick_name: '如果没有你',
                    signature: '才发现你没离开，在等我',
                    desc: '@小泽玛利亚 等28万人关注了',
                });

                if( i < 3 ) {
                    _this_self.state.all_fans.interested_in_fans.push( _this_self.state.all_fans.all_fans[i] );
                }
            }

            _this_self.has_inited = true;
            _this_self.setState( { all_fans: _this_self.state.all_fans } );
        //});
    };

    render(){
        if( !this.has_inited ) {
            return (
                <View style={{flex:1}}>
                    <common_views.BackTitleView text={'嘻哈圈'} navigator={this.props.navigator} />
                    <common_views.Playground/>
                </View>
                   );
        } else {
        return (
            <View style={styles.container} >
                <common_views.BackTitleView text={'粉丝'} navigator={this.props.navigator} />

                <ScrollView contentContainerStyle={{backgroundColor:'white'}}>
                    <View style={styles.item_interested_in}>
                        <Image style={styles.line_guide} source={require('./images/line_guide.png')}/>
                        <Text style={styles.interested_in_text}>粉丝中你可能感兴趣的人</Text>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity onPress={ () => { alert('more interested in click!'); } }>
                            <View style={styles.interested_in_more}>
                                <Text style={styles.interested_in_more_text}>更多</Text>
                                <Image style={styles.interested_in_more_icon} source={require('./images/fans_more.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Image style={styles.line_fans} source={require('./images/line_fans.png')}/>

                    <FanItemView index={0} fans_list={this.state.all_fans.interested_in_fans}/>

                    <View style={styles.item_all_fans}>
                        <Text style={styles.all_fans_text}>全部粉丝</Text>
                    </View>

                    <Image style={styles.line_fans} source={require('./images/line_fans.png')}/>

                    <FanItemView index={0} fans_list={this.state.all_fans.all_fans}/>
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

    item_interested_in: {
        width: 360,
        height: 34,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 20,
    },

    line_guide: {
        width: 3,
        height: 34,
        resizeMode: 'contain',
    },

    interested_in_text: {
        fontSize: 14,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#646464',
        marginLeft: 10,
    },

    interested_in_more: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    interested_in_more_text: {
        fontSize: 12,
        textAlign: 'left',
        textAlignVertical: 'center',
    },

    interested_in_more_icon: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        marginLeft: 8,
        marginRight: 8,
    },

    line_fans: {
        width: 360,
        height: 1,
        resizeMode: 'contain',
    },

    item_all_fans: {
        flex: 1,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 12,
    },

    all_fans_text: {
        fontSize: 14,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#868686',
        marginLeft: 16,
    },

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

});

module.exports = FansView;
