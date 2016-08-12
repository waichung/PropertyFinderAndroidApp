'use strict'

var ReactNative = require('react-native');
var React = require('react');
var {
  StyleSheet, 
  Text,
  TextInput,
  View, 
  TouchableHighlight,
  ActivityIndicator,
  Image, 
} = ReactNative;

class SearchPage extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.description}>
          Search for houses to buy!
        </Text>
        <Text style = {styles.description}>
          Search by place-name, postcode or search near your location 
        </Text>
        <View style ={styles.flowRight}>
        <View style = {styles.searchBox}>
          <TextInput style = {styles.searchInput}
                     placeholder = 'Search via name or postcode'/>
        </View>
          <TouchableHighlight style = {styles.button}
                              underlayColor = '#99d9f4'>
            <Text style = {styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
          <TouchableHighlight style = {styles.button}
                              underlayColor = '#99d9f4'>
            <Text style = {styles.buttonText}>Location</Text>
          </TouchableHighlight>
          <Image source = {require('../../resources/house.png')}
                 style = {styles.image}/>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  image: {
    width: 217,
    height: 138
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding : 30, 
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchBox: {
    justifyContent:'center',
    marginBottom:10,
    height:36,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    marginRight: 4,
    flex: 4

  },
  searchInput: {
    fontSize: 15,
    color: 'black'
  }
});

module.exports = SearchPage;