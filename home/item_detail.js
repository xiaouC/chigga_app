
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

var common_views = require('../common/commonView.js');

// tag
class ItemTagView extends React.Component {
    render() {
        return (
                <View style={styles.tag_item}>
                    <Image style={styles.tag_image} source={require('./images/tag_bg.png')}>
                        <Text style={styles.tag_text}>{this.props.text}</Text>
                    </Image>
                </View>
               );
        }
};

class ZanIconView extends React.Component {
    render() {
        return (
                <TouchableOpacity onPress={ () => { alert('zan icon click'); } }>
                    <Image style={styles.zan_icon_image} source={this.props.src}/>
                </TouchableOpacity>
               );
        }
};

class HomeItemDetailView extends Component {
    state = {WebViewHeight: 0}
    render() {
        var injectedJavaScript = `
          (function loop(){
            if (document.readyState === 'complete') {
              var height = document.documentElement.clientHeight;
              window.location.hash = '#' + height;
            }
            setTimeout(function() {
              if (document.readyState === 'complete') {
                var height = document.documentElement.clientHeight;
                window.location.hash = '#' + height;
              } else {
                loop();
              }
            }, 1);
          })();
        `;
        var testHTML = '<h1 id=\"-\">获取手机验证码</h1>\n<pre><code>POST /api/sms\n</code></pre><p>返回实例</p>\n<pre><code>测试情况下返回：\n{\n    captcha: &#39;123456&#39;\n}\n\n* 正式情况下验证码由手机短信的形式返回\n</code></pre><h1 id=\"-\">注册用户</h1>\n<pre><code>POST /api/users[?mode=email|phone]\n</code></pre><h5 id=\"-\">参数说明</h5>\n<pre><code>username:必须，当mode为email时，username需为email格式，为phone时，需为手机号码格式\npassword:必须，密码\nnickname:必须，昵称\ncaptcha:手机验证码，mode为phone才需要\n</code></pre><h1 id=\"-\">登录</h1>\n<pre><code>PUT /api/account/sign-in\n</code></pre><h5 id=\"-\">参数说明</h5>\n<pre><code>格式为JSON\nusername:用户名\npassword:密码\n</code></pre><h1 id=\"-\">注销</h1>\n<pre><code>PUT /api/account/sign-out\n</code></pre>';
        return (
                <View style={{flex:1}}>
                    <common_views.BackTitleView text={'嘻哈圈'} navigator={this.props.navigator} />

                    <ScrollView contentContainerStyle={{backgroundColor:'white'}}>
                        <View style={styles.summary}>
                            <View style={styles.user_info}>
                                <Image style={styles.user_head_icon} source={require('./images/head.png')} />
                                <Text style={styles.user_name}>DJ Jennies</Text>
                                <View style={{flex:1}}/>
                                <TouchableOpacity onPress={ () => {
                                }}>
                                    <Image style={styles.user_attention} source={require('./images/attention_action_1.png')} />
                                </TouchableOpacity>
                            </View>
                            <Image style={styles.item_banner} source={require('./images/banner.png')} >
                                <View style={styles.tag_row}>
                                    <ItemTagView text={'#街头'}/>
                                    <ItemTagView text={'#涂鸦'}/>
                                    <ItemTagView text={'#SWAG'}/>
                                </View>
                                <View style={{flex:1}}/>
                                <Text style={styles.item_title}>XXXXXX</Text>
                                <View style={styles.read_publish}>
                                    <View style={styles.read_count}>
                                        <Image style={styles.read_icon} source={require('./images/read.png')}/>
                                        <Text style={styles.read_count_text}>8642</Text>
                                    </View>
                                    <View style={styles.publish_time}>
                                        <Image style={styles.publish_icon} source={require('./images/clock.png')}/>
                                        <Text style={styles.publish_time_text}>两天前</Text>
                                    </View>
                                </View>
                            </Image>
                        </View>

                        <WebView style={{marginTop: 0, backgroundColor: 'white', height: this.state.WebViewHeight}}
                          injectedJavaScript={injectedJavaScript}
                          javaScriptEnabled={true}
                          scrollEnabled={false}
                          automaticallyAdjustContentInsets={false}
                          onNavigationStateChange={(info, e)=>{
                            var height = 0;
                            if (info.url.indexOf("#") > 0) {
                              height = info.url.split("#").pop() / 1;
                            } else {
                              height = info.url.replace('about:blank%23','') / 1;
                            }
                            if (!isNaN(height)) {
                              this.setState({
                                WebViewHeight:height
                              });
                            }
                          }}
                          source={{html: testHTML}}
                        />
                        <View style={styles.zan_area}>
                            <Image style={styles.zan_title} source={require('./images/line_zan.png')}>
                                <Text style={styles.zan_title_text}>688个人觉得这很奇格</Text>
                            </Image>
                            <View style={styles.zan_row_area}>
                                <ZanIconView src={require('./images/head_zan_1.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                            </View>
                            <View style={styles.zan_row_area}>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/zan_head_6.png')}/>
                                <ZanIconView src={require('./images/more_zan.png')}/>
                            </View>
                        </View>

                        <View style={styles.comment_area}>
                        </View>
                    </ScrollView>

                    <View style={styles.btn_item}>
                        <Image style={styles.zan_share_item} source={require('./images/tab_bottom_bg.png')}>
                            <TouchableOpacity onPress={ () => { user.dian_zan( category_id ) }} >
                                <View style={styles.zan_item}>
                                    <Image style={styles.zan_icon} source={require('./images/dian_zan_1.png')}/>
                                    <Text style={styles.zan_text}>点赞</Text>
                                </View>
                            </TouchableOpacity>
                            <Image style={styles.dividing_line} source={require('./images/dividing_line.png')}/>
                            <TouchableOpacity onPress={ () => { user.share( category_id ) }} >
                                <View style={styles.share_item}>
                                    <Image style={styles.share_icon} source={require('./images/share.png')}/>
                                    <Text style={styles.share_text}>分享</Text>
                                </View>
                            </TouchableOpacity>
                        </Image>
                        <View style={styles.write_comment_item}>
                            <TouchableOpacity onPress={ () => { user.write_comment( category_id ) }} >
                                <Image style={styles.write_comment_icon} source={require('./images/write_comment.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
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
        resizeMode: 'contain',
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
        height: 120,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    zan_title: {
        width: 360,
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
        width: 360,
        height: 42,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    zan_icon_image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
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
