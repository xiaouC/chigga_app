
import React, { Component } from 'react';

import {
    View,
    WebView,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';

var common = require('../common/common.js');
var common_views = require('../common/commonView.js');
var net_util = require('../common/NetUtil.js');

// tag
class ItemTagView extends React.Component {
    render() {
        if( this.props.text == null || this.props.text == '' ) {
            return null;
        } else {
            return (
                    <View style={styles.tag_item}>
                        <Image style={styles.tag_image} source={require('./images/tag_bg.png')}>
                            <Text style={styles.tag_text}>{this.props.text}</Text>
                        </Image>
                    </View>
                   );
            }
        }
};

class ZanIconView extends React.Component {
    render() {
        if( this.props.src.user_id != null && this.props.src.user_id != '' ) {
            return (
                    <TouchableOpacity onPress={ () => { alert('zan icon click'); } }>
                        <Image style={styles.zan_icon_image} source={this.props.src.icon_src}/>
                    </TouchableOpacity>
                   );
        } else {
            return null;
        }
    }
};

class ZanAreaView extends React.Component {
    render() {
        if( this.props.zan_count > 7 ) {
            return (
                    <View>
                        <View style={styles.zan_row_area}>
                            <ZanIconView src={this.props.self_zan}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[0]}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[1]}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[2]}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[3]}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[4]}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[5]}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[6]}/>
                        </View>
                        <View style={styles.zan_row_area}>
                            <ZanIconView src={this.props.zan_info.zan_icons[7]}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[8]}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[9]}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[10]}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[11]}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[12]}/>
                            <ZanIconView src={this.props.zan_info.zan_icons[13]}/>
                            <ZanIconView src={this.props.zan_info.more_zan}/>
                        </View>
                    </View>
                );
        } else {
            return (
                    <View style={styles.zan_row_area}>
                        <ZanIconView src={this.props.self_zan}/>
                        <ZanIconView src={this.props.zan_info.zan_icons[0]}/>
                        <ZanIconView src={this.props.zan_info.zan_icons[1]}/>
                        <ZanIconView src={this.props.zan_info.zan_icons[2]}/>
                        <ZanIconView src={this.props.zan_info.zan_icons[3]}/>
                        <ZanIconView src={this.props.zan_info.zan_icons[4]}/>
                        <ZanIconView src={this.props.zan_info.zan_icons[5]}/>
                        <ZanIconView src={this.props.zan_info.zan_icons[6]}/>
                    </View>
                );
        }
    }
};

class RecommentView extends React.Component {
    render() {
        if( this.props.index < this.props.recomments.length ) {
            var recomment_info = this.props.recomments[this.props.index];
            return (
                    <View>
                        <View style={styles.recomment_item}>
                            <Text style={styles.recomment_text_1}>
                                {recomment_info.nick_name}
                                <Text style={styles.recomment_text_2}>
                                    {recomment_info.at_name}
                                    <Text style={styles.recomment_text_3}>
                                        {recomment_info.recomment_content}
                                    </Text>
                                </Text>
                            </Text>
                            <Text style={styles.recomment_time}>{recomment_info.recomment_time}</Text>
                        </View>
                        <RecommentView recomments={this.props.recomments} index={this.props.index+1}/>
                    </View>
                   );
        } else {
            return (
                    <Image style={styles.recomment_line} source={require('./images/line_comment.png')}/>
            );
        }
    }
};

// 评论
class CommentView extends React.Component {
    render() {
        if( this.props.index < this.props.comments.length ) {
            var comment_info = this.props.comments[this.props.index];
            return (
                    <View style={styles.comment_item}>
                        <View style={styles.comment_content_info}>
                            <View style={styles.comment_head_icon_item}>
                                <Image style={styles.comment_head_icon} source={comment_info.head_icon}/>
                            </View>
                            <View style={styles.comment_contents_area}>
                                <View style={styles.comment_name_time}>
                                    <Text style={styles.comment_name}>{comment_info.comment_name}</Text>
                                    <View style={{flex: 1} }/>
                                    <Text style={styles.comment_time}>{comment_info.comment_time}</Text>
                                </View>
                                <Text style={styles.comment_content_text}>{comment_info.comment_content}</Text>
                            </View>
                        </View>
                        <View style={styles.recomment_area}>
                            <RecommentView recomments={comment_info.recomments} index={0}/>
                        </View>
                        <CommentView comments={this.props.comments} index={this.props.index+1} />
                    </View>
                   );
        } else {
            return null;
        }
    }
};


