import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firebaseConf from '../helpers/firebase';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.getListPosts = this.getListPosts.bind(this)
    this.state ={
      posts: []
    }
  }

  static navigationOptions = {
    header: null,
  };
  componentDidMount = () => {
    this.getListPosts();
  }
  

  getListPosts(){
    var that = this;
    firebaseConf.database().ref('posts/').once('value', function (snapshot) {
      let posts = [];
      snapshot.forEach((child) => {

        let item = {
          key: child.key,
          data: child.val()
        }
        posts.push(item);
      });
      
      that.setState({posts});
  });
  }

  

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.posts.map(row => 

            <View key={row.key}>
              <TouchableOpacity
                onPress={() => navigate('Detail', {data: row})}  
              >
                <Image source={{uri: row.data.image}} style={{width: 100, height: 100}}/>
                <Text>{row.data.name}</Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
  }
});
