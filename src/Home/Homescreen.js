import React, {Component} from 'react';
import {Alert,Platform, StyleSheet, View, StatusBar} from 'react-native';
import {
  Content,
  Fab,
  Button,
  Icon,
  Spinner,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text } from "native-base"
import axios from "axios";

import ListItems from "./component/ListItems"

export default class Homescreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      data : [],
      page : 1,
      perpage : 7,
      sort:1,
      loading: false
    }
  }

  makeRemoteRequest = () => {
    const {page,perpage,sort} = this.state
    this.setState({loading:true})
    setTimeout(() => {
      axios.get('https://simple-contact-crud.herokuapp.com/contact')
      .then(res => {
        const newData = res.data.data;
        this.setState({
          loading:false,
          data : newData
        })
      })
      .catch(err => {
        throw err;
      });
    }, 1500)
  }

  componentDidMount(){
    this.makeRemoteRequest()
  }


  handlePostClick = (firstName,lastName,age, photo) => {
    axios.post('https://simple-contact-crud.herokuapp.com/contact', {
      firstName,lastName,age, photo
    })
    .then((response) => {
      const newData = res.data.data;
      this.setState({
        data : newData
      })
      Alert.alert(
        'Success!',
        'Contact Saved!',
        [
          {text: 'Cancel', onPress: () => null},
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
      )
      this.props.navigation.popToTop()
    })
    .catch((error) => {
      throw error
    });
  }

  handleDelete = (id, index) => {
    axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${id}`)
    .then(res => {
      const newData = res.data.data;
      newData.splice(index, 1);

      this.setState({
        data : newData
      })
    })
    .catch(err => {
      throw err;
    });
  }

  handleEdit = (firstName, lastName, age, photo, id) => {
    axios.put(`https://simple-contact-crud.herokuapp.com/contact/${id}`, {
      firstName, lastName, age, photo
    })
    .then((response) => {
      this.setState({
        data : response.data.data,
      })
      Alert.alert(
        'Success!',
        'Contact Edited!',
        [
          {text: 'Cancel', onPress: () => null},
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
      )
      this.props.navigation.popToTop()
    })
    .catch((error) => {
      throw error
    });
  }

  handleLoadMore = () => {
    this.setState({
      page : this.state.page + 1
    }, () => {
      this.makeRemoteRequest()
    })
  }

  renderFooter = () => {
    if(this.state.loading === false) return null;

    return (
        <View>
          <Spinner color='#1e88e5' />
          <Text
            style={{color:"#aaa", fontSize:12, textAlign:'center', bottom:10}}
          >
            Load more data
          </Text>
        </View>
    )
  }

  renderList = (item,index) => {
    return(
      <ListItem
            style={{marginRight:20}}
            avatar
            key={index}
            onPress = {
              () => this.props.navigation.navigate("Edit", {
                                                            id : item.id,
                                                            handleEdit : this.handleEdit
                                                           }
                                                  )
            }
            onLongPress={() => Alert.alert(
              'Are you sure',
              'you want to delete this contact ?',
              [
                {text: 'Cancel', onPress: () => null},
                {text: 'OK', onPress: () => this.handleDelete(item.id, index)},
              ],
              { cancelable: false }
            )}>
            <Left>
              <Thumbnail style={{backgroundColor:"#0CD4C6"}} source={{ uri: item.photo }} />
            </Left>
            <Body>
              <Text>{item.firstName}</Text>
              <Text note>{item.lastName}</Text>
              <Text note>{item.age}</Text>
            </Body>
          </ListItem>
    )
  }

  render() {
    const {firstName, lastName, age, photo} = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#0CD4C6"
          barStyle="light-content"
        />

        <View style={{flex: 1}}>
            <ListItems
              {...this.props}
              data={this.state.data}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              renderFooter={this.renderFooter}
              renderList = {this.renderList}
              handleLoadMore={this.handleLoadMore}
            />
        </View>

        <Fab
            style={{ backgroundColor: '#0CD4C6' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate("Add", {
                                                                  handlePostClick:this.handlePostClick
                                                                })}>
            <Icon type="FontAwesome" name="pencil" />
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