class HomeItemDetailView extends Component {
    constructor(props){
        super(props);

        has_inited = false;

        this.state = {
            WebViewHeight: 0,

            item_detail: {
                head_icon: require('./images/head.png'),            // 头像
                nick_name: '',                   // 昵称
                banner: require('./images/hp_banner.png'),                 // banner
                tags: [],
                title: '',
                read_count: 0,
                publish_time: '',
                html_content: '',           // webView content
                has_attention: false,       // 是否关注
                self_zan: {
                    user_id: 'me',
                    icon_src: require('./images/head_zan_1.png'),
                },
            },

            zan_info: {
                zan_count: 0,
                zan_icons: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                more_zan: {
                    user_id: '',        // 'more'
                    icon_src: require('./images/more_zan.png'),
                },
            },

            comments: [],               // 评论
        };

        this.banner_src = '';
        this.html_content = '';

        var _this_self = this;
        setTimeout( function() { _this_self._load(); }, 1500 );
    };

    _load() {
        var _this_self = this;

        net_util.get( common.get_content_detail_url + "/" + _this_self.props.item_id, true, function(rsp_json_data) {
            var item_data = rsp_json_data.data;

            _this_self.state.item_detail.nick_name = item_data.user.nickname;
            _this_self.state.item_detail.title = item_data.title;

            _this_self.banner_src = item_data.thumbnail.src;
            _this_self.state.item_detail.banner = { uri: common.url_prefix + item_data.thumbnail.src };

            _this_self.html_content = item_data.content;
            _this_self.state.item_detail.html_content = item_data.content;

            _this_self.state.item_detail.tags = item_data.tags;

            _this_self.state.item_detail.read_count = item_data.reading.total;
            _this_self.state.item_detail.publish_time = common.get_publish_time( item_data.date );

            _this_self.state.item_detail.has_attention = item_data.followed;
            _this_self.state.item_detail.self_zan.icon_src = item_data.liked ? require('./images/head_zan_2.png') : require('./images/head_zan_1.png');

            _this_self.has_inited = true;
            _this_self.setState( { item_detail: _this_self.state.item_detail } );
        });

        // 赞的列表
        net_util.get( common.get_zan_url + "?content=" + _this_self.props.item_id, false, function(rsp_json_data) {
            _this_self.state.zan_info.zan_count = 3;

            var tmp_count = _this_self.state.zan_info.zan_count <= 14 ? _this_self.state.zan_info.zan_count : 14;
            for( var i=0; i < tmp_count; ++i ) {
                var zan_icon_src = require('./images/zan_head_6.png');
                _this_self.state.zan_info.zan_icons[i] = {
                    user_id: 'id_' + i,
                    icon_src: zan_icon_src,
                };
            }

            _this_self.state.zan_info.more_zan.user_id = ( _this_self.state.zan_info.zan_count >= 14 ? 'more' : '' );

            _this_self.has_inited = true;
            _this_self.setState( { zan_info: _this_self.state.zan_info } );
        });

        // 评论的列表
        net_util.get( common.get_comment_url + "?content=" + _this_self.props.item_id, false, function(rsp_json_data) {
            //alert( rsp_json_data );

            for( var i=0; i < 3; ++i ) {
                var comment_info = {
                    head_icon: require('./images/user_head.png'),
                    comment_name: 'Motion_M',
                    comment_time: '6月30日 17:07',
                    comment_content: '略屌哦，哪里可以下载到这首歌和MV？',
                    recomments: [],
                };

                for( var j=0; j < 2; ++j ) {
                    comment_info.recomments.push( {
                        nick_name: 'DJ Jennies',
                        at_name: '  回复@' + comment_info.comment_name,
                        recomment_content: '    在QQ音乐下载',
                        recomment_time: '6月30日 17:20',
                    });
                }

                _this_self.state.comments.push( comment_info );
            }

            _this_self.has_inited = true;
            _this_self.setState( { comments: _this_self.state.comments } );
        });
    };

    _refresh() {
    };

