import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import { Button, FormLabel, FormInput, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { MapView, Permissions, Constants, Location } from 'expo'
import { Spinner } from '../components/common'



class MapScreen extends Component {
    
    static navigationOptions = {
        tabBarIcon: () => (<Icon name='location-searching' size={25} color='black' />),
        tabBarLabel: 'MAP'
    }
    
    state = {
        mapLoaded: false,
        region: {
            latitude: -6.1701812,
            longitude: 106.8219857,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04

        },
        keyword: '',
        locationGranted: false,
        searchText: 'Search Places',
        viewText: 'View as List',
        searching: false.value,
        initialRegion: false,
        markers:[]
    }
    
    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this.getLocationAsync();
        }
      }
//     async componentDidMount() {
//         this.setState({ mapLoaded: true })
//         const result = await Permissions.askAsync(Permissions.LOCATION);
//         if (result.status === 'granted') {
//             this.setState({ locationGranted: true })
//         }
//     }
   
    onRegionChangeComplete(region) {
        this.setState({ region })
    }
    onButtonPress() {
        console.log('button pressed')
        // this.setState({ searchText: 'Searching Jobs...' })
        this.props.fetchJobs(this.state.region, this.state.keyword, () => {
            alert('Places Saved')
            this.setState({ searchText: 'Search Places' })
         
        })
        
    }
    onChangeText(text) {
        this.setState({ keyword: text })
    }
    async getLocationAsync() {
        console.log('getting location')
        const locationGranted = await Permissions.askAsync(Permissions.LOCATION);
        if (locationGranted.status !== 'granted') {
            console.log(locationGranted)
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
        
        let userLocation = await Location.getCurrentPositionAsync();
        this.setState({ 
            region: { ...userLocation.coords, longitudeDelta: 0.05211871316703309, latitudeDelta: 0.08999999999835318 },
            markers: { ...userLocation.coords, longitudeDelta: 0.05211871316703309, latitudeDelta: 0.08999999999835318 },
            initialRegion: true
        });     
    }
    renderMap() {
        if (this.state.initialRegion) {
            return (
            <MapView
            initialRegion={this.state.region}
            style={{ flex: 1 }} 
           
            onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}>
                {this.renderMarker()}
            </MapView>
            );
        }
    }
    renderMarker() {
        console.log(this.props.jobs)
        if(this.props.jobs.results.length >0) {
            
        this.props.jobs.results.map((place, index)=> {
            console.log(place.geometry.location.lat,place.geometry.location.lng)
        return (
        <MapView.Marker
        title={place.name}
        coordinate={{latitude: place.geometry.location.lat, longitude: place.geometry.location.lng}}
        />
        );
    })
}
}
    render() {
//         console.log(this.props)
//         if (!this.state.locationGranted) {
//             return (
//                 <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//                     <Text>Aplikasi membutuhkan izin untuk mengakses lokasi</Text>
//                 </View>
//             )
//         }
//         if (this.state.mapLoaded === false) {
//             return (
//                 <Spinner />
//             )

//         }
        return (
         <View style={{ flex: 1 }}>
            {this.renderMap()}
            
            <View style={styles.formInputContainer}>
                <FormLabel>Keyword</FormLabel>
                <FormInput
                placeholder='example: Restaurant, Mall, etc'
                autoCorrect={false}
                onChangeText={this.onChangeText.bind(this)}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                title={this.state.searchText}
                
                backgroundColor='#009688'
                icon={{ name: 'search' }}
                onPress={() => this.onButtonPress()}/>

                <Button
                title={this.state.viewText}
                
                backgroundColor='#FF2851'
                icon={{ name: 'view-list' }}
                onPress={() => this.onButtonPress()}/>
            </View>
         </View>
      );
   }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft: 10,
        paddingRight: 10
    },
    formInputContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        top: 20,
        right: 40,
        left: 40
    }
}
const mapStateToProps = (state) => {
    return {
        jobs: state.jobs
        
    }
}
export default connect(mapStateToProps, actions)(MapScreen);
