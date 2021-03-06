
import React, { Component } from 'react';

import {
    View,
    WebView,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Modal,
} from 'react-native';

var common = require('../common/common.js');
var common_views = require('../common/commonView.js');
var net_util = require('../common/NetUtil.js');
var user = require('../user_info/user.js');

var self_main_view = null;
var self_zan_view = null;

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
    constructor(props){
        super(props);

        if( this.props.src.is_zan != null ) {
            self_zan_view = this;

            this.state = {
                is_zan: this.props.src.is_zan,
            };
        }
    };

    _zan() {
        if( this.props.src.is_zan != null ) {
            var _this_self = this;
            user.dian_zan( this.props.src.item_id, this.state.is_zan, function() {
                var tmp_is_zan = !_this_self.state.is_zan;
                _this_self.setState( { is_zan: tmp_is_zan } );

                if( self_main_view != null ) {
                    self_main_view.state.self_zan.is_zan = tmp_is_zan;
                    self_main_view.setState( { self_zan: self_main_view.state.self_zan } );
                }
            });
        } else {
            alert( 'zan icon click!' );
        }
    };

    render() {
        if( this.props.src.user_id != null && this.props.src.user_id != '' ) {
            var icon_src = this.props.src.icon_src;
            if( this.props.src.is_zan != null ) {
                icon_src = this.state.is_zan ? require('./images/head_zan_2.png') : require('./images/head_zan_1.png');
            }

            return (
                    <TouchableOpacity onPress={this._zan.bind(this)}>
                        <Image style={styles.zan_icon_image} source={icon_src}/>
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
    _reply() {
        if( self_main_view != null ) {
            var recomment_info = this.props.recomments[this.props.index];

            self_main_view.reply_info.parent_id = recomment_info.id;
            self_main_view.set_modal_visible( true );
        }
    }

    render() {
        if( this.props.index < this.props.recomments.length ) {
            var recomment_info = this.props.recomments[this.props.index];
            var content = ':' + recomment_info.comment_content;
            return (
                    <View>
                        <View style={styles.recomment_item}>
                            <TouchableOpacity onPress={this._reply.bind(this)}>
                                <Text style={styles.recomment_text_1}>
                                    {recomment_info.comment_name}
                                    <Text style={styles.recomment_text_2}>
                                        {'回复'}
                                        <Text style={styles.recomment_text_1}>
                                            {recomment_info.at_name}
                                            <Text style={styles.recomment_text_2}>
                                                {content}
                                            </Text>
                                        </Text>
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.recomment_time}>{recomment_info.comment_time}</Text>
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
    _reply() {
        if( self_main_view != null ) {
            var comment_info = this.props.comments[this.props.index];

            self_main_view.reply_info.parent_id = comment_info.id;
            self_main_view.set_modal_visible( true );
        }
    }

    render() {
        if( this.props.index >= 0 && this.props.index < this.props.comments.length ) {
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
                                <TouchableOpacity onPress={this._reply.bind(this)}>
                                    <Text style={styles.comment_content_text}>{comment_info.comment_content}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.recomment_area}>
                            <RecommentView recomments={comment_info.children} index={0}/>
                        </View>
                        <CommentView comments={this.props.comments} index={this.props.index-1} />
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

        self_main_view = this;

        this.reply_info = {
            text: '',
            parent_id: '',
        };

        has_inited = false;

        this.state = {
            modal_visible: false,

            WebViewHeight: 0,

            self_zan: {
                item_id: this.props.item_id,
                is_zan: false,
                user_id: 'me',
                icon_src: require('./images/head_zan_1.png'),
            },

            has_attention: false,       // 是否关注
            item_detail: {
                head_icon: require('./images/head.png'),            // 头像
                nick_name: '',                   // 昵称
                banner: require('./images/hp_banner.png'),                 // banner
                tags: [],
                title: '',
                read_count: 0,
                publish_time: '',
                html_content: '',           // webView content
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
            comment_count: 0,
        };

        this.map_comments = new Map(),

        this.banner_src = '';
        this.html_content = '';

        var _this_self = this;
        setTimeout( function() { _this_self._load(); }, 1500 );
    };

    set_modal_visible( visible ) {
        this.setState( { modal_visible: visible } );
    };

    _append_comment( comment_info ) {
        this.map_comments.set( comment_info.id, comment_info );

        comment_info.children = [];


        if( comment_info.parent_id != null ) {
            console.log( 'fly comment_info.parent_id : ' + comment_info.parent_id );
            var parent_comment_info = this.map_comments.get( comment_info.parent_id );
            console.log( 'parent_comment_info : ' + parent_comment_info )
            if( parent_comment_info != null && parent_comment_info.root_id != null ) {
                var root_comment_info = this.map_comments.get( parent_comment_info.root_id );
                if( root_comment_info != null ) {
                    comment_info.root_id = root_comment_info.id;
                    comment_info.at_name = parent_comment_info.comment_name;
                    root_comment_info.children.push( comment_info );
                }
            }
        } else {
            comment_info.root_id = comment_info.id;
            this.state.comments.push( comment_info );
        }
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

            _this_self.state.self_zan.is_zan = item_data.liked;
            _this_self.state.self_zan.icon_src = item_data.liked ? require('./images/head_zan_2.png') : require('./images/head_zan_1.png');

            _this_self.has_inited = true;
            _this_self.setState( { has_attention: item_data.followed } );
            _this_self.setState( { item_detail: _this_self.state.item_detail } );
            _this_self.setState( { self_zan: _this_self.state.self_zan } );
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
        this._refresh_comments();
    };


    _refresh_comments() {
        this.map_comments.clear();
        this.state.comments = [];
        this.state.comment_count = 0;

        var _this_self = this;
        net_util.get( common.get_comment_url + "?content=" + _this_self.props.item_id, true, function(rsp_json_data) {
            var all_comments = rsp_json_data.data.comments;

            _this_self.state.comment_count = all_comments.length;
            for( var i=all_comments.length-1; i>=0; --i ) {
                var comment_info = {
                    id: all_comments[i]._id,                        // 评论的唯一 ID
                    parent_id: all_comments[i].parent,
                    user_id: all_comments[i].user._id,              // 发表这个评论的用户 ID
                    comment_name: all_comments[i].user.nickname,    // 发表这个评论的用户的昵称
                    head_icon: require('./images/user_head.png'),   // 发表这个评论的用户的头像
                    item_id: all_comments[i].content,               // 这个评论对应的内容的 ID
                    comment_content: all_comments[i].comment,       // 评论的内容
                    comment_time: common.get_comment_time( all_comments[i].date ),  // 发表评论的时间
                };

                _this_self._append_comment( comment_info );
            }

            if( all_comments.length <= 0 ) {
                for( var i=0; i < 3; ++i ) {
                    var comment_id = 'a' + i;

                    var comment_info = {
                        id: comment_id,
                        parent_id: null,
                        user_id: 'user_id',
                        comment_name: 'Motion_M',
                        head_icon: require('./images/user_head.png'),
                        item_id: 'item_id',
                        comment_content: '略屌哦，哪里可以下载到这首歌和MV？',
                        comment_time: '6月30日 17:07',
                    };

                    _this_self._append_comment( comment_info );

                    var comment_info_1 = {
                        id: comment_id + '1',
                        parent_id: comment_id,
                        user_id: 'user_id',
                        comment_name: 'DJ Jennies',
                        head_icon: require('./images/user_head.png'),
                        item_id: 'item_id',
                        comment_content: '在QQ音乐下载',
                        comment_time: '6月30日 17:20',
                    };

                    _this_self._append_comment( comment_info_1 );

                    var comment_info_2 = {
                        id: comment_id + '2',
                        parent_id: comment_id + '1',
                        user_id: 'user_id',
                        comment_name: 'DJ Jennies',
                        head_icon: require('./images/user_head.png'),
                        item_id: 'item_id',
                        comment_content: '在QQ音乐下载',
                        comment_time: '6月30日 17:20',
                    };

                    _this_self._append_comment( comment_info_2 );
                }
            }

            _this_self.has_inited = true;
            _this_self.setState( { comments: _this_self.state.comments } );
        });
    };

    _refresh() {
    };

    _zan() {
        var _this_self = this;
        user.dian_zan( this.props.item_id, this.state.self_zan.is_zan, function() {
            var tmp_is_zan = !_this_self.state.self_zan.is_zan;

            _this_self.state.self_zan.is_zan = tmp_is_zan;
            _this_self.setState( { self_zan: _this_self.state.self_zan } );

            if( self_zan_view != null ) {
                self_zan_view.setState( { is_zan: tmp_is_zan } );
            }
        });
    };

    _attention() {
        var _this_self = this;
        user.attention( this.props.item_id, this.state.has_attention, function() {
            _this_self.setState( { has_attention: !_this_self.state.has_attention } );
        });
    };

    _reply() {
        var _this_self = this;
        user.write_comment( this.props.item_id, this.reply_info.parent_id, this.reply_info.text, function() {
            _this_self._refresh_comments();
        });

        setTimeout(function() {
            _this_self.set_modal_visible( false );
        }, 10);
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
        var comment_title_text = '评论  (' + this.state.comment_count + ')';
        var attention_src = this.state.has_attention ? require('./images/attention_action_2.png') : require('./images/attention_action_1.png');
        var zan_title_text = this.state.zan_info.zan_count + '个人觉得这很奇格';
        var btn_zan_src = this.state.self_zan.is_zan ? require('./images/zan_2.png') : require('./images/zan_1.png');
        return (
                <View style={{flex:1}}>
                    <Modal
                        animationType={'none'}
                        transparent={true}
                        visible={this.state.modal_visible}
                        onRequestClose={() => {this.set_modal_visible(false)}}
                        >
                        <common_views.QuickInputView onPress={this._reply.bind(this)} main_view={this}/>
                    </Modal>

                    <common_views.BackTitleView text={'嘻哈圈'} navigator={this.props.navigator} />

                    <ScrollView contentContainerStyle={{backgroundColor:'white'}}>
                        <View style={styles.summary}>
                            <View style={styles.user_info}>
                                <Image style={styles.user_head_icon} source={this.state.item_detail.head_icon} />
                                <Text style={styles.user_name}>{this.state.item_detail.nick_name}</Text>
                                <View style={{flex:1}}/>
                                <TouchableOpacity onPress={this._attention.bind(this)}>
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
                            <ZanAreaView zan_info={this.state.zan_info} self_zan={this.state.self_zan} zan_count={this.state.zan_info.zan_count} />
                            
                        </View>

                        <View style={styles.comment_area}>
                            <View style={styles.comment_title_row}>
                                <Text style={styles.comment_title}>{comment_title_text}</Text>
                                <View style={{flex: 1}}/>
                                <TouchableOpacity onPress={()=>{
                                    this.reply_info.parent_id = null;
                                    this.set_modal_visible( true );
                                }}>
                                    <Image style={styles.comment_icon} source={require('./images/comment.png')}/>
                                </TouchableOpacity>
                            </View>
                            <Image style={styles.comment_line} source={require('./images/line_comment.png')}/>
                            <CommentView comments={this.state.comments} index={this.state.comments.length-1} />
                        </View>
                    </ScrollView>

                    <View style={styles.btn_item}>
                        <Image style={styles.zan_share_item} source={require('./images/tab_bottom_bg.png')}>
                            <TouchableOpacity onPress={this._zan.bind(this)} >
                                <View style={styles.zan_item}>
                                    <Image style={styles.zan_icon} source={btn_zan_src}/>
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
                            <TouchableOpacity onPress={ () => {
                                if( user.check_login() ) {
                                    this.props.navigator.push({name: 'WriteCommentView', passProps: {item_id: this.props.item_id}});
                                }
                            }}>
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

    comment_title_row: {
        width: 340,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },

    comment_title: {
        height: 40,
        fontSize: 16,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#7F7F7F',
        marginLeft: 25,
        marginBottom: 3,
    },

    comment_icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginRight: 5,
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
        color: 'dodgerblue',
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
        color: 'black',
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
        fontSize: 12,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: 'dodgerblue',
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
        color: 'black',
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
