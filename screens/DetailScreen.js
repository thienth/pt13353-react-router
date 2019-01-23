import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class DetailScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      item: this.props.navigation.getParam('data')
    }
  }
  static navigationOptions = {
    title: 'Detail screen',
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.item.data.name}</Text>
        <Image source={{uri: `${this.state.item.data.image}`}} 
            style={{width: 200, height: 150}}
        />
        <Text>{this.state.item.data.short_desc}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems: 'center'
  }
});
