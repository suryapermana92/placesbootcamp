import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View } from 'react-native';
import * as actions from '../actions'

class AuthScreen extends Component {
    
    componentDidMount() {
        this.props.facebookLogin()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
        this.props.navigation.navigate('map')
        }
    }

    render() {
      return (
         <View>
            <Text>Waiting for Authentication</Text>
         </View>
      );
   }
}

const mapStateToProps = ({ auth }) => {
    return {
        token: auth.token
    }
}

export default connect(mapStateToProps, actions)(AuthScreen);
