import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import * as actions from '../actions'

class SettingScreen extends Component {
  onLogOutPressed() {
    this.props.logOut(() => {
      alert('Successfully Logged Out')
      this.props.navigation.navigate('welcome');
     })
  }
    render() {
      return (
         <View>
            <Button
            title='Reset All Liked Places'
            large
            icon={{ name: 'delete-forever' }}
            backgroundColor='#F44336'
            buttonStyle={{ marginTop: 10 }}
            onPress={this.props.clearLikedJobs}
           />
           <Button
           title='Log Out'
           icon={{ name: 'cached' }}
           backgroundColor='#F44336'
           buttonStyle={{ marginTop: 10 }}
           onPress={this.onLogOutPressed.bind(this)}
          />
          </View>
           
        
      );
   }
}


export default connect(null, actions)(SettingScreen);
