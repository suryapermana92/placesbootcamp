import React, { Component } from 'react';
import { Text, AsyncStorage, ActivityIndicator, View, Platform} from 'react-native';
import Slides from '../components/slides'

const SLIDE_DATA = [
    { text: 'Welcome to the Jobs App', color: 'rgba(0,122,255,1)' },
    { text: 'Set Your Position on the Map to Start Searching Jobs', color: 'rgba(90,200,250,1)' },
    { text: 'Apply and Get Hired!', color: 'rgba(0,122,255,1)' }
];

class WelcomeScreen extends Component {
    state = {
        token: null
    }
    async componentDidMount() {
       
        const token = await AsyncStorage.getItem('fb_token');

        if (token) {
            this.props.navigation.navigate('map');
        } else {
            // if (Platform.OS === 'android') {
            //     this.props.navigation.navigate('auth');
            //     return;
            // }
            this.setState({ token: false });
        }
    }
    onButtonPress() {
        this.props.navigation.navigate('auth');
    }
    render() {
        console.log(this.state.token);
        if (this.state.token === null) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }} >
                    <Text style={{ justifyContent: 'center', alignSelf: 'center'}}>
                        Checking Login Status...
                    </Text>
                    <ActivityIndicator size='large' />
                    </View>
            );
        }
      return (
            <Slides 
            data={SLIDE_DATA}
            onPress={this.onButtonPress.bind(this)}
            />
      );
   }
}

export default WelcomeScreen;
