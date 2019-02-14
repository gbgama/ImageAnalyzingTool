import React, { Component } from "react";
import { Dimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import Articles from './tab/Articles';
import Products from './tab/Products';


class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "wiki", title: "Articles" },
        { key: "ebay", title: "Products" }
      ],
      itemText: this.props.navigation.getParam("itemText", ""),
    };
    
  }


  static navigationOptions = {
    header: null
  };

  // Articles Tab Screen
  ArticlesRoute = () => (
    <Articles itemText={this.state.itemText}/>
  );

  // Products Tab Screen
  ProductsRoute = () => (
    <Products itemText={this.state.itemText}/>
  );

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          wiki: this.ArticlesRoute,
          ebay: this.ProductsRoute
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get("window").width, height: 0 }}
        renderTabBar={props => (
          <TabBar {...props} indicatorStyle={{ backgroundColor: "#43d262" }} />
        )}
      />
    );
  }
}

export default DetailsScreen;
