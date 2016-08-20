import React, { Component } from 'react';

import {
    View,
    ListView,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';

var YYListView = React.createClass({

    getInitialState()  {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows( this.props.genRows() ),
        };
    },

    render() {
        var render_separator = this._renderSeparator;
        if( this.props.renderSeparator != null ) {
            render_separator = this.props.renderSeparator;
        }

        return (
            <ListView enableEmptySections={true}
                dataSource = { this.state.dataSource }
                renderRow = { this.props.renderRow }
                renderSeparator = { render_separator }
                onScroll={this.props.onScroll}
            />
        );
    },

    scrollTo() {
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
