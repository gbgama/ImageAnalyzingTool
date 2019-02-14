import React, { Component } from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import HomeScreen from './components/screens/HomeScreen'
import InfoScreen from './components/screens/InfoScreen'

export default createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-home" size={24} color={tintColor}/>
      )
    }
  },
  Info: {
    screen: InfoScreen,
    navigationOptions: {
      tabBarLabel: 'Info',
      tabBarIcon: ({tintColor}) => (
        <Icon name='ios-information-circle-outline' size={24} color={tintColor}/>
      )
    }
  },
}, {
  initialRouteName: 'Home',
  // tab navigator options
  navigationOptions:{
    tabBarVisible: true
  },
  tabBarOptions: {
    activeTintColor: '#00c2ec',
    inactiveTintColor: 'grey'
  }
});