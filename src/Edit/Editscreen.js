import React, { Component } from 'react';
import { Container, List, Left,Body,Right, Thumbnail,ListItem,Content, Form, Item, Input, Button, Text, Label } from 'native-base';
import {FlatList} from "react-native"
import Headers from "./Headers.js"
import axios from "axios"

export default class Editscreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      data : [],
      firstName : "",
      lastName : "",
      age : 0,
      photo : ""
    }
  }

  componentDidMount(){
    axios.get(`https://simple-contact-crud.herokuapp.com/contact/${this.props.navigation.state.params.id}`)
    .then(res => {
      const newData = res.data.data;
      this.setState({
        data : newData,
        firstName : newData.firstName,
        lastName : newData.lastName,
        age : newData.age,
        photo : newData.photo,
      })
    })
    .catch(err => {
      throw err;
    });
  }

  handlefirstName= (val) => {
    this.setState({
      firstName : val
    })
  }

  handlelastName = (val) => {
    this.setState({
      lastName : val
    })
  }

  handleage = (val) => {
    this.setState({
      age : val
    })
  }

  handlephoto = (val) => {
    this.setState({
      photo : val
    })
  }

  handleEdit = (id) => {
    const {firstName,lastName,age, photo} = this.state;
    this.props.navigation.state.params.handleEdit(firstName,lastName,age, photo, id)
    this.setState({
      firstName : "",
      lastName : "",
      age : 0,
      photo : ""
    })
  }

  render() {
    const {id} = this.props.navigation.state.params
    return (
      <Container>
        <Headers navigation={this.props.navigation} handleEdit={this.handleEdit} id={id}/>
        <Content>
          <List style={{marginTop:10}}>
          <FlatList
              data={this.state.data}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <ListItem
                  style={{marginRight:20}}
                  avatar
                >
                  <Left>
                    <Thumbnail style={{backgroundColor:"#1e88e5"}} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png' }} />
                  </Left>
                  <Body>
                    <Text>{item.firstName}</Text>
                    <Text note>{item.lastName}</Text>
                    <Text note>{item.age}</Text>
                    <Text note>{item.photo}</Text>
                  </Body>
                </ListItem>
              )}
            />
          </List>

          <Text style={{alignSelf:"center", marginTop:20, marginBottom:20, color : "#aaa"}}>Fill the form to edit</Text>

          <Form style={{marginRight:20, marginLeft:5}}>
            <Item stackedLabel>
              <Label>First Name</Label>
              <Input value={this.state.firstName} onChangeText={this.handlefirstName}/>
            </Item>
            <Item stackedLabel>
              <Label>Last Name</Label>
              <Input value={this.state.lastName} onChangeText={this.handlelastName}/>
            </Item>
            <Item stackedLabel>
              <Label>Age</Label>
              <Input value={this.state.age} onChangeText={this.handleage}/>
            </Item>
            <Item stackedLabel>
              <Label>Photo</Label>
              <Input value={this.state.photo} onChangeText={this.handlephoto}/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
