import React, { Component } from 'react'
import { View, WebView, ActivityIndicator } from 'react-native'
import { Spinner } from '../components/common'
import { MapView, Permissions, Constants, Location } from 'expo'

class WebScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.name
        }
    }
    state = {
        isLoading: true,
        region: {
            latitude: this.props.navigation.state.params.coordinate.lat,
            longitude: this.props.navigation.state.params.coordinate.lng,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04
        }
    }
    
    renderMap() {
            return (
            <MapView
            initialRegion={this.state.region}
            style={{ flex: 1 }}>
            <MapView.Marker
                coordinate={this.state.region}
                title={this.props.navigation.state.params.name}
                description={this.props.navigation.state.params.place.vicinity}
                />
        </MapView>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
            {this.renderMap()}
            </View>
        )
    }
}

export default WebScreen
