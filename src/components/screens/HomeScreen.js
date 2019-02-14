import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import MainScreen from './MainScreen'
import DetailsScreen from './DetailsScreen'

export default class HomeScreen extends Component {
  render() {
    return (
      <HomeStackNavigator />
    );
  }
}

const HomeStackNavigator = createStackNavigator({
  Main: {
    screen: MainScreen
  },
  Details: {
    screen: DetailsScreen
  }
})