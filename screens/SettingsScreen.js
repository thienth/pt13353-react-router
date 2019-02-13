import React from 'react';
import {ScrollView, Text, TextInput, StyleSheet,
        Picker} from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Thêm bài viết',
  };

  constructor(props){
    super(props);
    this.state = {
      title: "",
      category: 2,
      listCates: [
        {
          key: 1,
          name: "Thể thao"
        },
        {
          key: 2,
          name: "Giáo dục"
        },
        {
          key: 3,
          name: "Sức khỏe"
        },
        {
          key: 4,
          name: "làm đẹp"
        },
      ]
    }
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.label}>Tiêu đề bài viết</Text>
        <TextInput 
          style={styles.txtInput}
          onChange={(txt) => {this.setState({title: txt})}} />
        <Text style={styles.label}>Danh mục</Text>
        <Picker selectedValue={this.state.category}
            onValueChange={(val) => {this.setState({category: val})}}>
          {this.state.listCates.map((item) => 
            <Picker.Item key={item.key} label={item.name} value={item.key}/>  
          )}
        </Picker>
      </ScrollView>

    )
  }
}
const styles = StyleSheet.create({
  txtInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    width: '90%',
    marginLeft: 20
  },
  label:{
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 10
  }

});
