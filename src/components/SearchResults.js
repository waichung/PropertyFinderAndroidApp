'use-strict'

var ReactNative = require('react-native');
var {
  StyleSheet,
  Image,
  View, 
  TouchableHighlight, 
  ListView,
  Text
} = ReactNative;
var React = require('react');
var PropertyView = require('./PropertyView');

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight:10
  },
  textContainer: {
    flex:1
  },
  separator: {
    height: 1, 
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25, 
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  flowDown: {
    flexDirection: 'column'
  }
});

class SearchResults extends React.Component {

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
        {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }

  rowPressed(propertyGuid) {
    var property = this.props.listings.filter((prop) => prop.guid === propertyGuid)[0];

    this.props.navigator.push({
      title: 'Property',
      component: PropertyView,
      passProps: {property: property}
    });
  }

  renderRow(rowData, sectionId, rowId) {
    var price = rowData.price_formatted;
    return (
      <TouchableHighlight onPress = {() => this.rowPressed(rowData.guid)} 
                          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{uri:rowData.img_url}}/>
            <View style={styles.flowDown}>
              <Text style={styles.price}>{price}</Text>
              <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
}

module.exports = SearchResults;
