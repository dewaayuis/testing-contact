import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, Thumbnail } from 'native-base';

import Headers from "./Headers.js"

export default class Addscreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      firstName : "",
      lastName : "",
      age : 0,
      photo : ""
    }
  }

  handlefirstName = (val) => {
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

  handlePostClick = () => {
    const {firstName,lastName,age, photo} = this.state;
    this.props.navigation.state.params.handlePostClick(firstName,lastName,age, photo)
    this.setState({
      firstName : "",
      lastName : "",
      age : 0,
      photo : ""
    })
  }

  render() {
    return (
      <Container>
        <Headers navigation={this.props.navigation} handlePostClick={this.handlePostClick}/>
        <Content>
          <Thumbnail style={{marginTop : 20,marginBottom:10, alignSelf:"center", backgroundColor:"#1e88e5"}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png"}} />
          <Form style={{marginRight:20, marginLeft:5}}>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input value={this.state.firstName} onChangeText={this.handlefirstName} required/>
            </Item>
            <Item floatingLabel>
              <Label>Last name</Label>
              <Input value={this.state.lastName} onChangeText={this.handlelastName} required/>
            </Item>
            <Item floatingLabel>
              <Label>Age</Label>
              <Input value={this.state.age} onChangeText={this.handleage} required/>
            </Item>
            <Item floatingLabel>
              <Label>Photo</Label>
              <Input value={this.state.photo} onChangeText={this.handlephoto} required/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
