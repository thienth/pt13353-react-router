import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
  Modal,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import firebaseConf from '../helpers/firebase';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.getListPosts = this.getListPosts.bind(this);
    this.removePost = this.removePost.bind(this);
    this.state ={
      posts: [],
      modalVisible: false,
      selectedPost: null,
    }
  }

  static navigationOptions = {
    header: null,
  };
  componentDidMount = () => {
    this.getListPosts();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    var that = this;
    setTimeout(() => {
      that.setState({modalVisible: false});
    }, 3000);
  }

  getListPosts(){
    var that = this;
    firebaseConf.database().ref('posts/').on('value', function (snapshot) {
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

  removePost(postKey){
    firebaseConf.database().ref(`posts/${postKey}`).remove();
    alert('Xóa bài viết thành công!');
  }

  // const {navigate} = this.props.navigation;
    // return (
    //   <View style={styles.container}>
    //     {this.state.posts.map(row => 

    //         <View key={row.key}>
    //           <TouchableOpacity
    //             onPress={() => navigate('Detail', {data: row})}  
    //           >
    //             <Image source={{uri: row.data.image}} style={{width: 100, height: 100}}/>
    //             <Text>{row.data.name}</Text>
    //           </TouchableOpacity>
    //         </View>
    //       )}
    //   </View>

  render() {
    
      return (
        <View style={{marginTop: 20, marginLeft: 5, marginRight: 5}}>
            {this.state.posts.map((po) => 
              <View key={po.key}>
                <Text style={styles.postTitle}>{po.data.name}</Text>
                <TouchableOpacity style={styles.removeBtn}
                  onPress={() => {
                    this.removePost(po.key);
                  }}>
                  <Text style={styles.removeBtnLabel}>Xóa</Text>
                </TouchableOpacity>
              </View>
            )}
              <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{ flex: 1, 
                              alignItems: 'center', 
                              justifyContent: 'center',  
                              marginTop: 22, 
                              backgroundColor: 'rgba(52, 52, 52, 0.1)'}}>
                <View style={{ width: '80%', 
                                minHeight: 400,
                                backgroundColor: '#ccc'}}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text>Hello World!</Text>

                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text>Show Modal</Text>
            </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  postTitle:{
    fontSize: 25,
    color: '#EEA43B',
    marginTop: 20,
    fontWeight: 'bold'
  },
  removeBtn:{
    width: 40,
    height: 30,
    backgroundColor: 'green',
    paddingLeft: 5,
    paddingRight: 5
  },
  removeBtnLabel:{
    lineHeight: 30,
    color: '#fff'
  }
});