    render() {
        if( !this.has_inited ) {
            return (
                <View style={{flex:1}}>
                    <common_views.BackTitleView text={'嘻哈圈'} navigator={this.props.navigator} />
                    <common_views.Playground/>
                </View>
                   );
        } else {
        var comment_title_text = '评论  (' + this.state.comments.length + ')';
        var attention_src = this.state.item_detail.has_attention ? require('./images/attention_action_2.png') : require('./images/attention_action_1.png');
        var zan_title_text = this.state.zan_info.zan_count + '个人觉得这很奇格';
        var comments = this.state.comments;
        return (
                <View style={{flex:1}}>
                    <common_views.BackTitleView text={'嘻哈圈'} navigator={this.props.navigator} />

                    <ScrollView contentContainerStyle={{backgroundColor:'white'}}>
                        <View style={styles.summary}>
                            <View style={styles.user_info}>
                                <Image style={styles.user_head_icon} source={this.state.item_detail.head_icon} />
                                <Text style={styles.user_name}>{this.state.item_detail.nick_name}</Text>
                                <View style={{flex:1}}/>
                                <TouchableOpacity onPress={ () => {
                                }}>
                                    <Image style={styles.user_attention} source={attention_src} />
                                </TouchableOpacity>
                            </View>
                            <Image style={styles.item_banner} source={this.state.item_detail.banner} >
                                <View style={styles.tag_row}>
                                    <ItemTagView text={this.state.item_detail.tags[0]}/>
                                    <ItemTagView text={this.state.item_detail.tags[1]}/>
                                    <ItemTagView text={this.state.item_detail.tags[2]}/>
                                </View>
                                <View style={{flex:1}}/>
                                <Text style={styles.item_title}>{this.state.item_detail.title}</Text>
                                <View style={styles.read_publish}>
                                    <View style={styles.read_count}>
                                        <Image style={styles.read_icon} source={require('./images/read.png')}/>
                                        <Text style={styles.read_count_text}>{this.state.item_detail.read_count}</Text>
                                    </View>
                                    <View style={styles.publish_time}>
                                        <Image style={styles.publish_icon} source={require('./images/clock.png')}/>
                                        <Text style={styles.publish_time_text}>{this.state.item_detail.publish_time}</Text>
                                    </View>
                                </View>
                            </Image>
                        </View>

                        <WebView style={{marginTop: 0, backgroundColor: 'white', height: this.state.WebViewHeight}}
                            injectedJavaScript={common.injected_js}
                            javaScriptEnabled={true}
                            scrollEnabled={false}
                            automaticallyAdjustContentInsets={false}
                            onNavigationStateChange={(info, e)=>{
                                var height = 0;
                                if( info.url.indexOf( "#" ) > 0 ) {
                                    height = info.url.split( "#" ).pop() / 1;
                                } else {
                                    height = info.url.replace( 'about:blank%23', '' ) / 1;
                                }

                                if( !isNaN( height ) ) {
                                    this.setState( { WebViewHeight:height } );
                                }
                            }}
                            source={{html: this.state.item_detail.html_content}}
                        />
                        <View style={styles.zan_area}>
                            <Image style={styles.zan_title} source={require('./images/line_zan.png')}>
                                <Text style={styles.zan_title_text}>{zan_title_text}</Text>
                            </Image>
                            <ZanAreaView zan_info={this.state.zan_info} self_zan={this.state.item_detail.self_zan} zan_count={this.state.zan_info.zan_count} />
                            
                        </View>

                        <View style={styles.comment_area}>
                            <Text style={styles.comment_title}>{comment_title_text}</Text>
                            <Image style={styles.comment_line} source={require('./images/line_comment.png')}/>
                            <CommentView comments={comments} index={0} />
                        </View>
                    </ScrollView>

                    <View style={styles.btn_item}>
                        <Image style={styles.zan_share_item} source={require('./images/tab_bottom_bg.png')}>
                            <TouchableOpacity onPress={ () => { user.dian_zan( this.props.item_id ) }} >
                                <View style={styles.zan_item}>
                                    <Image style={styles.zan_icon} source={require('./images/dian_zan_1.png')}/>
                                    <Text style={styles.zan_text}>点赞</Text>
                                </View>
                            </TouchableOpacity>
                            <Image style={styles.dividing_line} source={require('./images/dividing_line.png')}/>
                            <TouchableOpacity onPress={ () => { user.share( this.props.item_id ) }} >
                                <View style={styles.share_item}>
                                    <Image style={styles.share_icon} source={require('./images/share.png')}/>
                                    <Text style={styles.share_text}>分享</Text>
                                </View>
                            </TouchableOpacity>
                        </Image>
                        <View style={styles.write_comment_item}>
                            <TouchableOpacity onPress={ () => { user.write_comment( this.props.item_id ) }} >
                                <Image style={styles.write_comment_icon} source={require('./images/write_comment.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
    };
};

var styles = StyleSheet.create({

    summary: {
        width: 360,
        height: 230,
    },

    item_banner: {
        width: 340,
        height: 180,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    user_info: {
        width: 360,
        height: 25,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
    },

    user_head_icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginLeft: 12,
        marginRight: 14,
    },

    user_name: {
        height: 25,
        textAlign: 'left',
        color: '#323232',
    },

    user_attention: {
        width: 70,
        height: 20,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        marginRight: 15,
    },

    tag_row: {
        width: 360,
        height: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 12,
        marginLeft: 18,
    },

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

    item_title: {
        flex: 1,
        width: 340,
        textAlign: 'left',
        fontSize: 30,
        color: 'white',
        marginLeft: 20,
    },

    read_publish: {
        width: 320,
        height: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 30,
    },

    read_count: {
        width: 50,
        height: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    read_icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },

    read_count_text: {
        fontSize: 10,
        textAlign: 'left',
        color: 'white',
        marginLeft: 5,
        paddingTop: 3,
    },

    publish_time: {
        width: 50,
        height: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 10,
    },

    publish_icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },

    publish_time_text: {
        fontSize: 10,
        textAlign: 'justify',
        color: 'white',
        marginLeft: 5,
        paddingTop: 3,
    },

    webview_style: {
       height: 300,
    },

    zan_area: {
        width: 360,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },

    zan_title: {
        width: 340,
        height: 30,
        alignItems: 'center',
    },

    zan_title_text: {
        width: 200,
        height: 30,
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#767676',
    },

    zan_row_area: {
        width: 320,
        height: 42,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    zan_icon_image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },

    comment_area: {
        width: 340,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    comment_title: {
        width: 320,
        height: 40,
        fontSize: 16,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#7F7F7F',
        marginTop: 20,
        marginLeft: 25,
    },

    comment_line: {
        width: 340,
        height: 1,
        resizeMode: 'contain',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 5,
    },

    recomment_line: {
        width: 340,
        height: 1,
        resizeMode: 'contain',
        alignSelf: 'flex-start',
        marginTop: 20,
        marginBottom: 5,
    },

    comment_item: {
        width: 340,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    comment_content_info: {
        width: 340,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    comment_head_icon_item: {
        width: 28,
        height: 48,
        marginLeft: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    comment_head_icon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },

    comment_contents_area: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 5,
    },

    comment_name_time: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    comment_name: {
        height: 40,
        fontSize: 12,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: 'black',
    },

    comment_time: {
        height: 40,
        fontSize: 10,
        textAlign: 'right',
        textAlignVertical: 'center',
        color: '#7F7F7F',
        marginRight: 10,
    },

    comment_content_text: {
        flex: 1,
        height: 30,
        fontSize: 14,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#7F7F7F',
    },

    recomment_area: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
    },

    recomment_item: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 10,
        marginLeft: 60,
    },

    recomment_text_1: {
        height: 25,
        fontSize: 12,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#7F7F7F',
    },

    recomment_text_2: {
        height: 25,
        fontSize: 12,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: 'black',
    },

    recomment_text_3: {
        height: 25,
        fontSize: 12,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#7F7F7F',
    },

    recomment_time: {
        height: 25,
        fontSize: 12,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#7F7F7F',
    },

    btn_item: {
        width: 360,
        height: 45,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    zan_share_item: {
        width: 240,
        height: 45,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    zan_item: {
        width: 120,
        height: 45,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    zan_icon: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        resizeMode: 'contain',
    },

    zan_text: {
        fontSize: 10,
        textAlign: 'center',
        color: 'white',
    },

    dividing_line: {
        flex: 1,
        width: 1,
        alignSelf: 'center',
    },

    share_item: {
        width: 120,
        height: 45,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    share_icon: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        resizeMode: 'contain',
    },

    share_text: {
        fontSize: 10,
        textAlign: 'center',
        color: 'white',
    },
    write_comment_item: {
        width: 120,
        height: 45,
    },

    write_comment_icon: {
        width: 120,
        height: 45,
        resizeMode: 'contain',
    },

});

module.exports = HomeItemDetailView;
