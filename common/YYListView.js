import React, { Component } from 'react';

import {
    View,
    ListView,
    TouchableHighlight,
    Text,
    Image,
    StyleSheet
} from 'react-native';

var YYListView = React.createClass({

    getInitialState()  {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows( this._genRows() ),
        };
    },

    _genRows(): Array<string> {
        var dataBlob = [];
        for (var ii = 0; ii < 5; ii++) {
            dataBlob.push( 'hahaahahah' );
        }
        return dataBlob;
    },

    _renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        return (
                <TouchableHighlight>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        backgroundColor: '#F6F6F6',
                    }}>
                        <Image style={{width:340,height:300}} source={require('../home/home.jpg')} />
                        <Text style={{flex:1}}>
                            {rowData}
                        </Text>
                    </View>
                </TouchableHighlight>
               );
    },

    render() {
        var render_row = this.props.renderRow;

        var render_separator = this._renderSeparator;
        if( this.props.renderSeparator != null ) {
            render_separator = this.props.renderSeparator;
        }

        return (
            <ListView
                dataSource = { this.state.dataSource }
                renderRow = { render_row }
                renderSeparator = { render_separator }
            />
        );
    },

    _renderSeparator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{height: adjacentRowHighlighted ? 4 : 1, backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',}}
            />
           );
    },

});

module.exports = YYListView;
