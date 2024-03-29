import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import {TouchableOpacity} from "react-native"

const Headers = ({navigation, handleEdit,id}) => (
  <Header style={{backgroundColor:"#0CD4C6"}} androidStatusBarColor="#0CD4C6">
    <Left>
      <Button transparent onPress={() => navigation.pop()}>
        <Icon name='arrow-back' />
      </Button>
    </Left>
    <Body style={{left : 60, color: "#fff"}}>
      <Title>Edit Contact</Title>
    </Body>
    <Right>
      <TouchableOpacity onPress={() => handleEdit(id)}>
        <Text style={{color: "#fff", top : 1, marginRight:10}}>Done</Text>
      </TouchableOpacity>
    </Right>
  </Header>
);

export default Headers
