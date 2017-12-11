import React, { Component } from 'react'
import { View, WebView, ActivityIndicator } from 'react-native'
import { Spinner } from '../components/common'

class WebScreen extends Component {
    state = {
        isLoading: true
    }
    renderLoading() {
            return (
                <ActivityIndicator
                size='large'
                style={{ position:'absolute', left: 10, right: 10, top: 10, bottom: 10 }}/>
            )
        
    }
    render() {
        return (
            <View style={{ flex:1 }}>
            <WebView
            source={{ uri: this.props.navigation.state.params.url}}
            
            
            />
            </View>
            
        )
    }
}

export default WebScreen
