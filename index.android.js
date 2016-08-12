/**
 * React Native Property Finder Android Version
 * https://github.com/facebook/react-native
 * @flow
 */

'use-strict';

var ReactNative = require('react-native');
var React = require('react');
var SearchPage = require('./src/components/SearchPage');
var {
  Navigator,
  Text
} = ReactNative;


class PropertyFinderApp extends React.Component {
  render() {
    return (
      <Navigator
        style = {styles.container}
        initialRoute={{
          title: 'Property Finder',
          index: 0
        }}
        renderScene = {(route, navigator) => 
          <SearchPage title={route.title} navigator={navigator} />
        }
      />
    );
  }
}

var styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

ReactNative.AppRegistry.registerComponent('PropFinder', function() { return PropertyFinderApp});