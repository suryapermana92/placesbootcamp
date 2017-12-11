import React from 'react';
import { Provider } from 'react-redux'
import { View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Expo from 'expo';
import store from './src/store'

import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingScreen from './src/screens/SettingScreen';
import WebScreen from './src/screens/WebScreen';

export default class App extends React.Component {
  render() {
  //   StackNavigator({
  //     MyTab: {
  //       screen: TabNavigator({ }),
  //       navigationOptions: { title: 'Header title' }
  //    }
  //  })
    const MainNavigator = TabNavigator({
        main: {
          screen: TabNavigator({
            map: { screen: MapScreen },
            deck: { screen: DeckScreen },
            review: {
               screen: StackNavigator({
                  //DISPLAY ACCORDING INDEX POSITIONS
                  review: { screen: ReviewScreen },
                  setting: { screen: SettingScreen },
                  web: { screen: WebScreen }
               })
            }
         }, {
            tabBarPosition: 'bottom'
         })
      }
   }, {
      tabBarPosition: 'bottom',
      lazy: true,
      navigationOptions: {
        tabBarVisible: false
      }
    });
    
  return (
    <Provider store={store}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,122,255,1)' }}>
      <View style={{ flex: 1, paddingTop: Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
      </View>
      </Provider>
    );
  }
}