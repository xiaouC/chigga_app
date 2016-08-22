
import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Navigator,
    Text,
    BackAndroid,
    StyleSheet
} from 'react-native';

var user = require('./user_info/user.js');
var navigation_views = require('./navigationViews.js');

var Chigga = React.createClass({

    configureScene(route){
        return Navigator.SceneConfigs.FloatFromRight;
    },

    renderScene(router, navigator){
        var Component = router.component;
        this._navigator = navigator;

        Component = navigation_views.get(router.name);

        return <Component navigator={navigator} {...router.passProps} />
    },

    componentDidMount() {
        var navigator = this._navigator;
        BackAndroid.addEventListener('hardwareBackPress', function() {
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
                return true;
            }
            return false;
        });
    },


    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    },

    render() {
        return (
            <Navigator ref={ (ref) => { user.navigator = ref } }
                initialRoute={{name: 'Home', passProps: {index: 0}}}
                configureScene={this.configureScene}
                renderScene={this.renderScene} />
        );
    }

});



var styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});


AppRegistry.registerComponent('Chigga', () => Chigga);
