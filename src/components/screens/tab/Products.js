import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import keys from "../../../config/keys";
import ProductItem from "./ProductItem";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemText: props.itemText,
      ebayResponse: []
    };
  }

  componentDidMount() {
    const receivedItem = this.state.itemText;
    if(typeof receivedItem !== "undefined" && receivedItem !== ""){
    // make request to EBAY api
    fetch(
      `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${
        keys.ebayKey
      }&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${receivedItem}`
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          ebayResponse:
            responseJson.findItemsByKeywordsResponse[0].searchResult[0].item
        });
      }) //save results to the state
      .catch(error => console.log(error));
    }
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ width: "100%" }}
          data={this.state.ebayResponse}
          renderItem={product => (
            <ProductItem
              title={product.item.title[0]}
              imageUrl={product.item.galleryURL[0]}
              link={product.item.viewItemURL[0]}
              currency={
                product.item.sellingStatus[0].currentPrice[0]["@currencyId"]
              }
              price={product.item.sellingStatus[0].currentPrice[0].__value__}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00c2ec"
  }
});

export default Products;
