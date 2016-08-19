
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

// navigator view list
var navigator_views = new Map();
navigator_views.set('Home', require('./home/home.js'));
navigator_views.set('Login', require('./login/loginView.js'));
navigator_views.set('Register', require('./login/registerView.js'));
navigator_views.set('PersonalInformation', require('./login/personalInformationView.js'));
navigator_views.set('HomeItemDetailView', require('./home/item_detail.js'));

var WelcomeView = React.createClass({
    onPressFeed() {
        this.props.navigator.push({name: 'Home'});
    },

    render() {
       console.log("welcome view loaded...")
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this.onPressFeed} >
                    This is welcome view.Tap to go to feed view.
                </Text>
            </View>
        );
    }

});

var DefaultView = React.createClass({
    render(){
      return (
          <View style={styles.container}>
              <Text style={styles.welcome}>Default View</Text>
          </View>
      )
    }
});
navigator_views.set('Welcome', WelcomeView);
navigator_views.set('Default', DefaultView);

var Chigga = React.createClass({

    configureScene(route){
      return Navigator.SceneConfigs.FadeAndroid;
    },

    renderScene(router, navigator){
      var Component = router.component;
      this._navigator = navigator;

      Component = navigator_views.get(router.name);

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
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('Chigga', () => Chigga);
