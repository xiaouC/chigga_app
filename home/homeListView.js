
import React, { Component } from 'react';

import {
    View,
    ListView,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    InteractionManager,
} from 'react-native';

var user = require('../user_info/user.js');
var YYListView = require('../common/YYListView.js');

// tag 
class TagView extends React.Component {
    render() {
        return (
                <View style={styles.tag_item}>
                    <Image style={styles.tag_image} source={require('./images/tag.png')}>
                        <Text style={styles.tag_text}>{this.props.text}</Text>
                    </Image>
                </View>
               );
        }
};

// 
var count_src = new Array( require('./images/read.png'), require('./images/comment.png') );
class CountView extends React.Component {
    render() {
        var ci = count_src[this.props.index];
        return (
                <View style={styles.count_item}>
                    <Image style={styles.count_image} source={ci} />
                    <Text style={styles.count_text}>{this.props.count}</Text>
                </View>
               );
        }
};

// 
var zan_src_1 = require('./images/zan_1.png');
var zan_src_2 = require('./images/zan_2.png');
class ZanView extends React.Component {
    render() {
        var zan_src = user.is_zan( 'id_1' ) ? zan_src_2 : zan_src_1;
        return (
                <TouchableOpacity onPress={ () => { user.dian_zan( 'id_1' ); } } >
                    <View style={styles.count_item}>
                        <Image style={styles.count_image} source={zan_src} />
                        <Text style={styles.count_text}>{this.props.count}</Text>
                    </View>
                </TouchableOpacity>
               );
        }
};

var net_util = require('../common/NetUtil.js');
var common = require('../common/common.js');
class HomeListView extends React.Component {

    constructor( props ) {
        super( props );

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            category_id: '',
            is_delete: false,
            page_size: 10,
            cur_page: 1,

            dataSource: ds.cloneWithRows( this.genRows() ),
        };

        this.need_refresh = true;
    }

    genRows() {
        //for( var i=0; i < 5; ++i ) {
        //    this.ds.push( {
        //        item_id: 'item_id_' + i,
        //        title: 'title_' + i,
        //        tags: ['tag1', 'tag2', 'tag3'],
        //        read_count: 1234,
        //        comment_count: 234,
        //        zan_count: 350,
        //        uri: "",
        //    });
        //}

        return this.props.home_obj.content_items;
    }

    load() {
        this.yy_list_item_obj.setState( { dataSource: this.state.dataSource.cloneWithRows(this.props.home_obj.content_items) } );
    }

    _refresh() {
        var _this_self = this;

        var url = common.get_contents_url + "?_id=" + this.state.id + "&deleted=" + (this.state.is_delete ? "true" : "false") + "&pageSize=" + this.state.page_size + "&currentPage=" + this.state.cur_page;
        net_util.get( url, false, function(rsp_json_data) {
            alert( rsp_json_data );

            //var contents = eval( rsp_json_data.contents );
            //for( var i=0; i < contents.length; ++i ) {
            //        _this_self.props.home_obj.content_items.push( {
            //        item_id: contents[i]._id,
            //        title: contents[i].title,
            //        tags: contents[i].tags,
            //        read_count: contents[i].reading.total,
            //        comment_count: contents[i].comments,
            //        zan_count: contents[i].likes,
            //        uri: contents[i].thumbnail.src,
            //    });
            //}

            for( var i=0; i < 5; ++i ) {
                for( var i=0; i < 5; ++i ) {
                    _this_self.props.home_obj.content_items.push( {
                        item_id: 'item_id_new_' + i,
                        title: 'title_new_' + i,
                        tags: ['tagN1', 'tagN2', 'tagN3'],
                        read_count: 1234,
                        comment_count: 234,
                        zan_count: 350,
                        uri: "",
                    });
                }
            }

            _this_self.yy_list_item_obj.setState( { dataSource: _this_self.state.dataSource.cloneWithRows(_this_self.props.home_obj.content_items) } );
        });
    }

    componentDidMount() {
        var _this_self = this;

        InteractionManager.runAfterInteractions(() => {
            setTimeout( function() {
                _this_self.yy_list_item_obj.scrollTo({x: 0, y: _this_self.props.home_obj.content_offset_y, animated: false});
            }, 10);
        });
    }

    yy_list_item_obj = null;

    render(){
        return (
                <ListView style={{flex:1}} ref={(ref)=>{this.yy_list_item_obj=ref;}}
                    dataSource = { this.state.dataSource }
                    onScroll={(e)=>{ this.props.home_obj.content_offset_y = e.nativeEvent.contentOffset.y; }}
                    genRows={this.genRows.bind(this)}
                    renderSeparator={ (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
                        return (
                            <View
                                key={`${sectionID}-${rowID}`}
                                style={{height: adjacentRowHighlighted ? 4 : 1, backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',}}
                            />
                        );
                    } }
                    renderRow={ (rowData, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) => {
                        return (
                            <TouchableOpacity onPress={ () => { this.props.navigator.push({name: 'HomeItemDetailView'}); } } >
                                <View style={styles.list_item_row}>
                                    <Image style={styles.list_item_image} source={require('./images/hp_banner.png')} />
                                    <View style={{flex:1}} >
                                        <Text style={styles.list_item_title_text}> {rowData.title} </Text>
                                    </View>
                                    <View style={styles.list_item_summary}>
                                        <TagView text={rowData.tags[0]} />
                                        <TagView text={rowData.tags[1]} />
                                        <TagView text={rowData.tags[2]} />
                                        <View style={{width:30}} />
                                        <CountView index={0} count={rowData.read_count} />
                                        <CountView index={1} count={rowData.comment_count} />
                                        <ZanView count={rowData.zan_count} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
        )
    }
};

var styles = StyleSheet.create({

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

    count_item: {
        height: 21,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 5,
    },

    count_image: {
        width: 18,
        height: 16,
    },

    count_text: {
        height: 21,
        fontSize: 10,
        textAlign: 'left',
        paddingTop: 3,
        marginLeft: 5,
        marginRight: 5,
    },

    list_item_row: {
        width: 340,
        height: 273,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
    },

    list_item_image: {
        width: 340,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },

    list_item_title_text: {
        flex: 1,
        width: 340,
        textAlign: 'left',
        fontSize: 30,
    },

    list_item_summary: {
        width: 340,
        height: 40,
        paddingTop: 20,
        paddingLeft: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },

});

module.exports = HomeListView;
