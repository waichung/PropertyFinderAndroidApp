/**
 * React Native Property Finder Android Version
 * https://github.com/facebook/react-native
 * @flow
 */

'use-strict';

var ReactNative = require('react-native');
var React = require('react');
var SearchPage = require('./src/components/SearchPage');
var SearchResults = require('./src/components/SearchResults');
var {
  Navigator,
  Text,
  TouchableHighlight
} = ReactNative;


class PropertyFinderApp extends React.Component {
  render() {
    var renderSceneFunc = (route, navigator) => {
      return React.createElement(
        route.component, { ...this.props,
                           ...route.passProps, 
                           navigator, 
                           route, 
                           onBack: () => {navigator.pop()}
                          }
      );
    };

    return (
      <Navigator
        style = {styles.container}
        initialRoute={{
          component: SearchPage,
          index: 0,
          title: 'Property Finder App'
        }}
        renderScene = {renderSceneFunc}
        navigationBar= {<Navigator.NavigationBar
          routeMapper={{
            LeftButton: (route, navigator, index, navState) =>
              {if (route.index === 0) {
                return null;
                } else {
                  return (
                    <TouchableHighlight onPress={() => navigator.pop()}>
                      <Text style={styles.back}>BACK</Text>
                    </TouchableHighlight>
                  );
                }
              },
            RightButton: (route, navigator, index, navState) =>
              { return null;},
            Title: (route, navigator, index, navState) =>
              { return (<Text style={styles.headerText}>{route.title}</Text>); },
          }}
          style={{backgroundColor: '#48BBEC'}}
        />}/>
    );
  }
}

var styles = ReactNative.StyleSheet.create({
  back: {
    color: 'white',
    alignItems: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    marginTop: 10,
    alignItems: 'center'
  },
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

ReactNative.AppRegistry.registerComponent(
  'PropFinder', 
  function() { 
    return PropertyFinderApp
  }
);



