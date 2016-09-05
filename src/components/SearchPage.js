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
var SearchResults = require('./SearchResults');


function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
    country: 'uk',
    pretty: '1',
    encoding: 'json',
    listing_type: 'buy',
    action: 'search_listings',
    page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
      .map((key) => key + '=' + encodeURIComponent(data[key]))
      .join('&');

  return 'http://api.nestoria.co.uk/api?' + querystring;
}

class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london',
      isLoading: false,
      message: ''
    };
  }
  onSearchTextChanged(event) {
    this.setState({searchString: event.nativeEvent.text});
  }

  _handleResponse(response) {
    this.setState({ isLoading:false, messge: ''});
    if (response.application_response_code.substr(0,1) === '1') {
        this.props.navigator.push({
        component: SearchResults,
        passProps: {listings: response.listings}
      });
    } else {
      this.setState({ message: 'Location is not recognized; please try again.'});
    }
  }

  _executeQuery(query) {
    console.log(query);
    this.setState({isLoading:true});
    fetch(query)
    .then(response => response.json())
    .then(json => this._handleResponse(json.response))
    .catch(error =>
    this.setState({
      isLoading:false,
      message: 'Something bad happened' + error
    }));
  }

  onSearchPressed() {
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  render() {
    var spinner = this.state.isLoading ? 
    (<ActivityIndicator size='large'></ActivityIndicator>): 
    (<View/>);

    return (
      <View style = {styles.container}>
      {spinner}
        <Text style = {styles.description}>
          Search for houses to buy!
        </Text>
        <Text style = {styles.description}>
          Search by place-name, postcode or search near your location 
        </Text>
        <View style ={styles.flowRight}>
        <View style = {styles.searchBox}>
          <TextInput style = {styles.searchInput}
                      value={this.state.searchString}
                      onChange={this.onSearchTextChanged.bind(this)}
                     placeholder = 'Search via name or postcode'/>
        </View>
          <TouchableHighlight style = {styles.button}
                              onPress={this.onSearchPressed.bind(this)}
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
          <Text style= {styles.description}>{this.state.message}</Text>
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